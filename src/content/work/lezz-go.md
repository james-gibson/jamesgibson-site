---
title: lezz.go
description: Lab orchestrator — the component that coordinates the lab's tools and workloads.
order: 40
updated: 2026-11-19
tags: orchestration, go
---

# lezz.go

The lab orchestrator. It coordinates the tools and workloads that make up the local lab.

The problem it answers: a set of useful tools is not a system until something decides what runs
where and in what order. lezz.go is that decision layer, and it stays deliberately small so the
order is visible rather than hidden in a framework.

Repository: [james-gibson/lezz.go](https://github.com/james-gibson/lezz.go).
