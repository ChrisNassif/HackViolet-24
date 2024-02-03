# Use a pipeline as a high-level helper
from transformers import pipeline

pipe = pipeline("text-classification", model="NLP-LTU/distilbert-sexism-detector")

print(pipe("I hate women."))



