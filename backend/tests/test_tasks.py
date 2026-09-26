from __future__ import annotations

import pytest

TASK_PAYLOAD = {
    "title": "Write Phase 1 report",
    "description": "Summarize backend foundation work",
    "priority": "high",
    "dueDate": "2026-08-30",
}


def _create(client, **overrides):
    payload = {**TASK_PAYLOAD, **overrides}
    return client.post("/api/tasks", json=payload), payload


def test_create_task_returns_201_with_camel_case_contract(client):
    res, payload = _create(client)
    assert res.status_code == 201
    body = res.json()
    # Contract expected by frontend/src/app/tasks/page.tsx
    assert set(body) == {
        "id",
        "title",
        "description",
        "status",
        "priority",
        "createdAt",
        "dueDate",
    }
    assert body["title"] == payload["title"]
    assert body["dueDate"] == payload["dueDate"]
    assert body["status"] == "pending"
    assert body["priority"] == "high"
    assert body["id"] >= 1


def test_create_task_defaults_description_and_priority(client):
    res = client.post("/api/tasks", json={"title": "Minimal task"})
    assert res.status_code == 201
    body = res.json()
    assert body["description"] == ""
    assert body["priority"] == "medium"


def test_list_tasks_ordered_newest_first(client):
    _create(client, title="first")
    _create(client, title="second")
    res = client.get("/api/tasks")
    assert res.status_code == 200
    titles = [t["title"] for t in res.json()]
    assert titles[0] == "second"


def test_filter_tasks_by_status(client):
    created, _ = _create(client)
    task_id = created.json()["id"]
    client.post(f"/api/tasks/{task_id}/complete")
    _create(client)

    completed = client.get("/api/tasks", params={"status": "completed"}).json()
    pending = client.get("/api/tasks", params={"status": "pending"}).json()
    assert len(completed) == 1 and completed[0]["status"] == "completed"
    assert len(pending) == 1 and pending[0]["status"] == "pending"


def test_get_single_task(client):
    created, _ = _create(client)
    task_id = created.json()["id"]
    res = client.get(f"/api/tasks/{task_id}")
    assert res.status_code == 200
    assert res.json()["id"] == task_id


def test_update_task_partial_patch(client):
    created, _ = _create(client)
    task_id = created.json()["id"]
    res = client.patch(f"/api/tasks/{task_id}", json={"status": "in-progress"})
    assert res.status_code == 200
    body = res.json()
    assert body["status"] == "in-progress"
    assert body["title"] == TASK_PAYLOAD["title"]
    assert body["dueDate"] == TASK_PAYLOAD["dueDate"]


def test_complete_task(client):
    created, _ = _create(client)
    task_id = created.json()["id"]
    res = client.post(f"/api/tasks/{task_id}/complete")
    assert res.status_code == 200
    assert res.json()["status"] == "completed"


def test_delete_task_then_404(client):
    created, _ = _create(client)
    task_id = created.json()["id"]
    assert client.delete(f"/api/tasks/{task_id}").status_code == 204
    assert client.get(f"/api/tasks/{task_id}").status_code == 404
    assert client.delete(f"/api/tasks/{task_id}").status_code == 404


def test_missing_task_returns_404_with_detail(client):
    res = client.get("/api/tasks/9999")
    assert res.status_code == 404
    assert "not found" in res.json()["detail"]


def test_invalid_path_param_returns_422(client):
    assert client.get("/api/tasks/not-an-int").status_code == 422


@pytest.mark.parametrize(
    "overrides",
    [
        {"title": ""},
        {"title": None},
        {"priority": "urgent"},
        {"dueDate": "not-a-date"},
    ],
)
def test_validation_errors_return_422(client, overrides):
    res, _ = _create(client, **overrides)
    assert res.status_code == 422


def test_unknown_status_enum_rejected_on_patch(client):
    created, _ = _create(client)
    task_id = created.json()["id"]
    res = client.patch(f"/api/tasks/{task_id}", json={"status": "archived"})
    assert res.status_code == 422
