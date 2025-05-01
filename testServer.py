import json

from flask import Flask, request, jsonify, render_template
from werkzeug.utils import send_from_directory

app = Flask(__name__, template_folder='.')
@app.route('/<path>')
def route(path):
    if path == '':
        path = 'index.html'
    return render_template(path + '.html')

@app.route('/climbing-club-blog/blog-manifest.json')
def blogData():
    with open('climbing-club-blog/blog-manifest.json', 'r') as f:
        return jsonify(json.load(f))

if __name__ == '__main__':
    app.run()
