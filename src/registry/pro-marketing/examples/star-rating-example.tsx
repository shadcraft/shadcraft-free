import { StarRating } from "@/registry/pro-marketing/components/star-rating";

export function StarRatingExample() {
  return (
    <div className="grid gap-12 p-5 md:grid-cols-2 lg:p-8">
      <div className="flex flex-col gap-8">
        <StarRating value={5} />
        <StarRating value={1} label="Empty stars" />
        <StarRating value={2.5} label="Partial stars" />
        <StarRating value={5} label="Full stars" />
        <StarRating value={5} className="text-yellow-500" label="Custom color" />
        <StarRating value={2} max={3} label="Custom quantity" />
        <StarRating value={4} max={7} label="Custom quantity" />
      </div>

      <div className="flex flex-col gap-8">
        <StarRating value={5} size="sm" label="Size small" />
        <StarRating value={5} size="md" label="Size medium" />
        <StarRating value={5} size="lg" label="Size large" />
        <StarRating value={5} size="sm" label="Size small" orientation="horizontal" />
        <StarRating value={5} size="md" label="Size medium" orientation="horizontal" />
        <StarRating value={5} size="lg" label="Size large" orientation="horizontal" />
        <StarRating
          value={5}
          size="sm"
          label="Size small"
          orientation="horizontal"
          containerClassName="flex-row-reverse"
        />
        <StarRating
          value={5}
          size="md"
          label="Size medium"
          orientation="horizontal"
          containerClassName="flex-row-reverse"
        />
        <StarRating
          value={5}
          size="lg"
          label="Size large"
          orientation="horizontal"
          containerClassName="flex-row-reverse"
        />
      </div>
    </div>
  );
}
