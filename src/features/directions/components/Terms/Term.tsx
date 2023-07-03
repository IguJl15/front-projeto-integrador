import { black60 } from '@/core/ui/constants/colors';
import { Typography } from '@mui/material';
import { Term as TermModel } from '../../entities/Term';
import styles from './term.module.css';

export function TermsList({ terms }: { terms: TermModel[] }) {
  return (
    <div className={styles.termsList}>
      {terms.length ? (
        terms.map((term) => <Term key={term.id} description={term.description} />)
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
