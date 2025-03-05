import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import React, { useState } from 'react';
import { Button } from '../ui/button';

interface DialogFormProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
  submitText?: string;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  loading: boolean;
}

const DialogForm = ({
  open,
  setOpen,
  title,
  description,
  children,
  submitText = 'Save changes',
  onSubmit,
  loading,
}: DialogFormProps) => {
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await onSubmit(e);
      setOpen(false); // ✅ Close modal on success
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred'
      );
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-4 py-4"
          onSubmit={handleSubmit}
        >
          {children}
          <DialogFooter>
            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? 'Saving...' : submitText}
            </Button>
          </DialogFooter>
          {error && <p className="text-red-500">{error}</p>}{' '}
          {/* ✅ Show error only inside modal */}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogForm;
