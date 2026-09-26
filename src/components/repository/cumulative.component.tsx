import { useEffect, useState, type FC } from 'react';
import CategoryC from './category.component';
import { RepositoryParcialView } from './repository.component';
import type { Repository } from '../../app/models/models';

interface CumulativeRepoProps {
    repository: Repository;
}

const CumulativeRepo: FC<CumulativeRepoProps> = ({ repository }) => {
    const [tags, setTags] = useState<React.JSX.Element[]>([]);
    const makeTags = () => {
        let elementTags = [
            <span key={`${repository.id}-tag-not-categories`} className="italic badge-info m-1 badge-lg badge badge-soft w-auto text-nowrap">
                Not categories
            </span>,
        ];
        if (repository.topics && repository.topics.length > 0) {
            elementTags = repository.topics.map((cat) => {
                return <CategoryC to={`/categories/${cat.name}`} key={`tag-${cat.id}`} name={cat.name} />;
            });
            setTags(elementTags);
        }
    };
    useEffect(() => {
        makeTags();
    }, []);
    return <RepositoryParcialView repository={repository} topics={tags} classess="min-2xl:col-span-3 lg:col-span-6 md:col-span-6 col-span-12" />;
};

export default CumulativeRepo;
