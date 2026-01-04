
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from main.models import User, Places
bp = Blueprint("mypage", __name__)
@bp.route("/mypage", methods=["GET"])
@jwt_required()
def mypage():
    userid = get_jwt_identity()

    user = User.query.get(userid)
    if not user:
        return jsonify({"message":"회원이 아닙니다."})
    # places = Places.query.filter(Places.type == "travel").all

    # place_list = []
    # for place in places:
    #     place_list.append({
    #         "Pid": place.id,
    #         "ptype": place.type,
    #         "pname": place.name,
    #         "pimg": place.image_urls,
    #         "paddress": place.address,
    #         "Pclosed": place.closed_days,
    #         "pamenities": place.amenities,
    #     })
    return jsonify({
            "id":user.id,
            "userid":user.userid,
            "username":user.username,
            "gender":user.gender,
            "email":user.email,
            "phone":user.phone,
            "user_img": f"/static/user_img/{user.profile_image}",
        }), 200

