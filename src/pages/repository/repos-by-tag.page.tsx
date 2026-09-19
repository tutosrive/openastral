import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import type { Repository } from '../../app/models/models';
import { useWindowTitle } from '../../app/stores/app.store';
import { PAGES_TITLES } from '../../app/utils/constants';
import repositoryService from '../../app/services/repository.service';
import CumulativeRepo from '../../components/repository/cumulative.component';
import PaginationController from '../../components/pagination.component';
import SkeletonRepository from '../../components/skeleton/repository.skeleton';

export default function RepositoriesByTagPage() {
    const params = useParams();
    const category = params.name;
    const [repos, setRepos] = useState<Repository[]>([]);
    const [count, setCount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const updateTitle = useWindowTitle((state) => state.updateTitle);
    const totalPages = () => {
        console.log(count);

        return Math.ceil(count / 20);
    };

    const init = async () => {
        updateTitle(PAGES_TITLES.home);
        const resCount = await repositoryService.getDataCountByTags([category!!]);
        setCount(resCount);
    };
    const setReposs = async (page: number) => {
        const res = await repositoryService.getPaginated(page, true, [category!!]);
        setRepos(res);
        setCurrentPage(page);
    };
    useEffect(() => {
        init();
        setReposs(currentPage);
    }, []);
    return (
        <div id="home-page" className="w-full px-5 py-8 transition-all">
            {repos.length > 0 ? (
                <div className="w-full h-full grid grid-cols-12 gap-1">
                    {repos.map((repo) => {
                        return <CumulativeRepo repository={repo} key={`repo-${repo.id}`} />;
                    })}
                    <PaginationController callback={setReposs} page={currentPage} totalPages={totalPages()} />
                </div>
            ) : (
                <SkeletonRepository />
            )}
        </div>
    );
}
