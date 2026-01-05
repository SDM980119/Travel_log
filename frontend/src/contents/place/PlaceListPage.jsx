import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import { getPlaces } from "../../API/places";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "./PlaceListPage.css";


const PlaceListPage = () => {
  const { type } = useParams();
  const [places, setPlaces] = useState([])

  useEffect(() => {
    getPlaces(type)
    .then(res => {
      console.log("응답데이터", res.data);
      setPlaces(res.data)})
    .catch(err =>  console.error(err))
  }, [type])

  const placeList = places.map((places) => ({
    id: places.id,
    img: `http://localhost:5000/${places.image[0]}`, // 경로 맞게 수정!
    title: places.name,
    desc: places.description,
  }));
  
  const type_Label = {
    travel: "여행지",
    festival: "축제",
    activity: "액티비티",
  }

    return (
      <>
        <section className="section-wrap">
          <div className="section-img">
            <img src="/images/placelist/main.png" alt="여행지" />
            <p>Destination</p>
          </div>

          <h2>{type_Label[type]}</h2>
          <p>다양한 {type_Label[type]}를 만나보세요!</p>

          <div className="section-search">
            <button type="button" className="searchBtn">Search</button>
            <input className="searchInput" placeholder="마음에 드는 여행지를 찾아보세요" />
          </div>
        </section>

        <section className="section-b">
          <Swiper
            modules={[Grid, Pagination]}
            spaceBetween={32}
            grid = {{rows:3}}
            pagination={{ clickable: true }}
            breakpoints={{
              0: { slidesPerView: 1, grid: { rows: 1 }, spaceBetween : 20 },        // 모바일
              768: { slidesPerView: 2, grid: { rows: 2 }, spaceBetween : 24 },        // 태블릿
              1024: { slidesPerView: 3, grid: { rows: 3, fill: "row" }, spaceBetween : 28 }, // PC
            }}
            className="mySwiper"
          >
            {placeList.map(place => (
              <SwiperSlide key={place.id}>
                <article className="card"> 
                  <Link to={`/places/detail/${place.id}`}>
                  <div className="card-img">
                    <img src={place.img} alt={place.title} />
                  </div>

                  <div className="card-text">
                    <h3>{place.title}</h3>
                    <p>{place.desc}</p>
                  </div>
                </Link>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </>
    );
  }
  export default PlaceListPage