from flask import Blueprint

bp = Blueprint('wishlist', __name__)
@bp.route("/wishlist", methods=["POST"])
def addwishlist():
    return