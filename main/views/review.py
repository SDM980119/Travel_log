from flask import Blueprint

bp = Blueprint('review',__name__)
@bp.route("/review",methods=['GET'])
def reviewList():
    return

# @bp.route("/review/<int:review_id>",methods=['GET','POST'])
# def review(review_id):
#     return

@bp.route("/review/write",methods=['POST'])
def reviewWrite():
    return