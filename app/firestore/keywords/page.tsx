import React, { Suspense } from 'react';
import FirestoreKeywordForm from '@/components/forms/FirestoreKeywordForm';
import { getKeywords } from '@/components/firestore/keywords';

const keywords = await getKeywords();

export default function KeywordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FirestoreKeywordForm keywords={keywords} />
    </Suspense>
  );
}
