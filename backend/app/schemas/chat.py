"""Schemas for the chat endpoint.

Contract (matching the frontend ``Message`` shape in
``frontend/src/app/ai-chat/components/ChatInterface.tsx``):

    POST /api/chat
      { "message": "Hello", "conversationId": 12 }   // conversationId optional
    ->
      { "conversationId": 12,
        "message": { "id": 45, "role": "ai", "content": "...", "timestamp": "..." } }

The frontend uses role ``"ai"``; internally we store LLM-standard
``"assistant"`` and translate at this boundary.
"""

from __future__ import annotations

from datetime import datetime

from pydantic import AliasChoices, BaseModel, ConfigDict, Field, field_validator
from pydantic.alias_generators import to_camel


class ChatRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True, alias_generator=to_camel)

    message: str = Field(min_length=1, max_length=8000)
    conversation_id: int | None = None


class MessageOut(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    role: str
    content: str
    # ORM attribute is created_at; the API contract name is "timestamp".
    timestamp: datetime = Field(
        validation_alias=AliasChoices("timestamp", "created_at")
    )

    @field_validator("role", mode="before")
    @classmethod
    def expose_frontend_role(cls, value: str) -> str:
        return "ai" if value == "assistant" else value


class ChatResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True, alias_generator=to_camel)

    conversation_id: int
    message: MessageOut
