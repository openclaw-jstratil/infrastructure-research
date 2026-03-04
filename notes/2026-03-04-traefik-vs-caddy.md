# Traefik vs Caddy for mission-control gateway

**Date:** 2026-03-04
**Scope:** networking + resilience
**Summary:** Compared Traefik (Kubernetes-native ingress) with Caddy (TLS-first edge proxy) to choose the direction for the next mission-control gateway deployment.

**Findings:**
- Traefik excels in dynamic Kubernetes environments thanks to CRDs, service discovery, and Prometheus-friendly metrics.
- Caddy shines as a zero-config TLS edge proxy with human-friendly config, `caddy adapt`, and resilient automatic certificate renewal.
- Traefik is the safe pick for mission-control when we need Kubernetes-native routing; Caddy is compelling for lightweight staging/edge gateways where TLS must "just work" with minimal ops.

**Next steps:**
- Run lightweight traffic and resource usage tests on staging for both proxies so we can quantify CPU/memory for mission control traffic.
- Update mission-control notes with the recommended proxy choice once the telemetry is collected.

**Backlinks:**
- mission-control backlog task 8 (infrastructure-research note structure)
