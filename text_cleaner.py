import re
from sklearn.base import BaseEstimator, TransformerMixin
import nltk
from nltk.corpus import stopwords

nltk.download("stopwords")
stop_words = set(stopwords.words("english"))

class TextCleaner(BaseEstimator, TransformerMixin):
    def fit(self, X, y=None):
        return self

    def transform(self, X, y=None):
        # Convert X to a Pandas Series if not already
        if not hasattr(X, 'apply'):
            import pandas as pd
            X = pd.Series(X)
        return X.apply(self.clean_text)

    def clean_text(self, text):
        text = text.lower()
        text = re.sub(r"http\S+|www\S+", "", text)
        text = re.sub(r"[^\w\s]", "", text)
        text = re.sub(r"\s+", " ", text).strip()
        text = " ".join(word for word in text.split() if word not in stop_words)
        return text
