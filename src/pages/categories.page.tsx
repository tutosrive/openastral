import { useEffect, useState } from 'react';
import type { Topic } from '../app/models/models';
import Loading from '../components/loading.component';
import CategoryC from '../components/repository/category.component';
import topicService from '../app/services/topic.services';
import PaginationController from '../components/pagination.component';
import Helpers from '../app/utils/helpers.utils';
import { useWindowTitle } from '../app/stores/app.store';
import { PAGES_TITLES } from '../app/utils/constants';
import SkeletonCategories from '../components/skeleton/categories.skeleton';

export default function CategoriesPage() {
    const [hasError, setHasError] = useState<boolean>(false);
    const [categories, setCategories] = useState<Topic[]>([]);
    const [currentCategories, setCurrentCategories] = useState<Topic[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const updateTitle = useWindowTitle((state) => state.updateTitle);

    const fetchCategories = async (refetch: boolean = false) => {
        updateTitle(PAGES_TITLES.categories);
        const res = await topicService.getAll(refetch);
        if (res.length > 0) {
            setCategories((prev) => [...prev, ...res]);
            return;
        }
        setHasError(true);
    };

    const getPagination = () => {
        const { data, page } = Helpers.getArrayPagination(categories, currentPage, 20);
        setCurrentPage((prev) => {
            const newPage = page !== prev ? page : prev;
            return newPage;
        });
        setCurrentCategories(data);
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
        if (categories && categories.length > 0) {
            getPagination();
        }
    }, [categories]);

    useEffect(() => {
        if (categories && categories.length > 0) {
            getPagination();
        }
    }, [currentPage]);

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="w-full h-full flex flex-wrap items-center justify-center">
            <div className="w-full flex flex-wrap items-center justify-center">
                {hasError === false ? (
                    currentCategories.length > 0 ? (
                        <div className="w-full h-full">
                            <div className="mb-3">
                                {categories.map((cat) => {
                                    const rd = Math.random() * 19882 * 3 - 2;
                                    return <CategoryC name={cat.name} to={`/categories/${cat.name}`} key={`${cat.id}-${cat.name}-${rd}`} />;
                                })}
                            </div>
                            <div className="w-full flex justify-center">
                                <PaginationController next={() => paginationNext()} previous={() => paginationPrevious()} page={currentPage} />
                            </div>
                        </div>
                    ) : (
                        <SkeletonCategories />
                    )
                ) : (
                    <p>Has happend something loading categories data, trye again</p>
                )}
            </div>
        </div>
    );
}
