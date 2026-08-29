import type { FC } from 'react';
import type { Repository } from '../../app/models';

interface RepositoryProps {
    repositories?: Array<Repository>;
    repository?: Repository;
}

const RepositoryC: FC<RepositoryProps> = ({ repositories, repository }) => {
    const isFullView: boolean = repositories ? true : false;

    return (
        <div>
            <button className="btn btn-primary">Primary</button>
            <button className="btn btn-info">Info</button>
        </div>
    );
};

export default RepositoryC;
