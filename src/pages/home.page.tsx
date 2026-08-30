import { useState } from 'react';
import RepositoryC from '../components/repository/repository.component';
import type { Repository } from '../app/models';
import Loading from '../components/loading.component';

export default function HomePage() {
    const [repos, setrepos] = useState<Repository[]>();

    return (
        <div id="home-page" className="w-full h-full">
            {repos ? <RepositoryC /> : <Loading />}
        </div>
    );
}
