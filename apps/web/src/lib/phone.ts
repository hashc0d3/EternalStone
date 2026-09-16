export function digitsOnly(value: string) {
  return value.replace(/\D/g, '');
}

export function normalizeRuPhone(value: string) {
  let digits = digitsOnly(value);

  if (digits.startsWith('8')) {
    digits = `7${digits.slice(1)}`;
  } else if (digits.startsWith('9')) {
    digits = `7${digits}`;
  } else if (!digits.startsWith('7')) {
    digits = `7${digits}`;
  }

  return digits.slice(0, 11);
}

export function formatRuPhone(value: string) {
  const digits = normalizeRuPhone(value);
  const local = digits.slice(1);
  let formatted = '+7';

  if (local.length === 0) return formatted;
  formatted += ` (${local.slice(0, 3)}`;
  if (local.length >= 3) formatted += ')';
  if (local.length > 3) formatted += ` ${local.slice(3, 6)}`;
  if (local.length > 6) formatted += `-${local.slice(6, 8)}`;
  if (local.length > 8) formatted += `-${local.slice(8, 10)}`;

  return formatted;
}

export function isValidRuMobile(value: string) {
  return /^79\d{9}$/.test(normalizeRuPhone(value));
}
