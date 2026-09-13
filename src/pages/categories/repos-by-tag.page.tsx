import { useParams } from 'react-router';

export default function RepositoriesByTagPage() {
    const params = useParams();
    const category = params.name;
    return (
        <div>
            <p>Category: {category}</p>
        </div>
    );
}
