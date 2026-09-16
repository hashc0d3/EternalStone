import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const API = 'https://api.klingai.com/v1/images/generations';
const NEGATIVE =
  'text, letters, watermark, logo, caption, UI, cartoon, illustration, CGI, plastic, extra limbs, deformed, low quality, blurry, oversaturated, smiling models, stock photo smile';

const STYLE =
  'Photorealistic cinematic photograph of a premium granite memorial workshop in Russia, dark gabbro and grey granite, wet polished stone, overcast natural light, muted charcoal palette, no readable text, no watermark, no logos';

function loadEnv() {
  const raw = readFileSync(resolve(ROOT, '.env'), 'utf8');
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq < 1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^['"]|['"]$/g, '');
    if (!process.env[key]) process.env[key] = value;
  }
}

function authHeaders() {
  const key = process.env.KLINGAI_API_KEY;
  if (!key) throw new Error('KLINGAI_API_KEY is missing in .env');
  return {
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
  };
}

async function createTask(prompt, aspectRatio) {
  const res = await fetch(API, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({
      model_name: process.env.KLING_MODEL || 'kling-v2-1',
      prompt: `${STYLE}. ${prompt}`,
      negative_prompt: NEGATIVE,
      n: 1,
      aspect_ratio: aspectRatio,
      resolution: '1k',
    }),
  });
  const json = await res.json();
  if (!res.ok || json.code) {
    throw new Error(`create ${res.status}: ${JSON.stringify(json).slice(0, 800)}`);
  }
  const taskId = json.data?.task_id ?? json.data?.taskId;
  if (!taskId) throw new Error(`no task_id: ${JSON.stringify(json).slice(0, 800)}`);
  return taskId;
}

async function waitForImage(taskId) {
  const started = Date.now();
  while (Date.now() - started < 180_000) {
    await new Promise((r) => setTimeout(r, 4000));
    const res = await fetch(`${API}/${taskId}`, { headers: authHeaders() });
    const json = await res.json();
    const status = json.data?.task_status ?? json.data?.taskStatus;
    if (status === 'succeed' || status === 'succeeded') {
      const url = json.data?.task_result?.images?.[0]?.url;
      if (!url) throw new Error(`succeed but no url: ${JSON.stringify(json).slice(0, 800)}`);
      return url;
    }
    if (status === 'failed' || json.code) {
      throw new Error(`task ${status}: ${JSON.stringify(json).slice(0, 800)}`);
    }
    process.stdout.write(`  ${status || 'waiting'}...\n`);
  }
  throw new Error(`timeout for ${taskId}`);
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download ${res.status}`);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
}

const JOBS = [
  {
    file: 'apps/web/public/images/catalog/1.png',
    ratio: '16:9',
    prompt:
      'Wide shot of a tall polished black granite Orthodox memorial headstone standing on a granite base in a quiet cemetery, dramatic side light, shallow depth of field, elegant and solemn',
  },
  {
    file: 'apps/web/public/images/catalog/2.png',
    ratio: '16:9',
    prompt:
      'Still life of granite cemetery accessories on dark stone: polished vase, oil lamp, small bench, close-up product photography, studio darkness',
  },
  {
    file: 'apps/web/public/images/catalog/3.jpg',
    ratio: '16:9',
    prompt:
      'Overhead three-quarter view of a grave covered with neatly fitted dark granite paving tiles, clean joints, wet stone sheen after rain',
  },
  {
    file: 'apps/web/public/images/catalog/4.png',
    ratio: '16:9',
    prompt:
      'Architectural photo of granite stairs, facade cladding and interior stone steps, monumental dark grey granite slabs, luxury material look',
  },
  {
    file: 'apps/web/public/images/catalog/5.jpg',
    ratio: '16:9',
    prompt:
      'Full memorial complex: headstone, fence, granite paving, flowerbed and bench, dusk cemetery, cinematic wide composition',
  },
  {
    file: 'apps/web/public/images/slider/1.png',
    ratio: '16:9',
    prompt:
      'Extreme close-up of dark gabbro granite texture with mirror-polished face and raw split edge, water droplets, cinematic macro, almost abstract',
  },
  {
    file: 'apps/web/public/images/slider/2.png',
    ratio: '16:9',
    prompt:
      'Wide cinematic photo of a monumental granite staircase outdoors, wet dark stone, foggy overcast sky, architectural grandeur',
  },
  {
    file: 'apps/web/public/images/slider/3.png',
    ratio: '16:9',
    prompt:
      'Quiet cemetery at blue hour, silhouettes of granite monuments, soft fog, premium documentary photography, no people',
  },
  {
    file: 'apps/web/public/images/services/1.png',
    ratio: '16:9',
    prompt:
      'Stone craftsman measuring a granite monument on site with a tape, only hands and stone visible, documentary, respectful, no faces',
  },
  {
    file: 'apps/web/public/images/services/2.png',
    ratio: '16:9',
    prompt:
      'Delivery of granite slabs on a small truck at a cemetery workshop yard, dark stone crates, overcast, photorealistic',
  },
  {
    file: 'apps/web/public/images/services/install.png',
    ratio: '16:9',
    prompt:
      'Installation of a black granite headstone onto a concrete foundation, crane straps, careful work, documentary photography, no readable branding',
  },
  {
    file: 'apps/web/public/images/services/layouts.png',
    ratio: '16:9',
    prompt:
      'Architectural visualization of a granite grave complex layout on a dark table: paper plan and small stone samples, moody studio light',
  },
  {
    file: 'apps/web/public/images/works/1.jpg',
    ratio: '4:3',
    prompt: 'Finished vertical black granite monument with carved cross, cemetery, photoreal, no readable names',
  },
  {
    file: 'apps/web/public/images/works/2.jpg',
    ratio: '4:3',
    prompt: 'Horizontal family granite memorial with two portraits as blank polished ovals, no readable text',
  },
  {
    file: 'apps/web/public/images/works/3.jpg',
    ratio: '4:3',
    prompt: 'Grey granite monument with flowerbed and granite vase, spring cemetery, photoreal',
  },
  {
    file: 'apps/web/public/images/works/4.jpg',
    ratio: '4:3',
    prompt: 'Children memorial in light granite, small scale, flowers, respectful and quiet, no readable names',
  },
  {
    file: 'apps/web/public/images/works/5.jpg',
    ratio: '4:3',
    prompt: 'Granite grave cladding just finished, wet tiles, clean geometry, documentary',
  },
  {
    file: 'apps/web/public/images/works/6.jpg',
    ratio: '4:3',
    prompt: 'Corner view of a granite memorial fence and gate, dark metal and stone, cemetery path',
  },
  {
    file: 'apps/web/public/images/works/7.jpg',
    ratio: '4:3',
    prompt: 'Close-up of gold-leaf Orthodox cross carved in black granite, macro, no extra text',
  },
  {
    file: 'apps/web/public/images/works/8.jpg',
    ratio: '4:3',
    prompt: 'Wide memorial complex with bench and paved plot, late afternoon light',
  },
  {
    file: 'apps/web/public/images/works/9.jpg',
    ratio: '4:3',
    prompt: 'Workshop interior with granite monuments in progress, dust in light rays, craftsman tools, no faces',
  },
];

const only = process.argv[2];
const jobs = only === '--test' ? JOBS.slice(0, 1) : only ? JOBS.filter((j) => j.file.includes(only)) : JOBS;

loadEnv();

for (const job of jobs) {
  const dest = resolve(ROOT, job.file);
  process.stdout.write(`Generating ${job.file}\n`);
  const taskId = await createTask(job.prompt, job.ratio);
  process.stdout.write(`  task ${taskId}\n`);
  const url = await waitForImage(taskId);
  await download(url, dest);
  process.stdout.write(`  saved ${job.file}\n`);
}
