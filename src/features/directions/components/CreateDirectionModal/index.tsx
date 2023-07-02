import { Button, Divider, Modal, Stack, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import styles from './modal.module.css';
import { Add } from '@mui/icons-material';
import { FormRow, FormRowWithTextField } from '../TextField';

export const CreateDirectionModal = () => {
  // use errors
  // TODO: ADD SET ERRORS

  // input fields
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [incTerm, setIncTerm] = useState('');
  const [excTerm, setExcTerm] = useState('');

  // terms
  const [inclusionTerms, setInclusionTerms] = useState(new Set<string>());
  const [exclusionterms, setExclusionTerms] = useState(new Set<string>());

  // modal state
  const [open, setOpen] = useState(false);
  // modal function
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    resetModal();
    setOpen(false);
  };

  function createDirection() {
    try {
      // create direction

      handleClose();
    } catch (error) {
      // if (error instanceof DirectionError) {
      //    // show errors
      // }
    }
  }

  function resetModal() {
    setTitle('');
    setEmail('');
    setIncTerm('');
    setExcTerm('');

    setInclusionTerms(new Set());
    setExclusionTerms(new Set());
  }

  function addIncTerm() {
    if (incTerm && incTerm.trim()) {
      if (exclusionterms.has(incTerm)) {
        // lancar error
        return;
      }
      setInclusionTerms(inclusionTerms.add(incTerm));
    }
  }
  function addExcTerm() {
    if (excTerm && excTerm.trim()) {
      if (inclusionTerms.has(excTerm)) {
        // lancar error
        return;
      }
      setExclusionTerms(exclusionterms.add(excTerm));
    }
  }

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
          <Stack gap={1} width={'100%'}>
            <div className={styles.modal_title}>
              <Typography id="modal-modal-title" variant="h4" component="h2">
                Criar Direcionamento
              </Typography>
            </div>
            <Divider variant="fullWidth" />
            <div className={styles.modal_information_frame}>
              <div className={styles.modal_information_title}>
                <span>Informacoes</span>
              </div>
              <div className={styles.modal_information_form}>
                <FormRowWithTextField
                  inputLabel="Titulo"
                  inputPlaceholder="Insira seu Titulo"
                  inputName="title"
                  inputType="text"
                  value={title}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setTitle(event.target.value.toUpperCase());
                  }}
                />
                <FormRowWithTextField
                  inputLabel="Email para direcionamento"
                  inputPlaceholder="botnews@gmail.com"
                  inputName="email"
                  inputType="email"
                  value={email}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setEmail(event.target.value.toUpperCase());
                  }}
                />
              </div>
            </div>
            <Divider variant="fullWidth" />
            <div className={styles.modal_filter_frame}>
              <div className={styles.modal_filter_typography}>
                <span>Termos</span>
              </div>
              <Stack direction="column" spacing={1} pt={1} sx={{ flex: 1 }}>
                {/* TERMOS DE INCLUSÃO */}
                <span className={styles.modal_filter_text_area}>
                  Termos de inclusao
                </span>
                <FormRowWithTextField
                  inputLabel="Novo termo"
                  inputName="term name"
                  inputType="text"
                  inputPlaceholder="Insira seu termo"
                  value={incTerm}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setIncTerm(event.target.value.toUpperCase());
                  }}
                  trailingButton={
                    <Button
                      type="submit"
                      variant="outlined"
                      startIcon={<Add />}
                      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        event.preventDefault();
                        addIncTerm();
                        setIncTerm('');
                      }}
                    >
                      Adicionar
                    </Button>
                  }
                />
                <FormRow label="Termos adicionados" name="new_terms">
                  <div className={styles.termsList}>
                    {Array.from(inclusionTerms.values()).map((term) => {
                      return (
                        <div className={styles.term}>
                          <Typography variant="body2" fontWeight={500}>
                            {term}
                          </Typography>
                        </div>
                      );
                    })}
                  </div>
                </FormRow>

                {/* TERMOS DE EXCLUSÃO */}
                <span className={styles.modal_filter_text_area}>
                  Termos de exclusão
                </span>
                <FormRowWithTextField
                  inputLabel="Novo termo"
                  inputName="term name"
                  inputType="text"
                  inputPlaceholder="Novo termo de exclusão"
                  value={excTerm}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setExcTerm(event.target.value.toUpperCase());
                  }}
                  trailingButton={
                    <Button
                      type="submit"
                      variant="outlined"
                      startIcon={<Add />}
                      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        event.preventDefault();
                        addExcTerm();
                        setExcTerm('');
                      }}
                    >
                      Adicionar
                    </Button>
                  }
                />
                <FormRow label="Termos adicionados" name="bad_terms">
                  <div className={styles.termsList}>
                    {Array.from(exclusionterms.values()).map((term) => {
                      return (
                        <div className={styles.term}>
                          <Typography variant="body2" fontWeight={500}>
                            {term.toUpperCase()}
                          </Typography>
                        </div>
                      );
                    })}
                  </div>
                </FormRow>
              </Stack>
            </div>
            <Divider variant="fullWidth" />
            <footer className="footer">
              <Button onClick={handleClose} variant="outlined">
                CANCELAR
              </Button>
              <Button onClick={createDirection} variant="contained">
                CRIAR DIRECIONAMENTO
              </Button>
            </footer>
          </Stack>
        </div>
      </Modal>
    </>
  );
};
