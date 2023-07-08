import React from 'react';
import NewGameForm from '@/components/forms/NewGameForm';

export default async function PlayPage() {
  return (
    <div className="mx-10 flex h-screen flex-col items-center">
      <NewGameForm />
    </div>
  );
}
