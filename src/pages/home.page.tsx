import { useEffect, useState } from 'react';
import type { Repository } from '../app/models/models';
import repositoryService from '../app/services/repository.service';
import { useWindowTitle } from '../app/stores/app.store';
import { PAGES_TITLES } from '../app/utils/constants';
import SkeletonRepository from '../components/skeleton/repository.skeleton';
import PaginationController from '../components/pagination.component';
import CumulativeRepo from '../components/repository/cumulative.component';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useSearch } from '../app/stores/search.store';

export default function HomePage() {
    const [count, setCount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(() => {
        const session = sessionStorage.getItem('currentpage');
        return session ? parseInt(session) : 1;
    });
    const updateTitle = useWindowTitle((state) => state.updateTitle);
    const updateTypeSearch = useSearch((state) => state.updateType);
    const { data } = useQuery<Repository[]>({ queryKey: ['repos', currentPage], queryFn: () => repositoryService.getPaginated(currentPage), notifyOnChangeProps: ['data'], placeholderData: keepPreviousData, staleTime: Infinity });
    const totalPages = Math.ceil(count / 20);
    const init = async () => {
        updateTypeSearch('mix');
        updateTitle(PAGES_TITLES.home);
        const resCount = await repositoryService.getDataCount();
        setCount(resCount);
    };
    useEffect(() => {
        sessionStorage.setItem('currentpage', `${currentPage}`);
    }, [currentPage]);
    useEffect(() => {
        init();
    }, []);

    return (
        <div id="home-page" className="w-dvw lg:px-5 md:px-5 sm:px-4 lg:pt-8 lg:pb-8 md:pt-8 md:pb-8 sm:pt-8 sm:pb-8 px-3 pt-16 pb-8">
            {data && data.length > 0 ? (
                <div className="w-full h-full grid grid-cols-12 gap-1">
                    {data.map((repo) => {
                        return <CumulativeRepo key={`repo-${repo.id}`} repository={repo} />;
                    })}
                    <PaginationController callback={setCurrentPage} page={currentPage} totalPages={totalPages} />
                </div>
            ) : (
                <SkeletonRepository />
            )}
        </div>
    );
}
