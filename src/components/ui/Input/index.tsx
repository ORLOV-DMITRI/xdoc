import styles from './Input.module.scss'

type InputType = {} & React.InputHTMLAttributes<HTMLInputElement>

export default function Input({...props}: InputType) {
    return (
        <input className={styles.input} {...props}/>

    );
};