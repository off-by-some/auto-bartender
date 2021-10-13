import os
import random
from flask import Flask, send_from_directory
from auto_bartender.server.app import app

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    # Check if the requested path lives in the static folder
    static_folder_file = app.static_folder + '/' + path
    file_in_static_folder = os.path.exists(static_folder_file)

    # Check if the requested path lives in the react app's folder
    react_dist_folder = f"{app.static_folder}/app"
    react_dist_file = f"{react_dist_folder}/{path}" 
    file_in_react_folder = os.path.exists(react_dist_file)

    if path != "" and file_in_static_folder:
        return send_from_directory(app.static_folder, path)

    if path != "" and file_in_react_folder:
        return send_from_directory(react_dist_folder, path)

    return send_from_directory(react_dist_folder, 'index.html')


def random_image(img_dir):
    """
    Return a random image from the ones in the static/ directory
    """
    img_list = os.listdir(img_dir)
    img_path = os.path.join(img_dir, random.choice(img_list))
    return img_path


@app.route('/images/random')
def serve_images():
    base_path = f"{app.static_folder}/images"
    img_list = os.listdir(base_path)
    img_name = random.choice(img_list)
    print(f"{base_path}/{img_name}")
    return send_from_directory(base_path, img_name)
