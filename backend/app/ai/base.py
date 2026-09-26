"""Provider-agnostic AI interface.

Every chat/planner/memory feature must depend on ``AIProvider`` — never on
a vendor SDK. Concrete providers subclass ``AIProvider`` and register
themselves in ``app.ai.__init__``.
"""

from __future__ import annotations

from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import ClassVar, Sequence


@dataclass(frozen=True)
class ChatMessage:
    role: str  # "user" | "assistant" | "system"
    content: str


class ProviderError(RuntimeError):
    """Raised when a provider is unknown, unconfigured, or fails."""


class AIProvider(ABC):
    """Base interface all ALION AI providers implement."""

    name: ClassVar[str]

    @abstractmethod
    def generate(self, messages: Sequence[ChatMessage]) -> str:
        """Return the assistant reply for the given conversation history."""
        raise NotImplementedError
