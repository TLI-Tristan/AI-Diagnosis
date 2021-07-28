import io
from re import A
from flask import Flask
from flask import jsonify
from flask import request

import tensorflow as tf
import tensorflow.keras as keras
import cv2 as cv
import numpy as np
import pandas as pd
import os
from PIL import Image
import io
from flask import send_file

app = Flask(__name__)

model = tf.keras.models.load_model('brain_tumor_segmentation_model_v5')

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

    print(image.shape)

    #image = cv.resize(np.array(image).astype(np.float64), dsize=(256, 256), interpolation=cv.INTER_AREA)

    predicted = model.predict(np.array([image/11073.25]))
    predicted_processed = generate_mask_color2(predicted[0])

    img = Image.fromarray(predicted_processed.astype('uint8'))
    img_obj = io.BytesIO()
    img.save(img_obj, format="PNG")
    img_obj.seek(0)

    return send_file(img_obj, mimetype='image/PNG')

if __name__ == "__main__":
    app.run(debug=False)
