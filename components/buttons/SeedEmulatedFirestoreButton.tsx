import React, { useEffect, useState } from 'react';
type SeedEmulatedFirestoreButtonProps = {};
const SeedEmulatedFirestoreButton = ({}: SeedEmulatedFirestoreButtonProps) => {
  const [isSeeded, setIsSeeded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = () => {
      fetch('/api/firestore/seed').then((_res) => setIsSeeded(true));
    };
    return () => unsubscribe();
  }, []);

  return (
    <button
      disabled={isLoading || isSeeded}
      onClick={async () => {
        setIsLoading(true);
        await fetch('/api/firestore/seed');
        setIsSeeded(true);
        setIsLoading(false);
      }}
      className="button hover:bg-gray-100 active:bg-gray-200 active:shadow-inner disabled:opacity-50"
    >
      {'Seed Firestore'}
    </button>
  );
};

export default SeedEmulatedFirestoreButton;
