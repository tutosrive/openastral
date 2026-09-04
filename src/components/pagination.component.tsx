import type { FC } from 'react';

interface PaginationControllerProps {
    previous: () => void;
    next: () => void;
    page: number;
}

const PaginationController: FC<PaginationControllerProps> = ({ previous, next, page }) => {
    return (
        <div className="join">
            <button className="join-item btn" onClick={() => previous()}>
                <i className="fa-solid fa-angles-left"></i>
            </button>
            <button className="join-item btn">Page {page}</button>
            <button className="join-item btn" onClick={() => next()}>
                <i className="fa-solid fa-angle-double-right"></i>
            </button>
        </div>
    );
};

export default PaginationController;
