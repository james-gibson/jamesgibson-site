---
title: I make claims checkable
description: One failure shape across a decade — a part goes missing, the output stays plausible, and nobody notices.
order: 10
updated: 2026-11-20
tags: thesis, correctness, trust
---

# I make claims checkable

Every system I have observed appears to fail the same way: one part goes missing, the output stays
plausible, and nobody notices. Energy reporting, deployment pipelines, brokerage accounting,
compliance limits, agent-facing services. More than a decade, one failure shape.

The plausible output is the dangerous part. A system that fails loudly gets fixed; a system that
keeps producing a number after its premise breaks gets believed. So the work is not primarily about
making systems produce answers. It is about making the answer carry enough of its own provenance
that a third party can tell when the premise moved.

## What "checkable" means here

A claim is checkable when three things are published with it:

- **The order.** Connect → admit → measure → demote → witness → receipt. The sequence is where the
  answer is kept or lost, and it is specific enough that someone can disagree with a step.
- **The invariant.** The parts are ordinary; the invariant is not supplied by them. A
  rotation-invariant distance plus a declared anchor is what lets a third party recompute your
  answer from coordinates you published and get the same bytes.
- **The cost.** The anchor is not a gauge. You declare your origin and never mix anchors.
  Auditability is bought by giving up the freedom to pick a flattering frame.

That last point is the reason this is a position and not a feature. A system that can choose its
frame after seeing the result can always look correct. One that cannot is worth checking.

## What this is not

Nothing here is invented. The parts are ordinary. The order is the argument. mDNS, SSE, HTTP,
priority failover, cycle-capped proxying, rate limiting, identity tokens and a ruler are all
existing technology against an existing problem. When someone says "this is just mDNS plus a
mesh", the answer is yes — and then the sequence and the invariant, both of which are in the public
docs.

It is also not a replacement for controls you already have. If a real security organisation with
deep packet inspection, egress filtering and change control owns the network, use those controls.
The question this answers is the one left when there is nobody else to ask: *is this still the
thing I admitted, and can I show it?*

## Where you can see it

- [The lint rule](/ideas/lint-rule) — a boundary that was left to convention, and what it cost.
- [The last five years](/ideas/generator-notes) — eight working notes from trying to make one
  generator honest.
- [The lab projects](/work) — the composition: protocol, monitor, dashboard, orchestrator, docs.
- [Values](/about/values) — the four things this is measured against.

Every claim on this site is meant to survive being checked at a URL or in a repository. If one does
not, that is a defect in the claim.
