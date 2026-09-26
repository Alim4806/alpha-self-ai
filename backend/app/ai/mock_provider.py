"""Deterministic offline provider used for Phase 1 and tests.

It requires no API key and makes no network calls, allowing the full
router -> service -> provider pipeline to run end to end.
"""

from __future__ import annotations

from typing import ClassVar, Sequence

from app.ai.base import AIProvider, ChatMessage


class MockProvider(AIProvider):
    name: ClassVar[str] = "mock"

    def generate(self, messages: Sequence[ChatMessage]) -> str:
        last_user = next(
            (m.content for m in reversed(messages) if m.role == "user"),
            "",
        )
        return (
            "[ALION mock provider] This is a placeholder reply from the Phase 1 "
            f"backend. You said: \"{last_user}\". Connect a real provider in "
            "backend/.env (DEFAULT_AI_PROVIDER) once its integration is implemented."
        )
