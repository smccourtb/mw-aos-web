'use client';
import { Tab } from '@headlessui/react';
import React from 'react';
import FirestoreKeywordForm from '@/components/forms/FirestoreKeywordForm';
import FirestoreFactionForm from '@/components/forms/FirestoreFactionForm';
import FirestoreUnitForm from '@/components/forms/FirestoreUnitForm';
import { Faction } from '@/components/firestore/types';
type FirestoreProps = {
  data: { keywords: { name: string; ref: string }[]; factions: Faction[] };
};
const Firestore = ({ data }: FirestoreProps) => {
  const tabNames = ['Parent Collection', 'Unit'];

  return (
    <Tab.Group>
      <Tab.List className="mb-2 flex w-full justify-evenly rounded-md bg-gray-300 p-2">
        {tabNames.map((header, index) => (
          <Tab
            key={index}
            className="rounded-md px-4 py-2 text-lg font-bold capitalize focus:outline-none ui-selected:bg-gray-700 ui-selected:text-white"
          >
            {header}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel className="m-4 flex flex-col items-center justify-center gap-2 rounded-md bg-gray-200 p-4">
          <div className="self-center">
            <p className="font-bold">Add or delete a keyword</p>
            <FirestoreKeywordForm keywords={data.keywords} />
            <p className="font-bold">Add or delete a faction</p>
            <FirestoreFactionForm factions={data.factions} />
          </div>
        </Tab.Panel>
        <Tab.Panel>
          <FirestoreUnitForm factions={data.factions} />
        </Tab.Panel>
        <Tab.Panel>Content 3</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Firestore;
