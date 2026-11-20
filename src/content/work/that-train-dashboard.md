---
title: that-train-dashboard
description: A child that cannot silently inherit its parent's rules.
order: 100
updated: 2026-11-20
tags: inheritance, boundaries, dashboard
---

# that-train-dashboard

A child that cannot silently inherit its parent's rules.

The problem it answers: inherited configuration is convenient right up to the moment a child runs
under rules nobody re-declared. This project makes the inheritance explicit, so a child that
depends on a parent's rule has to say so — the same boundary question as
[the lint rule](/ideas/lint-rule), in a smaller system.

Repository: [james-gibson/that-train-dashboard](https://github.com/james-gibson/that-train-dashboard).
