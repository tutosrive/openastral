import { useState, type FC, type ReactElement } from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import type { Repository } from '../../app/models/models';
import { Link } from 'react-router';
import BadgesHeader from './badges-header.component';

interface RepositoryProps {
    repository: Repository;
    topics: ReactElement | ReactElement[];
    readme?: string;
    classess?: string;
}

export const RepositoryFullView: FC<RepositoryProps> = ({ repository, classess, topics, readme }) => {
    return (
        <div id={`repo-${repository.id}`} className={`${classess ?? ''} flex flex-wrap pb-28 lg:justify-center md:justify-center justify-start w-full`}>
            {/* Repo Title */}
            <div className="w-full fixed left-0 backdrop-blur-lg translate-y-[-18px] grid grid-cols-12 overflow-hidden z-10 max-h-26 py-3">
                <div className="h-full col-span-6 flex items-center justify-center">
                    <Link to={'/'} className="left-0 text-3xl text-accent">
                        <i className="fa-solid fa-circle-chevron-left"></i>
                    </Link>
                    <h1 className={'w-full text-4xl text-neutral-content britney-ft font-extrabold text-right text-nowrap overflow-x-scroll scrollbar-none'}>{repository.name}</h1>
                </div>
                <div className="col-span-6 flex items-center lg:justify-end md:justify-end justify-center flex-wrap">
                    <BadgesHeader repository={repository} />
                </div>
            </div>
            {/* Description */}
            <div className={'lg:mt-10 md:mt-10 mt-15 mb-5 p-5 transition-all w-[98dvw] lg:w-full md:w-full'}>
                <MarkdownPreview source={readme} className="z-0 w-full min-w-3" />
            </div>
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
    const [eyeVisible, setEyeVisible] = useState<boolean>(false);
    return (
        <div className={`${classess ?? ''} card bg-base-300 cbg-shiny h-auto shadow-sm overflow-hidden`} onMouseEnter={() => setEyeVisible(true)} onMouseLeave={() => setEyeVisible(false)}>
            {/* View Full Component */}
            <div className={`backdrop-blur-xs absolute w-full h-full p-0 ${eyeVisible === true ? 'card-body' : 'hidden'}`}>
                <Link to={`/repositories/${repository.owner.login}/${repository.name}`} className="w-full h-full flex items-center justify-center">
                    <i className="fa-solid fa-eye text-primary text-2xl"></i>
                </Link>
            </div>
            <div className={'card-body'}>
                <div className="grid grid-cols-12">
                    <h2 className="card-title truncate lg:col-span-6 col-span-12">{repository.name}</h2>
                    <div className={`lg:col-span-6 col-span-12 carousel text-nowrap flex lg:justify-end justify-center py-1 transition-all lg:translate-0 ${eyeVisible === true ? '-translate-y-8' : 'items-center'}`}>
                        {/* License */}
                        {/* <div className="m-2 badge badge-soft bg-neutral rounded-xl w-auto h-10">
                            <a target="_blank" href={Helpers.getUrlStargazerHistoric(repository)}>
                                <i className="fa-solid fa-code-fork"></i>
                                <span className="truncate">{repository.license_id}</span>
                            </a>
                        </div> */}
                        {/* Forks Count */}
                        <BadgesHeader repository={repository} />
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
