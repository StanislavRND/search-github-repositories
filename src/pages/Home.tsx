import { useState } from 'react';
import DrawerRight from '../components/drawer';
import Footer from '../components/Footer';
import Header from '../components/header';
import Items from '../components/items/index';
import { Repository } from '../types';

const Home = () => {
  const [repoName, setRepoName] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);

  // Взаимодействие с Drawer
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // Обработчик инпута
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepoName(e.target.value);
  };

  // Обработчик клика, выбранного инпута
  const handleRepoClick = (repo: Repository) => {
    setSelectedRepo(repo);
    toggleDrawer(true)();
  };

  return (
    <>
      <Header repoName={repoName} handleInput={handleInput} />
      <main className="main">
        {repoName.length === 0 ? (
          <div className="main__content">
            <h1 className="main__title">Введите название репозитория...</h1>
          </div>
        ) : (
          <>
            <DrawerRight selectedRepo={selectedRepo} open={open} toggleDrawer={toggleDrawer} />
            <Items handleRepoClick={handleRepoClick} repoName={repoName} />
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Home;
