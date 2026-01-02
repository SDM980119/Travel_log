from tkinter import Place

from flask import Blueprint, request, jsonify
from main.models import Places
from main import db
import json

bp = Blueprint("places", __name__)

@bp.route("/places", methods=["GET"])

def places():
    place_type = request.args.get("type")

    query = Places.query
    if place_type:
        query = query.filter_by(type=place_type)

    places = query.all()

    result = []
    for p in places:
        result.append({
            "id": p.id,
            "type": p.type,
            "city": p.city,
            "name": p.name,
            "description": p.description,
            "image": json.loads(p.image_urls),
        })

    return jsonify(result),200

