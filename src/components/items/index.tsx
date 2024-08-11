import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { useSortRepositoriesQuery } from '../../redux/sortedGithubApi';
import { Repository } from '../../types';
import Pagination from '../Pagination';
import Sort from '../sort';
import { transformationDate } from './../../utils/transformationDate';
import styles from './items.module.scss';

// Пропсы Items
type ItemsProps = {
  repoName: string;
  handleRepoClick: (repo: Repository) => void;
};

export const Items = ({ repoName, handleRepoClick }: ItemsProps) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [activeSort, setActiveSort] = useState<number>(0);

  const sortOptions = ['stars', 'forks', 'updated'];

  // Использование хука useDebounce
  const debouncedRepoName = useDebounce(repoName, 400);

  // Запрос к API Github
  const { data, error, isLoading, isFetching } = useSortRepositoriesQuery(
    {
      repoName: debouncedRepoName,
      sortBy: activeSort === 0 ? '' : sortOptions[activeSort - 1],
    },
    { skip: !debouncedRepoName },
  );

  // Показывает страницу, на которой находиммся
  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  // Показывает количество строк на странице
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

	// Определяет выбранный фильтр сортировки 
  const handleSortChange = (index: number) => {
    setActiveSort(index);
  };

	// Обработка ошибки, если репозитории не найдены
 if (data?.items.length === 0) {
	return <div className={styles.error}>К сожалению ничего не найдено... 😞</div>
 }

  return (
    <div className={`${styles.container} _container`}>
      {(isLoading || isFetching) && (
        <div className={styles.progress}>
          <CircularProgress />
        </div>
      )}
      {data && !isFetching && !error && (
        <Sort activeSort={activeSort} handleSortChange={handleSortChange} />
      )}
      {/* Загрузка */}

      {/* Обработка ошибок */}
      {error && (
        <div className={styles.error__empty}>
          <p>Что-то произошло не так... 😞</p>
					<p>Попробуйте обновить страницу</p>
        </div>
      )}

      {/*ПОДГРУЗКА РЕПОЗИТОРИЕВ */}
      {!error && !isFetching && data && (
        <>
          <h2 className={styles.title}>Результаты поиска</h2>
          <div>
            <div className={styles.item__title}>
              <div>Название</div>
              <div>Язык</div>
              <div>Число форков</div>
              <div>Число звезд</div>
              <div>Дата обновления</div>
            </div>
            <div>
              {data.items
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((repo: Repository) => (
                  <div key={repo.id} onClick={() => handleRepoClick(repo)} className={styles.item}>
                    <div>{repo.name}</div>
                    <div>{repo.language}</div>
                    <div>{repo.forks_count}</div>
                    <div>{repo.stargazers_count}</div>
                    <div>{transformationDate(repo.updated_at)}</div>
                  </div>
                ))}
            </div>
          </div>
          <Pagination
            page={page}
            count={data?.items.length}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            rowsPerPage={rowsPerPage}
          />
        </>
      )}
    </div>
  );
};
export default Items;
