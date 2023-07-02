import { MainBodyLayout } from '@/core/ui/layouts/MainBodyLayout';
import { CreateDirectionModal } from '../components/CreateDirectionModal';
import styles from './directionPage.module.css';
import { Typography } from '@mui/material';

export const DirectionPage = () => {
  const directions = [];

  return (
    <MainBodyLayout title="Direcionamentos" action={<CreateDirectionModal />}>
      <div>{directions.length == 0 ? <EmptyDirectionsList /> : 'Direcionamentos aqui'}</div>
    </MainBodyLayout>
  );
};

function EmptyDirectionsList() {
  return (
    <>
      <div className={styles.empty_info}>
        <img
          className={styles.empty_info_image}
          src="public/assets/news_image.png"
          alt="News icon"
        />
        <Typography variant="body1" fontSize={24} align="center" fontWeight={300}>
          Você ainda não tem nenhum direcionamento.
          <br />
          Crie um agora para começar a receber notícias
        </Typography>
        <CreateDirectionModal variant="contained" />
      </div>
    </>
  );
}
