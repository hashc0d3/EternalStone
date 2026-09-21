'use client';

import dynamic from 'next/dynamic';

export const LeadModal = dynamic(() => import('@/components/lead-modal').then((mod) => mod.LeadModal), {
  ssr: false,
});
