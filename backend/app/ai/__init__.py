"""AI provider registry.

Phase 1 ships only the offline ``mock`` provider so the chat pipeline runs
without secrets or network calls. To add a real provider later:

    1. Install its SDK (e.g. ``openai``) and add it to requirements.txt.
    2. Create ``app/ai/openai_provider.py`` with an ``AIProvider`` subclass.
    3. Register it in ``_REGISTRY`` below.
    4. Set ``DEFAULT_AI_PROVIDER=openai`` plus its API key in ``backend/.env``.
"""

from __future__ import annotations

from app.ai.base import AIProvider, ChatMessage, ProviderError
from app.ai.mock_provider import MockProvider
from app.core.config import settings

_REGISTRY: dict[str, type[AIProvider]] = {
    MockProvider.name: MockProvider,
}


def register_provider(provider_cls: type[AIProvider]) -> type[AIProvider]:
    _REGISTRY[provider_cls.name] = provider_cls
    return provider_cls


def available_providers() -> list[str]:
    return sorted(_REGISTRY)


def get_ai_provider(name: str | None = None) -> AIProvider:
    provider_name = name or settings.default_ai_provider
    provider_cls = _REGISTRY.get(provider_name)
    if provider_cls is None:
        raise ProviderError(
            f"Unknown AI provider '{provider_name}'. Available: {', '.join(available_providers())}"
        )
    return provider_cls()


__all__ = [
    "AIProvider",
    "ChatMessage",
    "ProviderError",
    "MockProvider",
    "register_provider",
    "available_providers",
    "get_ai_provider",
]
