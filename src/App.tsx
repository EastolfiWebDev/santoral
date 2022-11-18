import type { Component } from 'solid-js';
import { useRoutes, RouteDefinition, Navigate } from '@solidjs/router';

import { HomePage } from './pages/Home';
import { ItemPage } from './pages/Item';
import { CollectionsPage } from './pages/Collections';
import { Header } from './components/layout/header';

const routes: RouteDefinition[] = [
    {
        path: '/',
        component: () => <Navigate href='/home' />
    },
    {
        path: '/home',
        component: HomePage
    },
    {
        path: '/item',
        component: ItemPage,
        children: [
            {
                path: '/add',
                component: ItemPage
            }
        ]
    },
    {
        path: '/collections',
        component: CollectionsPage
    }
]

const App: Component = () => {
    const Routes = useRoutes(routes);

    return (
        <div class='container'>
            <Header />

            <Routes />
        </div>
    );
};

export default App;
