"""
Local test server that serves the site the way Cloudflare Pages does:
/ -> index.html, /about -> about.html, /some-folder/ -> some-folder/index.html,
and every other file as-is. Pages are served as static files, not templates.

Run: python testServer.py  (then open http://localhost:4000)
"""
import os

from flask import Flask, abort, redirect, request, send_from_directory

SITE_ROOT = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__, static_folder=None)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def route(path):
    # Never serve .git, .gitignore, or other dotfiles.
    if any(part.startswith('.') for part in path.split('/')):
        abort(404)

    full_path = os.path.join(SITE_ROOT, path)

    if os.path.isdir(full_path):
        if not os.path.isfile(os.path.join(full_path, 'index.html')):
            abort(404)
        # Folders need a trailing slash so relative links inside them resolve.
        if path and not request.path.endswith('/'):
            return redirect(request.path + '/', code=308)
        return send_from_directory(SITE_ROOT, os.path.join(path, 'index.html'))

    if os.path.isfile(full_path):
        return send_from_directory(SITE_ROOT, path)

    if os.path.isfile(full_path + '.html'):
        return send_from_directory(SITE_ROOT, path + '.html')

    abort(404)


if __name__ == '__main__':
    app.run(port=4000)
