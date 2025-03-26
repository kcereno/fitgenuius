import { DrawerProps } from '@/types/component';
import { Workout } from '@/types/workout';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { sanitizeAndCapitalize } from '@/utils/formatters';

const INITIAL_WORKOUT: Workout['details'] = {
  name: '',
  id: '',
  slug: '',
};

interface WorkoutFormDrawerProps extends DrawerProps {
  initialWorkout?: Workout['details'];
  onSubmit: (workoutData: Pick<Workout['details'], 'name'>) => Promise<void>;
  isPending: boolean;
}

const WorkoutFormDrawer = ({
  open,
  onOpenChange,
  onSubmit,
  isPending,
  initialWorkout = INITIAL_WORKOUT,
}: WorkoutFormDrawerProps) => {
  const [workout, setWorkout] = useState(initialWorkout);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      setErrorMessage(null);
      const sanitizedWorkout = {
        ...workout,
        name: sanitizeAndCapitalize(workout.name),
      };

      await onSubmit(sanitizedWorkout);

      setWorkout(INITIAL_WORKOUT);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Unknown error occurred'
      );
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    const updatedWorkout = {
      ...workout,
      [inputName]: inputValue,
    };
    setWorkout(updatedWorkout);
  };

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      autoFocus={open}
    >
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>New Workout Form</DrawerTitle>
          <DrawerDescription>Enter workout Data Here</DrawerDescription>
        </DrawerHeader>
        <div className="grid grid-cols-4 items-center gap-4 px-4">
          <Label
            htmlFor="name"
            className="text-right"
          >
            Name
          </Label>
          <Input
            id="name"
            name="name"
            onChange={handleInputChange}
            value={workout.name}
            className="col-span-3"
          />
        </div>
        {errorMessage && (
          <p className="text-center text-red-500 pt-2">{errorMessage}</p>
        )}
        <DrawerFooter>
          <Button onClick={handleSubmit}>
            {isPending ? 'Submitting...' : 'Submit'}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default WorkoutFormDrawer;
