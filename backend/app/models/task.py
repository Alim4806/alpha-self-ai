"""Task model and its enumerations.

Enum values intentionally match the frontend contract in
``frontend/src/app/tasks/page.tsx`` (e.g. ``in-progress``, kebab-case).
"""

from __future__ import annotations

import enum
from datetime import date, datetime, timezone

from sqlalchemy import Date, DateTime, Enum, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.database.database import Base


def _enum(column_enum: type[enum.Enum]) -> Enum:
    return Enum(
        column_enum,
        values_callable=lambda e: [m.value for m in e],
        native_enum=False,
        length=20,
    )


class TaskStatus(str, enum.Enum):
    PENDING = "pending"
    IN_PROGRESS = "in-progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


class TaskPriority(str, enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


class Task(Base):
    __tablename__ = "tasks"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False, default="")
    status: Mapped[TaskStatus] = mapped_column(
        _enum(TaskStatus), nullable=False, default=TaskStatus.PENDING, index=True
    )
    priority: Mapped[TaskPriority] = mapped_column(
        _enum(TaskPriority), nullable=False, default=TaskPriority.MEDIUM, index=True
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )
    due_date: Mapped[date | None] = mapped_column(Date, nullable=True)
