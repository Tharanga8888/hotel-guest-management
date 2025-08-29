import { useState } from 'react';
import type { FormEvent } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GuestAPI } from '../lib/api';
import type { Guest } from '../types';
import { useNavigate } from 'react-router-dom';
import { alertAdd } from "../lib/alerts";

export default function AddGuestForm() {
  const nav = useNavigate();
  const qc = useQueryClient();

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    date_of_birth: '',
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      const payload: Partial<Guest> = {
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        email: form.email.trim(),
        phone: form.phone || undefined,
        address: form.address || undefined,
        date_of_birth: form.date_of_birth || undefined,
      };
      return GuestAPI.create(payload);
    },
    onSuccess: (rec) => {
      qc.invalidateQueries({ queryKey: ['guests'] });
      nav(`/guests/${rec.id}`);
      alertAdd();
    },
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    createMutation.mutate();
  }

  function set<K extends keyof typeof form>(key: K, val: string) {
    setForm(prev => ({ ...prev, [key]: val }));
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm">First name *</span>
          <input className="rounded-md border px-3 py-2" required value={form.first_name} onChange={e=>set('first_name', e.target.value)} />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm">Last name *</span>
          <input className="rounded-md border px-3 py-2" required value={form.last_name} onChange={e=>set('last_name', e.target.value)} />
        </label>
      </div>
      <label className="flex flex-col gap-1">
        <span className="text-sm">Email *</span>
        <input type="email" className="rounded-md border px-3 py-2" required value={form.email} onChange={e=>set('email', e.target.value)} />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm">Phone</span>
        <input className="rounded-md border px-3 py-2" value={form.phone} onChange={e=>set('phone', e.target.value)} />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm">Address</span>
        <textarea className="rounded-md border px-3 py-2" rows={3} value={form.address} onChange={e=>set('address', e.target.value)} />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm">Date of birth</span>
        <input type="date" className="rounded-md border px-3 py-2" value={form.date_of_birth} onChange={e=>set('date_of_birth', e.target.value)} />
      </label>

      <div className="flex items-center gap-3">
        <button disabled={createMutation.isPending} className="rounded-md bg-black text-white px-4 py-2">
          {createMutation.isPending ? 'Saving...' : 'Save'}
        </button>
      </div>

      {createMutation.isError && (
        <div className="text-sm text-red-600">Failed to create guest. Ensure email is unique.</div>
      )}
    </form>
  );
}