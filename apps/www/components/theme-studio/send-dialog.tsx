'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { studioInput } from './studio-styles';

interface SendDialogProps {
  open: boolean;
  onClose: () => void;
  templateName?: string;
}

export function SendDialog({ open, onClose, templateName }: SendDialogProps) {
  const [email, setEmail] = useState('');

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm border border-border bg-background p-4">
        <h2 className="text-sm font-medium">Send test email</h2>
        {templateName ? (
          <p className="mt-1 text-xs text-muted-foreground">{templateName}</p>
        ) : null}

        <label className="mb-1 mt-4 block text-xs text-muted-foreground" htmlFor="send-email">
          Recipient
        </label>
        <input
          id="send-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          className={`${studioInput} mb-4`}
        />

        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="outline" size="sm" disabled title="Integration coming soon">
            Send
          </Button>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">Delivery integration coming soon.</p>
      </div>
    </div>
  );
}
