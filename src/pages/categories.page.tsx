import { useEffect, useState } from 'react';
import type { Topic } from '../app/models/models';
import Loading from '../components/loading.component';
import CategoryC from '../components/repository/category.component';

const base = import.meta.env.VITE_API_URL;

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Topic[]>([]);
    const fetchCategories = async () => {
        const req = await fetch(`${base}/topics`);
        const res: Topic[] = await req.json();
        if (req.ok === true && req.status === 200 && res instanceof Array) {
            setCategories(res);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="w-full h-full flex flex-wrap items-center justify-center">
            <div className="w-full flex flex-wrap items-center justify-center">
                {categories.length > 0 ? (
                    categories.map((cat) => {
                        return <CategoryC name={cat.name} to={`/categories/${cat.name}`} key={cat.id} />;
                    })
                ) : (
                    <Loading />
                )}
            </div>
        </div>
    );
}
