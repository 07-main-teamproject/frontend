export type Food = {
  external_id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  contains_nuts: boolean;
  contains_gluten: boolean;
  contains_dairy: boolean;
  categories: string[];
  tags: string[];
  labels: string[];
};

// {
//     "external_id": "6111242102941",
//     "name": "Yogurt Bnine BANANA",
//     "calories": 88.1,
//     "protein": 3.9,
//     "carbs": 14.3,
//     "fat": 1.7,
//     "contains_nuts": false,
//     "contains_gluten": false,
//     "contains_dairy": false,
//     "categories": [
//         "en:dairies",
//         "en:fermented-foods",
//         "en:fermented-milk-products",
//         "en:desserts",
//         "en:dairy-desserts",
//         "en:fermented-dairy-desserts",
//         "en:yogurts",
//         "en:flavoured-fermented-dairy-desserts",
//         "en:cow-milk-yogurts",
//         "en:flavoured-yogurts"
//     ],
//     "tags": [
//         "ar:lait-frais-partiellement-écrémé",
//         "ar:poudre-de-lait-écrémé",
//         "ar:sucre",
//         "ar:arôme",
//         "ar:ferments-lactiques"
//     ],
//     "labels": [
//         "en:unknown"
//     ]
// }
