'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to Horizon</h1>
      <Link href="/auth/signup">
        <button>Sign Up</button>
      </Link>
    </div>
  );
}

