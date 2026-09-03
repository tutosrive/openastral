import { useEffect, useState } from 'react';
import { RepositoryParcialView } from '../components/repository/repository.component';
import type { Repository, Topic } from '../app/models/models';
import Loading from '../components/loading.component';
import CategoryC from '../components/repository/category.component';
import repositoryService from '../app/services/repository.service';

const base = import.meta.env.VITE_API_URL;

export default function HomePage() {
    const [repos, setRepos] = useState<Repository[]>([]);
    const setReposs = async (refetch: boolean = false) => {
        const res = await repositoryService.getAll(refetch);
        setRepos((prev) => [...prev, ...res]);
    };

    useEffect(() => {
        setReposs();
    }, []);

    return (
        <div id="home-page" className="w-full">
            {repos.length > 0 ? (
                <div className="w-full h-full grid grid-cols-12 gap-1">
                    {repos.map((repo) => {
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
                    <button className="btn btn-primary" onClick={() => setReposs(true)}>
                        {' '}
                        Load More <i className="fa-solid fa-plus"></i>
                    </button>
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
}
