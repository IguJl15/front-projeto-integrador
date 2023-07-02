import { black38, black60 } from '@/core/ui/constants/colors';
import styles from './term.module.css';
import { Typography } from '@mui/material';

export function TermsList({ terms }: { terms: string[] }) {
  return (
    <div className={styles.termsList}>
      {terms.length ? (
        terms.map((term) => <Term key={term} description={term} />)
      ) : (
        <Typography variant="subtitle1" color={black60} paddingLeft={1}>
          Nenhum termo
        </Typography>
      )}
    </div>
  );
}

export default function Term({ description }: { description: string }) {
  return (
    <div className={styles.term}>
      <Typography variant="body2" fontWeight={500}>
        {description.toUpperCase()}
      </Typography>
    </div>
  );
}
