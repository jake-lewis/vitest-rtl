import {
    cloneElement, FC, ReactElement, useState, MouseEventHandler
} from 'react';

type SetPage<S> = S | ((prevState: S) => S);

interface Props {
    page: number;
    setPage:  (value: SetPage<number>) => void;
    pageSize: number;
    setPageSize: (pageSize: number) => void;
    count?: number;
    children: ReactElement;
}

const PaginationWrapper: FC<Props> = ({ count = 0, page, setPage, pageSize, children }: Props) => {
    
    const pages = Math.ceil(count / pageSize);

    if (count === 0) {
        <p>empty</p>;
    }

    const onClickFirst = () => {
        if (page > 1) { setPage(1); }
    };
    const onClickPrev = () => {
        if (page > 1) { setPage((currentPage: number) => currentPage - 1); }
    };
    const onClickNext = () => {
        if (page < pages) { setPage((currentPage) => currentPage + 1); }
    };
    const onClickLast = () => {
        if (page < pages) { setPage(pages); }
    };
    const onClickNumber = (value: number) => () => {
        if(value !== page) { setPage(value); }
    }
    const noOfPageControls = 9;
    const start = Math.max(1, Math.min(Math.floor(page - noOfPageControls / 2) + 1, pages - noOfPageControls + 1 ));
    const end = Math.min(pages + 1, Math.max(Math.ceil(page + noOfPageControls / 2), noOfPageControls + 1));
    const pageArray = Array.from({length: end - start}).map((_, i) => start + i);

    return (
        <div>
            {children}
            <div>
                <button onClick={onClickFirst} disabled={page <= 1} title='First'>&lt;&lt;</button>
                <button onClick={onClickPrev} disabled={page <= 1} title='Previous'>&lt;</button>
                {pageArray.map(pageNo => <button key={pageNo} onClick={onClickNumber(pageNo)} disabled={pageNo === page}>{pageNo}</button>)}
                <button onClick={onClickNext} disabled={page === pages} title='Next'>&gt;</button>
                <button onClick={onClickLast} disabled={page === pages} title='Last'>&gt;&gt;</button>
            </div>
        </div>
    );
};

export default PaginationWrapper;
