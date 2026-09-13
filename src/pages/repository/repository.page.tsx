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
    const params = useParams();
    const repositoryId: string = params.id!!;

    const getRepository = async () => {
        async () => {
            await repositoryService.getById(repositoryId);
        };
        if (repository) {
            setRepository((prev) => prev);
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
    }, [repository]);
    useEffect(() => {
        getRepository();
    }, []);

    return <div>{repository ? <RepositoryFullView repository={repository} topics={tags} /> : <Loading />}</div>;
}
