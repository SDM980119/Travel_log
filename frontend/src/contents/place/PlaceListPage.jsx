import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPlaces } from "../../API/places";
import Pagination from "../../components/common/Pagination";

const PER_PAGE = 12;

const PlaceListPage = () => {
  const { type } = useParams();
  const [places, setPlaces] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getPlaces(type)
      .then((res) => {
        setPlaces(res.data);
        setPage(1);
      })
      .catch((err) => console.error(err));
  }, [type]);

  const placeList = useMemo(
    () =>
      places.map((p) => ({
        id: p.id,
        img: `http://localhost:5000/${p.image?.[0] ?? ""}`,
        title: p.name,
        desc: p.description,
      })),
    [places]
  );

  const totalPages = Math.max(
    1,
    Math.ceil(placeList.length / PER_PAGE)
  );

  const pagedList = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return placeList.slice(start, start + PER_PAGE);
  }, [placeList, page]);

  const type_Label = {
    travel: "여행지",
    festival: "축제",
    activity: "액티비티",
  };

  return (
    <div className="placelist-wrap">
      <section className="placelist__header-wrap">
        <div className="placelist__header">
          <p>Destination</p>
        </div>

        <div className="title-wrap">
          <h2>{type_Label[type]}</h2>
          <p>다양한 {type_Label[type]}를 만나보세요!</p>
        </div>

        <div className="placelist__search-wrap">
          <form>
            <input placeholder="마음에 드는 여행지를 찾아보세요" />
            <button type="submit">Search</button>
          </form>
        </div>
      </section>

      <section className="placelist__list-wrap">
        {pagedList.map((place) => (
          <div key={place.id} className="placelist__list-item">
            <Link to={`/places/detail/${place.id}`}>
              <div className="img-wrap">
                <img src={place.img} alt={place.title} />
              </div>

              <div className="text-wrap">
                <p className="title">{place.title}</p>
                <p className="text">{place.desc}</p>
              </div>
            </Link>
          </div>
        ))}

        <Pagination
          page={page}
          totalPages={totalPages}
          onChange={setPage}
        />
      </section>
    </div>
  );
};

export default PlaceListPage;
