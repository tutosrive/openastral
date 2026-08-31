import { lazy } from 'react';

const HomePage = lazy(() => import('../pages/home.page'));
const CategoriesPage = lazy(() => import('../pages/categories.page'));
const RepositoryPage = lazy(() => import('../pages/repository/repository.page'));
const CreatorPage = lazy(() => import('../pages/about/admin.page'));

const routes = [
    { endpoint: '/', title: 'Tutos Rive Stargazers | Stargazers | Awesome Github Repositories | Github Stargazers', component: HomePage },
    { endpoint: '/categories', title: 'Stargazers Categories | Repositories Topics', component: CategoriesPage },
    { endpoint: '/repositories/:id', title: 'Favorite Repository | Github Repository', component: RepositoryPage },
    { endpoint: '/about', title: 'About Astral Supa | Astral Supa Information', component: CategoriesPage },
    { endpoint: '/about/admin', title: 'Admin Astral Supa | Github Admin | About Admin Astral Supa', component: CreatorPage },
];

export default routes;
