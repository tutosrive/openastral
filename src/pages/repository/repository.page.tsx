import { useParams } from 'react-router';
import { RepositoryFullView } from '../../components/repository/repository.component';
import { useEffect, useState } from 'react';
import repositoryService from '../../app/services/repository.service';
import Loading from '../../components/loading.component';
import type { Repository } from '../../app/models/models';
import CategoryC from '../../components/repository/category.component';
import Helpers from '../../app/utils/helpers.utils';
import { useWindowTitle } from '../../app/stores/app.store';
import { PAGES_TITLES } from '../../app/utils/constants';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
// import { useSearch } from '../../app/stores/search.store';

export default function RepositoryPage() {
    const [tags, setTags] = useState<React.JSX.Element[]>([]);
    const [readme, setReadme] = useState<string>('');
    const updateTitle = useWindowTitle((state) => state.updateTitle);
    // const updateTypeSearch = useSearch((state) => state.updateType);
    const params = useParams();
    const repositoryOwner: string = params.owner!!;
    const repositoryName: string = params.repo!!;
    const { data } = useQuery<Repository | undefined | null>({ queryKey: ['repository', repositoryOwner, repositoryName], queryFn: () => repositoryService.getByOwnerAndName(repositoryOwner, repositoryName), notifyOnChangeProps: ['data'], placeholderData: keepPreviousData, staleTime: Infinity });
    const getReadme = async () => {
        if (data) {
            const res = await Helpers.getReadme(data.name, data.owner.login, `${data.readme_url}`);
            if (res && res.length > 0) {
                setReadme(res);
            }
        }
    };
    const init = () => {
        // updateTypeSearch('repository');
        updateTitle(PAGES_TITLES.repository(`${repositoryOwner}/${repositoryName}`));
    };
    const makeTags = () => {
        if (data) {
            let elementTags = [
                <span key={`${data.id}-tag-not-categories`} className="italic text-neutral">
                    Not categories
                </span>,
            ];
            if (data.topics && data.topics.length > 0) {
                elementTags = data.topics.map((cat) => {
                    return <CategoryC to={`/categories/${cat.name}`} key={`tag-${cat.id}`} name={cat.name} />;
                });
            }
            setTags(elementTags);
        }
    };
    useEffect(() => {
        makeTags();
        getReadme();
    }, [data]);
    useEffect(() => {
        init();
    }, []);

    return <div className="w-full h-full mt-4 min-w-[355px]">{data ? <RepositoryFullView repository={data} topics={tags} readme={readme} /> : <Loading />}</div>;
}
