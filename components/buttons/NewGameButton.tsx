'use client';
import React from 'react';
import Link from 'next/link';

type NewGameButtonProps = { children: React.ReactNode };
const NewGameButton = ({ children }: NewGameButtonProps) => {
  return (
    <Link className="button" href={'/play/new'}>
      {children}
    </Link>
  );
};

export default NewGameButton;
