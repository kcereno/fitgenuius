import { IdNameType } from '@/types/data';
import { underscoreToDash } from '@/utils/formatters';
import Link from 'next/link';
import React from 'react';

interface ListProps {
  rootSlug: string;
  list: IdNameType[];
}

const NavigationList = ({ list, rootSlug }: ListProps) => {
  return (
    <ul>
      {list.map((listItem: IdNameType) => {
        const href = `/${rootSlug}/${underscoreToDash(listItem.id)}`;
        return (
          <li key={listItem.id}>
            <Link href={href}>{listItem.name}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavigationList;
