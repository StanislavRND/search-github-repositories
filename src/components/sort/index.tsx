import styles from './sort.module.scss';

type SortProps = {
  activeSort: number;
  handleSortChange: (index: number) => void;
};

const Sort = ({ activeSort, handleSortChange }: SortProps) => {
  const sortArr = ['Все', 'По звёздам', 'По форкам', 'По дате обновления'];

  return (
    <div className={styles.sort}>
      {sortArr.map((el, index) => (
        <div
          onClick={() => handleSortChange(index)}
          key={index}
          className={`${styles.item} ${activeSort === index ? styles.active : ''}`}>
          {el}
        </div>
      ))}
    </div>
  );
};

export default Sort;
