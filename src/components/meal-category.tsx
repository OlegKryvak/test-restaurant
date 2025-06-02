import { FC } from 'react';
import styles from './styles.module.css';
import { Meal } from '../types/types';

interface Props {
  category: string;
  meals: Meal[];
  innerRef: (el: HTMLDivElement | null) => void;
}

export const MealCategory: FC<Props> = ({ category, meals, innerRef }) => (
  <div ref={innerRef} className={styles.mealsContent}>
    <h2 className={styles.categoryName}>{category}</h2>
    {meals.map((meal) => (
      <div key={meal.id} className={styles.meal}>
        <div className={styles.mealInfo}>
          <h4 className={styles.mealName}>{meal.name}</h4>
          <small className={styles.mealWeight}>{meal.weight}{meal.weight_unit}</small>
          <p className={styles.mealDescription}>{meal.description}</p>
          <strong className={styles.mealPrice}>{meal.price_with_modifiers}€</strong>
        </div>
        <img
          src={meal.picture_url ?? meal.picture_url_large}
          alt={meal.name}
          className={styles.mealImg}
        />
      </div>
    ))}
  </div>
);