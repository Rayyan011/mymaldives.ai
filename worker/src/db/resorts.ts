export interface Resort {
  id: number;
  name: string;
  atoll: string;
  star_rating: number;
  price_range: string;
  description: string;
  highlights: string;
  transfer_type: string;
  transfer_time_minutes: number;
  has_overwater_villa: number;
  honeymoon_friendly: number;
  family_friendly: number;
  has_all_inclusive: number;
  has_spa: number;
  has_diving: number;
  has_surfing: number;
  has_kids_club: number;
  website_url: string;
  image_url: string;
}

export async function getAllResortsSummary(db: D1Database): Promise<string> {
  const { results } = await db.prepare(
    `SELECT name, atoll, star_rating, price_range, description, highlights,
            transfer_type, has_overwater_villa, honeymoon_friendly, family_friendly,
            has_diving, has_spa, has_surfing, has_kids_club, has_all_inclusive
     FROM resorts`
  ).all<Resort>();

  if (!results.length) return 'No resorts currently in database.';

  return results.map(r => {
    const features: string[] = [];
    if (r.has_overwater_villa) features.push('overwater villas');
    if (r.has_diving) features.push('diving');
    if (r.has_spa) features.push('spa');
    if (r.has_surfing) features.push('surfing');
    if (r.has_kids_club) features.push('kids club');
    if (r.has_all_inclusive) features.push('all-inclusive');
    if (r.honeymoon_friendly) features.push('honeymoon-friendly');
    if (r.family_friendly) features.push('family-friendly');

    return `- ${r.name} (${r.atoll}, ${r.star_rating}★, ${r.price_range}): ${r.description}. Features: ${features.join(', ')}. Transfer: ${r.transfer_type}. Highlights: ${r.highlights}`;
  }).join('\n');
}
