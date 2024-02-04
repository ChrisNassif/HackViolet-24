# Use a pipeline as a high-level helper
from transformers import pipeline

class Model():
    def predict(self, text):
        pipe = pipeline("text-classification", model="NLP-LTU/distilbert-sexism-detector")

        return pipe(text)
