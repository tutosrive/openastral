import { useSearchParams } from 'react-router';
// import PaginationController from "../../components/pagination.component";
import SkeletonRepository from '../../components/skeleton/repository.skeleton';
// import CumulativeRepo from '../../components/repository/cumulative.component';
import { useSearch } from '../../app/stores/search.store';

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const textToFind = searchParams.get('text');
    const type = useSearch((state) => state.type);
    console.log(type);
    console.log(textToFind);

    // {data && data.length > 0 ? (
    //     <div className="w-full h-full grid grid-cols-12 gap-1">
    //         {data.map((repo) => {
    //             return <CumulativeRepo repository={repo} key={`repo-${repo.id}`} />;
    //         })}
    //         {/* <PaginationController callback={setCurrentPage} page={currentPage} totalPages={totalPages} /> */}
    //     </div>
    // ) : (
    // <SkeletonRepository />
    // )}
    return (
        <div id="home-page" className="w-dvw px-5 py-8">
            <SkeletonRepository />
        </div>
    );
}
