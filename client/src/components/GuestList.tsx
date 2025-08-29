import { useMemo, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { GuestAPI } from '../lib/api';
import { alertDelete, confirmDelete } from "../lib/alerts";

async function fetchGuests(search: string) {
  const allGuests = await GuestAPI.listAll();

  if (!search) return allGuests;

  const lowerSearch = search.toLowerCase();
  return allGuests.filter(
    (g) =>
      g.first_name.toLowerCase().includes(lowerSearch) ||
      g.last_name.toLowerCase().includes(lowerSearch) ||
      g.email.toLowerCase().includes(lowerSearch) ||
      (g.phone?.includes(search) ?? false)
  );
}

export default function GuestList() {
  const [search, setSearch] = useState('');
  const queryClient = useQueryClient();

  const { data: guests, isLoading, isError } = useQuery({
    queryKey: ['guests', { search }],
    queryFn: () => fetchGuests(search),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => GuestAPI.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['guests'] }),
  });

  const list = useMemo(() => guests ?? [], [guests]);

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full sm:w-80 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 hover:border-blue-400"
        />
        <Link
          to="/guests/new"
          className="rounded-md bg-black text-white px-4 py-2 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
        >
          + New
        </Link>
      </div>

      {isLoading && <div className="text-gray-500">Loading guests...</div>}
      {isError && <div className="text-red-600">Failed to load guests.</div>}
      {!isLoading && list.length === 0 && (
        <div className="text-sm text-gray-600 italic">No guests found.</div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-left text-sm font-medium">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Created</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map(g => (
              <tr
                key={g.id}
                className="border-t text-sm hover:bg-gray-50 transition duration-150"
              >
                <td className="px-4 py-2">{g.first_name} {g.last_name}</td>
                <td className="px-4 py-2">{g.email}</td>
                <td className="px-4 py-2">{g.phone || '----------'}</td>
                <td className="px-4 py-2">{new Date(g.created).toLocaleString()}</td>
                <td className="px-4 py-2 flex gap-2">
                  <Link
                    to={`/guests/${g.id}`}
                    className="rounded-md border border-gray-300 px-3 py-1 hover:bg-gray-100 transition duration-200"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={async () => {
                      if (await confirmDelete()) {
                        deleteMutation.mutate(g.id, {
                          onSuccess: () => { alertDelete(); },
                        });
                      }
                    }}
                    className="rounded-md border border-red-600 px-3 py-1 text-red-600 hover:bg-red-50 transition duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
