import { useSearchParams } from 'react-router';
import SkeletonRepository from '../../components/skeleton/repository.skeleton';
import { useSearch } from '../../app/stores/search.store';
import repositoryService from '../../app/services/repository.service';
import CumulativeRepo from '../../components/repository/cumulative.component';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { Repository } from '../../app/models/models';
import { useEffect, useState } from 'react';
import PaginationController from '../../components/pagination.component';

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const textToFind = searchParams.get('text') ?? '';
    const [countPages, setCountPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [hasError, setHasError] = useState<{ has: boolean; error: string | null | undefined | React.JSX.Element }>({ has: false, error: null });
    const type = useSearch((state) => state.type);
    const handleSearch = async () => {
        let result: Repository[] | null = null;
        if (type === 'mix' && textToFind) {
            const data = await repositoryService.getSearchMix(textToFind, currentPage);
            result = data;
        }
        return result;
    };
    const { data } = useQuery({ queryKey: ['search', textToFind, currentPage], queryFn: () => handleSearch(), notifyOnChangeProps: ['data'], placeholderData: keepPreviousData, staleTime: Infinity });
    const updateTotalPagesCalc = () => {
        if (!data || data === null || Object.keys(data).length === 0 || data.length === 0) {
            setHasError({
                has: true,
                error: (
                    <span>
                        No matching records found for <span className="text-error">{textToFind}</span>. Please try a different query.
                    </span>
                ),
            });
            return;
        } else {
            setHasError({ has: false, error: null });
        }
        if (data) {
            const firstRepo = data[0] as Repository;
            if (firstRepo && firstRepo.totalcount) {
                const totalPages = Math.ceil(firstRepo.totalcount / 20);
                setCountPages(totalPages);
            }
        }
    };
    useEffect(() => {
        updateTotalPagesCalc();
    }, [data]);
    useEffect(() => {
        setCurrentPage(1);
    }, [textToFind]);
    return (
        <div id="search-page" className="w-full min-h-full px-5 py-8">
            {hasError.has === false ? (
                data && data.length > 0 ? (
                    <div className="w-full h-full grid grid-cols-12 gap-1">
                        {data.map((repo) => {
                            return <CumulativeRepo repository={repo} key={`repo-${repo.id}`} />;
                        })}
                        <PaginationController callback={setCurrentPage} page={currentPage} totalPages={countPages} />
                    </div>
                ) : (
                    <SkeletonRepository />
                )
            ) : (
                <div className="w-full min-h-full flex items-center justify-center">{hasError.error}</div>
            )}
        </div>
    );
}
