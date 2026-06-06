// Ingredient price list — INR.
// Source: typical Indian metro retail averages (2025), cross-checked against
// BigBasket listings and the Govt. Price Monitoring System (fcainfoweb.nic.in).
// Produce prices fluctuate seasonally; these are mid-range (non-spike) values.
// `per`: the unit the `inr` price refers to. Ingredients store amounts in
// grams ('g'), millilitres ('ml') or pieces ('pc').

export const PRICES = {
  // Grains & flours (per kg)
  rice: { label: 'Rice', inr: 60, per: 'kg' },
  atta: { label: 'Whole wheat flour (atta)', inr: 45, per: 'kg' },
  poha: { label: 'Flattened rice (poha)', inr: 60, per: 'kg' },
  oats: { label: 'Rolled oats', inr: 160, per: 'kg' },
  besan: { label: 'Gram flour (besan)', inr: 110, per: 'kg' },
  idli_batter: { label: 'Idli batter', inr: 70, per: 'kg' },

  // Pulses & legumes (per kg)
  toor_dal: { label: 'Toor / arhar dal', inr: 150, per: 'kg' },
  moong_dal: { label: 'Moong dal', inr: 120, per: 'kg' },
  masoor_dal: { label: 'Masoor dal', inr: 110, per: 'kg' },
  rajma: { label: 'Rajma (kidney beans)', inr: 140, per: 'kg' },
  chickpeas: { label: 'Chickpeas (kabuli chana)', inr: 110, per: 'kg' },
  roasted_chana: { label: 'Roasted chana', inr: 140, per: 'kg' },
  moong_sprouts: { label: 'Moong sprouts', inr: 100, per: 'kg' },

  // Dairy & animal protein
  paneer: { label: 'Paneer', inr: 400, per: 'kg' },
  tofu: { label: 'Tofu', inr: 250, per: 'kg' },
  curd: { label: 'Curd (dahi)', inr: 80, per: 'kg' },
  buttermilk: { label: 'Buttermilk (chaas)', inr: 40, per: 'l' },
  egg: { label: 'Eggs', inr: 84, per: 'dozen' },
  chicken: { label: 'Chicken (curry cut)', inr: 240, per: 'kg' },
  chicken_breast: { label: 'Chicken breast', inr: 300, per: 'kg' },
  fish: { label: 'Fish (rohu / surmai)', inr: 220, per: 'kg' },

  // Vegetables (per kg)
  onion: { label: 'Onion', inr: 40, per: 'kg' },
  tomato: { label: 'Tomato', inr: 40, per: 'kg' },
  potato: { label: 'Potato', inr: 35, per: 'kg' },
  spinach: { label: 'Spinach (palak)', inr: 50, per: 'kg' },
  mixed_veg: { label: 'Mixed vegetables', inr: 60, per: 'kg' },
  bhindi: { label: 'Bhindi (okra)', inr: 60, per: 'kg' },
  cucumber: { label: 'Cucumber', inr: 40, per: 'kg' },
  capsicum: { label: 'Capsicum', inr: 90, per: 'kg' },

  // Fruit (per kg)
  banana: { label: 'Banana', inr: 60, per: 'kg' },
  apple: { label: 'Apple', inr: 160, per: 'kg' },
  papaya: { label: 'Papaya', inr: 40, per: 'kg' },

  // Fats, nuts, sweeteners
  peanuts: { label: 'Peanuts (groundnut)', inr: 120, per: 'kg' },
  jaggery: { label: 'Jaggery (gud)', inr: 60, per: 'kg' },
  ghee: { label: 'Ghee', inr: 600, per: 'kg' },
  oil: { label: 'Cooking oil (mustard / groundnut)', inr: 150, per: 'l' },

  // Pantry & aromatics (per kg — used in tiny amounts)
  ginger_garlic: { label: 'Ginger-garlic paste', inr: 160, per: 'kg' },
  spices: { label: 'Spices & masala', inr: 400, per: 'kg' },
  bread: { label: 'Whole wheat bread', inr: 3, per: 'pc' }, // ~₹45 loaf / 15 slices
}

// Cost of `amt` of an ingredient (amt in g / ml / pc per `unit`), in INR.
export function ingredientCost(key, amt, unit) {
  const p = PRICES[key]
  if (!p) return 0
  switch (p.per) {
    case 'kg':
      return (p.inr / 1000) * amt // amt in grams
    case 'l':
      return (p.inr / 1000) * amt // amt in ml
    case 'dozen':
      return (p.inr / 12) * amt // amt in pieces
    case 'pc':
      return p.inr * amt // amt in pieces
    default:
      return 0
  }
}

// Human-friendly quantity string.
export function formatQty(amt, unit) {
  if (unit === 'g') {
    if (amt >= 1000) return `${(amt / 1000).toFixed(amt % 1000 === 0 ? 0 : 1)} kg`
    return `${Math.round(amt / 5) * 5} g`
  }
  if (unit === 'ml') {
    if (amt >= 1000) return `${(amt / 1000).toFixed(1)} L`
    return `${Math.round(amt / 10) * 10} ml`
  }
  // pieces — round to nearest half, drop trailing .0
  const n = Math.round(amt * 2) / 2
  return Number.isInteger(n) ? `${n}` : `${n}`
}
