import { useEffect, useState } from 'react';
import type { Topic } from '../app/models/models';
import CategoryC from '../components/repository/category.component';
import topicService from '../app/services/topic.services';
import { useWindowTitle } from '../app/stores/app.store';
import { PAGES_TITLES } from '../app/utils/constants';
import SkeletonCategory from '../components/skeleton/categories.skeleton';
import ResponsivePaginationComponent from 'react-responsive-pagination';

export default function CategoriesPage() {
    const [hasError, setHasError] = useState<boolean>(false);
    const [categories, setCategories] = useState<Topic[]>([]);
    const [count, setCount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const updateTitle = useWindowTitle((state) => state.updateTitle);
    const totalPages = Math.ceil(count / 80);

    const init = async () => {
        updateTitle(PAGES_TITLES.categories);
        const resCount = await topicService.getDataCount();
        setCount(resCount);
    };
    const fetchCategories = async (page: number) => {
        const res = await topicService.getPaginated(page);
        if (res.length > 0) {
            setCategories(res);
            setCurrentPage(page);
            return;
        }
        setHasError(true);
    };
    useEffect(() => {
        init();
        fetchCategories(currentPage);
    }, []);

    return (
        <div className="w-full h-full flex flex-wrap items-center justify-center">
            <div className="w-full flex flex-wrap items-center justify-center">
                {hasError === false ? (
                    categories.length > 0 ? (
                        <div className="w-full h-full">
                            <div className="mb-3">
                                {categories.map((cat) => {
                                    return <CategoryC name={cat.name} to={`/categories/${cat.name}`} key={cat.id} />;
                                })}
                            </div>
                            <div className="w-full flex justify-center">
                                <ResponsivePaginationComponent
                                    current={currentPage}
                                    onPageChange={(n) => fetchCategories(n)}
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
                        <SkeletonCategory />
                    )
                ) : (
                    <p>Has happend something loading categories data, trye again</p>
                )}
            </div>
        </div>
    );
}
