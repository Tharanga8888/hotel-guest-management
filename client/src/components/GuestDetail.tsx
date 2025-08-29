import { useEffect, useState } from 'react';
import type { FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GuestAPI } from '../lib/api';
import { formatDateForInput } from "../lib/date";
import { alertUpdate, alertDelete, confirmDelete } from "../lib/alerts";

async function fetchGuest(id: string) {
  return GuestAPI.get(id);
}

export default function GuestDetail({ id }: { id: string }) {
  const qc = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['guest', id],
    queryFn: () => fetchGuest(id),
  });

  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', phone: '', address: '', date_of_birth: ''
  });

  useEffect(() => {
    if (data) {
      setForm({
        first_name: data.first_name ?? '',
        last_name: data.last_name ?? '',
        email: data.email ?? '',
        phone: data.phone ?? '',
        address: data.address ?? '',
        date_of_birth: data.date_of_birth ?? '',
      });
    }
  }, [data]);

  const updateMutation = useMutation({
    mutationFn: async () => GuestAPI.update(id, form),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['guests'] });
      qc.invalidateQueries({ queryKey: ['guest', id] });
      alertUpdate();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async () => GuestAPI.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['guests'] });
      alertDelete();
      setTimeout(() => {
        window.location.href = "/guests";
      }, 1000);
    }
  });

  function set<K extends keyof typeof form>(key: K, val: string) {
    setForm(prev => ({ ...prev, [key]: val }));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    updateMutation.mutate();
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div className="text-red-600">Failed to load guest.</div>;

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
        <input
          type="date"
          className="rounded-md border px-3 py-2"
          value={formatDateForInput(form.date_of_birth)}
          onChange={(e) => set("date_of_birth", e.target.value)}
        />
      </label>


      <div className="flex items-center gap-3">
        <button disabled={updateMutation.isPending} className="rounded-md bg-black text-white px-4 py-2">
          {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
        </button>
        <button
          type="button"
          onClick={async () => {
            if (await confirmDelete()) {
              deleteMutation.mutate();
            }
          }}
          className="rounded-md border px-4 py-2 text-red-600">
          Delete
        </button>
      </div>

      {(updateMutation.isError || deleteMutation.isError) && (
        <div className="text-sm text-red-600">An error occurred. Please try again.</div>
      )}
    </form>
  );
}