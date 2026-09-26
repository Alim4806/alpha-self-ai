from fastapi import APIRouter

from app.routers.chat import router as chat_router
from app.routers.tasks import router as tasks_router

api_router = APIRouter()
api_router.include_router(tasks_router)
api_router.include_router(chat_router)
