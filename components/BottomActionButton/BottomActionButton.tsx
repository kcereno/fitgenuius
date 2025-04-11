import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';

interface BottomActionButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const BottomActionButton = ({
  href,
  onClick,
  children,
}: BottomActionButtonProps) => {
  const classes = 'fixed bottom-24 left-1/2 transform -translate-x-1/2';

  if (href) {
    return (
      <Link href={href}>
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
