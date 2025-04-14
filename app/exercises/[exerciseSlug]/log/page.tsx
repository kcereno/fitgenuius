import { ArrowLeft, ArrowRight, ChevronLeft, Clock } from 'lucide-react';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const ExerciseLogPage = () => {
  return (
    <div className="">
      <div className="flex justify-between items-center p-4 bg-gray-200">
        <ChevronLeft />
        <div className="text-center">Exercise Name</div>
        <Clock />
      </div>
      <hr className="w-screen" />

      {/* Inputs */}
      <div className="p-4 space-y-4 ">
        <div className="flex gap-2">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Weight (lbs)</Label>
            <Input
              type="string"
              id="weight"
              placeholder="225"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Repetitions</Label>
            <Input
              type="number"
              id="reps"
              placeholder="10"
            />
          </div>
        </div>
        <Textarea
          className="h-32"
          placeholder="Notes (optional)"
        />
        <Button className="w-full">Submit</Button>
      </div>
      <hr />
      {/* Entry Data */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <h2 className="font-bold">Current</h2>
            <div className="space-y-2">
              <div className="">Set 1: 170lbs - 8 reps</div>
              <div className="">Set 2: 170lbs - 8 reps</div>
              <div className="">Set 4: 170lbs - 8 reps</div>
            </div>
          </div>
          <div className="">
            <div className="space-y-2">
              <h2 className="font-bold">Previous</h2>
              <div className="space-y-2">
                <div className="">Set 1: 170lbs - 8 reps</div>
                <div className="">Set 2: 170lbs - 8 reps</div>
                <div className="">Set 4: 170lbs - 8 reps</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Exercise Nav */}
      <div className="p-4 bg-gray-200 fixed bottom-20 left-0 w-full flex justify-between items-center text-sm">
        <div className="flex gap-1 items-center">
          <ArrowLeft className="size-6" /> <span>Previous Exercise</span>
        </div>
        <div className="flex gap-1 items-center">
          <span>Next Exercise</span>
          <ArrowRight className="size-6" />
        </div>
      </div>
    </div>
  );
};

export default ExerciseLogPage;
