# Phishing Email Detection Chrome Extension

A machine-learning-powered Chrome extension that detects potentially **phishing emails in real time** by analyzing email content and classifying it as **Phishing** or **Legitimate**.

The system combines a **Chrome browser extension**, a **Flask REST API**, and a trained **Support Vector Machine (SVM)** model using **TF-IDF text features** to provide automated email security analysis.

---

## Features

* Real-time phishing email detection
* Machine learning based email classification
* Chrome browser extension interface
* TF-IDF based text feature extraction
* SVM classification model
* Automated email text preprocessing
* Flask REST API for model inference
* Phishing vs. legitimate email classification
* Lightweight browser-based workflow
* Modular separation between frontend extension and ML backend

---

## System Architecture

```text
                    ┌──────────────────────┐
                    │       Gmail /        │
                    │    Email Webpage     │
                    └──────────┬───────────┘
                               │
                               │ Email Content
                               ▼
                    ┌──────────────────────┐
                    │   Chrome Extension   │
                    │                      │
                    │  content.js          │
                    │  background.js       │
                    │  popup.js            │
                    └──────────┬───────────┘
                               │
                               │ HTTP Request
                               ▼
                    ┌──────────────────────┐
                    │      Flask API       │
                    │       app.py         │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Text Preprocessing │
                    │                      │
                    │  text_cleaner.py     │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     TF-IDF           │
                    │ Feature Extraction   │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      SVM Model       │
                    │ phishing_model.pkl   │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      Prediction      │
                    │                      │
                    │ Phishing / Legitimate│
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Chrome Extension UI  │
                    │ Display Result       │
                    └──────────────────────┘
```

---

# How It Works

The application follows a complete machine learning inference pipeline.

### 1. Email Content Extraction

The Chrome extension identifies and extracts relevant email content from the browser.

The extracted content is passed to the backend for analysis.

### 2. API Request

The extension sends the email content to the Flask backend through an HTTP request.

The Flask application acts as the bridge between the browser extension and the machine learning model.

### 3. Text Preprocessing

Before classification, the email text is cleaned using the preprocessing logic implemented in:

```text
text_cleaner.py
```

The preprocessing pipeline includes operations such as:

* Lowercase conversion
* Stopword removal
* Text normalization
* Lemmatization
* Removal of unnecessary textual noise

This helps reduce irrelevant variations in the input text and provides cleaner features to the machine learning model.

### 4. TF-IDF Feature Extraction

The cleaned email text is transformed into numerical features using **TF-IDF (Term Frequency-Inverse Document Frequency)**.

TF-IDF represents the importance of words within an email relative to the overall dataset.

Conceptually:

```text
Raw Email
    ↓
Cleaned Email
    ↓
TF-IDF Vector
    ↓
Numerical Feature Representation
```

### 5. SVM Classification

The resulting TF-IDF vector is passed to a trained **Support Vector Machine (SVM)** classifier.

The model predicts whether the email belongs to:

```text
Phishing
```

or

```text
Legitimate
```

### 6. Result Display

The prediction is returned through the Flask API and consumed by the Chrome extension.

The extension can then display the classification result to the user.

---

# Machine Learning Pipeline

```text
Email Dataset
      │
      ▼
Text Cleaning
      │
      ├── Lowercase
      ├── Stopword Removal
      ├── Lemmatization
      └── Normalization
      │
      ▼
TF-IDF Vectorization
      │
      ▼
Feature Matrix
      │
      ▼
SVM Classifier
      │
      ▼
Trained Model
      │
      ▼
phishing_model.pkl
```

---

# Model Performance

The trained SVM model achieved **90%+ classification accuracy** on the evaluated dataset.

Text preprocessing and feature engineering improved model performance by approximately **20%** compared with the initial processing approach.

The main preprocessing techniques included:

| Technique        | Purpose                                            |
| ---------------- | -------------------------------------------------- |
| Lowercasing      | Normalizes word representations                    |
| Stopword Removal | Removes frequently occurring low-information words |
| Lemmatization    | Converts words into their base forms               |
| TF-IDF           | Converts text into numerical features              |
| SVM              | Performs binary classification                     |

> Note: Model accuracy can vary depending on the dataset, train/test split, preprocessing configuration, and evaluation methodology.

---

# Project Structure

```text
Phishing_attack/
│
├── app.py
│
├── phishing_model.pkl
│
├── phishing_pipeline.ipynb
│
├── phising.ipynb
│
├── text_cleaner.py
│
├── requirements.txt
│
├── chrome_extension/
│   ├── background.js
│   ├── content.js
│   ├── icon.png
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.js
│   └── style.css
│
└── __pycache__/
```

---

# Project Components

## Backend

### `app.py`

The main Flask application.

Responsibilities include:

* Starting the REST API
* Receiving email content
* Processing prediction requests
* Loading the trained machine learning model
* Returning classification results

---

## Machine Learning Model

### `phishing_model.pkl`

Serialized trained machine learning model used during inference.

The model contains the trained classification logic required to classify incoming email text.

---

## Text Processing

### `text_cleaner.py`

Contains reusable text preprocessing functionality.

The module prepares raw email text before it is passed into the machine learning pipeline.

---

## Model Development

### `phishing_pipeline.ipynb`

Notebook containing the model development workflow.

It can be used to understand the experimentation and training process, including:

* Dataset preparation
* Text preprocessing
* Feature extraction
* Model training
* Evaluation

### `phising.ipynb`

Additional notebook containing experimentation and analysis related to the phishing detection model.

---

# Chrome Extension

The browser extension is located inside:

```text
chrome_extension/
```

### `manifest.json`

Defines the Chrome extension configuration, including:

* Extension metadata
* Permissions
* Scripts
* Extension components

### `content.js`

Responsible for interacting with the webpage and extracting relevant email information.

### `background.js`

Handles background extension functionality and communication between extension components where required.

### `popup.html`

Defines the extension popup interface.

### `popup.js`

Handles popup functionality and interaction logic.

### `style.css`

Contains styling for the extension interface.

### `icon.png`

Extension icon used by Chrome.

---

# Tech Stack

## Machine Learning

* Python
* Scikit-learn
* Support Vector Machine (SVM)
* TF-IDF
* NLP preprocessing

## Backend

* Flask
* Python
* REST API

## Frontend / Browser

* JavaScript
* HTML
* CSS
* Chrome Extension APIs

## Development

* Jupyter Notebook
* Git
* GitHub

---

# Installation

## Prerequisites

Make sure the following are installed:

* Python 3.11+
* Google Chrome
* Git
* pip

---

# 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd Phishing_attack
```

---

# 2. Create a Virtual Environment

### Linux / macOS / WSL

```bash
python3 -m venv venv
source venv/bin/activate
```

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

---

# 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

# 4. Start the Flask Backend

Run:

```bash
python app.py
```

The backend should start on the configured Flask host and port.

For a typical local configuration:

```text
http://127.0.0.1:5000
```

Keep this terminal running while using the Chrome extension.

---

# 5. Install the Chrome Extension

Open Google Chrome and navigate to:

```text
chrome://extensions/
```

Then:

1. Enable **Developer mode**.
2. Click **Load unpacked**.
3. Navigate to the project directory.
4. Select:

```text
chrome_extension/
```

5. The extension should now appear in the Chrome extensions list.

---

# Running the Complete Application

The application requires both the Flask backend and Chrome extension.

### Terminal 1

```bash
cd Phishing_attack
source venv/bin/activate
python app.py
```

Keep the Flask server running.

### Chrome

Open:

```text
chrome://extensions/
```

Make sure the phishing detection extension is enabled.

The overall workflow becomes:

```text
Chrome
   ↓
Email
   ↓
Chrome Extension
   ↓
Flask API
   ↓
Text Preprocessing
   ↓
TF-IDF
   ↓
SVM
   ↓
Prediction
   ↓
Chrome Extension
```

---

# API

The Flask backend exposes an API used by the Chrome extension for prediction.

The API receives email-related text and processes it through the trained machine learning pipeline.

A typical request flow is:

```text
POST Request
     ↓
Email Text
     ↓
Preprocessing
     ↓
TF-IDF Transformation
     ↓
SVM Prediction
     ↓
JSON Response
```

The exact endpoint and request/response schema are defined in:

```text
app.py
```

---

# Example Prediction Flow

### Input

```text
Congratulations! You have won a prize.
Click the link below to claim your reward immediately.
```

### Processing

```text
Raw Email
    ↓
Text Cleaning
    ↓
TF-IDF Vectorization
    ↓
SVM Classification
```

### Output

```text
Prediction: Phishing
```

A legitimate email would similarly be classified as:

```text
Prediction: Legitimate
```

---

# Why Machine Learning?

Traditional rule-based phishing detection can rely heavily on manually defined patterns.

This project uses machine learning to learn patterns from previously labeled email data.

The combination of:

```text
NLP
+
TF-IDF
+
SVM
```

allows the system to identify linguistic patterns associated with phishing messages.

---

# Why SVM?

Support Vector Machines are effective for high-dimensional classification problems such as text classification.

TF-IDF produces a potentially large sparse feature space, making linear classification approaches such as SVM a suitable choice for this type of problem.

---

# Why TF-IDF?

TF-IDF provides a simple and effective way to represent text numerically.

It assigns higher importance to terms that are useful for distinguishing documents while reducing the influence of very common terms.

This makes it useful for identifying words and phrases that contribute to phishing classification.

---

# Security Considerations

This project is intended as a **security-assistance and educational tool**.

A machine learning classifier should not be treated as a guaranteed phishing detector.

Possible false positives and false negatives can occur.

Users should still verify:

* Sender identity
* Email domain
* Links
* Attachments
* Requests for credentials
* Requests for financial information
* Urgent or suspicious instructions

---

# Future Improvements

Potential improvements include:

* URL reputation analysis
* Domain age and reputation checking
* Detection of suspicious links
* HTML email analysis
* Attachment analysis
* Explainable AI for prediction reasoning
* Confidence scores for predictions
* Transformer-based NLP models
* BERT-based phishing classification
* Real-time threat intelligence integration
* Improved Gmail-specific DOM extraction
* Model retraining pipeline
* Cloud deployment of the inference API
* Authentication and rate limiting for the API

---

# Limitations

Current limitations include:

* Classification depends on the training dataset.
* Previously unseen phishing patterns may be difficult to detect.
* Text-only analysis may miss threats hidden in URLs or attachments.
* Browser DOM structures can change over time.
* The model can produce false positives or false negatives.
* Local Flask deployment is intended primarily for development/testing.

---

# Development Workflow

```text
Dataset
   ↓
Data Cleaning
   ↓
Text Preprocessing
   ↓
TF-IDF Feature Engineering
   ↓
Train/Test Split
   ↓
SVM Training
   ↓
Model Evaluation
   ↓
Model Serialization
   ↓
Flask API
   ↓
Chrome Extension Integration
   ↓
Real-Time Prediction
```

---

# Use Cases

The system can be used for:

* Educational demonstrations of phishing detection
* NLP classification projects
* Browser-based email security analysis
* Machine learning experimentation
* Security awareness tools
* Demonstrating ML model deployment through REST APIs

---

# Technologies Used

```text
Python
Flask
Scikit-learn
TF-IDF
SVM
NLP
JavaScript
HTML
CSS
Chrome Extension API
Jupyter Notebook
Git
GitHub
```

---

# Author

**Roshan Kumbhar**

This project demonstrates the integration of:

```text
Machine Learning
      +
Natural Language Processing
      +
REST APIs
      +
Browser Extensions
```

to build an end-to-end phishing email detection system.
