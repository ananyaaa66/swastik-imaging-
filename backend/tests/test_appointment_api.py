"""Backend tests for Swastik Imaging Appointment API."""
import os
from datetime import datetime, timedelta

import pytest
import requests

BASE_URL = os.environ.get(
    "REACT_APP_BACKEND_URL",
    "https://1f758b4a-7d9e-4a01-8b70-9b9d18884fe2.preview.emergentagent.com",
).rstrip("/")


def _future_date(days: int = 5) -> str:
    return (datetime.utcnow() + timedelta(days=days)).strftime("%Y-%m-%d")


def _valid_payload(**overrides):
    payload = {
        "fullName": "TEST_Auto Patient",
        "phoneNumber": "9876543210",
        "email": "test.auto@example.com",
        "gender": "Male",
        "age": 30,
        "appointmentDate": _future_date(),
        "appointmentTime": "10:00 AM",
        "testSelection": "X-RAY CHEST PA",
        "additionalNotes": "Automated test entry",
    }
    payload.update(overrides)
    return payload


# Health endpoint
class TestHealth:
    def test_health_returns_ok(self):
        r = requests.get(f"{BASE_URL}/api/health", timeout=15)
        assert r.status_code == 200
        body = r.json()
        assert body.get("status") == "ok"


# Appointment success flow
class TestAppointmentSuccess:
    def test_create_with_xray_test(self):
        payload = _valid_payload(testSelection="X-RAY CHEST PA")
        r = requests.post(f"{BASE_URL}/api/appointment", json=payload, timeout=30)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["success"] is True
        assert isinstance(data["id"], str) and len(data["id"]) > 0
        assert "whatsappSent" in data
        assert isinstance(data["whatsappSent"], bool)
        # Verify persistence
        listing = requests.get(f"{BASE_URL}/api/appointments?limit=100", timeout=15)
        assert listing.status_code == 200
        ids = [a.get("id") for a in listing.json()]
        assert data["id"] in ids

    def test_create_with_usg_test(self):
        payload = _valid_payload(testSelection="USG WHOLE ABDOMEN",
                                 email="usg.test@example.com")
        r = requests.post(f"{BASE_URL}/api/appointment", json=payload, timeout=30)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["success"] is True

    def test_create_with_echo_test(self):
        payload = _valid_payload(testSelection="2D ECHOCARDIOGRAPHY",
                                 email="echo.test@example.com")
        r = requests.post(f"{BASE_URL}/api/appointment", json=payload, timeout=30)
        assert r.status_code == 200, r.text


# Validation error cases
class TestAppointmentValidation:
    def test_missing_required_fields(self):
        r = requests.post(f"{BASE_URL}/api/appointment", json={}, timeout=15)
        assert r.status_code == 422

    def test_invalid_email(self):
        payload = _valid_payload(email="not-an-email")
        r = requests.post(f"{BASE_URL}/api/appointment", json=payload, timeout=15)
        assert r.status_code == 422

    def test_phone_not_10_digits(self):
        payload = _valid_payload(phoneNumber="12345")
        r = requests.post(f"{BASE_URL}/api/appointment", json=payload, timeout=15)
        assert r.status_code == 422

    def test_phone_non_numeric(self):
        payload = _valid_payload(phoneNumber="abcdefghij")
        r = requests.post(f"{BASE_URL}/api/appointment", json=payload, timeout=15)
        assert r.status_code == 422

    def test_age_too_low(self):
        payload = _valid_payload(age=0)
        r = requests.post(f"{BASE_URL}/api/appointment", json=payload, timeout=15)
        assert r.status_code == 422

    def test_age_too_high(self):
        payload = _valid_payload(age=200)
        r = requests.post(f"{BASE_URL}/api/appointment", json=payload, timeout=15)
        assert r.status_code == 422


# Listing endpoint
class TestListAppointments:
    def test_list_returns_array(self):
        r = requests.get(f"{BASE_URL}/api/appointments", timeout=15)
        assert r.status_code == 200
        body = r.json()
        assert isinstance(body, list)
        if body:
            # Ensure no Mongo _id leaks
            assert "_id" not in body[0]
            assert "id" in body[0]
