from flask import Flask,jsonify,request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager,create_access_token,jwt_required


app = Flask(__name__)

CORS(app)


SQLALCHEMY_DATABASE_URI = "mysql+mysqlconnector://{username}:{password}@{hostname}/{databasename}".format(
    username="AnishKrishnan",
    password="agaram12345",
    hostname="AnishKrishnan.mysql.pythonanywhere-services.com",
    databasename="AnishKrishnan$default",
)
app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_POOL_RECYCLE"] = 299
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
JWTManager(app)
db = SQLAlchemy(app)
app.secret_key='hey'
class resumeBuilderRegister(db.Model):
    __tablename__ = 'resumeRegister'
    userId = db.Column(db.Integer,primary_key=True,autoincrement=True)
    userName = db.Column(db.String)
    userEmail = db.Column(db.String)
    userPassword = db.Column(db.String)


@app.route('/createResumeUser',methods=['POST'])
def createResumeUser():
    if request.method == 'POST':
        data = request.form
        newUser = resumeBuilderRegister(userName = data['userName'],userEmail = data['userEmail'],userPassword = data['userPassword'])
        db.session.add(newUser)
        db.session.commit()
        return 'success'


@app.route('/loginResumeUser',methods=['POST'])
def loginResumeUser():
    data=request.form
    loginData = resumeBuilderRegister.query.filter_by(userEmail = data['userEmail'],userPassword = data['userPassword']).first()

    if loginData is None:
        return 'user is not found'

    return jsonify({'userId':loginData.userId,'userName':loginData.userName,'userEmail':loginData.userEmail,'userPassword':loginData.userPassword})

class JobResume(db.Model):
    __tablename__ = 'resume'
    resumeId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    userId = db.Column(db.Integer, db.ForeignKey('resumeRegister.userId'), nullable=False)
    resumeData = db.Column(db.String)


@app.route('/newResume',methods=['POST'])
def createResume():
    new_resume = request.form
    resumes = JobResume(resumeData=new_resume['resumeData'],userId=new_resume['userId'])
    db.session.add(resumes)
    db.session.commit()
    return 'Resume Created Successfully'

@app.route('/getResume/<int:Id>',methods = ['GET'])
def getResume(Id):
    resumeData = JobResume.query.filter_by(userId = Id).all()
    return jsonify(
        [
            {
                'resumeId':data.resumeId,'resumeData':data.resumeData
            }for data in resumeData
        ]
        )

@app.route('/deleteResume/<int:Id>',methods=['DELETE'])
def deletResume(Id):
    deleteRes = JobResume.query.filter_by(resumeId = Id).first()
    db.session.delete(deleteRes)
    db.session.commit()
    return jsonify({'message':'Resume Deleted successfully'})


@app.route('/getEditedResume/<int:resId>',methods = ['GET'])
def getEditedResume(resId):
    editedResume = JobResume.query.filter_by(resumeId=resId).first()

    if editedResume is None:
        return 'resume not found'

    return jsonify({'resumeData':editedResume.resumeData})

@app.route('/updateResume/<int:resId>',methods=['PUT'])
def updateResume(resId):
    updates = JobResume.query.filter_by(resumeId = resId).first()
    updates.resumeData = request.form['resumeData']
    db.session.commit()
    return jsonify({'message':'Resume updated successfully'})

@app.route('/outputResume/<int:resumeId>', methods = ['GET'])
def getOutputResume(resumeId):
    resumes = JobResume.query.filter_by(resumeId=resumeId).first()
    if resumes is None:
        return 'resume not found'

    return jsonify({'resumeData':resumes.resumeData,'resumeId':resumes.resumeId,'userId':resumes.userId})
