import { useEffect, useState } from 'react';
import type { Topic } from '../app/models';
import Loading from '../components/loading.component';
import Helpers from '../app/utils/helpers.utils';
import { Link } from 'react-router';

const base = import.meta.env.VITE_API_URL;

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Topic[]>([]);
    const fetchCategories = async () => {
        const req = await fetch(`${base}/topics`);
        const res: Topic[] = await req.json();

        const tmt = setTimeout(() => {
            if (req.ok === true && req.status === 200 && res instanceof Array) {
                setCategories(res);
            }
            clearTimeout(tmt);
        }, 1000);
    };

    useEffect(() => {
        fetchCategories();
    }, []);
    return (
        <div className="w-full h-full flex flex-wrap items-center justify-center">
            <div className="w-full flex flex-wrap items-center justify-center">
                {categories.length > 0 ? (
                    categories.map((cat) => {
                        const badgeStyle: string = Helpers.getRandomBadgeStyle();
                        return (
                            <Link to={`/categories/${cat.name}`} key={cat.id} className={`m-1 badge-lg badge badge-soft ${badgeStyle}`}>
                                {cat.name}
                            </Link>
                        );
                    })
                ) : (
                    <Loading />
                )}
            </div>
        </div>
    );
}
