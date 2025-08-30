from fastapi import APIRouter # type: ignore
from app.services.lesson_plan_generator import generate_lesson_plan # type: ignore

router = APIRouter()

@router.post("/lesson-plan/generate")
async def generate_lesson_plan_route(data: dict):
    topic = data.get("topic", "Sample Topic")
    return generate_lesson_plan(topic)