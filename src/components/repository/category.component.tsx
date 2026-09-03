import type { FC } from 'react';
import { Link } from 'react-router';
import Helpers from '../../app/utils/helpers.utils';

interface CategoryProps {
    to: string;
    name: string;
}

const CategoryC: FC<CategoryProps> = ({ name, to }) => {
    const badgeStyle: string = Helpers.getRandomBadgeStyle();
    return (
        <Link to={to} className={`m-1 badge-lg badge badge-soft ${badgeStyle} w-auto text-nowrap`}>
            {name}
        </Link>
    );
};

export default CategoryC;
