import { Button, Divider, Modal, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { TextField } from '../TextField';
import { VisualTextField } from '../VisualTextField';
import styles from './modal.module.css';


export const CreateDirectionModal = () => {
   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   return (
      <>
         <Button onClick={handleOpen} variant="outlined">
            Open modal
         </Button>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <div className={styles.container}>
               <Stack gap={'8px'} width={'100%'}>
                  <div className={styles.modal_title}>
                     <Typography
                        id="modal-modal-title"
                        variant="h4"
                        component="h2"
                     >
                        Criar Direcionamento
                     </Typography>
                  </div>
                  <Divider variant="fullWidth" />
                  <div className={styles.modal_information_frame}>
                     <div className={styles.modal_information_title}>
                        <span>Informacoes</span>
                     </div>
                     <div className={styles.modal_information_form}>
                        <TextField
                           label_placeholder="Titulo"
                           input_placeholder="Insira seu Titulo"
                           name="text"
                           type="text"
                        />
                        <TextField
                           label_placeholder="Email para direcionamento"
                           input_placeholder="botnews@gmail.com"
                           name="email"
                           type="email"
                        />
                     </div>
                  </div>
                  <Divider variant="fullWidth" />
                  <div className={styles.modal_filter_frame}>
                     <div className={styles.modal_filter_typography}>
                        <span>Termos</span>
                     </div>
                     <Stack direction={'column'} spacing={2} pt={1} sx={{flex: 1}}>
                        <div className={styles.modal_filter_text_area}>
                           <span>
                              Termos de Inclusao
                           </span>
                        </div>
                        <TextField
                           label_placeholder="Novo Termo"
                           input_placeholder="Insira seu termo"
                           name="new_term"
                           type="text"
                        />
                        <VisualTextField label='Termos Adcionados' />
                        <div className={styles.modal_filter_text_area}>
                           <span>
                              Termos de Exclusao
                           </span>
                        </div>
                        <TextField
                           label_placeholder="Novo Termo"
                           input_placeholder="Insira seu termo"
                           name="bad_term"
                           type="text"
                        />
                        <VisualTextField label='Termos Adcionados' />
                     </Stack>
                  </div>
                  <Divider variant="fullWidth" />
                  <footer className="footer">
                     <Button variant="outlined">CANCELAR</Button>
                     <Button variant="contained">CRIAR DIRECIONAMENTO</Button>
                  </footer>
               </Stack>
            </div>
         </Modal>
      </>
   );
};
