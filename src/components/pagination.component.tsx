import type { FC } from 'react';
import ResponsivePaginationComponent from 'react-responsive-pagination';

interface PaginationControllerProps {
    callback: (n: number) => void;
    page: number;
    totalPages: number;
}

const PaginationController: FC<PaginationControllerProps> = ({ callback, page, totalPages }) => {
    return (
        <div className=" col-span-12 w-full flex items-center justify-center bottom-14 ">
            <ResponsivePaginationComponent
                current={page}
                onPageChange={(n) => callback(n)}
                total={totalPages}
                containerClassName="flex justify-center gap-1"
                pageItemClassName="inline-flex items-center rounded-md border text-sm"
                activeItemClassName="border-blue-800 bg-blue-800 text-white shadow-sm"
                inactiveItemClassName="border-slate-600 text-slate-400 shadow-sm hover:bg-blue-800 hover:text-white hover:shadow-lg"
                disabledItemClassName="pointer-events-none border-slate-600 text-slate-400 opacity-50"
                pageLinkClassName="px-3 py-2"
            />
        </div>
    );
};

export default PaginationController;
