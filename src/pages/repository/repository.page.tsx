import { useParams } from 'react-router';

export default function RepositoryPage() {
    const params = useParams();
    const repositoryId: string = params.id!!;

    return <div>{repositoryId}</div>;
}
