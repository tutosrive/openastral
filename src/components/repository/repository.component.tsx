import { useState, type FC, type ReactElement } from 'react';
import type { Repository } from '../../app/models/models';
import Helpers from '../../app/utils/helpers.utils';
import { Link } from 'react-router';

interface RepositoryProps {
    repository: Repository;
    topics: ReactElement | ReactElement[];
    classess?: string;
}

export const RepositoryFullView: FC<RepositoryProps> = ({ repository, classess, topics }) => {
    const stargazerCount = Helpers.formatNumberToCompact(repository.stargazer_count);
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
                            {stargazerCount}
                        </a>
                    </div>
                    {/* Owner Link/Image */}
                    <a href={repository.owner.url} target="_blank" className="badge badge-soft badge-neutral rounded-4xl aspect-square h-10">
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
    const stargazerCount = Helpers.formatNumberToCompact(repository.stargazer_count);
    const forkCount = Helpers.formatNumberToCompact(repository.fork_count);
    const [eyeVisible, setEyeVisible] = useState<boolean>(false);
    return (
        <div className={`${classess ?? ''} card bg-base-300 cbg-shiny h-auto shadow-sm overflow-hidden`} onMouseEnter={() => setEyeVisible(true)} onMouseLeave={() => setEyeVisible(false)}>
            {/* View Full Component */}
            <div className={`backdrop-blur-xs absolute w-full h-full p-0 ${eyeVisible === true ? 'card-body' : 'hidden'}`}>
                <Link to={`repositories/${repository.id}`} className="w-full h-full flex items-center justify-center">
                    <i className="fa-solid fa-eye text-primary text-2xl"></i>
                </Link>
            </div>
            <div className={'card-body'}>
                <div className="grid grid-cols-12">
                    <h2 className="card-title truncate lg:col-span-6 col-span-12">{repository.name}</h2>
                    <div className="lg:col-span-6 col-span-12 carousel text-nowrap flex items-center lg:justify-end justify-center py-1">
                        {/* License */}
                        {/* <div className="m-2 badge badge-soft bg-neutral rounded-xl w-auto h-10">
                            <a target="_blank" href={Helpers.getUrlStargazerHistoric(repository)}>
                                <i className="fa-solid fa-code-fork"></i>
                                <span className="truncate">{repository.license_id}</span>
                            </a>
                        </div> */}
                        {/* Forks Count */}
                        <div className="mx-0.5 badge badge-soft bg-neutral rounded-xl w-auto h-10 z-10">
                            <a target="_blank" href={`${repository.url}/forks`}>
                                <i className="fa-solid fa-code-fork"></i>
                                <span className="truncate">{forkCount}</span>
                            </a>
                        </div>
                        {/* Stars Count */}
                        <div className="mx-0.5 badge badge-soft bg-neutral rounded-xl w-auto h-10 z-10">
                            <a target="_blank" href={Helpers.getUrlStargazerHistoric(repository)}>
                                <i className="fa-solid fa-star"></i>
                                <span className="truncate">{stargazerCount}</span>
                            </a>
                        </div>
                        {/* Owner Link/Image */}
                        <a href={repository.owner.url} target="_blank" className="mx-1 badge badge-soft badge-neutral rounded-4xl aspect-square h-10 z-10">
                            <div className="avatar">
                                <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                                    <img alt={`Owner of repository '${repository.name}'`} src={`${repository.owner.avatar_url}`} loading="lazy" />
                                </div>
                            </div>
                        </a>
                        {/* Backlink */}
                        <a href={repository.url} target="_blank" className="mx-0.5 float-end badge badge-soft badge-neutral rounded-4xl aspect-square h-10 z-10">
                            <i className="fa-solid fa-arrow-up-right-from-square text-primary"></i>
                        </a>
                    </div>
                </div>
                {/* Description */}
                <p className="truncate w-full">{repository.description ?? <span className="italic text-neutral">No Description</span>}</p>
                {/* Topics/Tags */}
                <div className="card-actions min-h-9 z-10">
                    <div id={`repo-${repository?.id}-tags`} className={`carousel`}>
                        {topics}
                    </div>
                </div>
            </div>
        </div>
    );
};
