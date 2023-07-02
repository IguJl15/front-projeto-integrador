import { Typography } from "@mui/material";
import styles from "./emptyDirectionsList.module.css";
import { CreateDirectionModal } from "../CreateDirectionModal";


export function EmptyDirectionsList() {
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
  