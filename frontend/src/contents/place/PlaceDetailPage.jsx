import React, { useEffect, useState } from "react";
import WishToggleButton from '../../components/common/WishToggleButton';
import "./PlaceDetailPage.css";

const PlaceDetailPage = () => {

    const [mainImage, setMainImage] = useState(
        "/images/placedetail/snoopy2.jpg"
    );
    const [smallImages, setSmallImages] = useState([
        "/images/placedetail/snoopy3.jpg",
        "/images/placedetail/snoopy4.jpg",
        "/images/placedetail/snoopy5.jpg",
    ]);

    const handleImageSwap = (clickedImg, index) => {
        const currentMain = mainImage;
        setMainImage(clickedImg);

        const newSmallImages = [...smallImages];
        newSmallImages[index] = currentMain;
        setSmallImages(newSmallImages);
    };


    const slides = [
        "/images/placedetail/snoopy4.jpg",
        "/images/placedetail/snoopy3.jpg",
        "/images/placedetail/snoopy2.jpg",
    ];

    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
        setSlideIndex((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [slides.length]);


    const [likes, setLikes] = useState([false, false, false]);

    const toggleLike = (index) => {
        setLikes((prev) =>
        prev.map((v, i) => (i === index ? !v : v))
        );
    };

    const handleMoreClick = () => {
        console.log("더보기 버튼 클릭");

    };

    return (
        <div className="place-wrap">
            <div className="place-inner">
                <div className="top-wrap">
                    <img
                        src="/images/placedetail/snoopt1.jpg"
                        alt="snoopy"
                    />
                </div>
                <div className="content-wrap">
                    <h1 className="title">JEJU</h1>
                    <div className="section01-wrap">
                        <div className="text-wrap">
                            <h2 className="title">스누피 가든</h2>
                            <p className="text">
                                Snoopy Garden(스누피 가든)은 제주 구좌읍에 있는 피너츠(Peanuts) 만화 캐릭터 스누피와 친구들을 테마로 꾸민 체험형 정원형 관광지입니다. 제주의 자연
                                속에서
                                스누피의 세계를 느끼며 산책하고 즐길 수 있는 공간이에요.
                                실내 공간은 '관계', '일상', '휴식', '행복', '상상' 등 다섯 가지 주제로 나뉘어 피너츠 만화 에피소드를 전시하고, 야외 정원에는 만화 속 장면을 재현한 조형물과
                                다양한
                                포토존이 있어 사진 찍기 좋습니다.
                                또한 카페와 스누피 관련 굿즈를 판매하는 기념품 샵이 있어 가족, 연인, 친구 여행객 모두에게 인기 있는 관광 코스입니다. 약 2~3시간 정도 여유를 두고 둘러보는 것을
                                추천합니다.
                            </p>
                        </div>

                        <div className="img-wrap">
                            <img
                                src={mainImage}
                                alt="main"
                                className="main__img"
                            />
                            <div className="sub__img-wrap">
                                {smallImages.map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    alt=""
                                    className={`sub__img sub__img-${i + 1}`}
                                    onClick={() => handleImageSwap(img, i)}
                                />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="section03-wrap">
                        <div className="title">INFORMATION</div>
                        {/* 정보 일단 뿌리기 */}
                        {/* <p>
                            <span>제목</span>
                            <span>내용</span>
                        </p> */}
                        <div className="section03-inner">
                            <p className="text-wrap">
                                <span className="tit">제목1 :</span>
                                &nbsp;
                                <span className="txt">어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 </span>
                            </p>
                            <p className="text-wrap">
                                <span className="tit">제목2 :</span>
                                &nbsp;
                                <span className="txt">어쩌고저쩌고</span>
                            </p>
                            <p className="text-wrap">
                                <span className="tit">제목1 :</span>
                                &nbsp;
                                <span className="txt">어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 </span>
                            </p>
                            <p className="text-wrap">
                                <span className="tit">제목2 :</span>
                                &nbsp;
                                <span className="txt">어쩌고저쩌고</span>
                            </p>
                        </div>
                    </div>
                    <div className="section04-wrap">
                        <iframe
                            title="Snoopy Garden Map"
                            className="spg-map"
                            loading="lazy"
                            allowFullScreen
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.1959274316896!2d126.7757308762726!3d33.444201649590816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x350d1bc32bdef82d%3A0x35c7b3cf574c06f5!2z7Iqk64iU7ZS86rGA65Og!5e0!3m2!1sko!2sus!4v1765953680091!5m2!1sko!2sus"
                        />
                        <p className="text">찾아가는 길</p>
                    </div>
                    <div className="recommend-wrap">
                        <div className="recommended-inner">
                            <h1 className="title">RECOMMENDED</h1>

                            {["성산일출봉", "제주 4.3 평화 공원", "카멜리아 힐"].map(
                            (tag, i) => (
                                <div className="item" key={i}>
                                    <div className="img-wrap">
                                        <img
                                        src="/images/placedetail/snoopt1.jpg"
                                        alt=""
                                        />
                                    </div>

                                    <div className="item-content">
                                        <h2 className="item-title">Jeju</h2>
                                        <div className="item-details">
                                            <p>
                                                <span className="tit">주소 :</span>
                                                &nbsp;
                                                <span className="txt">제주특별자치도 제주시 구좌읍 금백조로 930</span>
                                            </p>
                                            <p>
                                                <span className="tit">휴일 :</span>
                                                &nbsp;
                                                <span className="txt">연중무휴</span>
                                            </p>
                                            <p>
                                                <span className="tit">이용가능시설 :</span>
                                                &nbsp;
                                                <span className="txt">카드 하우스 / 야외카드</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="item-actions">
                                        <span className="item-tag">{tag}</span>
                                        <WishToggleButton className="heart-btn" />
                                        <button className="detail-btn">
                                            상세 정보 보러가기
                                        </button>
                                    </div>
                                </div>
                            )
                            )}

                            <div className="pagination">
                                <button>&lt;&lt;</button>
                                <button>&lt;</button>
                                <button className="current">1</button>
                                <button>&gt;</button>
                                <button>&gt;&gt;</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceDetailPage;