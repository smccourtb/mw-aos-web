import React from 'react';
import Link from 'next/link';

export default function FirestorePage() {
  return (
    <div className="mx-10 flex flex-col bg-gray-200">
      <ol className="flex items-center justify-around">
        {['factions', 'keywords'].map((category, index) => (
          <li key={index} className="capitalize underline">
            <Link href={`/firestore/${category}`}>{category}</Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
