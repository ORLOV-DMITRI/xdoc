import styles from './CustomSelect.module.scss'
import {useState} from "react";
import Select, {ActionMeta, SingleValue, StylesConfig} from 'react-select';

export type OptionType = {
    value: string,
    label: string
}

type SelectType = {
    options: string[]
    value: string
    onChange: (selectLang: string | null) => void
}

export default function CustomSelect({options, value, onChange}: SelectType) {

    const [selectedOption, setSelectedOption] = useState<string | null>(value && null);

    const handleChange = (
        newValue: SingleValue<string>,
        actionMeta: ActionMeta<string>
    ) => {
        setSelectedOption(newValue);
        onChange(selectedOption)
    };
    const customStyles: StylesConfig<OptionType, false> = {
        singleValue: (provided, state) => ({
            ...provided,
            color: 'white', // Цвет текста для выбранного значения
        }),
        control: (provided, state) => ({
            ...provided,
            backgroundColor: 'rgb(2, 8, 23)',
            borderColor: 'rgb(0 97 255 / 40%)',
            hoverBorderColor: 'rgb(0 97 255 / 40%)',
            fontSize: '16px',
            height: '40px',
            minHeight: '40px',
            cursor: 'pointer',
            color: 'white',
        }),
        option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? 'white' : 'rgb(248, 250, 252)',
            backgroundColor: state.isFocused ? 'rgba(30, 41, 59, 0.8)' : state.isSelected ? 'rgb(30, 41, 59)' : 'rgb(2, 8, 23)',
            padding: 10,
            cursor: 'pointer',
        }),
        menu: (provided) => ({
            ...provided,
            borderColor: 'white',
            backgroundColor: 'rgb(2, 8, 23)'
        }),

        // Добавьте другие части, которые хотите кастомизировать
    };
    return (
        <div>
            <Select
                instanceId="unique-select-id"
                defaultValue={selectedOption}
                onChange={handleChange}
                options={options}
                styles={customStyles}
                placeholder={'Выберете язык'}
            />
        </div>);
};