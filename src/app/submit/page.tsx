import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SubmitPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-[600px] text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Coming Soon</h1>
        <p className="text-xl text-[#4d4d4d] mb-8">Story submission form is under development.</p>
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </main>
  );
}
