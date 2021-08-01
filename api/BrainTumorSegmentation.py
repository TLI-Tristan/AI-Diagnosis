import io
from re import A
from flask import Flask
from flask import jsonify
from flask import request

import tensorflow as tf
import numpy as np
from PIL import Image
import cv2 as cv
import io
from flask import send_file

app = Flask(__name__)

model = tf.keras.models.load_model('static/model/brain_tumor_segmentation_model_v5')

max_pixel = 11073.25


def generate_mask_color2(mask):

    rows = mask.shape[0]
    cols = mask.shape[1]

    image = np.zeros((rows, cols, 3), dtype=np.uint8)
    label_mask = np.argmax(mask, axis=-1)

    image[label_mask == 0] = (0, 0, 0)
    image[label_mask == 1] = (255, 0, 0)
    image[label_mask == 2] = (0, 255, 0)
    image[label_mask == 3] = (0, 0, 255)
    return image


@app.route("/predictImage", methods=["POST"])
def predictImage():
    image = np.load(request.files["file"])

    #image = cv.resize(np.array(image).astype(np.float64), dsize=(256, 256), interpolation=cv.INTER_AREA)

    predicted = model.predict(np.array([image/11073.25]))
    predicted_processed = generate_mask_color2(predicted[0])

    img = Image.fromarray(predicted_processed.astype('uint8'))
    
    img_obj = io.BytesIO()
    img.save(img_obj, format="PNG")
    img_obj.seek(0)

    return send_file(img_obj, mimetype='image/PNG')

@app.route("/predictImageWithResize", methods=["POST"])
def predictImageWithResize():
    image = np.load(request.files["file"])

    predicted = model.predict(np.array([image/11073.25]))
    predicted_processed = generate_mask_color2(predicted[0])

    resized_img = cv.resize(predicted_processed, dsize=(512,512), interpolation=cv.INTER_LINEAR)
    img = Image.fromarray(resized_img.astype('uint8'))

    img_obj = io.BytesIO()
    img.save(img_obj, format="PNG")
    img_obj.seek(0)

    return send_file(img_obj, mimetype='image/PNG')

@app.route("/predictImageWithOverlay", methods=["POST"])
def predictImageWithOverlay():
    image = np.load(request.files["file"])

    print(image.shape)

    predicted = model.predict(np.array([image/11073.25]))
    predicted_processed = generate_mask_color2(predicted[0])

    mask = Image.fromarray(predicted_processed.astype('uint8'))
    original_image = Image.fromarray(image/11073.25*255)

    mask = mask.convert("RGBA")
    original_image = original_image.convert("RGBA")

    img = Image.blend(original_image, mask, 0.2)

    img_obj = io.BytesIO()
    img.save(img_obj, format="PNG")
    img_obj.seek(0)

    return send_file(img_obj, mimetype='image/PNG')

@app.route("/predictImageWithOverlayResize", methods=["POST"])
def predictImageWithOverlayResize():
    image = np.load(request.files["file"])

    print(image.shape)

    predicted = model.predict(np.array([image/11073.25]))
    predicted_processed = generate_mask_color2(predicted[0])

    mask = cv.resize(predicted_processed, dsize=(512,512), interpolation=cv.INTER_LINEAR)
    original_image = cv.resize(image, dsize=(512,512), interpolation=cv.INTER_LINEAR)

    mask = Image.fromarray(mask.astype('uint8'))
    original_image = Image.fromarray(original_image/11073.25*255)

    mask = mask.convert("RGBA")
    original_image = original_image.convert("RGBA")

    img = Image.blend(original_image, mask, 0.2)

    img_obj = io.BytesIO()
    img.save(img_obj, format="PNG")
    img_obj.seek(0)

    return send_file(img_obj, mimetype='image/PNG')

if __name__ == "__main__":
    app.run(debug=False)
