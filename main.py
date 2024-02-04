from fastapi import FastAPI, Body
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
import uvicorn
from model_test import Model


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this to a specific origin or list of origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = Model()

@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.post("/predict")
async def predict(data: str):
    try:
        prediction = model.predict(data)
        result = {"prediction": prediction}
        return JSONResponse(status_code=200, content=result)
    except Exception as e:
        return JSONResponse(status_code=500, content=jsonable_encoder({"error": str(e)}))
    

if __name__ == "__main__":
    uvicorn.run(app, host="http://127.0.0.1:8000", port=8000)

