import React from 'react';
import styles from './header.module.scss';
import { Search } from 'lucide-react';

// Пропсы Header
type HeaderProps = {
  repoName: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Header = ({ repoName, handleInput }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={`${styles.container} _container`}>
        <div className={styles.search}>
				
          <input
            value={repoName}
            onChange={handleInput}
            className={styles.input}
            type="text"
            placeholder="Введите поисковой запрос"
          />
					<Search size={22} className={styles.icon} color="#949494" />
        </div>
      </div>
    </header>
  );
};

export default Header;
