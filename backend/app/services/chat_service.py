"""Chat business logic: persistence + provider invocation.

The service only knows the ``AIProvider`` abstraction — no vendor-specific
code may appear here. New providers plug in via ``app.ai.register_provider``.
"""

from __future__ import annotations

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.ai import ProviderError, get_ai_provider
from app.ai.base import ChatMessage
from app.models.chat import Conversation, Message
from app.schemas.chat import ChatRequest

HISTORY_LIMIT = 20


class ConversationNotFoundError(LookupError):
    def __init__(self, conversation_id: int) -> None:
        self.conversation_id = conversation_id
        super().__init__(f"Conversation {conversation_id} not found")


def get_or_create_conversation(db: Session, conversation_id: int | None) -> Conversation:
    if conversation_id is None:
        conversation = Conversation()
        db.add(conversation)
        db.commit()
        db.refresh(conversation)
        return conversation

    conversation = db.get(Conversation, conversation_id)
    if conversation is None:
        raise ConversationNotFoundError(conversation_id)
    return conversation


def send_message(
    db: Session,
    payload: ChatRequest,
    provider_name: str,
) -> tuple[Conversation, Message]:
    conversation = get_or_create_conversation(db, payload.conversation_id)

    user_message = Message(role="user", content=payload.message)
    user_message.conversation = conversation
    db.add(user_message)
    db.flush()

    history = list(
        db.scalars(
            select(Message)
            .where(Message.conversation_id == conversation.id)
            .order_by(Message.id.desc())
            .limit(HISTORY_LIMIT)
        )
    )[::-1]

    provider = get_ai_provider(provider_name)
    reply_text = provider.generate(
        [ChatMessage(role=message.role, content=message.content) for message in history]
    )

    assistant_message = Message(role="assistant", content=reply_text)
    assistant_message.conversation = conversation
    conversation.provider = provider.name
    db.add(assistant_message)
    db.commit()
    db.refresh(assistant_message)
    return conversation, assistant_message
