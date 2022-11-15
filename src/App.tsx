import type { Component } from 'solid-js';


import styles from './App.module.css';
import { Header } from './components/layout/header';
import { HomePage } from './pages/Home';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <Header />

      <HomePage />
    </div>
  );
};

export default App;
