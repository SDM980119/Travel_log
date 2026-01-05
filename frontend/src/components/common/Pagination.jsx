import React, { useEffect, useMemo, useState } from 'react';

const Pagination = ({ page, totalPages, onChange, breakpoint = 768 }) => {
    const [isMobile, setIsMobile] = useState(() => window.innerWidth <= breakpoint);

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth <= breakpoint);
        window.addEventListener('resize', onResize, { passive: true });
        return () => window.removeEventListener('resize', onResize);
    }, [breakpoint]);

    const pageNumbers = useMemo(() => {
        if (!totalPages || totalPages < 1) return [];

        const pageWindow = isMobile ? 5 : 10;
        const half = Math.floor(pageWindow / 2);

        let startPage = Math.max(1, page - half);
        let endPage = startPage + pageWindow - 1;

        if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - pageWindow + 1);
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    }, [page, totalPages, isMobile]);

    const go = (p) => {
        if (!totalPages || totalPages < 1) return;
        if (p < 1 || p > totalPages || p === page) return;
        onChange(p);
    };

    const isFirst = page <= 1;
    const isLast = page >= totalPages;

    return (
        <div className="pagination">
            <button
                type="button"
                className="arrow first"
                title="처음 페이지로 이동"
                disabled={isFirst}
                onClick={() => go(1)}
            >
                <span className="blind">처음 페이지로 이동</span>
            </button>

            <button
                type="button"
                className="arrow prev"
                title="이전 페이지로 이동"
                disabled={isFirst}
                onClick={() => go(page - 1)}
            >
                <span className="blind">이전 페이지로 이동</span>
            </button>

            {pageNumbers.map((num) => (
                <button
                key={num}
                type="button"
                className={`number ${num === page ? 'active' : ''}`}
                onClick={() => go(num)}
                aria-current={num === page ? 'page' : undefined}
                >
                {num}
                </button>
            ))}

            <button
                type="button"
                className="arrow next"
                title="다음 페이지로 이동"
                disabled={isLast}
                onClick={() => go(page + 1)}
            >
                <span className="blind">다음 페이지로 이동</span>
            </button>

            <button
                type="button"
                className="arrow last"
                title="마지막 페이지로 이동"
                disabled={isLast}
                onClick={() => go(totalPages)}
            >
                <span className="blind">마지막 페이지로 이동</span>
            </button>
        </div>
    );
};

export default Pagination;
