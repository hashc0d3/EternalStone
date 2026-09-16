import { redirect } from 'next/navigation';

export default function WholesalePage() {
  redirect('/catalog?view=opt');
}
