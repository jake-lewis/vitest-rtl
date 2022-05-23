import {
    cloneElement, FC, ReactElement, useState, MouseEventHandler
} from 'react';

export interface Pagination {
    page: number;
    pageSize: number;
    count: number;
}

interface Props {
    count: number | undefined,
    defaultPage?: number,
    defaultPageSize?: number,
    children: ReactElement<Pagination>
}

const PaginationWrapper: FC<Props> = ({ count = 0, defaultPage, defaultPageSize = 20, children }) => {
    const [page, setPage] = useState(defaultPage ?? 1);
    const [pageSize] = useState(defaultPageSize);
    const pages = Math.ceil(count / pageSize);

    if (count === 0) {
        <p>empty</p>;
    }

    if (!count) {
        <p>loading</p>;
    }

    const renderedChildren = cloneElement<Pagination>(children, { page, pageSize: defaultPageSize });
    const onClickFirst = () => {
        if (page > 1) { setPage(1); }
    };
    const onClickPrev = () => {
        if (page > 1) { setPage((currentPage) => currentPage - 1); }
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
            {renderedChildren}
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
