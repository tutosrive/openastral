import type { FC } from 'react';
import type { Repository } from '../../app/models/models';
import Helpers from '../../app/utils/helpers.utils';

interface BadgesHeaderProps {
    repository: Repository;
}

const BadgesHeader: FC<BadgesHeaderProps> = ({ repository }) => {
    const stargazerCount = Helpers.formatNumberToCompact(repository.stargazer_count);
    const forkCount = Helpers.formatNumberToCompact(repository.fork_count);
    return (
        <div className="flex flex-wrap w-full gap-1 align-center justify-center">
            <div className="mx-0.5 badge badge-soft bg-neutral rounded-xl w-auto h-10 z-10">
                <a target="_blank" className="text-primary" href={Helpers.goToCustom(`${repository.url}/forks`)}>
                    <i className="fa-solid fa-code-fork"></i>
                    <span className="truncate">{forkCount}</span>
                </a>
            </div>
            {/* Stars Count */}
            <div className="mx-0.5 badge badge-soft bg-neutral rounded-xl w-auto h-10 z-10">
                <a target="_blank" className="text-primary" href={Helpers.goToCustom(Helpers.getUrlStargazerHistoric(repository))}>
                    <i className="fa-solid fa-star"></i>
                    <span className="truncate">{stargazerCount}</span>
                </a>
            </div>
            {/* Owner Link/Image */}
            <a href={Helpers.goToCustom(repository.owner.url)} target="_blank" className="mx-2 aspect-square h-10 z-10">
                <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                        <img alt={`Owner of repository '${repository.name}'`} src={`${repository.owner.avatar_url}`} loading="lazy" />
                    </div>
                </div>
            </a>
            {/* Backlink */}
            <div className="mx-0.5 float-end badge badge-soft bg-neutral rounded-4xl aspect-square h-10 z-10">
                <a href={Helpers.goToCustom(repository.url)} target="_blank">
                    <i className="fa-solid fa-arrow-up-right-from-square text-primary"></i>
                </a>
            </div>
        </div>
    );
};

export default BadgesHeader;
