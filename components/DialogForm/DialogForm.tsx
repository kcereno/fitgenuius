'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React, { useState } from 'react';
import { Button } from '../ui/button';

interface DialogFormProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
  submitText?: string;
  onSubmit: (e: React.FormEvent) => Promise<void> | void;
  loading: boolean;
  error: string | null;
}

const DialogForm = ({
  trigger,
  title,
  description,
  children,
  submitText = 'Save changes',
  onSubmit,
  loading,
  error,
}: DialogFormProps) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await onSubmit(e);
      setOpen(false);
    } catch (error) {
      console.log(' handleSubmit ~ error:', error);
    }
  };
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-left">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-4 py-4"
          onSubmit={handleSubmit}
        >
          {children} {/* Render form fields dynamically */}
          <DialogFooter>
            <Button type="submit">{loading ? 'Saving...' : submitText}</Button>
          </DialogFooter>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogForm;
