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
  triggerText: string;
  title: string;
  description: string;
  children: React.ReactNode;
  submitText?: string;
  onSubmit: (e: React.FormEvent) => Promise<void> | void;
}

const DialogForm = ({
  triggerText,
  title,
  description,
  children,
  submitText = 'Save changes',
  onSubmit,
}: DialogFormProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await onSubmit(e);
      setOpen(false);
    } catch (error) {
      console.log(' handleSubmit ~ error:', error);
      setError('Something Went Wrong');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button className="fixed bottom-20 left-1/2 -translate-x-1/2">
          {triggerText}
        </Button>
      </DialogTrigger>
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
