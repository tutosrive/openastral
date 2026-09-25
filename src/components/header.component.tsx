import { Link } from 'react-router';
import ThemeChanger from './theme-changer.component';
import { useTheme } from '../app/stores/app.store';
import Helpers from '../app/utils/helpers.utils';
import { useState } from 'react';

export default function Header() {
    const [inputValue, setInputValue] = useState<string>('');
    const closeDropDown = () => {
        const element = document.activeElement;
        if (element && element instanceof HTMLElement) element.blur();
    };
    const navigateToSearch = () => {
        (document.querySelector('#search-icon-header') as HTMLElement)?.click();
    };
    const handleInputSearch = (e: any) => {
        const input = e.target;
        if (input) {
            let value = (input.value as string) ?? '';
            setInputValue(value);
        }
    };
    const handleEnterOnSearch = (e: any) => {
        if (e.key === 'Enter') {
            navigateToSearch();
        }
    };
    const values = { home: 'Home', about: { first: 'About', second: 'Page', third: 'Creator', fourthy: 'Search' }, category: 'Categories' };
    const theme = useTheme((state) => state.name);
    return (
        <div className="flex items-center justify-center max-lg:collapse bg-base-200 lg:mb-4 shadow-sm w-dvw row-span-1 rounded-none z-50 py-9">
            <input id="navbar-1-toggle" className="peer hidden" type="checkbox" />
            <label htmlFor="navbar-1-toggle" className="fixed inset-0 hidden max-lg:peer-checked:block"></label>
            <div className="collapse-title navbar m-0 flex w-full ">
                <div className="navbar-start">
                    <label htmlFor="navbar-1-toggle" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>
                    <Link to={'/'} className="lg:px-12 text-nowrap lg:text-4xl md:text-4xl sm:text-3xl text-xl britney-ft flex justify-center items-center">
                        <img src="/favicon.svg" alt="Open Astral Logo SVG" className="lg:w-12 md:w-10 sm:w-8 w-7" loading="lazy" />
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
                            <div className="dropdown dropdown-center">
                                <div tabIndex={0} id="button-toggle-dropdown-about" role="button" className="rounded-field">
                                    {values.about.first}
                                </div>
                                <ul tabIndex={-1} className="menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-52 p-2 shadow-sm">
                                    <li>
                                        <Link to={'/about'} onClick={closeDropDown}>
                                            <i className="fa-solid fa-star inline"></i> {values.about.second}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/about/admin'} onClick={closeDropDown}>
                                            <i className="fa-solid fa-circle-user"></i>
                                            {values.about.third}
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <label className="input in-focus-within:outline-none lg:grid sm:grid md:grid grid-cols-12 gap-0 p-0 m-0 hidden">
                        <input type="search" onInput={handleInputSearch} onKeyDown={handleEnterOnSearch} required placeholder="VS Code Ide" className="input col-span-10" />
                        <Link id="search-icon-header" to={{ pathname: '/search', search: `?text=${inputValue}` }} className="btn btn-neutral btn-ghost col-span-2 h-full w-full">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </Link>
                    </label>
                    <ThemeChanger themeName={theme} />
                    <a href={Helpers.goToCustom('https://github.com/tutosrive/openastral')}>
                        <i className="fa-brands fa-github"></i>
                    </a>
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
