from flask import Blueprint

bp = Blueprint('main', __name__)

@bp.route("/", methods=["GET", "POST"])
def ping():
    return {"message":"집가고싶다"}
