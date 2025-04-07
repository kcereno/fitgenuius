import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';

interface BottomActionButtonProps {
  url?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const BottomActionButton = ({
  url,
  onClick,
  children,
}: BottomActionButtonProps) => {
  const classes = 'fixed bottom-24 left-1/2 transform -translate-x-1/2';

  if (url) {
    return (
      <Link href={url}>
        <Button className={classes}> {children}</Button>
      </Link>
    );
  }

  return (
    <Button
      className={classes}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default BottomActionButton;
