import logo from "../../../assets/logo.svg";
import styles from "./Header.module.css";

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
                        <a href="#">Link</a>
                    </li>
                    <li>
                        <a href="#">Link</a>
                    </li>
                    <li>
                        <a href="#" role="button">
                            Button
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
