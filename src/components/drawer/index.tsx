import { Drawer } from '@mui/material';
import { GitBranch, Star } from 'lucide-react';
import { Repository } from '../../types';
import styles from './drawer.module.scss';

// Пропсы Drawer
type PropsDrawer = {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => () => void;
  selectedRepo: Repository | null;
};

const DrawerRight = ({ open, toggleDrawer, selectedRepo }: PropsDrawer) => {
  return (
    <>
      <Drawer
        sx={{
          '& .MuiDrawer-paper': {
            width: '30%',
            padding: '30px',
            boxSizing: 'border-box',
          },
        }}
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}>
        <div className={styles.title}>{selectedRepo?.name}</div>
        <div className={styles.desc}>
          {selectedRepo?.description ? selectedRepo.description : 'Нет описания'}
        </div>

        <div className={styles.flex}>
          {' '}
          <span className={styles.language}>
            {selectedRepo?.language ? selectedRepo.language : 'Нет языка'}
          </span>
          <div className={styles.flex__direction}>
            <div className={styles.stars}>
              <Star size={24} color="#eeff00" strokeWidth={2} />
              {selectedRepo?.stargazers_count}
            </div>
            <div className={styles.forks}>
              <GitBranch color="#303030" />
              {selectedRepo?.forks_count}
            </div>
          </div>
        </div>
        <div className={styles.lisence}>
          {selectedRepo?.license?.name ? selectedRepo.license.name : 'Нет лицензии'}
        </div>
      </Drawer>
    </>
  );
};

export default DrawerRight;
