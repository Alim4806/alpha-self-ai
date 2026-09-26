"""Task business logic. Routers stay thin; HTTP concerns live in routers."""

from __future__ import annotations

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.task import Task, TaskPriority, TaskStatus
from app.schemas.task import TaskCreate, TaskUpdate


class TaskNotFoundError(LookupError):
    def __init__(self, task_id: int) -> None:
        self.task_id = task_id
        super().__init__(f"Task {task_id} not found")


def create_task(db: Session, data: TaskCreate) -> Task:
    task = Task(
        title=data.title,
        description=data.description,
        status=data.status,
        priority=data.priority,
        due_date=data.due_date,
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    return task


def get_tasks(
    db: Session,
    status_filter: TaskStatus | None = None,
    priority_filter: TaskPriority | None = None,
) -> list[Task]:
    stmt = select(Task).order_by(Task.created_at.desc(), Task.id.desc())
    if status_filter is not None:
        stmt = stmt.where(Task.status == status_filter)
    if priority_filter is not None:
        stmt = stmt.where(Task.priority == priority_filter)
    return list(db.scalars(stmt))


def get_task(db: Session, task_id: int) -> Task:
    task = db.get(Task, task_id)
    if task is None:
        raise TaskNotFoundError(task_id)
    return task


def update_task(db: Session, task_id: int, data: TaskUpdate) -> Task:
    task = get_task(db, task_id)
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(task, field, value)
    db.commit()
    db.refresh(task)
    return task


def delete_task(db: Session, task_id: int) -> None:
    task = get_task(db, task_id)
    db.delete(task)
    db.commit()


def complete_task(db: Session, task_id: int) -> Task:
    task = get_task(db, task_id)
    task.status = TaskStatus.COMPLETED
    db.commit()
    db.refresh(task)
    return task
