import { Exercise } from '@/types/exercise';
import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '../ui/button';
import useAddExercise from '@/hooks/useAddExercise';
import { MovementType } from '@prisma/client';
import {
  capitalizeFirstLetter,
  sanitizeAndCapitalize,
} from '@/utils/formatters';

const INITIAL_NEW_EXERCISE_VALUE: Pick<Exercise, 'name' | 'movementType'> = {
  name: '',
  movementType: 'SQUAT',
};

interface DrawerProps {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddExerciseDrawer = ({ open, onOpenChange }: DrawerProps) => {
  const [newExercise, setNewExercise] = useState(INITIAL_NEW_EXERCISE_VALUE);
  const { mutateAsync: addExercise, isPending, error } = useAddExercise();

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
      const sanitizedNewExercise = {
        ...newExercise,
        name: sanitizeAndCapitalize(newExercise.name),
      };
      await addExercise(sanitizedNewExercise);

      setNewExercise(INITIAL_NEW_EXERCISE_VALUE);
      onOpenChange(false);
    } catch (error) {
      console.error(' handleSubmit ~ error:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    const updatedNewExercise = {
      ...newExercise,
      [inputName]: inputValue,
    };
    setNewExercise(updatedNewExercise);
  };

  const handleSelectChange = (value: string) => {
    setNewExercise((prev) => ({
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
            value={newExercise.name}
            className="col-span-3"
          />
          <Label
            htmlFor="name"
            className="text-right"
          >
            Movement
          </Label>
          <Select
            value={newExercise.movementType}
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

export default AddExerciseDrawer;
