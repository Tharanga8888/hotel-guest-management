import AddGuestForm from '../components/AddGuestForm';

export default function NewGuestPage() {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">Add New Guest</h1>
      <p className="text-sm text-gray-600">Create a new guest record.</p>
      <AddGuestForm />
    </div>
  );
}