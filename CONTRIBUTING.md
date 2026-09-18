# Contributing to Sovereign Sources & Monorepo DINUM

Thank you for your interest in contributing! This project is a **Digital Public Good (DPG)** developed under the governance of the French Interministerial Digital Directorate (DINUM / La Suite numérique).

## Developer Certificate of Origin (DCO)

To ensure clear intellectual property ownership and license compliance, all commits must include a Signed-off-by trailer (`git commit -s`):

```bash
git commit -s -m "feat(providers): add official registry provider"
```

## Engineering & Architecture Standards

1. **Strict Typing:** 0 `any`, 0 unchecked type casts.
2. **Design System:** Use DSFR (`@codegouvfr/react-dsfr`) and Cunningham design tokens.
3. **Accessibility (RGAA v4.1 AA / WCAG 2.1 AA):** 100% keyboard navigable, color contrast $\ge 4.5:1$.
4. **Security & Anti-SSRF:** All outbound network calls must pass URL validation (`is_safe_external_url`).
5. **Circuit Breakers & Quotas:** Enforce timeouts ($\le 3.5\text{s}$) and handle HTTP 429 Retry-After.

## Running Tests

```bash
make packages-test
npm run docs:build
```
