---
title: Quota Management, Rate Limiting & Resilience
sidebar_label: Quotas & Resilience
description: Operational procedure for auditing provider rate limits, tuning safety thresholds, diagnosing HTTP 429 Retry-After, and verifying circuit breaker fallbacks.
---

This skill defines the standardized procedure for auditing rate limits, monitoring quota consumption, and configuring circuit breaker resilience across all Slasher API connectors.

---

## 1. When to Use

- Configuring per-provider daily quotas and safety margins.
- Diagnosing upstream HTTP 429 *Too Many Requests* or 5xx outage incidents.
- Verifying fallback to local cache and indexed registries when an external API is down.
- Testing per-user burst rate limiting rules.
- _Do not use for:_ system-wide architectural audits without quotas (use [Architecture Review Skill](architecture-review.md)).

---

## 2. Context & Inputs

- Quota Manager implementation: `packages/django-lasuite-sources/lasuite_sources/quota.py`.
- Health status endpoint: `GET /api/v1.0/sources/status/`.
- Registry and cache settings in `settings.py` (`LASUITE_SOURCES_CACHE_TTL`, `LASUITE_SOURCES_QUOTA_POLICIES`).

---

## 3. Step-by-Step Procedure

### Step 1: Check Current Provider Health Status

Inspect the real-time health matrix for all enabled providers:

```bash
# Query the live status endpoint
curl -H "Authorization: Bearer $TOKEN" http://localhost:8000/api/v1.0/sources/status/
```

Verify the 5 possible states:
- `healthy`: Quota healthy, live API connected.
- `degraded`: Quota > 80% used; serving cache on priority.
- `cached_only`: Circuit breaker open (following repeated 5xx errors or 429).
- `quota_exhausted`: 100% daily quota consumed; serving verified cached records.
- `disabled`: Provider intentionally deactivated in settings.

### Step 2: Configure Custom Provider Quota Policies

In Django `settings.py`:

```python
LASUITE_SOURCES_QUOTA_POLICIES = {
    "law": {
        "max_daily_requests": 25000,
        "safety_margin_percent": 20,       # Degraded mode starts at 20,000 reqs
        "burst_per_minute_user": 60,       # 60 req/min max per user IP
        "circuit_breaker_threshold": 3,    # Open circuit after 3 consecutive failures
        "cooldown_seconds": 60,            # Wait 60s before half-open probe
    },
    "eurlex": {
        "max_daily_requests": 50000,
        "safety_margin_percent": 15,
        "burst_per_minute_user": 100,
        "circuit_breaker_threshold": 5,
        "cooldown_seconds": 45,
    },
}
```

### Step 3: Verify HTTP 429 Retry-After Handling

When an upstream API returns HTTP 429:
1. Ensure the backend captures the `Retry-After` header value (in seconds).
2. The circuit breaker must open immediately for that duration.
3. Subsequent user queries must return cached data without hitting the external API.

### Step 4: Validate Non-Breaking Document Rendering

Ensure that when a provider is in `cached_only` or `quota_exhausted` state:
1. Existing document blocks continue to render their saved immutable snapshot.
2. The search popover displays the `🕒 Cache Mode` badge without crashing.

---

## 4. Deliverables & Verification

- Run pytest suite covering quota and circuit breaker:
  ```bash
  cd packages/django-lasuite-sources && pytest tests/test_quota_circuit_breaker.py
  ```
- Confirm `46/46` unit tests passing across all packages.

---

## 5. Sources & References

- **Quotas & Rate Limiting Spec:** [`documentation/docs/en/03-backend-proxy/quota-and-rate-limiting.mdx`](../../documentation/docs/en/03-backend-proxy/quota-and-rate-limiting.mdx)
- **RFC 6585 (HTTP 429 Too Many Requests):** [https://datatracker.ietf.org/doc/html/rfc6585](https://datatracker.ietf.org/doc/html/rfc6585)
