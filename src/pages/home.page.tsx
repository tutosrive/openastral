import { useEffect, useState } from 'react';
import { RepositoryParcialView } from '../components/repository/repository.component';
import type { Repository } from '../app/models/models';
import CategoryC from '../components/repository/category.component';
import repositoryService from '../app/services/repository.service';
import { useWindowTitle } from '../app/stores/app.store';
import { PAGES_TITLES } from '../app/utils/constants';
import SkeletonRepository from '../components/skeleton/repository.skeleton';
import ResponsivePaginationComponent from 'react-responsive-pagination';

export default function HomePage() {
    const [repos, setRepos] = useState<Repository[]>([]);
    const [count, setCount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
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
        init();
        setReposs(currentPage);
    }, []);

    return (
        <div id="home-page" className="w-full px-5 py-8 transition-all">
            {repos.length > 0 ? (
                <div className="w-full h-full grid grid-cols-12 gap-1 transition-all">
                    {repos.map((repo) => {
                        let elementTags = [
                            <span key={`${repo.id}-tag-not-categories`} className="italic badge-info m-1 badge-lg badge badge-soft w-auto text-nowrap">
                                Not categories
                            </span>,
                        ];
                        if (repo.topics && repo.topics.length > 0) {
                            elementTags = repo.topics.map((cat) => {
                                return <CategoryC to={`/categories/${cat.name}`} key={`tag-${cat.id}`} name={cat.name} />;
                            });
                        }
                        return <RepositoryParcialView key={`repo-${repo.id}`} repository={repo} topics={elementTags} classess="lg:col-span-6 md:col-span-6 col-span-12" />;
                    })}
                    <div className=" col-span-12 w-full flex items-center justify-center bottom-14 ">
                        <ResponsivePaginationComponent
                            current={currentPage}
                            onPageChange={(n) => setReposs(n)}
                            total={totalPages}
                            containerClassName="flex justify-center gap-1"
                            pageItemClassName="inline-flex items-center rounded-md border text-sm"
                            activeItemClassName="border-blue-800 bg-blue-800 text-white shadow-sm"
                            inactiveItemClassName="border-slate-600 text-slate-400 shadow-sm hover:bg-blue-800 hover:text-white hover:shadow-lg"
                            disabledItemClassName="pointer-events-none border-slate-600 text-slate-400 opacity-50"
                            pageLinkClassName="px-3 py-2"
                        />
                    </div>
                </div>
            ) : (
                <SkeletonRepository />
            )}
        </div>
    );
}
