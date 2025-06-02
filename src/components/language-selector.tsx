import { FC } from 'react';
import styles from './styles.module.css';

interface Props {
  selectedLanguage: string;
  onChange: (lang: string) => void;
}

export const LanguageSelector: FC<Props> = ({ selectedLanguage, onChange }) => {
  return (
    <div className={styles.languageContainer}>
      <h2 className={styles.title}>Demo</h2>
      <select
        className={styles.customSelect}
        value={selectedLanguage}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="en">EN</option>
        <option value="sk">SK</option>
        <option value="cs">CS</option>
        <option value="pl">PL</option>
      </select>
    </div>
  );
};