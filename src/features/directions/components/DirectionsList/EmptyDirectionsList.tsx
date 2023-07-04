import { Add } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import styles from './emptyDirectionsList.module.css';

export function EmptyDirectionsList({ openModal }: { openModal: () => void }) {
  return (
    <div className={styles.empty_info}>
      <img className={styles.empty_info_image} src="public/assets/news_image.png" alt="News icon" />
      <Typography variant="body1" fontSize={24} align="center" fontWeight={300}>
        Você ainda não tem nenhum direcionamento.
        <br />
        Crie um agora para começar a receber notícias
      </Typography>
      <Button startIcon={<Add />} onClick={openModal} variant="contained">
        Criar direcionamento
      </Button>
    </div>
  );
}
