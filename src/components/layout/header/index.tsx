import { A } from '@solidjs/router';

import styles from './Header.module.css';

export function Header() {
    return (
        <header class={styles.header}>
            <nav>
                <ul>
                    <li>
                        <strong>Brand</strong>
                    </li>
                </ul>
                <ul>
                    <li>
                        <A href="/home">Home</A>
                    </li>
                    <li>
                        <A href="/collections">Collections</A>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
