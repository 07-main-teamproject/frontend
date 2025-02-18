export type Food = {
  id: number;
  external_id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  contains_nuts: boolean;
  contains_gluten: boolean;
  contains_dairy: boolean;
};

export type DietsFoods = {
  diet: number;
  food: Food;
  portion_size: string;
};

export interface AllDietsResponse {
  id: number;
  user: Number;
  name: '아침 식단' | '점심 식단' | '저녁 식단';
  image_url: string;
  date: string;
  diet_foods: DietsFoods[];
  total_calories: Number;
  total_protein: Number;
  total_carbs: Number;
  total_fat: Number;
}
