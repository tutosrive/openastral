import { lazy } from 'react';

const HomePage = lazy(() => import('../pages/home.page'));
const CategoriesPage = lazy(() => import('../pages/categories/categories.page'));
const RepositoriesByTagPage = lazy(() => import('../pages/repository/repos-by-tag.page'));
const RepositoryPage = lazy(() => import('../pages/repository/repository.page'));
const CreatorPage = lazy(() => import('../pages/about/admin.page'));
const AboutPage = lazy(() => import('../pages/about/about.page'));

const routes = [
    { id: 'route-home', endpoint: '/', component: HomePage },
    { id: 'route-categories', endpoint: '/categories', component: CategoriesPage },
    { id: 'route-repositories-by-categories', endpoint: '/categories/:name', component: RepositoriesByTagPage },
    { id: 'route-repository-id', endpoint: '/repositories/:owner/:repo', component: RepositoryPage },
    { id: 'route-about', endpoint: '/about', component: AboutPage },
    { id: 'route-admin', endpoint: '/about/admin', component: CreatorPage },
    { id: 'route-repository-search', endpoint: '/repositories/query/search', component: HomePage },
];

export default routes;
