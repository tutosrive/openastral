import { useSearchParams } from 'react-router';
import SkeletonRepository from '../../components/skeleton/repository.skeleton';
import { useSearch } from '../../app/stores/search.store';
import repositoryService from '../../app/services/repository.service';
import CumulativeRepo from '../../components/repository/cumulative.component';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { Repository, Topic } from '../../app/models/models';
import { useEffect, useState } from 'react';
import PaginationController from '../../components/pagination.component';
import { PAGE_COUNT_CATEGORY, PAGE_COUNT_REPOSITORY } from '../../app/utils/constants';
import topicService from '../../app/services/topic.services';
import CategoryC from '../../components/repository/category.component';

async function handleSearch(type: 'mix' | 'repository' | 'category', textToFind: string, page: number) {
    let result: Repository[] | Topic[] | null = null;
    switch (type) {
        case 'mix':
            result = await repositoryService.getSearch(textToFind, page, type);
            break;
        case 'repository':
            result = await repositoryService.getSearch(textToFind, page, type);
            break;
        case 'category':
            result = await topicService.getSearch(textToFind, page);
            break;
    }
    return result;
}

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const textToFind = searchParams.get('text') ?? '';
    const [currentPage, setCurrentPage] = useState<number>(1);
    const type = useSearch((state) => state.type);
    const isRepository = ['mix', 'repository'].includes(type);
    console.log(`Type: ${type} | IsRepo: ${isRepository}`);
    const { data } = useQuery({ queryKey: ['search', textToFind, currentPage, type], queryFn: () => handleSearch(type, textToFind, currentPage), notifyOnChangeProps: ['data'], placeholderData: keepPreviousData, staleTime: Infinity });
    useEffect(() => {
        setCurrentPage(1);
    }, [textToFind]);
    const isEmptyResult = data && (data === null || Object.keys(data).length === 0 || data.length === 0);
    const pageCount = isRepository === true ? PAGE_COUNT_REPOSITORY : PAGE_COUNT_CATEGORY;
    const totalCount = data?.[0]?.totalcount ? Math.ceil(data?.[0]?.totalcount / pageCount) : 0;

    return (
        <div id="search-page" className={`${isRepository === true ? 'w-full min-h-full px-5 py-8' : 'w-full h-full flex flex-wrap items-center justify-center'}`}>
            {isEmptyResult ? (
                <span>
                    No matching records found for <span className="text-error">{textToFind}</span>. Please try a different query.
                </span>
            ) : data && data.length > 0 ? (
                <div className={`w-full ${isRepository === false ? 'flex flex-wrap items-center justify-center' : 'h-full grid grid-cols-12 gap-1'}`}>
                    {data.map((item) => {
                        if ('fork_count' in item) {
                            return <CumulativeRepo repository={item} key={`repo-${item.id}`} />;
                        } else {
                            return <CategoryC name={item.name} to={`/categories/${item.name}`} key={item.id} />;
                        }
                    })}
                    <PaginationController callback={setCurrentPage} page={currentPage} totalPages={totalCount} />
                </div>
            ) : (
                <SkeletonRepository />
            )}
        </div>
    );
}
