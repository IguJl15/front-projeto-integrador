import { Block, Circle, Edit } from "@mui/icons-material";
import { Button, Divider, Typography } from "@mui/material";
import { TermsList } from "../Terms/Term";
import styles from "./directionsCardsList.module.css";
import { Direction } from "../../entities/Direction";

export function DirectionsCardsList({ directions }: { directions: Direction[] }) {
    return (
      <div className={styles.directions_list}>
        {directions.map((dir) => (
          <div className={styles.direction_card}>
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
                  <Typography variant='body1'>Termos de inclusão</Typography>
                  <TermsList terms={dir.inclusionTerms.map((e) => e.description)} />
                </div>
                <div>
                  <Typography variant='body1'>Termos de exclusão</Typography>
                  <TermsList terms={dir.exclusionTerms.map((e) => e.description)} />
                </div>
              </div>
            </div>
            <div className={styles.direction_card_footer}>
              <Button startIcon={<Edit />} variant='text'>Editar</Button>
              <Button startIcon={<Block />} variant='text'>Suspender</Button>
            </div>
          </div>
        ))}
      </div>
    );
  }
  