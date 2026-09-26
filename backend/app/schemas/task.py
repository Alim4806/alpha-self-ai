"""Request/response schemas for tasks.

Responses use camelCase aliases (``createdAt``, ``dueDate``) so payloads
drop directly into the frontend ``Task`` type in
``frontend/src/app/tasks/page.tsx``.
"""

from __future__ import annotations

from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, Field
from pydantic.alias_generators import to_camel

from app.models.task import TaskPriority, TaskStatus


class TaskCreate(BaseModel):
    """Accepts both camelCase (frontend convention) and snake_case keys."""

    model_config = ConfigDict(populate_by_name=True, alias_generator=to_camel)

    title: str = Field(min_length=1, max_length=200)
    description: str = ""
    status: TaskStatus = TaskStatus.PENDING
    priority: TaskPriority = TaskPriority.MEDIUM
    due_date: date | None = None


class TaskUpdate(BaseModel):
    model_config = ConfigDict(populate_by_name=True, alias_generator=to_camel)

    title: str | None = Field(default=None, min_length=1, max_length=200)
    description: str | None = None
    status: TaskStatus | None = None
    priority: TaskPriority | None = None
    due_date: date | None = None


class TaskOut(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
        alias_generator=to_camel,
    )

    id: int
    title: str
    description: str
    status: TaskStatus
    priority: TaskPriority
    created_at: datetime
    due_date: date | None
