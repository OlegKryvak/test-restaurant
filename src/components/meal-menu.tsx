import  { useEffect, useRef, useState } from 'react';
import { LanguageSelector } from './language-selector';
import background from '../assets/background.jpg';
import { MealCategory } from './meal-category';
import { CategoryTabs } from './category-tabs';
import styles from './styles.module.css';
import { Meal } from '../types/types';
import { getMenu } from '../api';


export const MealMenu = () => {
  const [resolvedMeals, setResolvedMeals] = useState<Meal[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [loader, setLoader] = useState<boolean>(false);

  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const observer = useRef<IntersectionObserver | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = (lang: string = 'en') => {
    setLoader(true);
    getMenu(lang).then((data) => {
      if (Array.isArray(data)) {
        setResolvedMeals(data);
        if (data.length > 0) {
          setActiveCategory(data[0].meal_category.name);
        }
      }
    }).finally(() => setLoader(false));
  };

  const groupedMeals = resolvedMeals.reduce<Record<string, Meal[]>>((acc, meal) => {
    const categoryName = meal.meal_category.name;
    if (!acc[categoryName]) acc[categoryName] = [];
    acc[categoryName].push(meal);
    return acc;
  }, {});

  const categories = Object.keys(groupedMeals);

  const handleScrollToCategory = (category: string) => {
    const el = categoryRefs.current[category];
    const stickyHeight = stickyRef.current?.offsetHeight ?? 0;
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - stickyHeight - 20;
      window.scrollTo({ top, behavior: 'smooth' });
      setActiveCategory(category);
    }
  };

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    getData(lang);
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px 0px -70% 0px',
      threshold: 0,
    };

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const category = entry.target.getAttribute('data-category');
          if (category) setActiveCategory(category);
        }
      });
    }, options);

    Object.entries(categoryRefs.current).forEach(([category, el]) => {
      if (el) {
        el.setAttribute('data-category', category);
        observer.current?.observe(el);
      }
    });

    return () => observer.current?.disconnect();
  }, [resolvedMeals]);

  if (loader) return <div className={styles.loader}></div>;

  return (
    <div className={styles.container}>
      <img className={styles.bg} src={background} alt='background' />
      <div className={styles.header} ref={stickyRef}>
        <LanguageSelector selectedLanguage={selectedLanguage} onChange={handleLanguageChange} />
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onSelect={handleScrollToCategory}
        />
      </div>
      <div className={styles.mealsContainer}>
        {categories.map((category) => (
          <MealCategory
            key={category}
            category={category}
            meals={groupedMeals[category]}
            innerRef={(el) => (categoryRefs.current[category] = el)}
          />
        ))}
      </div>
    </div>
  );
};