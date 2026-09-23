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

export default function RepositoriesByTagPage() {
    const params = useParams();
    const category = params.name;
    const [count, setCount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const updateTitle = useWindowTitle((state) => state.updateTitle);
    const totalPages = () => {
        console.log(count);

        return Math.ceil(count / 20);
    };
    const { data } = useQuery<Repository[]>({ queryKey: ['repos', category, currentPage], queryFn: () => repositoryService.getPaginated(currentPage, true, [category!!]), notifyOnChangeProps: ['data'], placeholderData: keepPreviousData, staleTime: Infinity });
    const init = async () => {
        updateTitle(PAGES_TITLES.byTopic(category!!));
        const resCount = await repositoryService.getDataCountByTags([category!!]);
        setCount(resCount);
    };
    useEffect(() => {
        init();
    }, []);
    return (
        <div id="home-page" className="w-dvw px-5 py-8">
            {data && data.length > 0 ? (
                <div className="w-full h-full grid grid-cols-12 gap-1">
                    {data.map((repo) => {
                        return <CumulativeRepo repository={repo} key={`repo-${repo.id}`} />;
                    })}
                    <PaginationController callback={setCurrentPage} page={currentPage} totalPages={totalPages()} />
                </div>
            ) : (
                <SkeletonRepository />
            )}
        </div>
    );
}
