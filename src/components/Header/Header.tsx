import React from 'react';
import HeaderStyles from './Header.module.css'

export function Header() {
    return (
        <header className={HeaderStyles.main}>
            <div className={HeaderStyles.title}>
                Best Todo List ever
            </div>
        </header>
    )
}