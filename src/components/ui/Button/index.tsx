import styles from './Button.module.scss'
import cn from "classnames";


type ButtonType = {
    className: string,
    variant: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({className, variant, ...props}: ButtonType) {
    return (<button className={cn(styles.btn, className, styles[variant])} {...props}/>)
};