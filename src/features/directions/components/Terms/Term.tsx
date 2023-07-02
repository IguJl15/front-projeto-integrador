import styles  from "./term.module.css";
import { Typography } from "@mui/material";

export default function Term({description}: {description: string}) {
  return (
    <div className={styles.term}>
      <Typography variant="body2" fontWeight={500}>
        {description.toUpperCase()}
      </Typography>
    </div>
  );
}
