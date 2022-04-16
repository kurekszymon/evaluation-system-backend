# pylint: disable=C0116, C0114

from os import path, getcwd, environ
import refextract
from flask import Flask, request
from flask_cors import CORS
from werkzeug.utils import secure_filename
UPLOAD_FOLDER = path.join(getcwd(), "Uploads")
ALLOWED_EXTENSIONS = ".pdf"

app = Flask(__name__)
CORS(app, origins="*")


def is_file_allowed(filename):
    return filename.lower().endswith(ALLOWED_EXTENSIONS)


def extract_bibliography_from_file(file_path=None):
    file_path = str(file_path)
    if not path.isfile(file_path):
        return {"message": "Could not find a file to process", "data": None}

    references = refextract.extract_references_from_file(file_path)
    return references


@app.route("/")
def hello():
    return "Hello"


@app.route("/files/upload", methods=["POST"])
def upload_file():
    """Uploads and saves a file, returns `file_path`, `file_name`"""
    if "file" not in request.files:
        return {
            "message": "`file` was not present in a request body",
            "data": None,
        }, 404

    file = request.files["file"]

    if file.filename == "":
        return {"message": "No file was uploaded", "data": None}, 404

    if not is_file_allowed(file.filename):
        return {
            "message": "Could not uplodad file, only PDF files are accepted",
            "data": None,
        }, 422

    if file and is_file_allowed(file.filename):
        file_name = secure_filename(file.filename)
        file_path = path.join(UPLOAD_FOLDER, file_name)
        file.save(file_path)

        return {
            "message": "File was successfully uploaded",
            "data": {"file_name": file_name, "file_path": file_path},
        }

    return {"message": "File could not be created, please try again", "data": None}


@app.route("/publications/process", methods=["POST"])
def process_publication():
    if "file_path" not in request.json or request.json["file_path"] == "":
        return {
            "message": "`file_path` was not present in request body",
            "data": None,
        }, 404

    file_path = request.json["file_path"]

    references = extract_bibliography_from_file(file_path)

    return {
        "message": "Successfully extracted references from file",
        "data": {"references": references},
    }


if __name__ == "__main__":
    port = int(environ.get("PORT", 5000))
    app.run(debug=True, host="0.0.0.0", port=port)
