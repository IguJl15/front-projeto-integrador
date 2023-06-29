import styles from './style.module.css';

interface IBasicFormProps {
  name: string;
  input_placeholder: string;
  label_placeholder: string;
  type: string;
}

export const TextField = (props: IBasicFormProps) => {
  return (
    <div className={styles.form}>
      <label htmlFor={props.name}>{props.label_placeholder}</label>
      <input type={props.type} name={props.name} id={props.name} placeholder={props.input_placeholder} />
    </div>
  );
};
