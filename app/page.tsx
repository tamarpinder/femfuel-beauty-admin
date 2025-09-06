'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect directly to dashboard, bypassing login
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          FemFuel Beauty Admin
        </h1>
        <p className="text-gray-600">
          Redirecting to dashboard...
        </p>
      </div>
    </div>
  );
}