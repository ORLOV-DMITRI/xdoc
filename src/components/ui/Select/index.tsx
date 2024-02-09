import styles from './Select.module.scss'
import {useState} from "react";
import cn from "classnames";
import ArrowIcon from '/public/svg/chevron.svg'

type SelectType = {
    options: string[]
    value: string
    onChange: (selectLang: string) => void
}


export default function Select({options, value, onChange}: SelectType) {
    const [selected, setSelected] = useState<string>(value ? value : options[0])
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleChange = (item: string) => {
        setSelected(item)
        onChange(item)
    }

    return (
        <div className={cn(styles.select, isOpen && styles.open)} onClick={() => setIsOpen(!isOpen)}>

            <div className={cn(styles.selectedItem)}>
                {selected}
                <ArrowIcon/>
            </div>

            <div className={cn(styles.selectList,)}>
                {options.map(item => (
                    <div className={cn(styles.item, selected === item && styles.isSelected)} key={item}
                         onClick={() => handleChange(item)}>{item}</div>
                ))}
            </div>

        </div>
    );
};