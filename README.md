# Infrastructure Research

This repository is a dedicated home for infrastructure intelligence that keeps mission control secure, reliable, and well-connected. The focus areas are deliberately tight so every note or experiment can be traced back to improving hardening, networking, or mission-control resilience.

## Research Goals

- **Hardening.** Surface and validate controls across the stack: hardened OS images, TLS defaults, authentication, secrets rotation, and runtime policy enforcement.
- **Networking.** Capture architectural choices for service mesh, ingress/egress, DNS, and traffic observability to keep the cluster talking reliably and securely.
- **Mission-control resilience.** Examine how we can keep mission control (and its supporting services) alive when upstream services fail, credentials rotate, or the edge gets noisy.

## How to contribute

1. **Log findings.** Use `NOTES.md`, a date-stamped subfile, or a new Markdown summary under `notes/`. Every entry should include the date, the scope (hardening, networking, resilience), and references (links, repos, configs).
2. **Link it back.** Reference the mission-control task, issue, or backlog entry that prompted the research so reviewers can trace the why/when.
3. **Explain context.** Describe what was tested, what assumptions were made, and what the practical takeaway is for operators.
4. **Raise a PR.** Push your updates to a feature branch and open a PR with the summary + any supporting artifacts (logs, diffs, diagrams). Mention this repository and the mission-control task in the PR description.

## Storing findings

- Keep `NOTES.md` as the living journal for quick sketches, plus add richer write-ups in `notes/` when diagrams or deeper prose are needed.
- When the discovery is actionable (runbooks, automation, config snippets), add links to the relevant repo or create a `findings/` folder inside this repo with the full artifact.
- Always commit research notes alongside the code/config they reference so the story stays together in history.

## Example research note: Traefik vs Caddy

| Dimension | Traefik | Caddy |
| --- | --- | --- |
| Configuration | Dynamic, tag-driven config (Docker labels, Kubernetes CRDs). Good for microservices but the YAML can feel verbose. | Human-readable h2 configuration with sensible defaults. Auto-TLS is baked-in, and the file rarely needs more than 1 block per site.
| TLS automation | Letsencrypt + ACME handled via entrypoints; requires manual middleware for advanced config. | Zero-config HTTPS with automatic renewals. `caddy adapt` makes migrations easy.
| Extensibility | Rich plugin ecosystem and middleware. Built-in metrics for Prometheus and tracing for newer releases. | Fewer third-party plugins but can execute Go plugins and was designed with extensibility in mind. Works well for simple reverse proxies and static sites.
| Operational mindset | Fits Kubernetes-first workflows due to CRDs and service discovery. Ideal when you want routing decisions close to dynamic service definitions. | Great for edge workloads or single binary deployments where TLS, HTTP/2, and HTTP/3 need to work out of the box.

**Takeaway.** Traefik wins when the environment is dynamic and tied to Kubernetes, while Caddy shines when we want a simple, self-contained, TLS-first gateway that stays low-effort. Use this comparison to decide whether a lightweight edge proxy or a Kubernetes-native ingress better suits the upcoming mission-control experiments.
