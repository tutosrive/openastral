import { lazy } from 'react';

const HomePage = lazy(() => import('../pages/home.page'));
const CategoriesPage = lazy(() => import('../pages/categories.page'));
const RepositoryPage = lazy(() => import('../pages/repository/repository.page'));
const CreatorPage = lazy(() => import('../pages/about/admin.page'));

const routes = [
    { id: 'route-home', endpoint: '/', component: HomePage },
    { id: 'route-categories', endpoint: '/categories', component: CategoriesPage },
    { id: 'route-categories', endpoint: '/categories/:id', component: CategoriesPage },
    { id: 'route-repository-id', endpoint: '/repositories/:id', component: RepositoryPage },
    { id: 'route-about', endpoint: '/about', component: CategoriesPage },
    { id: 'route-admin', endpoint: '/about/admin', component: CreatorPage },
    { id: 'route-repository-search', endpoint: '/repositories/query/search', component: HomePage },
];

export default routes;
