---
title: smoke-alarm
description: Continuous health monitor — a long-running check over the surfaces a system depends on.
order: 30
updated: 2026-11-19
tags: monitoring, health
---

# smoke-alarm

A continuous health monitor. It watches the surfaces a system depends on and keeps the result over
time rather than only at deploy time.

The problem it answers: a green build says the code compiled, not that the dependency graph is
still healthy on Tuesday. smoke-alarm is the long-running half of the pair with
[adhd](/work/adhd), which displays the state.

Repository: [james-gibson/smoke-alarm](https://github.com/james-gibson/smoke-alarm).
