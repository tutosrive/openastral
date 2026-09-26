import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import type { Repository } from '../../app/models/models';
import { useWindowTitle } from '../../app/stores/app.store';
import { PAGES_TITLES } from '../../app/utils/constants';
import repositoryService from '../../app/services/repository.service';
import CumulativeRepo from '../../components/repository/cumulative.component';
import PaginationController from '../../components/pagination.component';
import SkeletonRepository from '../../components/skeleton/repository.skeleton';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useSearch } from '../../app/stores/search.store';

export default function RepositoriesByTagPage() {
    const params = useParams();
    const category = params.name;
    const [count, setCount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const updateTitle = useWindowTitle((state) => state.updateTitle);
    const updateTypeSearch = useSearch((state) => state.updateType);
    const { data } = useQuery<Repository[]>({ queryKey: ['repos', category, currentPage], queryFn: () => repositoryService.getPaginated(currentPage, true, [category!!]), notifyOnChangeProps: ['data'], placeholderData: keepPreviousData, staleTime: Infinity });
    const totalPages = Math.ceil(count / 20);
    const init = async () => {
        updateTypeSearch('mix');
        updateTitle(PAGES_TITLES.byTopic(category!!));
        const resCount = await repositoryService.getDataCountByTags([category!!]);
        setCount(resCount);
    };
    useEffect(() => {
        init();
    }, []);
    return (
        <div id="home-page" className="w-dvw lg:pt-1 lg:pb-8 md:pt-1 md:pb-8 sm:pt-1 sm:pb-8 px-5 pt-16 pb-8">
            {data && data.length > 0 ? (
                <div className="w-full h-full grid grid-cols-12 gap-1">
                    {data.map((repo) => {
                        return <CumulativeRepo repository={repo} key={`repo-${repo.id}`} />;
                    })}
                    <PaginationController callback={setCurrentPage} page={currentPage} totalPages={totalPages} />
                </div>
            ) : (
                <SkeletonRepository />
            )}
        </div>
    );
}
