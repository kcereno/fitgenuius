import React from 'react';

import MobileDrawer from './MobileDrawer';

interface MobileDrawerProps {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const ExerciseDrawer = ({ open, onOpenChange }: MobileDrawerProps) => {
  return (
    <MobileDrawer
      open={open}
      onOpenChange={onOpenChange}
      title="Exercise List"
    ></MobileDrawer>
  );
};

export default ExerciseDrawer;
