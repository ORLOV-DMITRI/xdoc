import styles from './Select.module.scss'
import {useState} from "react";
import cn from "classnames";
import ArrowIcon from '/public/svg/chevron.svg'
import {SectionType} from "@/types/types";

type SelectType = {
    options: SectionType[]
    value: string
    onChange: (selectLang: string) => void
    onSavedNew?: () => void
}


export default function Select({options, value, onChange, onSavedNew}: SelectType) {
    const [selected, setSelected] = useState<string>(value ? value : options[0]?.name)
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
                {options.length > 0 && options?.map(item => (
                    <div className={cn(styles.item, selected === item.name && styles.isSelected)} key={item.id}
                         onClick={() => handleChange(item.name)}>{item.name}</div>
                ))}
                {onSavedNew && (
                    <div className={cn(styles.item)} onClick={onSavedNew}>Создать</div>
                )}
            </div>

        </div>
    );
};
