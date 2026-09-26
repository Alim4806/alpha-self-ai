from __future__ import annotations


def test_home(client):
    res = client.get("/")
    assert res.status_code == 200
    body = res.json()
    assert "Welcome to ALION Backend" in body["message"]
    assert body["version"]


def test_health_ok(client):
    res = client.get("/health")
    assert res.status_code == 200
    body = res.json()
    assert body["status"] == "ok"
    assert body["database"] == "connected"
