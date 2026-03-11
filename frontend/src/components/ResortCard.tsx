interface Props {
  name: string;
  atoll: string;
  starRating: number;
  priceRange: string;
  description: string;
  features: string[];
  onBook?: () => void;
}

const PRICE_COLORS: Record<string, string> = {
  budget: 'bg-green-100 text-green-700',
  mid: 'bg-blue-100 text-blue-700',
  luxury: 'bg-purple-100 text-purple-700',
  'ultra-luxury': 'bg-amber-100 text-amber-700',
};

export default function ResortCard({ name, atoll, starRating, priceRange, description, features, onBook }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 my-2 max-w-md">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-semibold text-gray-900">{name}</h3>
          <p className="text-xs text-gray-500">{atoll}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-amber-500">{'★'.repeat(starRating)}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${PRICE_COLORS[priceRange] || 'bg-gray-100 text-gray-600'}`}>
            {priceRange}
          </span>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-3">{description}</p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {features.slice(0, 5).map((f) => (
          <span key={f} className="text-xs bg-ocean-100 text-ocean-700 px-2 py-0.5 rounded-full">
            {f}
          </span>
        ))}
      </div>

      {onBook && (
        <button
          onClick={onBook}
          className="w-full text-sm font-medium text-white bg-coral-500 hover:bg-coral-600 rounded-lg py-2 transition-colors"
        >
          Inquire About Booking
        </button>
      )}
    </div>
  );
}
