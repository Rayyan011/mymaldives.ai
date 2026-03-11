import { useState, type FormEvent } from 'react';
import { useUser } from '@clerk/react';

interface Props {
  resortName?: string;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export default function BookingForm({ resortName = '', onClose, onSuccess }: Props) {
  const { user } = useUser();
  const [form, setForm] = useState({
    guestName: user?.fullName || '',
    email: user?.emailAddresses?.[0]?.emailAddress || '',
    resortName,
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    budget: 'luxury',
    specialRequests: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();
      onSuccess('Booking inquiry sent! We\'ll be in touch soon.');
      onClose();
    } catch {
      onSuccess('Failed to send inquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const update = (field: string, value: string | number) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Booking Inquiry</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Resort</label>
            <input
              type="text"
              value={form.resortName}
              onChange={(e) => update('resortName', e.target.value)}
              required
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-ocean-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input
                type="text"
                value={form.guestName}
                onChange={(e) => update('guestName', e.target.value)}
                required
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-ocean-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                required
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-ocean-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
              <input
                type="date"
                value={form.checkIn}
                onChange={(e) => update('checkIn', e.target.value)}
                required
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-ocean-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
              <input
                type="date"
                value={form.checkOut}
                onChange={(e) => update('checkOut', e.target.value)}
                required
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-ocean-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adults</label>
              <input
                type="number"
                min={1}
                value={form.adults}
                onChange={(e) => update('adults', parseInt(e.target.value))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-ocean-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Children</label>
              <input
                type="number"
                min={0}
                value={form.children}
                onChange={(e) => update('children', parseInt(e.target.value))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-ocean-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
              <select
                value={form.budget}
                onChange={(e) => update('budget', e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-ocean-500"
              >
                <option value="budget">Budget</option>
                <option value="mid">Mid-range</option>
                <option value="luxury">Luxury</option>
                <option value="ultra-luxury">Ultra-luxury</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
            <textarea
              value={form.specialRequests}
              onChange={(e) => update('specialRequests', e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-ocean-500 resize-none"
              placeholder="Honeymoon setup, dietary needs, etc."
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-ocean-700 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-ocean-900 transition-colors disabled:opacity-50"
          >
            {submitting ? 'Sending...' : 'Send Inquiry'}
          </button>
        </form>
      </div>
    </div>
  );
}
