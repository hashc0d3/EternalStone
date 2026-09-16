'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { formatRuPhone, isValidRuMobile } from '@/lib/phone';

export function LeadModal({
  title,
  source,
  onClose,
}: {
  title: string;
  source: 'partner' | 'wholesale' | 'retail' | 'callback' | 'consultation' | 'contacts' | 'services';
  onClose: () => void;
}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+7');
  const [phoneError, setPhoneError] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValidRuMobile(phone)) {
      setPhoneError('Введите номер в формате +7 (900) 000-00-00');
      return;
    }

    setPhoneError('');
    setStatus('sending');

    try {
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), phone, source }),
      });

      if (!response.ok) {
        throw new Error('send failed');
      }

      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  const dialog = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[440px] overflow-hidden bg-white text-[#1a1a1a] shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Закрыть"
          className="absolute right-3 top-3 z-20 grid h-10 w-10 place-items-center rounded-full bg-black/35 p-0 text-white ring-1 ring-white/50 transition-all duration-300 ease-out hover:scale-110 hover:rotate-90 hover:bg-white hover:text-[#1a1a1a] hover:ring-white hover:shadow-md"
          onClick={onClose}
        >
          <svg
            viewBox="0 0 24 24"
            className="block h-[18px] w-[18px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M7 7l10 10M17 7L7 17" />
          </svg>
        </button>
        <div className="relative flex h-36 items-center justify-center">
          <Image src="/images/slider/1.png" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/35" />
          <Image
            src="/images/brand/logo.png"
            alt="Вечный камень"
            width={261}
            height={120}
            className="relative z-10 h-16 w-auto"
            style={{ width: 'auto', height: '4rem' }}
          />
        </div>

        {status === 'success' ? (
          <div className="px-8 py-10 text-center">
            <h2 id="lead-modal-title" className="text-2xl font-semibold">
              Заявка отправлена
            </h2>
            <p className="mt-3 text-sm text-[#666]">Мы перезвоним.</p>
            <button
              type="button"
              className="mt-8 inline-flex h-12 w-full items-center justify-center bg-[#1a1a1a] text-sm text-white"
              onClick={onClose}
            >
              Закрыть
            </button>
          </div>
        ) : (
          <form className="px-8 py-8" onSubmit={onSubmit}>
            <h2 id="lead-modal-title" className="text-center text-2xl font-semibold">
              {title}
            </h2>

            <input
              required
              autoFocus
              name="name"
              minLength={2}
              maxLength={80}
              placeholder="Имя"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-6 h-12 w-full border border-[#ddd] px-4 text-sm outline-none placeholder:text-[#aaa] focus:border-[#1a1a1a]"
            />

            <label className="mt-4 flex h-12 items-center border border-[#ddd] px-3 focus-within:border-[#1a1a1a]">
              <span className="pr-3 text-lg" aria-hidden="true">
                🇷🇺
              </span>
              <input
                required
                type="tel"
                name="phone"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+7 (000) 000-00-00"
                value={phone}
                onChange={(event) => {
                  setPhone(formatRuPhone(event.target.value));
                  setPhoneError('');
                }}
                className="h-full w-full text-sm outline-none placeholder:text-[#aaa]"
              />
            </label>
            {phoneError ? <p className="mt-2 text-sm text-red-600">{phoneError}</p> : null}

            {status === 'error' ? (
              <p className="mt-4 text-sm text-red-600">Не удалось отправить. Попробуйте ещё раз.</p>
            ) : null}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-6 flex h-12 w-full items-center justify-center bg-[#1a1a1a] text-sm text-white transition-colors hover:bg-black disabled:opacity-60"
            >
              {status === 'sending' ? 'Отправляем…' : 'Отправить'}
            </button>
            <p className="mt-4 text-center text-[11px] leading-relaxed text-[#888]">
              Нажимая «Отправить», вы соглашаетесь с{' '}
              <Link href="/privacy" className="underline underline-offset-2 hover:text-[#1a1a1a]">
                политикой конфиденциальности
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );

  return createPortal(dialog, document.body);
}
