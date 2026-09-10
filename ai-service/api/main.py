"""
AgriShield AI Service - FastAPI Interface Definition
This modular service defines the Python / PyTorch / TensorFlow AI interface
for deep learning crop pathology models (e.g. ResNet50, EfficientNet-B4 trained on PlantVillage + ICAR dataset).
"""

from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from pydantic import BaseModel
from typing import Optional, List
import uvicorn

app = FastAPI(
    title="AgriShield AI Microservice",
    description="Vision screening and pathology inference service for AgriShield MVP",
    version="1.0.0"
)

class ScreeningResponse(BaseModel):
    crop: str
    condition_detected: str
    confidence: float
    risk_level: str
    risk_breakdown: dict
    scientific_name: str
    guidance: str
    action_plan: List[str]
    is_mock: bool

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "agrishield-ai-vision", "version": "1.0.0"}

@app.post("/api/v1/screen-crop", response_model=ScreeningResponse)
async def screen_crop(
    crop_type: str = Form(...),
    symptoms: Optional[str] = Form(None),
    farm_location: Optional[str] = Form("Karnal, Haryana"),
    image: UploadFile = File(...)
):
    """
    Accepts crop leaf imagery and returns AI-assisted probabilistic screening.
    Connect real PyTorch weights (.pth) or ONNX runtime here.
    """
    if not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file must be a valid image format.")

    # Interface contracts for production model inference
    return ScreeningResponse(
        crop=crop_type,
        condition_detected="Possible Yellow Rust (Puccinia striiformis)",
        confidence=93.4,
        risk_level="HIGH",
        risk_breakdown={"image": 46, "weather": 19, "symptoms": 12, "cluster": 14},
        scientific_name="Puccinia striiformis",
        guidance="Stripe rust spreads rapidly under cool, high-moisture conditions. Early containment is critical to prevent yield collapse.",
        action_plan=[
            "Isolate severely affected patch and avoid overhead sprinkling",
            "Monitor adjacent wheat fields within 5 km radius",
            "Consult KVK or local agriculture officer for approved systemic fungicide recommendation",
            "Log follow-up photo after 7 days"
        ],
        is_mock=True
    )

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)