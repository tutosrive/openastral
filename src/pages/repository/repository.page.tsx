import { useParams } from 'react-router';
import { RepositoryFullView } from '../../components/repository/repository.component';
import { useEffect, useState } from 'react';
import repositoryService from '../../app/services/repository.service';
import Loading from '../../components/loading.component';
import type { Repository } from '../../app/models/models';
import CategoryC from '../../components/repository/category.component';

export default function RepositoryPage() {
    const [repository, setRepository] = useState<Repository>();
    const [tags, setTags] = useState<React.JSX.Element[]>([]);
    const [readme, setReadme] = useState<string>('');
    const params = useParams();
    const repositoryOwner: string = params.owner!!;
    const repositoryName: string = params.repo!!;
    const getReadme = async () => {
        if (repository) {
            const req = await fetch(`${repository.readme_url}`, { redirect: 'follow' });
            const res = await req.text();
            if (res.length > 0) {
                setReadme(res);
            }
        }
    };

    const getRepository = async () => {
        const repo = await repositoryService.getByOwnerAndName(repositoryOwner, repositoryName);

        if (repo) {
            setRepository(repo);
        }
    };
    const makeTags = () => {
        if (repository) {
            let elementTags = [
                <span key={`${repository.id}-tag-not-categories`} className="italic text-neutral">
                    Not categories
                </span>,
            ];
            if (repository.topics && repository.topics.length > 0) {
                elementTags = repository.topics.map((cat) => {
                    return <CategoryC to={`/categories/${cat.name}`} key={`tag-${cat.id}`} name={cat.name} />;
                });
            }
            setTags(elementTags);
        }
    };
    useEffect(() => {
        makeTags();
        getReadme();
    }, [repository]);
    useEffect(() => {
        getRepository();
    }, []);

    return <div className="w-full h-full mt-4 min-w-[355px]">{repository ? <RepositoryFullView repository={repository} topics={tags} readme={readme} /> : <Loading />}</div>;
}
