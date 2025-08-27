import { useParams } from 'react-router-dom';
import GuestDetail from '../components/GuestDetail';

export default function GuestDetailPage() {
  const { id } = useParams();
  if (!id) return <div>Invalid guest id.</div>;
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">Guest Details</h1>
      <p className="text-sm text-gray-600">View and edit guest information.</p>
      <GuestDetail id={id} />
    </div>
  );
}