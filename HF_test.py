# from transformers import AutoTokenizer, AutoModelForSequenceClassification

# tokenizer = AutoTokenizer.from_pretrained("rungalileo/xlm-roberta-base-misogyny-sexism-tweets-quantized-traced")
# model = AutoModelForSequenceClassification.from_pretrained("rungalileo/xlm-roberta-base-misogyny-sexism-tweets-quantized-traced")

# Use a pipeline as a high-level helper
# from transformers import pipeline

# pipe = pipeline("text-classification", model="rungalileo/xlm-roberta-base-misogyny-sexism-tweets-quantized-traced")
# print(pipe("hi"))

import torch
from transformers import pipeline

generate_text = pipeline(model="rungalileo/xlm-roberta-base-misogyny-sexism-tweets-quantized-traced", torch_dtype=torch.bfloat16, trust_remote_code=True, device_map="auto")
