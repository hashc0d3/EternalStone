import { NextResponse } from 'next/server';
import { isValidRuMobile, normalizeRuPhone } from '@/lib/phone';

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json({ error: 'Telegram is not configured' }, { status: 503 });
  }

  let body: { name?: string; phone?: string; source?: string };
  try {
    body = (await request.json()) as { name?: string; phone?: string; source?: string };
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const name = body.name?.trim() ?? '';
  const phone = body.phone?.trim() ?? '';

  if (name.length < 2 || name.length > 80) {
    return NextResponse.json({ error: 'Укажите имя' }, { status: 400 });
  }

  if (!isValidRuMobile(phone)) {
    return NextResponse.json({ error: 'Укажите телефон в формате +7 (900) 000-00-00' }, { status: 400 });
  }

  const headings: Record<string, string> = {
    partner: 'Заявка: стать партнёром',
    wholesale: 'Заявка: оставить заявку (опт)',
    retail: 'Заявка: оставить заявку (розница)',
    callback: 'Заявка: обратный звонок',
    contacts: 'Заявка: обратный звонок (контакты)',
    consultation: 'Заявка: бесплатная консультация',
    services: 'Заявка: услуга',
  };
  const source = body.source && headings[body.source] ? body.source : 'callback';
  const heading = headings[source];
  const text = [
    `<b>${heading}</b>`,
    '',
    `<b>Имя:</b> ${escapeHtml(name)}`,
    `<b>Телефон:</b> ${escapeHtml(phone)}`,
    `<b>Номер:</b> +${normalizeRuPhone(phone)}`,
  ].join('\n');

  const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
    }),
  });

  if (!telegramResponse.ok) {
    return NextResponse.json({ error: 'Не удалось отправить заявку' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
