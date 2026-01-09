import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ReviewWritePage = () => {
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);

  const [form, setForm] = useState({
    title:"",
    content:"",
    image:""
  })

  const photoUpload = () => {
    fileInputRef.current?.click();
  };


  const photoChange = (e) => {
    const files = Array.from(e.target.files);

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
    e.target.value = "";
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(images[index].preview);
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // 페이지 이탈/언마운트 시 메모리 누수 방지
  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.preview));
    };
  }, [images]);

  return (
    <div className="board__form-wrap">
      <div className="board__form-inner">
        <form action="">
          <div className="board__form-header">
            <div className="img-wrap">{/* 프로필 이미지 영역 */}</div>
          </div>

          <div className="board__form-content">
            <div className="board__form-section">
              <label htmlFor="place">어떤 장소를 여행하셨나요?</label>
              <input id="place" type="text" placeholder="장소를 입력해주세요"  value={form.title} onChange={(e) => setForm({...form, title : e.target.value})}/>
            </div>

            <div className="board__form-section">
              <label htmlFor="review">리뷰를 작성해주세요</label>
              <textarea
                id="review"
                placeholder="여행에 대한 솔직한 후기를 남겨주세요"
                value={FormData}
                onChange={(e) => setForm({...form, content:e.target.value})}
              />
            </div>

            <div className="board__form-section">
              <label htmlFor="photo">사진 업로드</label>

              <div className="photo-wrap">
                {/* upload */}
                <div className="photo-item photo__upload-wrap">
                  <button type="button" onClick={photoUpload}>
                    <img src="/images/common/p.png" alt="사진업로드" />
                    <p>사진 업로드</p>
                  </button>

                  <input
                    ref={fileInputRef}
                    id="photo"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={photoChange}
                    className="blind"
                  />
                </div>

                {/* preview */}
                {images.map((img, index) => (
                  <div key={index} className="photo-item photo__preview-wrap">
                    <img src={img.preview} alt={`preview-${index}`} />

                    <button
                      type="button"
                      className="photo__remove"
                      onClick={() => removeImage(index)}
                      aria-label="이미지 삭제"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="btn-wrap">
              <button type="submit" className="btn btn-submit">
                글 등록
              </button>
              <Link to="/review" className="btn btn-cancel">
                취소
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewWritePage;
