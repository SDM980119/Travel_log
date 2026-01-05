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

@bp.route("/places/detail/<int:place_id>", methods=["GET"])
def place_detail(place_id):
    places = Places.query.get_or_404(place_id)

    return jsonify({
        "id": places.id,
        "type": places.type,
        "city": places.city,
        "name": places.name,
        "description": places.description,
        "image": json.loads(places.image_urls),
        "address": places.address,
        "contact_number": places.contact_number,
        "website_url": places.website_url,
        "closed_days": places.closed_days,
        "operating_hours": places.operating_hours,
        "admission_type": places.admission_type,
        "parking_available": places.parking_available,
        "parking_fee": places.parking_fee,
        "requires_reservation": places.requires_reservation,
        "amenities": places.amenities,
        "description": places.description,
        "latitude": places.latitude,
        "longitude": places.longitude,



    })

