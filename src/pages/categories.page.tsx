import { useEffect, useState } from 'react';
import type { Topic } from '../app/models';
import Loading from '../components/loading.component';

const base = import.meta.env.VITE_API_URL;

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Topic[]>();
    const fetchCategories = async () => {
        const req = await fetch(`${base}/topics`);
        const res: Topic[] = await req.json();
        const tmt = setTimeout(() => {
            if (req.ok === true && req.status === 200 && res instanceof Array) {
                setCategories(res);
            }
            clearTimeout(tmt);
        }, 3000);
    };

    useEffect(() => {
        fetchCategories();
    }, []);
    return (
        <div className="w-full h-full">
            <div className="badge badge-info"></div>
            {categories ? (
                categories.map((cat) => {
                    const typeB = ['primary', 'secondary', 'accent', 'neutral', 'info', 'success', 'warning', 'error'];
                    const str = typeB[Math.floor(Math.random() * typeB.length)];
                    return (
                        <div key={cat.id} className={`badge badge-${str}`}>
                            {cat.name}
                        </div>
                    );
                })
            ) : (
                <Loading />
            )}
        </div>
    );
}
