import styles from './style.module.css'

interface IVisualTextFieldProps {
     label:string
}

export const VisualTextField = (props: IVisualTextFieldProps) => {
     return (
          <div className={styles.form}>
               <label htmlFor="">{props.label}</label>
               <input name="" id="" type='text'></input>
          </div>
     )
}