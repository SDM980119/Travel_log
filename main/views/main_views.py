from flask import Blueprint

from flask import Blueprint, request, jsonify
from sqlalchemy.sql import func
from main.models import Places
import json

bp = Blueprint('main', __name__)

@bp.route("/main", methods=["GET"])
def main():
    def get_random_place(place_type, limt):
        places = (
            Places.query
            .filter_by(type=place_type)
            .order_by(func.random())
            .limit(limt)
            .all()
        )

        return [
            {
                "id": place.id,
                "type": place.type,
                "image": json.loads(place.image_urls),
            }
            for place in places
        ]
    return jsonify({
        "travel": get_random_place("travel", 3),
        "activity": get_random_place("activity", 6),
        "festival": get_random_place("festival", 8),
    }), 200

