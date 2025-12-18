from dataclasses import field

from flask import Blueprint, request, jsonify
from pyexpat.errors import messages
from werkzeug.security import generate_password_hash

from main import db
from main.models import User

bp = Blueprint('auth', __name__)

@bp.route("/SignUp", methods=["GET","POST"])
def signUp():
    data = request.get_json()
    print (data)
    userid = data.get('userid')
    password = data.get('password')
    gender = data.get('gender')
    email = data.get('email')
    username = data.get('username')
    phone = data.get('phone')

    if not all([userid, password, gender, email, username, phone]):
        return jsonify({'message':'필수 값 누락'})

    if User.query.filter_by(userid=userid).first():
        return jsonify({'message': '이미 존재하는  아이디'})
    if User.query.filter_by(username=username).first():
        return jsonify({'message': '이미 존재하는 닉네임'})
    if User.query.filter_by(email=email).first():
        return jsonify({'message': '이미 존재하는 이메일'})
    if User.query.filter_by(phone=phone).first():
        return jsonify({'message': '이미 존재하는 전화번호'})

    hashed_pw = generate_password_hash(password)

    user = User(
        userid=userid,
        username=username,
        password=hashed_pw,
        gender=gender,
        phone=phone,
        email=email,
    )

    db.session.add(user)
    db.session.commit()


    return {'message': '회원 가입 성공' },201


@bp.route("/check", methods=["POST"])
def check_duplicate():
    data = request.get_json()

    field = data.get('field')
    value = data.get('value')

    if not field or not value:
        return jsonify({'message' : '잘못된 요청'}), 400

    field_map = {
        'userid' : User.userid,
        'username' : User.username,
        'email' : User.email,
        'phone' : User.phone,
    }


    if field not in field_map:
        return jsonify({'message' : '허용되지 않은 필드'})

    exists = User.query.filter(field_map[field] == value).first()

    return jsonify({'available' : False if exists else True})