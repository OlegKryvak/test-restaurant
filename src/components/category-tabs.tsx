import { FC } from 'react';
import styles from './styles.module.css';

interface Props {
  categories: string[];
  activeCategory: string | null;
  onSelect: (category: string) => void;
}

export const CategoryTabs: FC<Props> = ({ categories, activeCategory, onSelect }) => (
  <div className={styles.categoriesContainer}>
    {categories.map((category) => (
      <button
        key={category}
        onClick={() => onSelect(category)}
        style={{
          color: category === activeCategory ? '#129d42' : '#4a4a4a',
          borderBottom: category === activeCategory ? '1px solid #129d42' : 'none',
          transition: 'background 0.2s',
        }}
        className={styles.category}
      >
        {category}
      </button>
    ))}
  </div>
);