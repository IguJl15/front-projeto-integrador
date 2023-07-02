import { Block, Circle, Delete, Edit } from '@mui/icons-material';
import { Button, Divider, IconButton, Typography } from '@mui/material';
import { Direction } from '../../entities/Direction';
import { TermsList } from '../Terms/Term';
import styles from './directionsCardsList.module.css';

interface DirectionsListProps {
  directions: Direction[];
  delete: (id: string) => void;
}

export function DirectionsCardsList(props: DirectionsListProps) {
  return (
    <div className={styles.directions_list}>
      {props.directions.map((dir) => (
        <div key={dir.id} className={styles.direction_card}>
          <div className={styles.direction_card_body}>
            <div className={styles.direction_card_title_area}>
              <div className={styles.direction_status}>
                <Typography variant="subtitle2">{dir.status}</Typography>
                <Circle sx={{ width: '10px' }} />
              </div>
              <Typography variant="h2">{dir.title}</Typography>
              <Typography variant="subtitle1">Para: {dir.redirectEmail}</Typography>
            </div>
            <Divider />
            <div className={styles.direction_analysis}>
              <div className={styles.direction_analysis_item}>
                <Typography variant="body1">Notícias encaminhadas</Typography>
                <Typography variant="h2">47</Typography>
              </div>
              <div className={styles.direction_analysis_item}>
                <Typography variant="body1">Notícias excluídas</Typography>
                <Typography variant="h2">19</Typography>
              </div>
            </div>
            <Divider />
            <div className={styles.direction_terms}>
              <div>
                <Typography variant="body1">Termos de inclusão</Typography>
                <TermsList terms={dir.inclusionTerms.map((e) => e.description)} />
              </div>
              <div>
                <Typography variant="body1">Termos de exclusão</Typography>
                <TermsList terms={dir.exclusionTerms.map((e) => e.description)} />
              </div>
            </div>
          </div>
          <div className={styles.direction_card_footer}>
            <div>
              <Button startIcon={<Edit />} variant="text">
                Editar
              </Button>
              <Button startIcon={<Block />} variant="text">
                Suspender
              </Button>
            </div>
            <IconButton
              onClick={() => {
                props.delete(dir.id);
              }}
            >
              <Delete />
            </IconButton>
          </div>
        </div>
      ))}
    </div>
  );
}
