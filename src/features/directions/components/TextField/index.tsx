import { TextField, Typography } from '@mui/material';
import styles from './style.module.css';
import { ReactNode } from 'react';

interface IRowWithTextFieldProps {
  inputName: string;
  inputLabel: string;
  inputPlaceholder: string;
  inputType?: React.HTMLInputTypeAttribute;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => any;
  trailingButton?: ReactNode;
}

export const FormRowWithTextField = (props: IRowWithTextFieldProps) => {
  return (
    <form>
      <FormRow name={props.inputName} label={props.inputLabel}>
        <TextField
          name={props.inputName}
          placeholder={props.inputPlaceholder}
          type={props.inputType}
          value={props.value}
          size="small"
          onChange={props.onChange}
        />
        {props.trailingButton}
      </FormRow>
    </form>
  );
};

interface IFormRowProps {
  name: string;
  label: string;
  children: ReactNode | ReactNode[];
}

export const FormRow = (props: IFormRowProps) => {
  return (
    <div className={styles.formRow}>
      <label htmlFor={props.name}>
        <Typography>{props.label}</Typography>
      </label>
      {props.children}
    </div>
  );
};
