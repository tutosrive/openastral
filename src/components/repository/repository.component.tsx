import type { FC, ReactElement } from 'react';
import type { Repository } from '../../app/models';

interface RepositoryProps {
    repository: Repository;
    isFullView: boolean;
    topics: ReactElement | ReactElement[];
    classess?: string;
}

const RepositoryC: FC<RepositoryProps> = ({ repository, classess, isFullView, topics }) => {
    const tagsClasses: string = isFullView === true ? 'flex flex-wrap h-55' : 'flex';
    const urlStargazers: string = `https://www.star-history.com/${repository.owner.login}/${repository.name}`;
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
                        <a target="_blank" href={urlStargazers}>
                            {repository.stargazerCount.toString()}
                        </a>
                    </div>
                    {/* Owner Link/Image */}
                    <a href={repository.url} target="_blank" className="badge badge-soft badge-neutral rounded-4xl aspect-square h-10">
                        {/* <i className="fa-solid fa-arrow-up-right-from-square text-primary"></i> */}
                        <div className="avatar">
                            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                                <img alt={`Owner of repository '${repository.name}'`} src={`${repository.ownerStarred.avatarUrl}`} />
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
            <div className={`overflow-scroll scrollbar-none ${tagsClasses}`}>
                <div id={`repo-${repository?.id}-tags`} className={``}>
                    {topics}
                </div>
            </div>
        </div>
    );
};

export default RepositoryC;
