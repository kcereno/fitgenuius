import { DrawerProps } from '@/types/component';
import { Exercise } from '@/types/exercise';
import {
  capitalizeFirstLetter,
  sanitizeAndCapitalize,
} from '@/utils/formatters';
import { MovementType } from '@prisma/client';
import React, { useState } from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '../ui/button';

const INITIAL_EXERCISE: Pick<Exercise, 'name' | 'movementType'> = {
  name: '',
  movementType: 'SQUAT',
};

interface ExerciseDrawerProps extends DrawerProps {
  initialExercise?: Pick<Exercise, 'name' | 'movementType'>;
  onSubmit: (
    exerciseData: Pick<Exercise, 'name' | 'movementType'>
  ) => Promise<void>;
  isPending: boolean;
  error: Error | null;
}

const ExerciseFormDrawer = ({
  open,
  onOpenChange,
  initialExercise = INITIAL_EXERCISE,
  onSubmit,
  isPending,
  error,
}: ExerciseDrawerProps) => {
  const [exercise, setExercise] = useState(initialExercise);

  const movementTypes: MovementType[] = [
    'SQUAT',
    'HINGE',
    'PUSH',
    'PULL',
    'CORE',
    'CARRY',
  ];

  const handleSubmit = async () => {
    try {
      const sanitizedExercise = {
        ...exercise,
        name: sanitizeAndCapitalize(exercise.name),
      };

      await onSubmit(sanitizedExercise);
      setExercise(INITIAL_EXERCISE);
      onOpenChange(false);
    } catch (error) {
      console.log(' handleSubmit ~ error:', error);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    const updatedExerciseData = {
      ...exercise,
      [inputName]: inputValue,
    };
    setExercise(updatedExerciseData);
  };

  const handleSelectChange = (value: string) => {
    setExercise((prev) => ({
      ...prev,
      movementType: value as MovementType,
    }));
  };

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      autoFocus={open}
    >
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>New Exercise Form</DrawerTitle>
          <DrawerDescription>Enter Exercise Data Here</DrawerDescription>
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
            value={exercise.name}
            className="col-span-3"
          />
          <Label
            htmlFor="name"
            className="text-right"
          >
            Movement
          </Label>
          <Select
            value={exercise.movementType}
            onValueChange={handleSelectChange}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {movementTypes.map((movement) => (
                <SelectItem
                  key={movement}
                  value={movement}
                >
                  {capitalizeFirstLetter(movement)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {error && (
          <p className="text-center text-red-500 pt-2">{error.message}</p>
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

export default ExerciseFormDrawer;
