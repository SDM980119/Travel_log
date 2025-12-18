import { useEffect, useState } from 'react';

const TopButton = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => {
        if (window.scrollY > 300) {
            setVisible(true);
        } else {
            setVisible(false);
        }
        };

        window.addEventListener('scroll', onScroll);

        // 초기 진입 시 체크
        onScroll();

        return () => {
        window.removeEventListener('scroll', onScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
        top: 0,
        behavior: 'smooth', // jQuery animate 대체
        });
    };

    return (
        <button
        id="top_btn"
        type="button"
        onClick={scrollToTop}
        className={`top-btn ${visible ? 'is-show' : ''}`}
        aria-label="상단으로 이동"
        >
            <img src="/images/common/btn_top.png" alt="맨 위로" />
        </button>
    );
};

export default TopButton;
