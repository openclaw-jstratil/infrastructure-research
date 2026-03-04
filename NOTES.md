# NOTES

This file is the quick journal. Use it to capture early ideas, data points, CLI snippets, and reference links. When a note deserves more structure, move it into `notes/<slug>.md` and leave a pointer here.

## Template
- **Date:** YYYY-MM-DD
- **Scope:** hardening / networking / resilience
- **Summary:** What was studied or tested
- **Findings:** Key signals, links, data
- **Next steps:** How to turn this into automation, docs, or a PR

## 2026-03-04 — Traefik vs Caddy
- **Scope:** networking + resilience
- **Summary:** Compared Traefik (Kubernetes-native ingress) with Caddy (TLS-first edge proxy) to decide where to stage the new mission-control gateway.
- **Findings:** Traefik wins when we need service discovery tied to Kubernetes; Caddy wins when we want a single binary with zero-config TLS. Documented strengths/weaknesses in the README table.
- **Next steps:** Run a short traffic test on staging to measure CPU/memory for each, then update mission control notes with the recommendation.
