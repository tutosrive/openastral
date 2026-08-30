import type { FC } from 'react';
import { Link } from 'react-router';
import Helpers from '../../app/utils/helpers.utils';

interface CategoryProps {
    to: string;
    name: string;
    key?: string;
}

const CategoryC: FC<CategoryProps> = ({ name, to, key }) => {
    const badgeStyle: string = Helpers.getRandomBadgeStyle();
    return (
        <Link key={key ?? ''} to={to} className={`m-1 badge-lg badge badge-soft ${badgeStyle}`}>
            {name}
        </Link>
    );
};

export default CategoryC;
