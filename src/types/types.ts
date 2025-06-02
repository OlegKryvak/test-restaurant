export interface MealCategory {
  name: string;
}

export interface Meal {
  id: string;
  name: string;
  description: string;
  price_with_modifiers: number;
  weight: string;
  weight_unit: string;
  picture_url: string;
  picture_url_large: string;
  meal_category: MealCategory;
}
