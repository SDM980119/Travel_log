import requests
import os
import uuid
from flask import Blueprint, request, jsonify,current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from main import db
from main.models import Review
import json

bp = Blueprint('review',__name__)
@bp.route("/review",methods=['GET'])
def reviewList():

    return

# @bp.route("/review/<int:review_id>",methods=['GET','POST'])
# def review(review_id):
#     return

@bp.route("/review/write", methods=["POST"])
@jwt_required()
def reviewWrite():
    user_id = get_jwt_identity()

    title = request.form.get("title")
    content = request.form.get("content")
    files = request.files.getlist("images")

    image_urls = []

    for file in files:
        ext = file.filename.rsplit(".", 1)[-1]
        filename = f"{uuid.uuid4()}.{ext}"
        path = f"static/review_img/{filename}"

        file.save(os.path.join(current_app.root_path, path))
        image_urls.append(path)

    review = Review(
        title=title,
        content=content,
        user_id=user_id,
        image_urls=json.dumps(image_urls)
    )

    db.session.add(review)
    db.session.commit()

    return jsonify({
        "message": "리뷰 등록 완료",
        "review_id": review.id,
        "image_urls": image_urls
    }), 201


@bp.route("/review/<int:review_id>", methods=["POST"])
@jwt_required()
def reviewLike(review_id):
    review = Review.query.get_or_404(review_id)
    review.like_count += 1
    db.session.commit()

    return jsonify({
        "review_id": review.id,
        "like_count": review.like_count
    })