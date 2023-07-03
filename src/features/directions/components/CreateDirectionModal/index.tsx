import { useError } from '@/core/contexts/ErrorContext';
import { Add } from '@mui/icons-material';
import { Button, Divider, Modal, Stack, Typography } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { DirectionRepository } from '../../data/DirectionRepository';
import { Direction } from '../../entities/Direction';
import { Term } from '../../entities/Term';
import { TermsList } from '../Terms/Term';
import { FormRow, FormRowWithTextField } from '../TextField';
import styles from './modal.module.css';

export interface ModalProps {
  open: () => void;
  close: () => void;
  openned: boolean;

  repository: DirectionRepository;
  direction?: Direction;
  variant?: 'text' | 'outlined' | 'contained';
}

export const CreateDirectionModal = (props: ModalProps) => {
  const isUpdating = !!props.direction;

  // use errors
  const { runCatchingFailure } = useError();

  // input fields
  const [title, setTitle] = useState(props.direction?.title ?? '');
  const [email, setEmail] = useState(props.direction?.redirectEmail ?? '');
  const [incTerm, setIncTerm] = useState('');
  const [excTerm, setExcTerm] = useState('');

  // terms
  const [inclusionTerms, setInclusionTerms] = useState(new Set<Term>());
  const [exclusionterms, setExclusionTerms] = useState(new Set<Term>());

  useEffect(() => {
    if (isUpdating) {
      setTitle(props.direction!.title);
      setEmail(props.direction!.redirectEmail);
      setInclusionTerms(new Set(props.direction!.inclusionTerms));
      setExclusionTerms(new Set(props.direction!.exclusionTerms));
    }
  });

  // modal function
  const handleOpen = () => props.open();
  const handleClose = () => {
    resetModal();
    props.close();
  };

  function createDirection() {
    runCatchingFailure(async () => {
      const data = {
        title: title,
        redirectEmail: email,
        inclusionTerms: Array.from(inclusionTerms),
        exclusionTerms: Array.from(exclusionterms),
      };

      if (isUpdating) {
        props.direction = await props.repository.updateDirection(props.direction!.id, data);
      } else {
        props.direction = await props.repository.createDirection(data);
      }

      handleClose();
    });
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
      const term = new Term('', incTerm, false);
      if (exclusionterms.has(term)) {
        // lancar error
        return;
      }
      setInclusionTerms(inclusionTerms.add(term));
    }
  }
  function addExcTerm() {
    if (excTerm && excTerm.trim()) {
      const term = new Term('', incTerm, true);

      if (inclusionTerms.has(term)) {
        // lancar error
        return;
      }
      setExclusionTerms(exclusionterms.add(term));
    }
  }

  return (
    <>
      <Button startIcon={<Add />} onClick={handleOpen} variant={props.variant ?? 'outlined'}>
        Criar direcionamento
      </Button>
      <Modal
        open={props.openned}
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
                    setTitle(event.target.value);
                  }}
                />
                <FormRowWithTextField
                  inputLabel="Email para direcionamento"
                  inputPlaceholder="botnews@gmail.com"
                  inputName="email"
                  inputType="email"
                  value={email}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setEmail(event.target.value);
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
                <span className={styles.modal_filter_text_area}>Termos de inclusao</span>
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
                  <div className={styles.termsListContainer}>
                    <TermsList terms={Array.from(inclusionTerms)} />
                  </div>
                </FormRow>

                {/* TERMOS DE EXCLUSÃO */}
                <span className={styles.modal_filter_text_area}>Termos de exclusão</span>
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
                  <div className={styles.termsListContainer}>
                    <TermsList terms={Array.from(exclusionterms)} />
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
