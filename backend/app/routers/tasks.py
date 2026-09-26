"""Task REST endpoints. Business logic lives in ``services/task_service``."""

from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.task import TaskPriority, TaskStatus
from app.schemas.task import TaskCreate, TaskOut, TaskUpdate
from app.services import task_service

router = APIRouter(prefix="/api/tasks", tags=["tasks"])


def _task_or_404(task_id: int, db: Session):
    try:
        return task_service.get_task(db, task_id)
    except task_service.TaskNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task {task_id} not found",
        )


@router.post("", response_model=TaskOut, status_code=status.HTTP_201_CREATED)
def create_task(payload: TaskCreate, db: Session = Depends(get_db)) -> TaskOut:
    return TaskOut.model_validate(task_service.create_task(db, payload))


@router.get("", response_model=list[TaskOut])
def list_tasks(
    status_filter: TaskStatus | None = Query(default=None, alias="status"),
    priority_filter: TaskPriority | None = Query(default=None, alias="priority"),
    db: Session = Depends(get_db),
) -> list[TaskOut]:
    tasks = task_service.get_tasks(db, status_filter, priority_filter)
    return [TaskOut.model_validate(t) for t in tasks]


@router.get("/{task_id}", response_model=TaskOut)
def get_task(task_id: int, db: Session = Depends(get_db)) -> TaskOut:
    return TaskOut.model_validate(_task_or_404(task_id, db))


@router.patch("/{task_id}", response_model=TaskOut)
def update_task(
    task_id: int, payload: TaskUpdate, db: Session = Depends(get_db)
) -> TaskOut:
    _ = _task_or_404(task_id, db)
    return TaskOut.model_validate(task_service.update_task(db, task_id, payload))


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: int, db: Session = Depends(get_db)) -> None:
    _task_or_404(task_id, db)
    task_service.delete_task(db, task_id)


@router.post("/{task_id}/complete", response_model=TaskOut)
def complete_task(task_id: int, db: Session = Depends(get_db)) -> TaskOut:
    _ = _task_or_404(task_id, db)
    return TaskOut.model_validate(task_service.complete_task(db, task_id))
