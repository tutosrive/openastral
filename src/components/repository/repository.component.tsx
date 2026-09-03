import type { FC, ReactElement } from 'react';
import type { Repository } from '../../app/models/models';
import Helpers from '../../app/utils/helpers.utils';

interface RepositoryProps {
    repository: Repository;
    topics: ReactElement | ReactElement[];
    classess?: string;
}

export const RepositoryFullView: FC<RepositoryProps> = ({ repository, classess, topics }) => {
    return (
        <div id={`repo-${repository.id}`} className={`${classess ?? ''} flex flex-wrap pb-28`}>
            {/* Repo Title */}
            <div className="w-full fixed left-0 bg-base-100 translate-y-[-22px] p-4 grid grid-cols-12">
                <div className="h-full col-span-6 flex items-center justify-center">
                    <h1 className={'text-4xl text-primary'}>{repository.name}</h1>
                </div>
                <div className="col-span-6 flex items-center lg:justify-end md:justify-end justify-center flex-wrap">
                    {/* Stars Count */}
                    <div className="m-2 badge badge-soft badge-neutral rounded-xl w-auto h-10">
                        <i className="fa-solid fa-star"></i>
                        <a target="_blank" href={Helpers.getUrlStargazerHistoric(repository)}>
                            {repository.stargazerCount.toString()}
                        </a>
                    </div>
                    {/* Owner Link/Image */}
                    <a href={repository.url} target="_blank" className="badge badge-soft badge-neutral rounded-4xl aspect-square h-10">
                        <div className="avatar">
                            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                                <img alt={`Owner of repository '${repository.name}'`} src={`${repository.owner.avatar_url}`} />
                            </div>
                        </div>
                    </a>
                    {/* Backlink */}
                    <a href={repository.url} target="_blank" className="mx-1 badge badge-soft badge-neutral rounded-4xl aspect-square h-10">
                        <i className="fa-solid fa-arrow-up-right-from-square text-primary"></i>
                    </a>
                </div>
            </div>
            {/* Description */}
            <div className={'sm:mt-30 lg:mt-20 mb:mt-20 mt-30 mt-36 mb-5'}>{repository.description}</div>
            {/* Tags/Topics */}
            <div className={`overflow-scroll scrollbar-none flex flex-wrap h-55`}>
                <div id={`repo-${repository?.id}-tags`} className={``}>
                    {topics}
                </div>
            </div>
        </div>
    );
};

export const RepositoryParcialView: FC<RepositoryProps> = ({ repository, classess, topics }) => {
    const stargazerCount = Helpers.formatNumberToCompact(repository.stargazerCount);
    return (
        <div className={`${classess ?? ''} card bg-base-300 cbg-shiny w-5/12 h-40 shadow-sm overflow-hidden`} id={`repo-${repository.id}`}>
            <div className="card-body">
                <div className="flex justify-between">
                    <h2 className="card-title">{repository.name}</h2>
                    <div className="flex items-center justify-between">
                        {/* Stars Count */}
                        <div className="m-2 badge badge-soft badge-neutral rounded-xl w-auto h-10">
                            <i className="fa-solid fa-star"></i>
                            <a target="_blank" href={Helpers.getUrlStargazerHistoric(repository)}>
                                <span className="truncate">{stargazerCount}</span>
                            </a>
                        </div>
                        {/* Owner Link/Image */}
                        <a href={repository.url} target="_blank" className="badge badge-soft badge-neutral rounded-4xl aspect-square h-10">
                            <div className="avatar">
                                <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                                    <img alt={`Owner of repository '${repository.name}'`} src={`${repository.owner.avatar_url}`} />
                                </div>
                            </div>
                        </a>
                        {/* Backlink */}
                        <a href={repository.url} target="_blank" className="float-end mx-1 badge badge-soft badge-neutral rounded-4xl aspect-square h-10">
                            <i className="fa-solid fa-arrow-up-right-from-square text-primary"></i>
                        </a>
                    </div>
                </div>
                {/* Description */}
                <p className="truncate w-full">{repository.description ?? <span className="italic text-neutral">No Description</span>}</p>
                {/* Topics/Tags */}
                <div className="card-actions">
                    <div id={`repo-${repository?.id}-tags`} className={`carousel`}>
                        {topics}
                    </div>
                </div>
            </div>
        </div>
    );
};
