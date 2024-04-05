import styles from './Input.module.scss'
import cn from "classnames";

type InputType = {
    className?:string
} & React.InputHTMLAttributes<HTMLInputElement>

export default function Input({ className,...props}: InputType) {



    return (
        <input className={cn(styles.input, className)} {...props}/>

    );
};
