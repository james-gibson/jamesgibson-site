---
title: lemon-extract
description: Projects, commits, scans and deployments across repos — a read-only MCP surface on top.
order: 130
updated: 2026-11-20
tags: introspection, mcp, read-only
---

# lemon-extract

Cross-repo introspection: projects, commits, scans and deployments, with a read-only MCP surface
on top.

The problem it answers: an agent asked "what changed?" usually gets a directory listing and a
guess. An extract pinned to a commit gives an answer a third party can re-derive, and a small
read-only tool list makes the boundary explicit — three tools, no shell, no arbitrary path reader.
That is the position in [the last five years](/ideas/generator-notes) made concrete.

Repository: [gibsunas/lemon-extract](https://github.com/gibsunas/lemon-extract).
