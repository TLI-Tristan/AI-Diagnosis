# AI Diagnosis
This project aims to create a diagnosis web application with the goal of implementing AI in the diagnosis process to allows target user to harness the benefits of AI. 

## Tables of content

- [Problem Statement](#Problem-Statement)
- [Features / Pages](#Features-/-Pages)
- [Project Reflection](#Project-Reflection)
- [Trying Out](#Trying-Out)

## Problem Statement
Health Professionals spend too much time going through a patient's health report to draw a final diagnosis that might be error prone especially for diseases less known to the Health Professionals. Using AI, We can reduce the time spent on those labour intensive work and those time can instead be spent on patient care instead. Hence improve hospital efficiency and reduce cost.

## Features / Pages
Below will indicate what each member contributed to the project.

[Hui Feng](https://github.com/TLI-Tristan)
- Login 
  - Authentication using JSON Web Token issued from NodeJS
  - Refresh Token & 
- Unreviewed Patient List - Brain Tumor
  - Get Patient List from MongoDB
  - Send Image to Flask API 
- Brain Tumor Report
  - Add Report to MongoDB and allow retrieve 
- Flask API (Brain Tumor Segmentation), Separate and Overlay Segmentation
- Security
  - Hash & Salt Password
  - Router Guard to prevent unauthorized and unantheticated user from certain access

[Ernest](https://github.com/Ernest-W)

[Dylan](https://github.com/DestinyXC)

## Project Reflection
[Hui Feng](https://github.com/TLI-Tristan)
This project focuses mainly on AI Pipeline as well as integrating the AI model to be use in the web application. I have learnt a lot on how AI works especially dealing with images. The most difficult part of this project for me is data preprocessing, where i have to think of how to normalize the image to between 0-1 values as well as labeling the image tumor mask. Tuning and traning the model takes up a lot of time and sometime the performance of the model is horrible, i have to find out the underlying issues which can be have weird pixel value when labeling the image mask for example.

[Ernest](https://github.com/Ernest-W)

[Dylan](https://github.com/DestinyXC)

## Trying Out

### Client (VueJS)

#### Client setup
```
cd client
npm install
npm run serve
```

### Server (NodeJS)

#### Server setup
```
cd server
npm install
npm start
```

### API (Flask)

#### API setup
This is for Brain Tumor API only
```
cd api/HuiFengAPI
python BrainTumorSegmentation.py

```
## License
**MIT License**
