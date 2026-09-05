import { useEffect, useState } from 'react';
import { RepositoryParcialView } from '../components/repository/repository.component';
import type { Repository } from '../app/models/models';
import Loading from '../components/loading.component';
import CategoryC from '../components/repository/category.component';
import repositoryService from '../app/services/repository.service';
import PaginationController from '../components/pagination.component';
import Helpers from '../app/utils/helpers.utils';
import { useWindowTitle } from '../app/stores/app.store';
import { PAGES_TITLES } from '../app/utils/constants';

export default function HomePage() {
    const [repos, setRepos] = useState<Repository[]>([]);
    const [currentRepos, setCurrentRepos] = useState<Repository[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const winTitle = useWindowTitle();

    const setReposs = async (refetch: boolean = false) => {
        winTitle.updateTitle(PAGES_TITLES.home);
        const res = await repositoryService.getAll(refetch);
        setRepos((prev) => [...prev, ...res]);
    };
    const getPagination = () => {
        const { data, page } = Helpers.getArrayPagination(repos, currentPage, 20);
        setCurrentPage((prev) => {
            const newPage = page !== prev ? page : prev;
            return newPage;
        });
        setCurrentRepos(data);
    };
    const paginationPrevious = () => {
        console.log('Previous');
        setCurrentPage((prev) => prev - 1);
    };
    const paginationNext = () => {
        console.log('Next');
        setCurrentPage((prev) => prev + 1);
    };

    useEffect(() => {
        if (repos && repos.length > 0) {
            getPagination();
        }
    }, [repos]);

    useEffect(() => {
        if (repos && repos.length > 0) {
            getPagination();
        }
    }, [currentPage]);

    useEffect(() => {
        setReposs();
    }, []);

    return (
        <div id="home-page" className="w-full">
            {currentRepos.length > 0 ? (
                <div className="w-full h-full grid grid-cols-12 gap-1">
                    {currentRepos.map((repo) => {
                        const uuid = crypto.randomUUID();
                        let elementTags = [
                            <span key={uuid} className="italic text-neutral">
                                Not categories
                            </span>,
                        ];
                        if (repo.topics && repo.topics.length > 0) {
                            elementTags = repo.topics.map((cat) => {
                                return <CategoryC to={`/categories/${cat.name}`} key={`tag-${cat.id}`} name={cat.name} />;
                            });
                        }
                        return <RepositoryParcialView key={`repo-${repo.id}-${uuid}`} repository={repo} topics={elementTags} classess="lg:col-span-6 md:col-span-6 col-span-12" />;
                    })}
                    <div className=" col-span-12 w-full flex items-center justify-center bottom-14 ">
                        <PaginationController next={() => paginationNext()} previous={() => paginationPrevious()} page={currentPage} />
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
}
