import { Link } from 'react-router';
import ThemeChanger from './theme-changer.component';
import { useTheme } from '../app/stores/app.store';

export default function Header() {
    const values = { home: 'Home', about: { first: 'About', second: 'Page', third: 'Creator', fourthy: 'Search' }, category: 'Categories' };
    const theme = useTheme((state) => state.name);
    return (
        <div className="flex items-center justify-center max-lg:collapse bg-base-200 lg:mb-4 shadow-sm w-full row-span-1 rounded-none z-50 py-9">
            <input id="navbar-1-toggle" className="peer hidden" type="checkbox" />
            <label htmlFor="navbar-1-toggle" className="fixed inset-0 hidden max-lg:peer-checked:block"></label>
            <div className="collapse-title navbar m-0 flex lg:w-full md:w-full w-screen">
                <div className="navbar-start">
                    <label htmlFor="navbar-1-toggle" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>
                    <Link to={'/'} className="px-12 text-4xl britney-ft">
                        Open Astral
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <Link to={'/'}>
                                <i className="fa-solid fa-house"></i>
                                {values.home}
                            </Link>
                        </li>
                        <li>
                            <Link to={'/categories'}>
                                <i className="fa-solid fa-layer-group"></i>
                                {values.category}
                            </Link>
                        </li>
                        <li>
                            <details>
                                <summary>
                                    <i className="fa-solid fa-circle-info"></i>
                                    {values.about.first}
                                </summary>
                                <ul className="p-2 bg-base-100 w-40 z-1">
                                    <li>
                                        <Link to={'/about'}>
                                            <i className="fa-solid fa-star inline"></i> {values.about.second}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/about/admin'}>
                                            <i className="fa-solid fa-circle-user"></i>
                                            {values.about.third}
                                        </Link>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <label className="input lg:flex md:flex hidden">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input type="search" required placeholder="Search" className="input w-64 lg:w-auto" />
                    </label>
                    <ThemeChanger themeName={theme} />
                </div>
            </div>

            <div className="collapse-content lg:hidden fixed left-0 top-18 rounded-2xl">
                <ul className="menu bg-base-200 rounded-b-2xl">
                    <li>
                        <Link to={'/'}>
                            <i className="fa-solid fa-house"></i> {values.home}
                        </Link>
                    </li>
                    <li>
                        <button>
                            <i className="fa-solid fa-circle-info"></i>
                            {values.about.first}
                        </button>
                        <ul>
                            <li>
                                <Link to={'/about'}>
                                    <i className="fa-solid fa-star"></i>
                                    {values.about.second}
                                </Link>
                            </li>
                            <li>
                                <Link to={'/about/admin'}>
                                    <i className="fa-solid fa-circle-user"></i>
                                    {values.about.third}
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to={'/search'}>{values.about.fourthy}</Link>
                    </li>

                    <li>
                        <Link to={'/categories'}>
                            <i className="fa-solid fa-layer-group"></i>
                            {values.category}
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
