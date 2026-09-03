import { useEffect, useState } from 'react';
import type { Topic } from '../app/models/models';
import Loading from '../components/loading.component';
import CategoryC from '../components/repository/category.component';
import topicService from '../app/services/topic.services';

export default function CategoriesPage() {
    const [hasError, setHasError] = useState<boolean>(false);
    const [categories, setCategories] = useState<Topic[]>([]);
    const fetchCategories = async (refetch: boolean = false) => {
        const res = await topicService.getAll(refetch);
        if (res.length > 0) {
            setCategories((prev) => [...prev, ...res]);
            return;
        }
        setHasError(true);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="w-full h-full flex flex-wrap items-center justify-center">
            <div className="w-full flex flex-wrap items-center justify-center">
                {hasError === false ? (
                    categories.length > 0 ? (
                        <div className="mb-3">
                            {categories.map((cat) => {
                                const rd = Math.random() * 19882 * 3 - 2;
                                return <CategoryC name={cat.name} to={`/categories/${cat.name}`} key={`${cat.id}-${cat.name}-${rd}`} />;
                            })}
                            <button onClick={() => fetchCategories(true)} className="btn btn-primary">
                                Load More <i className="fa-solid fa-plus"></i>
                            </button>
                        </div>
                    ) : (
                        <Loading />
                    )
                ) : (
                    <p>Has happend something loading categories data, trye again</p>
                )}
            </div>
        </div>
    );
}
