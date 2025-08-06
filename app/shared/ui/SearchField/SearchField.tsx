import { memo, useState } from 'react';
import classNames from 'classnames';
import MagnifyingGlass from '~/shared/icons/MagnifyingGlass';
import CrossIcon from '~/shared/icons/CrossIcon';
import styles from './SearchField.module.scss';

type Props = {
    className?: string;
    name: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
};

function SearchField({ className, name, placeholder, value, onChange }: Props) {
    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        onChange(event.target.value);
    }

    function handleClearClick() {
        onChange('');
    }

    return (
        <div className={classNames(styles['field'], className)}>
            <MagnifyingGlass className={styles['field__icon']} />
            <input
                className={styles['field__input']}
                name={name}
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={handleInputChange}
            />
            <button
                className={classNames(styles['field__clear'], {
                    [styles['field__clear_active']]: value.length !== 0,
                })}
                type="button"
                onClick={handleClearClick}
            >
                <CrossIcon className={styles['field__clear-icon']} />
            </button>
        </div>
    );
}

export default memo(SearchField);
