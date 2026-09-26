import { useSearchParams } from 'react-router';
import SkeletonRepository from '../../components/skeleton/repository.skeleton';
import { useSearch } from '../../app/stores/search.store';
import repositoryService from '../../app/services/repository.service';
import CumulativeRepo from '../../components/repository/cumulative.component';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { Repository } from '../../app/models/models';
import { useEffect, useState } from 'react';
import PaginationController from '../../components/pagination.component';
import { PAGE_COUNT_REPOSITORY } from '../../app/utils/constants';

async function handleSearch(type: 'mix' | 'repository' | 'category', textToFind: string, page: number) {
    let result: Repository[] | null = null;
    if (type === 'mix' && textToFind) {
        const data = await repositoryService.getSearchMix(textToFind, page);
        result = data;
    }
    return result;
}

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const textToFind = searchParams.get('text') ?? '';
    const [currentPage, setCurrentPage] = useState<number>(1);
    const type = useSearch((state) => state.type);
    const { data } = useQuery({ queryKey: ['search', textToFind, currentPage, type], queryFn: () => handleSearch(type, textToFind, currentPage), notifyOnChangeProps: ['data'], placeholderData: keepPreviousData, staleTime: Infinity });
    useEffect(() => {
        setCurrentPage(1);
    }, [textToFind]);

    const isEmptyResult = data && (data === null || Object.keys(data).length === 0 || data.length === 0);
    const totalCount = data?.[0]?.totalcount ? Math.ceil(data?.[0]?.totalcount / PAGE_COUNT_REPOSITORY) : 0;
    return (
        <div id="search-page" className="w-full min-h-full px-5 py-8">
            {isEmptyResult ? (
                <span>
                    No matching records found for <span className="text-error">{textToFind}</span>. Please try a different query.
                </span>
            ) : data && data.length > 0 ? (
                <div className="w-full h-full grid grid-cols-12 gap-1">
                    {data.map((repo) => {
                        return <CumulativeRepo repository={repo} key={`repo-${repo.id}`} />;
                    })}
                    <PaginationController callback={setCurrentPage} page={currentPage} totalPages={totalCount} />
                </div>
            ) : (
                <SkeletonRepository />
            )}
        </div>
    );
}
