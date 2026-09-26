"""Chat endpoint. Delegates to chat_service -> AIProvider abstraction."""

from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.ai import ProviderError
from app.core.config import settings
from app.database.database import get_db
from app.schemas.chat import ChatRequest, ChatResponse
from app.services import chat_service

router = APIRouter(prefix="/api/chat", tags=["chat"])


@router.post("", response_model=ChatResponse)
def chat(payload: ChatRequest, db: Session = Depends(get_db)) -> ChatResponse:
    if payload.conversation_id is not None and payload.conversation_id <= 0:
        raise HTTPException(
            status_code=422,
            detail="conversationId must be a positive integer",
        )
    try:
        conversation, reply = chat_service.send_message(db, payload, settings.default_ai_provider)
    except chat_service.ConversationNotFoundError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        ) from exc
    except ProviderError as exc:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=str(exc)) from exc
    return ChatResponse(conversation_id=conversation.id, message=reply)
