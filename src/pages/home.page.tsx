import RepositoryC from '../components/repository/repository.component';
import ThemeChanger from '../components/theme-changer.component';

export default function HomePage() {
    return (
        <div id="home-page">
            <ThemeChanger />
            <RepositoryC />
        </div>
    );
}
