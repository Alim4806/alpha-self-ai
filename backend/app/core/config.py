"""Centralized application configuration.

All settings come from environment variables, optionally loaded from
``backend/.env``. Secrets are read here once and must never be logged
or returned by any endpoint.
"""

from __future__ import annotations

import os
from dataclasses import dataclass, field
from functools import lru_cache
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parents[2]

load_dotenv(BASE_DIR / ".env", override=False)


def _str(name: str, default: str) -> str:
    value = os.getenv(name)
    return value.strip() if value and value.strip() else default


def _bool(name: str, default: bool) -> bool:
    return os.getenv(name, str(default)).strip().lower() in ("1", "true", "yes", "on")


def _list(name: str, default: list[str]) -> list[str]:
    raw = os.getenv(name, "")
    items = [item.strip() for item in raw.split(",") if item.strip()]
    return items or default


@dataclass(frozen=True)
class Settings:
    app_name: str = _str("APP_NAME", "ALION Backend")
    app_version: str = _str("APP_VERSION", "1.0.0")
    debug: bool = _bool("DEBUG", False)

    database_url: str = _str("DATABASE_URL", f"sqlite:///{BASE_DIR / 'alion.db'}")

    cors_origins: list[str] = field(
        default_factory=lambda: _list(
            "CORS_ORIGINS",
            ["http://localhost:4028", "http://127.0.0.1:4028"],
        )
    )

    # AI providers (Phase 1 ships the mock provider; real keys stay unused here).
    default_ai_provider: str = _str("DEFAULT_AI_PROVIDER", "mock")
    openai_api_key: str | None = os.getenv("OPENAI_API_KEY") or None
    gemini_api_key: str | None = os.getenv("GEMINI_API_KEY") or None
    anthropic_api_key: str | None = os.getenv("ANTHROPIC_API_KEY") or None
    perplexity_api_key: str | None = os.getenv("PERPLEXITY_API_KEY") or None
    ollama_url: str = _str("OLLAMA_URL", "http://localhost:11434")


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
