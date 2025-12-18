import React, { useRef, useState } from 'react';
import { Virtual, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './MyPage.css'

const MyPage = () => {
    const [swiperRef, setSwiperRef] = useState(null);
    const appendNumber = useRef(500);
    const prependNumber = useRef(1);
    // Create array with 500 slides
    const [slides, setSlides] = useState(
        Array.from({ length: 500 }).map((_, index) => `Slide ${index + 1}`)
    );

    const prepend = () => {
        setSlides([
            `Slide ${prependNumber.current - 2}`,
            `Slide ${prependNumber.current - 1}`,
            ...slides,
        ]);
        prependNumber.current = prependNumber.current - 2;
        swiperRef.slideTo(swiperRef.activeIndex + 2, 0);
    };

    const append = () => {
        setSlides([...slides, 'Slide ' + ++appendNumber.current]);
    };

    const slideTo = (index) => {
        swiperRef.slideTo(index - 1, 0);
    };




    return (
        // <Swiper
        //     modules={[Virtual, Navigation, Pagination]}
        //     onSwiper={setSwiperRef}
        //     slidesPerView={3}
        //     centeredSlides={true}
        //     spaceBetween={30}
        //     pagination={{
        //       type: 'fraction',
        //     }}
        //     navigation={true}
        //     virtual
        //   >
        //     {slides.map((slideContent, index) => (
        //       <SwiperSlide key={slideContent} virtualIndex={index}>
        //         {slideContent}
        //       </SwiperSlide>
        //     ))}
        //   </Swiper>

        // <Swiper
        //     modules={[Virtual, Navigation, Pagination]}
        //     onSwiper={setSwiperRef}
        //     slidesPerView={3}
        //     centeredSlides={true}
        //     spaceBetween={30}
        //     pagination={{
        //       type: 'fraction',
        //     }}
        //     navigation={true}
        //     virtual
        //   >
        //       <SwiperSlide>
        //       </SwiperSlide>
        //   </Swiper>


        <div className="mypage">

            <section className="mypage-profile">
                <div className="mypage-profile-container">
                    <div className="mypage-profile-img"></div>
                    <span className="edit-profile-text">회원정보 수정</span>
                </div>
                <div className="mypage-profile-info">
                    <span className="mypage-profile-badge">여행자</span>
                    <span className="mypage-profile-name">1234jeju</span>
                </div>
            </section>



            <section className="mypage-section">
                <h3 className="mypage-section-title">나의 찜리스트</h3>
                <Swiper
                    modules={[Virtual, Navigation, Pagination]}
                    onSwiper={setSwiperRef}
                    slidesPerView={4}
                    centeredSlides={false}
                    spaceBetween={8}
                    navigation={true}
                    virtual
                >
                    <SwiperSlide>
                        <div className="mypage-card">
                            <div className="card-bottom-info">
                                <img className="wish-icon" src="/images/login/찜버튼.png" alt='' />
                                <span className="card-text">스누피가든</span>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="mypage-card">
                            <div className="card-bottom-info">
                                <img className="wish-icon" src="/images/login/찜버튼.png" alt='' />
                                <span className="card-text">스누피가든</span>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="mypage-card">
                            <div className="card-bottom-info">
                                <img className="wish-icon" src="/images/login/찜버튼.png" alt='' />
                                <span className="card-text">스누피가든</span>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="mypage-card">
                            <div className="card-bottom-info">
                                <img className="wish-icon" src="/images/login/찜버튼.png" alt='' />
                                <span className="card-text">스누피가든</span>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="mypage-card">
                            <div className="card-bottom-info">
                                <img className="wish-icon" src="/images/login/찜버튼.png" alt='' />
                                <span className="card-text">스누피가든</span>
                            </div>
                        </div>
                    </SwiperSlide>


                </Swiper>

                {/* <div className="swiper mypage-swiper wishlist-swiper">
                    <div className="swiper-wrapper">
                        
                        <div className="swiper-slide">
                            <div className="mypage-card">
                                <div className="card-bottom-info">
                                    <img className="wish-icon" src="/images/login/찜버튼.png" alt='' />
                                    <span className="card-text">스누피가든</span>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="mypage-card">
                                <div className="card-bottom-info">
                                    <img src="/images/login/찜버튼.png" className="wish-icon" />
                                    <span className="card-text">스누피가든</span>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="mypage-card">
                                <div className="card-bottom-info">
                                    <img src="/images/login/찜버튼.png" className="wish-icon" />
                                    <span className="card-text">스누피가든</span>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="mypage-card">
                                <div className="card-bottom-info">
                                    <img src="/images/login/찜버튼.png" className="wish-icon" />
                                    <span className="card-text">스누피가든</span>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="mypage-card">
                                <div className="card-bottom-info">
                                    <img src="/images/login/찜버튼.png" className="wish-icon" />
                                    <span className="card-text">스누피가든</span>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="mypage-card">
                                <div className="card-bottom-info">
                                    <img src="/images/login/찜버튼.png" className="wish-icon" />
                                    <span className="card-text">스누피가든</span>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="mypage-card">
                                <div className="card-bottom-info">
                                    <img src="/images/login/찜버튼.png" className="wish-icon" />
                                    <span className="card-text">스누피가든</span>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="mypage-card">
                                <div className="card-bottom-info">
                                    <img src="/images/login/찜버튼.png" className="wish-icon" />
                                    <span className="card-text">스누피가든</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="swiper-button-next"></div>
                    <div className="swiper-button-prev"></div>
                </div> */}
            </section>


            <section className="mypage-section">
                <h3 className="mypage-section-title">내가 작성한 리뷰 글</h3>

                <Swiper
                    modules={[Virtual, Navigation, Pagination]}
                    onSwiper={setSwiperRef}
                    slidesPerView={4}
                    centeredSlides={false}
                    spaceBetween={8}
                    navigation={true}
                    virtual
                >
                    <SwiperSlide>
                        <div className="mypage-card2">
                            <div className="card2-content">
                                <div className="card2-thumb">
                                    <div className="card-bottom-info">
                                        <img src="/images/login/찜버튼.png" className="wish-icon" />
                                    </div>
                                </div>
                                <div className="card2-text-wrap">
                                    <p className="card2-title">Jeju <span className="card2-sub">스누피가든</span></p>
                                    <p className="card2-desc">여행을 떠난다는 것은 단순히 지도를 따라 새로운 장소를 방문하는 행위가 아니다. 익숙한 생활의 틀을 잠시 벗어나, 다른 공기와 다른 빛, 다른
                                        마음은 이...</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="mypage-card2">
                            <div className="card2-content">
                                <div className="card2-thumb">
                                    <div className="card-bottom-info">
                                        <img src="/images/login/찜버튼.png" className="wish-icon" />
                                    </div>
                                </div>
                                <div className="card2-text-wrap">
                                    <p className="card2-title">Jeju <span className="card2-sub">스누피가든</span></p>
                                    <p className="card2-desc">여행을 떠난다는 것은 단순히 지도를 따라 새로운 장소를 방문하는 행위가 아니다. 익숙한 생활의 틀을 잠시 벗어나, 다른 공기와 다른 빛, 다른
                                        마음은 이...</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="mypage-card2">
                            <div className="card2-content">
                                <div className="card2-thumb">
                                    <div className="card-bottom-info">
                                        <img src="/images/login/찜버튼.png" className="wish-icon" />
                                    </div>
                                </div>
                                <div className="card2-text-wrap">
                                    <p className="card2-title">Jeju <span className="card2-sub">스누피가든</span></p>
                                    <p className="card2-desc">여행을 떠난다는 것은 단순히 지도를 따라 새로운 장소를 방문하는 행위가 아니다. 익숙한 생활의 틀을 잠시 벗어나, 다른 공기와 다른 빛, 다른
                                        마음은 이...</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="mypage-card2">
                            <div className="card2-content">
                                <div className="card2-thumb">
                                    <div className="card-bottom-info">
                                        <img src="/images/login/찜버튼.png" className="wish-icon" />
                                    </div>
                                </div>
                                <div className="card2-text-wrap">
                                    <p className="card2-title">Jeju <span className="card2-sub">스누피가든</span></p>
                                    <p className="card2-desc">여행을 떠난다는 것은 단순히 지도를 따라 새로운 장소를 방문하는 행위가 아니다. 익숙한 생활의 틀을 잠시 벗어나, 다른 공기와 다른 빛, 다른
                                        마음은 이...</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="mypage-card2">
                            <div className="card2-content">
                                <div className="card2-thumb">
                                    <div className="card-bottom-info">
                                        <img src="/images/login/찜버튼.png" className="wish-icon" />
                                    </div>
                                </div>
                                <div className="card2-text-wrap">
                                    <p className="card2-title">Jeju <span className="card2-sub">스누피가든</span></p>
                                    <p className="card2-desc">여행을 떠난다는 것은 단순히 지도를 따라 새로운 장소를 방문하는 행위가 아니다. 익숙한 생활의 틀을 잠시 벗어나, 다른 공기와 다른 빛, 다른
                                        마음은 이...</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                </Swiper>

                {/* <div className="swiper mypage-swiper review-swiper">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <div className="mypage-card2">
                                <div className="card2-content">
                                    <div className="card2-thumb">
                                        <div className="card-bottom-info">
                                            <img src="/images/login/찜버튼.png" className="wish-icon" />
                                        </div>
                                    </div>
                                    <div className="card2-text-wrap">
                                        <p className="card2-title">Jeju <span className="card2-sub">스누피가든</span></p>
                                        <p className="card2-desc">여행을 떠난다는 것은 단순히 지도를 따라 새로운 장소를 방문하는 행위가 아니다. 익숙한 생활의 틀을 잠시 벗어나, 다른 공기와 다른 빛, 다른
                                            마음은 이...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="mypage-card2">
                                <div className="card2-content">
                                    <div className="card2-thumb">
                                        <div className="card-bottom-info">
                                            <img src="/images/login/찜버튼.png" className="wish-icon" />
                                        </div>
                                    </div>
                                    <div className="card2-text-wrap">
                                        <p className="card2-title">Jeju <span className="card2-sub">스누피가든</span></p>
                                        <p className="card2-desc">여행을 떠난다는 것은 단순히 지도를 따라 새로운 장소를 방문하는 행위가 아니다. 익숙한 생활의 틀을 잠시 벗어나, 다른 공기와 다른 빛, 다른
                                            마음은 이...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="mypage-card2">
                                <div className="card2-content">
                                    <div className="card2-thumb">
                                        <div className="card-bottom-info">
                                            <img src="/images/login/찜버튼.png" className="wish-icon" />
                                        </div>
                                    </div>
                                    <div className="card2-text-wrap">
                                        <p className="card2-title">Jeju <span className="card2-sub">스누피가든</span></p>
                                        <p className="card2-desc">여행을 떠난다는 것은 단순히 지도를 따라 새로운 장소를 방문하는 행위가 아니다. 익숙한 생활의 틀을 잠시 벗어나, 다른 공기와 다른 빛, 다른
                                            마음은 이...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="mypage-card2">
                                <div className="card2-content">
                                    <div className="card2-thumb">
                                        <div className="card-bottom-info">
                                            <img src="/images/login/찜버튼.png" className="wish-icon" />
                                        </div>
                                    </div>
                                    <div className="card2-text-wrap">
                                        <p className="card2-title">Jeju <span className="card2-sub">스누피가든</span></p>
                                        <p className="card2-desc">여행을 떠난다는 것은 단순히 지도를 따라 새로운 장소를 방문하는 행위가 아니다. 익숙한 생활의 틀을 잠시 벗어나, 다른 공기와 다른 빛, 다른
                                            마음은 이...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="mypage-card2">
                                <div className="card2-content">
                                    <div className="card2-thumb">
                                        <div className="card-bottom-info">
                                            <img src="/images/login/찜버튼.png" className="wish-icon" />
                                        </div>
                                    </div>
                                    <div className="card2-text-wrap">
                                        <p className="card2-title">Jeju <span className="card2-sub">스누피가든</span></p>
                                        <p className="card2-desc">여행을 떠난다는 것은 단순히 지도를 따라 새로운 장소를 방문하는 행위가 아니다. 익숙한 생활의 틀을 잠시 벗어나, 다른 공기와 다른 빛, 다른
                                            마음은 이...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="mypage-card2">
                                <div className="card2-content">
                                    <div className="card2-thumb">
                                        <div className="card-bottom-info">
                                            <img src="/images/login/찜버튼.png" className="wish-icon" />
                                        </div>
                                    </div>
                                    <div className="card2-text-wrap">
                                        <p className="card2-title">Jeju <span className="card2-sub">스누피가든</span></p>
                                        <p className="card2-desc">여행을 떠난다는 것은 단순히 지도를 따라 새로운 장소를 방문하는 행위가 아니다. 익숙한 생활의 틀을 잠시 벗어나, 다른 공기와 다른 빛, 다른
                                            마음은 이...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="mypage-card2">
                                <div className="card2-content">
                                    <div className="card2-thumb">
                                        <div className="card-bottom-info">
                                            <img src="/images/login/찜버튼.png" className="wish-icon" />
                                        </div>
                                    </div>
                                    <div className="card2-text-wrap">
                                        <p className="card2-title">Jeju <span className="card2-sub">스누피가든</span></p>
                                        <p className="card2-desc">여행을 떠난다는 것은 단순히 지도를 따라 새로운 장소를 방문하는 행위가 아니다. 익숙한 생활의 틀을 잠시 벗어나, 다른 공기와 다른 빛, 다른
                                            마음은 이...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="mypage-card2">
                                <div className="card2-content">
                                    <div className="card2-thumb">
                                        <div className="card-bottom-info">
                                            <img src="/images/login/찜버튼.png" className="wish-icon" />
                                        </div>
                                    </div>
                                    <div className="card2-text-wrap">
                                        <p className="card2-title">Jeju <span className="card2-sub">스누피가든</span></p>
                                        <p className="card2-desc">여행을 떠난다는 것은 단순히 지도를 따라 새로운 장소를 방문하는 행위가 아니다. 익숙한 생활의 틀을 잠시 벗어나, 다른 공기와 다른 빛, 다른
                                            마음은 이...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="swiper-button-next"></div>
                    <div className="swiper-button-prev"></div>
                </div> */}
            </section>

            <section className="mypage-section">
                <h3 className="mypage-section-title">추천 여행지</h3>
                <div className="mypage-list">
                    <div className="mypage-list-item">
                        <div className="mypage-list-thumb"></div>
                        <div className="mypage-list-info">
                            <p className="mypage-list-title">Jeju<span className="mypage-sub-title">스누피가든</span></p>
                            <ul>
                                <li>주소 : 제주특별자치도 제주시 구좌읍 금백조로 930</li>
                                <li>휴일 : 연중무휴</li>
                                <li>이용가능시설 : 가든 하우스 / 야외가든</li>
                            </ul>
                        </div>
                        <img src="/images/login/찜버튼.png" className="wish-icon" />

                        <button className="mypage-list-btn">상세 정보 보러가기</button>
                    </div>



                    <div className="mypage-list-item">
                        <div className="mypage-list-thumb"></div>
                        <div className="mypage-list-info">
                            <p className="mypage-list-title">Jeju<span className="mypage-sub-title">스누피가든</span></p>
                            <ul>
                                <li>주소 : 제주특별자치도 제주시 구좌읍 금백조로 930</li>
                                <li>휴일 : 연중무휴</li>
                                <li>이용가능시설 : 가든 하우스 / 야외가든</li>
                            </ul>
                        </div>
                        <img src="/images/login/찜버튼.png" style={{ width: '38px', height: '38px', cursor: 'pointer' }} />
                        <button className="mypage-list-btn">상세 정보 보러가기</button>
                    </div>



                    <div className="mypage-list-item">
                        <div className="mypage-list-thumb"></div>
                        <div className="mypage-list-info">
                            <p className="mypage-list-title">Jeju<span className="mypage-sub-title">스누피가든</span></p>
                            <ul>
                                <li>주소 : 제주특별자치도 제주시 구좌읍 금백조로 930</li>
                                <li>휴일 : 연중무휴</li>
                                <li>이용가능시설 : 가든 하우스 / 야외가든</li>
                            </ul>
                        </div>
                        <img src="/images/login/찜버튼.png" style={{ width: '38px', height: '38px', cursor: 'pointer' }} />
                        <button className="mypage-list-btn">상세 정보 보러가기</button>
                    </div>
                </div>
            </section>

        </div>

    )
}

export default MyPage
