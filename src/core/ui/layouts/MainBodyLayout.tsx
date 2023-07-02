import { Typography } from '@mui/material';
import style from './mainBodyLayout.module.css';
import { ReactNode } from 'react';

export function MainBodyLayout({
   title,
   action,
   children,
}: {
   title: string;
   action: ReactNode;
   children: ReactNode;
}) {
   return (
      <div className={style.main_body}>
         <div className={style.body_title}>
            <Typography variant="h1">{title}</Typography>
            {action}
         </div>
         <div className={style.body_content}>{children}</div>
      </div>
   );
}
