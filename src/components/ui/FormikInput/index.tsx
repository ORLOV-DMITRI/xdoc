import styles from './FormikInput.module.scss'
import {FieldHookConfig, useField} from "formik";
import cn from "classnames";

type FormikInputType = {
    label?: string
    className?:string
} & React.InputHTMLAttributes<HTMLInputElement>


export default function FormikInput({label, className, ...props}:FormikInputType & FieldHookConfig<string>) {
    const [field, {error, touched}] = useField(props);


    return (

        <div className={cn(styles.field, className,
            error && touched && error && styles.field_error)}>
            <label>
                {label}
            </label>
            <input type={props.type} {...field} name={props.name} placeholder={props.placeholder} 
                   className={styles.input}/>
            <div className={styles.error}>{error && touched && error}</div>

        </div>
    )
};