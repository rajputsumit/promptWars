// Indian meal database. India-first: common, widely available ingredients only.
// Each meal is ONE base serving. kcal/macros are for that base serving; the
// planner scales the portion to hit the user's calorie target.
// Ingredients carry structured amounts (g / ml / pc) so cost is computed from
// the ingredient price list (see prices.js) — never hardcoded.
// micros: fiber/iron/calcium/vitaminC. time in minutes.

export const MEALS = [
  // ---------- BREAKFAST ----------
  {
    id: 'poha', name: 'Vegetable Poha', slot: 'breakfast', veg: true,
    kcal: 270, protein: 6, carbs: 48, fat: 6,
    micros: { fiber: 4, iron: 3, calcium: 30, vitaminC: 12 },
    time: 15, tags: ['quick', 'light'],
    ingredients: [
      { key: 'poha', amt: 60, unit: 'g' },
      { key: 'onion', amt: 60, unit: 'g' },
      { key: 'potato', amt: 60, unit: 'g' },
      { key: 'peanuts', amt: 15, unit: 'g' },
      { key: 'oil', amt: 5, unit: 'ml' },
      { key: 'spices', amt: 3, unit: 'g', note: 'curry leaves, mustard' },
    ],
  },
  {
    id: 'besan-chilla', name: 'Besan Chilla (2)', slot: 'breakfast', veg: true,
    kcal: 320, protein: 14, carbs: 38, fat: 11,
    micros: { fiber: 7, iron: 4, calcium: 45, vitaminC: 8 },
    time: 20, tags: ['high-protein', 'veg'],
    ingredients: [
      { key: 'besan', amt: 80, unit: 'g' },
      { key: 'onion', amt: 50, unit: 'g' },
      { key: 'tomato', amt: 50, unit: 'g' },
      { key: 'oil', amt: 12, unit: 'ml' },
      { key: 'spices', amt: 3, unit: 'g', note: 'coriander, chilli' },
    ],
  },
  {
    id: 'idli-sambar', name: 'Idli with Sambar (3)', slot: 'breakfast', veg: true,
    kcal: 300, protein: 10, carbs: 56, fat: 4,
    micros: { fiber: 6, iron: 3, calcium: 50, vitaminC: 6 },
    time: 25, tags: ['fermented', 'light'],
    ingredients: [
      { key: 'idli_batter', amt: 200, unit: 'g' },
      { key: 'toor_dal', amt: 40, unit: 'g' },
      { key: 'mixed_veg', amt: 80, unit: 'g' },
      { key: 'spices', amt: 5, unit: 'g', note: 'sambar masala' },
    ],
  },
  {
    id: 'masala-oats', name: 'Masala Oats', slot: 'breakfast', veg: true,
    kcal: 260, protein: 9, carbs: 40, fat: 7,
    micros: { fiber: 8, iron: 4, calcium: 60, vitaminC: 10 },
    time: 12, tags: ['quick', 'high-fiber'],
    ingredients: [
      { key: 'oats', amt: 50, unit: 'g' },
      { key: 'mixed_veg', amt: 80, unit: 'g' },
      { key: 'onion', amt: 50, unit: 'g' },
      { key: 'tomato', amt: 50, unit: 'g' },
      { key: 'oil', amt: 5, unit: 'ml' },
    ],
  },
  {
    id: 'egg-bhurji-toast', name: 'Egg Bhurji + Toast', slot: 'breakfast', veg: false,
    kcal: 350, protein: 20, carbs: 28, fat: 17,
    micros: { fiber: 3, iron: 3, calcium: 70, vitaminC: 9 },
    time: 15, tags: ['high-protein', 'quick'],
    ingredients: [
      { key: 'egg', amt: 2, unit: 'pc' },
      { key: 'onion', amt: 60, unit: 'g' },
      { key: 'tomato', amt: 60, unit: 'g' },
      { key: 'bread', amt: 2, unit: 'pc' },
      { key: 'oil', amt: 5, unit: 'ml' },
    ],
  },
  {
    id: 'paratha-curd', name: 'Aloo Paratha + Curd', slot: 'breakfast', veg: true,
    kcal: 420, protein: 11, carbs: 58, fat: 16,
    micros: { fiber: 5, iron: 3, calcium: 120, vitaminC: 7 },
    time: 25, tags: ['filling'],
    ingredients: [
      { key: 'atta', amt: 80, unit: 'g' },
      { key: 'potato', amt: 150, unit: 'g' },
      { key: 'curd', amt: 100, unit: 'g' },
      { key: 'ghee', amt: 5, unit: 'g' },
      { key: 'spices', amt: 3, unit: 'g' },
    ],
  },

  // ---------- LUNCH ----------
  {
    id: 'dal-rice-sabzi', name: 'Dal, Rice & Bhindi Sabzi', slot: 'lunch', veg: true,
    kcal: 520, protein: 18, carbs: 78, fat: 14,
    micros: { fiber: 11, iron: 5, calcium: 80, vitaminC: 14 },
    time: 35, tags: ['balanced', 'thali'],
    ingredients: [
      { key: 'toor_dal', amt: 60, unit: 'g' },
      { key: 'rice', amt: 70, unit: 'g' },
      { key: 'bhindi', amt: 120, unit: 'g' },
      { key: 'onion', amt: 60, unit: 'g' },
      { key: 'tomato', amt: 60, unit: 'g' },
      { key: 'oil', amt: 8, unit: 'ml' },
      { key: 'spices', amt: 4, unit: 'g' },
    ],
  },
  {
    id: 'rajma-chawal', name: 'Rajma Chawal', slot: 'lunch', veg: true,
    kcal: 560, protein: 20, carbs: 88, fat: 12,
    micros: { fiber: 14, iron: 6, calcium: 90, vitaminC: 10 },
    time: 40, tags: ['high-protein', 'comfort'],
    ingredients: [
      { key: 'rajma', amt: 70, unit: 'g' },
      { key: 'rice', amt: 70, unit: 'g' },
      { key: 'onion', amt: 120, unit: 'g' },
      { key: 'tomato', amt: 120, unit: 'g' },
      { key: 'ginger_garlic', amt: 12, unit: 'g' },
      { key: 'oil', amt: 8, unit: 'ml' },
      { key: 'spices', amt: 5, unit: 'g' },
    ],
  },
  {
    id: 'chole-roti', name: 'Chole with 3 Roti', slot: 'lunch', veg: true,
    kcal: 540, protein: 19, carbs: 80, fat: 14,
    micros: { fiber: 13, iron: 6, calcium: 110, vitaminC: 12 },
    time: 40, tags: ['high-protein'],
    ingredients: [
      { key: 'chickpeas', amt: 70, unit: 'g' },
      { key: 'atta', amt: 90, unit: 'g' },
      { key: 'onion', amt: 120, unit: 'g' },
      { key: 'tomato', amt: 120, unit: 'g' },
      { key: 'oil', amt: 8, unit: 'ml' },
      { key: 'spices', amt: 8, unit: 'g', note: 'chole masala' },
    ],
  },
  {
    id: 'curd-rice', name: 'Curd Rice + Cucumber', slot: 'lunch', veg: true,
    kcal: 430, protein: 12, carbs: 70, fat: 9,
    micros: { fiber: 4, iron: 2, calcium: 200, vitaminC: 6 },
    time: 20, tags: ['light', 'gut-friendly'],
    ingredients: [
      { key: 'rice', amt: 70, unit: 'g' },
      { key: 'curd', amt: 150, unit: 'g' },
      { key: 'cucumber', amt: 120, unit: 'g' },
      { key: 'oil', amt: 4, unit: 'ml' },
      { key: 'spices', amt: 3, unit: 'g', note: 'mustard, curry leaf' },
    ],
  },
  {
    id: 'chicken-curry-rice', name: 'Chicken Curry & Rice', slot: 'lunch', veg: false,
    kcal: 580, protein: 35, carbs: 62, fat: 18,
    micros: { fiber: 5, iron: 4, calcium: 60, vitaminC: 11 },
    time: 45, tags: ['high-protein'],
    ingredients: [
      { key: 'chicken', amt: 150, unit: 'g' },
      { key: 'rice', amt: 70, unit: 'g' },
      { key: 'onion', amt: 120, unit: 'g' },
      { key: 'tomato', amt: 120, unit: 'g' },
      { key: 'ginger_garlic', amt: 12, unit: 'g' },
      { key: 'oil', amt: 10, unit: 'ml' },
      { key: 'spices', amt: 6, unit: 'g' },
    ],
  },
  {
    id: 'egg-curry-roti', name: 'Egg Curry + 3 Roti', slot: 'lunch', veg: false,
    kcal: 540, protein: 24, carbs: 64, fat: 20,
    micros: { fiber: 6, iron: 4, calcium: 90, vitaminC: 10 },
    time: 35, tags: ['high-protein'],
    ingredients: [
      { key: 'egg', amt: 2, unit: 'pc' },
      { key: 'atta', amt: 90, unit: 'g' },
      { key: 'onion', amt: 120, unit: 'g' },
      { key: 'tomato', amt: 120, unit: 'g' },
      { key: 'oil', amt: 8, unit: 'ml' },
      { key: 'spices', amt: 5, unit: 'g', note: 'garam masala' },
    ],
  },

  // ---------- DINNER ----------
  {
    id: 'roti-paneer', name: 'Palak Paneer + 2 Roti', slot: 'dinner', veg: true,
    kcal: 480, protein: 22, carbs: 48, fat: 22,
    micros: { fiber: 8, iron: 6, calcium: 350, vitaminC: 28 },
    time: 35, tags: ['high-protein', 'iron-rich'],
    ingredients: [
      { key: 'paneer', amt: 100, unit: 'g' },
      { key: 'spinach', amt: 150, unit: 'g' },
      { key: 'atta', amt: 60, unit: 'g' },
      { key: 'onion', amt: 80, unit: 'g' },
      { key: 'ginger_garlic', amt: 10, unit: 'g' },
      { key: 'oil', amt: 8, unit: 'ml' },
      { key: 'spices', amt: 5, unit: 'g' },
    ],
  },
  {
    id: 'khichdi', name: 'Moong Dal Khichdi', slot: 'dinner', veg: true,
    kcal: 400, protein: 16, carbs: 62, fat: 9,
    micros: { fiber: 9, iron: 4, calcium: 60, vitaminC: 8 },
    time: 30, tags: ['light', 'easy-digest'],
    ingredients: [
      { key: 'moong_dal', amt: 50, unit: 'g' },
      { key: 'rice', amt: 50, unit: 'g' },
      { key: 'mixed_veg', amt: 100, unit: 'g' },
      { key: 'ghee', amt: 5, unit: 'g' },
      { key: 'spices', amt: 3, unit: 'g', note: 'cumin' },
    ],
  },
  {
    id: 'mixed-veg-roti', name: 'Mixed Veg Sabzi + 3 Roti', slot: 'dinner', veg: true,
    kcal: 460, protein: 14, carbs: 66, fat: 15,
    micros: { fiber: 12, iron: 5, calcium: 120, vitaminC: 30 },
    time: 35, tags: ['high-fiber', 'balanced'],
    ingredients: [
      { key: 'mixed_veg', amt: 200, unit: 'g', note: 'carrot, beans, peas' },
      { key: 'atta', amt: 90, unit: 'g' },
      { key: 'onion', amt: 60, unit: 'g' },
      { key: 'tomato', amt: 60, unit: 'g' },
      { key: 'oil', amt: 8, unit: 'ml' },
      { key: 'spices', amt: 5, unit: 'g' },
    ],
  },
  {
    id: 'dal-tadka-roti', name: 'Dal Tadka + 2 Roti + Salad', slot: 'dinner', veg: true,
    kcal: 440, protein: 17, carbs: 60, fat: 13,
    micros: { fiber: 10, iron: 5, calcium: 90, vitaminC: 18 },
    time: 30, tags: ['balanced', 'light'],
    ingredients: [
      { key: 'masoor_dal', amt: 60, unit: 'g' },
      { key: 'atta', amt: 60, unit: 'g' },
      { key: 'onion', amt: 50, unit: 'g' },
      { key: 'tomato', amt: 50, unit: 'g' },
      { key: 'cucumber', amt: 60, unit: 'g' },
      { key: 'ghee', amt: 5, unit: 'g' },
      { key: 'spices', amt: 4, unit: 'g', note: 'cumin tadka' },
    ],
  },
  {
    id: 'grilled-chicken-veg', name: 'Tandoori Chicken + Sauteed Veg', slot: 'dinner', veg: false,
    kcal: 470, protein: 40, carbs: 24, fat: 22,
    micros: { fiber: 6, iron: 4, calcium: 80, vitaminC: 26 },
    time: 40, tags: ['high-protein', 'low-carb'],
    ingredients: [
      { key: 'chicken_breast', amt: 180, unit: 'g' },
      { key: 'curd', amt: 50, unit: 'g', note: 'marinade' },
      { key: 'capsicum', amt: 60, unit: 'g' },
      { key: 'onion', amt: 50, unit: 'g' },
      { key: 'mixed_veg', amt: 60, unit: 'g', note: 'beans' },
      { key: 'oil', amt: 5, unit: 'ml' },
      { key: 'spices', amt: 8, unit: 'g', note: 'tandoori masala' },
    ],
  },
  {
    id: 'fish-curry-rice', name: 'Fish Curry + Rice', slot: 'dinner', veg: false,
    kcal: 510, protein: 32, carbs: 58, fat: 16,
    micros: { fiber: 4, iron: 3, calcium: 100, vitaminC: 12 },
    time: 40, tags: ['high-protein', 'omega-3'],
    ingredients: [
      { key: 'fish', amt: 150, unit: 'g' },
      { key: 'rice', amt: 60, unit: 'g' },
      { key: 'onion', amt: 120, unit: 'g' },
      { key: 'tomato', amt: 120, unit: 'g' },
      { key: 'oil', amt: 8, unit: 'ml' },
      { key: 'spices', amt: 8, unit: 'g', note: 'mustard / curry masala' },
    ],
  },

  // ---------- SNACK ----------
  {
    id: 'sprouts-chaat', name: 'Sprouts Chaat', slot: 'snack', veg: true,
    kcal: 160, protein: 10, carbs: 24, fat: 3,
    micros: { fiber: 7, iron: 4, calcium: 50, vitaminC: 22 },
    time: 10, tags: ['high-protein', 'quick'],
    ingredients: [
      { key: 'moong_sprouts', amt: 80, unit: 'g' },
      { key: 'onion', amt: 50, unit: 'g' },
      { key: 'tomato', amt: 50, unit: 'g' },
      { key: 'spices', amt: 3, unit: 'g', note: 'chaat masala, lemon' },
    ],
  },
  {
    id: 'roasted-chana', name: 'Roasted Chana + Buttermilk', slot: 'snack', veg: true,
    kcal: 180, protein: 11, carbs: 26, fat: 4,
    micros: { fiber: 8, iron: 4, calcium: 130, vitaminC: 4 },
    time: 5, tags: ['high-protein', 'no-cook'],
    ingredients: [
      { key: 'roasted_chana', amt: 40, unit: 'g' },
      { key: 'buttermilk', amt: 200, unit: 'ml' },
    ],
  },
  {
    id: 'fruit-bowl', name: 'Seasonal Fruit Bowl', slot: 'snack', veg: true,
    kcal: 140, protein: 3, carbs: 32, fat: 1,
    micros: { fiber: 6, iron: 1, calcium: 30, vitaminC: 45 },
    time: 5, tags: ['vitamin-c', 'no-cook'],
    ingredients: [
      { key: 'banana', amt: 120, unit: 'g' },
      { key: 'apple', amt: 150, unit: 'g' },
      { key: 'papaya', amt: 100, unit: 'g' },
    ],
  },
  {
    id: 'peanut-chikki', name: 'Peanuts + Jaggery', slot: 'snack', veg: true,
    kcal: 200, protein: 8, carbs: 18, fat: 12,
    micros: { fiber: 3, iron: 2, calcium: 40, vitaminC: 0 },
    time: 2, tags: ['energy', 'no-cook'],
    ingredients: [
      { key: 'peanuts', amt: 30, unit: 'g' },
      { key: 'jaggery', amt: 15, unit: 'g' },
    ],
  },
]

// Substitution rules — keyed by ingredient key present in the chosen meals.
export const SUBSTITUTIONS = [
  { match: 'paneer', label: 'Paneer', to: 'Tofu or extra dal', reason: 'cheaper / vegan protein, same role' },
  { match: 'chicken', label: 'Chicken', to: 'Soya chunks or rajma', reason: 'vegetarian protein swap, lower cost' },
  { match: 'chicken_breast', label: 'Chicken breast', to: 'Soya chunks or paneer', reason: 'vegetarian protein swap' },
  { match: 'fish', label: 'Fish', to: 'Chicken or paneer', reason: 'if fish unavailable locally' },
  { match: 'rice', label: 'Rice', to: 'Roti / millet (bajra, jowar)', reason: 'lower GI, more fiber' },
  { match: 'ghee', label: 'Ghee', to: 'Mustard / groundnut oil', reason: 'reduce saturated fat' },
  { match: 'curd', label: 'Curd', to: 'Buttermilk or soy curd', reason: 'lighter / lactose-free option' },
  { match: 'oats', label: 'Oats', to: 'Daliya (broken wheat)', reason: 'cheaper local wholegrain' },
  { match: 'rajma', label: 'Rajma', to: 'Chana or lobia', reason: 'interchangeable legume' },
]
