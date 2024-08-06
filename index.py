from flask import Flask, render_template, request, url_for, redirect, flash, jsonify, session
from passlib.hash import sha256_crypt
from flask_mysqldb import MySQL
# os: For interacting with the operating system.
import os
from werkzeug.utils import secure_filename 
from flask_mail import Message, Mail



# Initialize the Flask application
app = Flask(__name__)

app.config["MYSQL_HOST"] = "localhost"
app.config["MYSQL_USER"] = "root"
app.config["MYSQL_PASSWORD"] = ""
app.config["MYSQL_DB"] = "movie_app"
app.config["MYSQL_CURSORCLASS"] = "DictCursor"

# Configure Flask-Mail for email functionality

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'joshua.nelson.ehis@gmail.com'
app.config['MAIL_PASSWORD'] = 'ehvjaoyipyxjvtez'
app.config['MAIL_DEFAULT_SENDER'] = 'joshua.nelson.ehis@gmail.com'


subject = 'Test Email'
mail = Mail(app)


# Configure file upload settings
UPLOAD_FOLDER = "static/assets/images"
# UPLOAD_FOLDER = "static/assets/videos"


app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'text', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}



# Configure upload folder and secret key for flashing messages

# Initialize MySQL connection
mysql = MySQL(app)


# Route for user registration
@app.route("/register", methods=["GET", "POST"])
# Handle form submission, e.g., process user registration
# GET requests are typically used to retrieve data or render a page.
# POST requests are usually used to submit data, such as form submissions.
def register():
    if request.method == "POST":  # Save to the database
        username = request.form["username"]
        password = request.form["password"]
        email = request.form["email"]
        passhash = sha256_crypt.encrypt(password)

        msg = Message(subject,
                recipients=[email],
                sender=app.config['MAIL_DEFAULT_SENDER'])
        msg.body = "thanks for registering"
        # msg.html = render_template('email_template.html', message=message_body)
        # mail.send(msg)
        # info = 'Email sent Successfully!'
        try:
            mail.send(msg)
            info = 'Email sent successfully!'
            if(info):
                dbcon = mysql.connection.cursor()
                if dbcon:
                    sql = """
                    INSERT INTO doou(username, password, email) VALUES(%s, %s, %s)"""
                    dbcon.execute(sql, (username, passhash, email))
                    mysql.connection.commit()
                    return render_template("sign.html")
                error = f"wrong request method"
                return render_template("reg.html", error = error)     
            return jsonify(info)
        except Exception as e:
            return str(e)
        
    else: 
        error = f"wrong request method"
        return render_template("reg.html", error = error) 
        # dbcon = mysql.connection.cursor()
        # if dbcon:
        #     sql = """
        #     INSERT INTO doou(username, password, email) VALUES(%s, %s, %s)"""
        #     dbcon.execute(sql, (username, passhash, email))
        #     mysql.connection.commit()
        #     return render_template("sign.html")
        # return render_template("sign.html")
    # return render_template("reg.html")
    

# Route for user login
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST": # Save to the database
        email = request.form["email"]
        password = request.form["password"]
        cursor = mysql.connection.cursor()
        if cursor:
            sql = """
            SELECT * FROM doou WHERE email = %s"""
            result = cursor.execute(sql, (email,))
            feedback = cursor.fetchone()  #fetchone is used to get the first row of the result from the query execution.
            if(feedback):
                username = feedback["username"]
                email = feedback["email"]
                passwordDb = feedback["password"]
                if sha256_crypt.verify(password, passwordDb):
                    session['logged_in'] = True
                    session['email'] = email
                    flash("you are now logged in", "success")
                    return render_template('dashboard.html', username = username)
            return render_template("sign.html")
        else:
            return render_template("sign.html")

# @app.route("/sendmail", methods=["GET", "POST"])
# def send_email():
#     if(request.method == 'GET'):
#         return render_template('email_template.html')
    
#     firstname = request.form['firstname']
#     email = request.form['email']

#     print(firstname)
 
#     msg = Message(subject,
#                   recipients=[email],
#                   sender=app.config['MAIL_DEFAULT_SENDER'])
#     msg.body = message_body
#     # msg.html = render_template('email_template.html', message=message_body)
#     try:
#         mail.send(msg)
#     except Exception as e:
#         return str(e)
#     info = 'Email sent successfully!'        
#     send = mail.send(msg) 
#     if (send):
#         return jsonify("email sent successfully")    
#     else: 
#         jsonify("email sent successfully")   

    


@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

# @app.route("/imageupload", methods=["GET", "POST"])
# def imageupload():
#       if(request.method == "GET"):
#         return render_template("imageupload.html")
#       if(request.method == "POST"):
#         file = request.files["file"]
#         path = os.path.join(app.config['UPLOAD_FOLDER'], file.image)
#         file.save(path)
#         print(path)
#           # return (image)

@app.route("/imageupload", methods=["GET", "POST"])
def imageupload():
    if (request.method == "GET"):
        return render_template("imageupload.html")
    if (request.method == "POST"):
        file = request.files['image']
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and file.filename:
           filename = secure_filename(file.filename)
           file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        #    return jsonify(app.config['UPLOAD_FOLDER'])
        





@app.route("/update-user", methods=["GET", "POST"])
def updateUser():
    if(request.method == "POST"):  # Update user in the database
       username = request.form['username']
       email = request.form["email"]
       cursor = mysql.connection.cursor()
      # if 'email' in session:
      # current_email = session['email']
       cursor = mysql.connection.cursor()
       sql = f"""
        UPDATE doou SET username = %s, email = %s WHERE email = %s"""
       cursor.execute(sql, (username, email, session['email']))
       mysql.connection.commit()
       cursor.close()
       return("updated successfully")
    else:
        return render_template("update.html")
                 
    

if __name__ == "__main__":
    app.secret_key = "dosh007"
    app.run(debug=True, port=5001)
