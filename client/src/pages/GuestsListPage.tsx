import GuestList from '../components/GuestList';


export default function GuestsListPage() {
    return (
        <div className="space-y-2">
            <h1 className="text-2xl font-semibold">Guests</h1>
            <p className="text-sm text-gray-600">Search, view, edit, and delete guest records.</p>
            <GuestList />
        </div>
    );
}