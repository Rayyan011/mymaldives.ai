interface Props {
  name: string;
  atoll: string;
  starRating: number;
  priceRange: string;
  description: string;
  features: string[];
  onBook?: () => void;
}

export default function ResortCard({
  name,
  atoll,
  starRating,
  priceRange,
  description,
  features,
  onBook,
}: Props) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-4 my-2 max-w-md">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-semibold text-black">{name}</h3>
          <p className="text-xs text-neutral-500">{atoll}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-400">
            {"★".repeat(starRating)}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
            {priceRange}
          </span>
        </div>
      </div>

      <p className="text-sm text-neutral-600 mb-3">{description}</p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {features.slice(0, 5).map((f) => (
          <span
            key={f}
            className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full"
          >
            {f}
          </span>
        ))}
      </div>

      {onBook && (
        <button
          onClick={onBook}
          className="w-full text-sm font-medium text-white bg-black hover:bg-neutral-800 rounded-lg py-2 transition-colors"
        >
          Inquire About Booking
        </button>
      )}
    </div>
  );
}
