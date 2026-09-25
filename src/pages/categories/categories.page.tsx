import { useEffect, useState } from 'react';
import type { Topic } from '../../app/models/models';
import CategoryC from '../../components/repository/category.component';
import topicService from '../../app/services/topic.services';
import { useWindowTitle } from '../../app/stores/app.store';
import { PAGES_TITLES } from '../../app/utils/constants';
import SkeletonCategory from '../../components/skeleton/categories.skeleton';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useSearch } from '../../app/stores/search.store';
import PaginationController from '../../components/pagination.component';

export default function CategoriesPage() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [count, setCount] = useState<number>(0);
    const updateTitle = useWindowTitle((state) => state.updateTitle);
    const totalPages = Math.ceil(count / 80);
    const updateTypeSearch = useSearch((state) => state.updateType);
    const { data } = useQuery<Topic[]>({ queryKey: ['categories', currentPage], queryFn: () => topicService.getPaginated(currentPage), notifyOnChangeProps: ['data'], placeholderData: keepPreviousData, staleTime: Infinity });

    const init = async () => {
        updateTypeSearch('category');
        updateTitle(PAGES_TITLES.categories);
        const resCount = await topicService.getDataCount();
        setCount(resCount);
    };
    useEffect(() => {
        init();
    }, []);

    return (
        <div className="w-full h-full flex flex-wrap items-center justify-center">
            <div className="w-full flex flex-wrap items-center justify-center">
                {data && data.length > 0 ? (
                    <div className="w-full h-full">
                        <div className="mb-3">
                            {data.map((cat) => {
                                return <CategoryC name={cat.name} to={`/categories/${cat.name}`} key={cat.id} />;
                            })}
                        </div>
                        <div className="w-full flex justify-center">
                            <PaginationController callback={setCurrentPage} page={currentPage} totalPages={totalPages} />
                        </div>
                    </div>
                ) : (
                    <SkeletonCategory />
                )}
            </div>
        </div>
    );
}
