import { HeaderSlot } from '@/components/skeletons';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <HeaderSlot />
      <div className="skeleton h-[min(70vh,640px)]" />
    </div>
  );
}
