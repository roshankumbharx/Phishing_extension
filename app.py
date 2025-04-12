from flask import Flask, request, jsonify
from text_cleaner import TextCleaner
from flask_cors import CORS
import pickle
import pandas as pd

app = Flask(__name__)
CORS(app)
# Load your pickled pipeline
with open("phishing_model.pkl", "rb") as f:
    pipeline = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    email_text = data.get("email_text", "")
    
    # Convert the email text into a pandas Series so our pipeline works correctly
    email_series = pd.Series([email_text])
    prediction = int(pipeline.predict(email_series)[0])
    probability = float(pipeline.predict_proba(email_series)[0][1])
    
    return jsonify({
        "prediction": prediction,
        "probability": probability
    })

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
