from __future__ import annotations


def test_chat_creates_conversation_and_returns_ai_message(client):
    res = client.post("/api/chat", json={"message": "Hello ALION"})
    assert res.status_code == 200
    body = res.json()
    # Contract expected by frontend/src/app/ai-chat/components/ChatInterface.tsx
    assert set(body) == {"conversationId", "message"}
    assert set(body["message"]) >= {"id", "role", "content", "timestamp"}
    assert body["message"]["role"] == "ai"
    assert "Hello ALION" in body["message"]["content"]


def test_chat_reuses_conversation_and_builds_history(client):
    first = client.post("/api/chat", json={"message": "Remember the number 42"}).json()
    conversation_id = first["conversationId"]

    second = client.post(
        "/api/chat",
        json={"message": "What did I just say?", "conversationId": conversation_id},
    )
    assert second.status_code == 200
    body = second.json()
    assert body["conversationId"] == conversation_id
    assert body["message"]["id"] > first["message"]["id"]


def test_chat_unknown_conversation_returns_404(client):
    res = client.post("/api/chat", json={"message": "hi", "conversationId": 9999})
    assert res.status_code == 404


def test_chat_invalid_conversation_id_returns_422(client):
    res = client.post("/api/chat", json={"message": "hi", "conversationId": -3})
    assert res.status_code == 422


def test_chat_empty_message_returns_422(client):
    res = client.post("/api/chat", json={"message": ""})
    assert res.status_code == 422


def test_chat_messages_persisted_with_internal_roles(client, db_session):
    from app.models.chat import Message

    client.post("/api/chat", json={"message": "persist me"})
    messages = db_session.query(Message).all()
    roles = {m.role for m in messages}
    assert roles == {"user", "assistant"}
