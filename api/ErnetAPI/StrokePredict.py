import pandas as pd
from flask import Flask
from flask import jsonify
from flask import request

from joblib import dump, load

app = Flask(__name__)

predictor = load("./models_training/stroke_detection_RF.joblib")

@app.route("/strokePredict", methods=["POST"])

def strokePredict():
    input = request.get_json()

    target = ["Stroke"]
    
    gender = input["gender"]
    age = input["age"]
    hypertension = input["hypertension"]
    heart_disease = input["heart_disease"]
    ever_married = input["ever_married"]
    avg_glucose_level = input["avg_glucose_level"]
    bmi = input["bmi"]
    smoking_status = input["smoking_status"]


    '''
    stroke_dataset = pd.read_csv("./models_training/healthcare-dataset-stroke-data.csv")

    stroke_dataset['smoking_status_predict'] = 0
    stroke_dataset['gender_predict'] = 0
    stroke_dataset['ever_married_predict'] = 0


    stroke_dataset['smoking_status_predict'] = pd.Categorical(smoking_status)
    datasetDummies_smoking_status_predict = pd.get_dummies(stroke_dataset['smoking_status_predict'], prefix='smoking_status_predict_encoded')

    stroke_dataset['gender_predict'] = pd.Categorical(gender)
    datasetDummies_gender_predict = pd.get_dummies(stroke_dataset['gender_predict'], prefix='gender_predict_encoded')

    stroke_dataset['ever_married_predict'] = pd.Categorical(ever_married)
    datasetDummies_ever_married_predict = pd.get_dummies(stroke_dataset['ever_married_predict'], prefix='ever_married_encoded')


    stroke_dataset = pd.concat([stroke_dataset, datasetDummies_smoking_status_predict], axis=1)
    stroke_dataset = pd.concat([stroke_dataset, datasetDummies_gender_predict], axis=1)
    stroke_dataset = pd.concat([stroke_dataset, datasetDummies_ever_married_predict], axis=1)
    
    
    stroke_dataset['smoking_status'] = smoking_status.map({'never smoked': 0, 'smokes': 1, 'formerly smoked': 2,
                                                                            'Unknown': 3})
    stroke_dataset['gender'] = gender.map({'Male': 0, 'Female': 1})
    stroke_dataset['ever_married'] = ever_married.map({'No': 0, 'Yes': 1})
    '''


    smoking_status_dict = {'never smoked': 0, 'smokes': 1, 'formerly smoked': 2,'Unknown': 3}
    #[smoking_status[x] for x in smoking_status_dict]
    smoking_status = smoking_status_dict[smoking_status]
    
    gender_dict = {'Male': 0, 'Female': 1}
    #[gender[x] for x in gender_dict.keys()]
    gender = gender_dict[gender]
    
    married_dict = {'No': 0, 'Yes': 1}
    #[ever_married[x] for x in married_dict]

    ever_married = married_dict[ever_married]


    result = predictor.predict([[gender, age, hypertension, heart_disease, ever_married, avg_glucose_level, bmi, smoking_status]])

    return jsonify({"result": target[result[0]]})




if __name__ == '__main__':
    app.run(debug=True)

'''
stroke_dataset['work_type'] = pd.Categorical(stroke_dataset['work_type'])
    datasetDummies_work_type = pd.get_dummies(stroke_dataset['work_type'], prefix='work_type_encoded')

    stroke_dataset['Residence_type'] = pd.Categorical(stroke_dataset['Residence_type'])
    datasetDummies_Residence_type = pd.get_dummies(stroke_dataset['Residence_type'], prefix='Residence_type_encoded')

    stroke_dataset['smoking_status'] = pd.Categorical(stroke_dataset['smoking_status'])
    datasetDummies_smoking_status = pd.get_dummies(stroke_dataset['smoking_status'], prefix='smoking_status_encoded')

    stroke_dataset['gender'] = pd.Categorical(stroke_dataset['gender'])
    datasetDummies_gender = pd.get_dummies(stroke_dataset['gender'], prefix='gender_encoded')

    stroke_dataset['ever_married'] = pd.Categorical(stroke_dataset['ever_married'])
    datasetDummies_ever_married = pd.get_dummies(stroke_dataset['ever_married'], prefix='ever_married_encoded')

    stroke_dataset.drop("work_type", axis=1, inplace=True)
    stroke_dataset.drop("Residence_type", axis=1, inplace=True)
    stroke_dataset.drop("smoking_status", axis=1, inplace=True)
    stroke_dataset.drop("gender", axis=1, inplace=True)
    stroke_dataset.drop("ever_married", axis=1, inplace=True)


    stroke_dataset = pd.concat([stroke_dataset, datasetDummies_work_type], axis=1)
    stroke_dataset = pd.concat([stroke_dataset, datasetDummies_Residence_type], axis=1)
    stroke_dataset = pd.concat([stroke_dataset, datasetDummies_smoking_status], axis=1)
    stroke_dataset = pd.concat([stroke_dataset, datasetDummies_gender], axis=1)
    stroke_dataset = pd.concat([stroke_dataset, datasetDummies_ever_married], axis=1)
'''
