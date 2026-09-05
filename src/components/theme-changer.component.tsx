import { useEffect, type FC } from 'react';
import { useTheme } from '../app/stores/app.store';
import Helpers from '../app/utils/helpers.utils';

interface ThemeChangerProps {
    themeName: string;
}

const ThemeChanger: FC<ThemeChangerProps> = ({ themeName }) => {
    const theme = useTheme();
    const handleUpdateTheme = (e: React.ChangeEvent<HTMLUListElement, Element>) => {
        const value: string | undefined = e.target.dataset.setTheme;
        let themeStr = value && value != 'true' ? value : 'default';
        // theme = theme.charAt(0).toUpperCase() + theme.substring(1, theme.length);
        theme.update(themeStr);
    };

    useEffect(() => {
        theme.update(themeName);
    }, []);

    return (
        <div className="dropdown">
            <div tabIndex={0} role="button" className="w-32 btn bg-transparent border-0 outline-0 shadow-none m-1">
                {Helpers.capitalizeString(theme.name)}
                <svg width="12px" height="12px" className="inline-block h-2 w-2 fill-current opacity-60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
                    <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                </svg>
            </div>
            <ul tabIndex={-1} className="translate-x-[-30px] dropdown-content bg-base-300 rounded-box z-1 w-30 p-2 shadow-2xl" onChange={handleUpdateTheme}>
                <li>
                    <input type="radio" data-set-theme name="theme-dropdown" className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start" aria-label="Default" value="default" />
                </li>
                <li>
                    <input type="radio" data-set-theme="halloween" name="theme-dropdown" className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start" aria-label="Halloween" value="halloween" />
                </li>
                <li>
                    <input type="radio" data-set-theme="luxury" name="theme-dropdown" className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start" aria-label="Luxury" value="luxury" />
                </li>
                <li>
                    <input type="radio" data-set-theme="synthwave" name="theme-dropdown" className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start" aria-label="Synthwave" value="synthwave" />
                </li>
                <li>
                    <input type="radio" data-set-theme="abyss" name="theme-dropdown" className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start" aria-label="Abyss" value="abyss" />
                </li>
            </ul>
        </div>
    );
};

export default ThemeChanger;
