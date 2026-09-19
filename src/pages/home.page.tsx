import { useEffect, useState } from 'react';
import type { Repository } from '../app/models/models';
import repositoryService from '../app/services/repository.service';
import { useWindowTitle } from '../app/stores/app.store';
import { PAGES_TITLES } from '../app/utils/constants';
import SkeletonRepository from '../components/skeleton/repository.skeleton';
import PaginationController from '../components/pagination.component';
import CumulativeRepo from '../components/repository/cumulative.component';

export default function HomePage() {
    const [repos, setRepos] = useState<Repository[]>([]);
    const [count, setCount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(() => {
        const session = sessionStorage.getItem('currentpage');
        return session ? parseInt(session) : 1;
    });
    const updateTitle = useWindowTitle((state) => state.updateTitle);
    const totalPages = Math.ceil(count / 20);

    const init = async () => {
        updateTitle(PAGES_TITLES.home);
        const resCount = await repositoryService.getDataCount();
        setCount(resCount);
    };
    const setReposs = async (page: number) => {
        const res = await repositoryService.getPaginated(page);
        setRepos(res);
        setCurrentPage(page);
    };
    useEffect(() => {
        sessionStorage.setItem('currentpage', `${currentPage}`);
    }, [currentPage]);
    useEffect(() => {
        init();
        setReposs(currentPage);
    }, []);

    return (
        <div id="home-page" className="w-full px-5 py-8 transition-all">
            {repos.length > 0 ? (
                <div className="w-full h-full grid grid-cols-12 gap-1">
                    {repos.map((repo) => {
                        return <CumulativeRepo key={`repo-${repo.id}`} repository={repo} />;
                    })}
                    <PaginationController callback={setReposs} page={currentPage} totalPages={totalPages} />
                </div>
            ) : (
                <SkeletonRepository />
            )}
        </div>
    );
}
