---
title: Disciplines
description: Eight things James has done repeatedly, for a long time — with the concrete work behind each.
order: 35
updated: 2026-11-20
tags: practice, history
---

# Disciplines

No project attached to these. This is simply what I have done, repeatedly, for a long time. The
dated instances are in [experience](/about/experience).

## Legacy rescue

Six-thousand-line bootstrap files, a non-cascading stylesheet retrofitted into a large Flex
application, twelve production databases collapsed into one. I take the thing nobody wants to
touch and I do not break it. The constraint is always the same: the system is load-bearing while
it is being changed.

## Version control and provenance

Moved teams from SVN to Git, and years later ran source-of-truth-in-git deployments for a
packaged application across customer orgs — committed metadata, scripted deploy, and a fixture
repo whose only job was to test the build step itself. That was early 2016. The platform
announced the same idea as its own product that August. The idea was not the novelty; making the
build step testable on its own was the work.

## Dependency surgery

Hundreds of nested git-in-git-in-git npm packages, untangled. Then taught a junior to do it in
weeks, and she is still surprised about it years later. If the method cannot be handed to someone
else, it was not a method.

## Federated GraphQL cluster design

A federated graph is a set of contracts pretending to be a schema. I design the seams: each service
owns a subgraph and declares what it claims — resolvers, routes, streams, RPC methods, crons,
transports — and what it presupposes, addressed so drift in the presupposed surface breaks the
build instead of the customer. The port is part of a deployment's identity, not a deployment
detail.

I built this shape for a multi-app NestJS cluster — main, admin and auth apps mounting subsets of
one GraphQL surface over a shared Prisma schema, with a token guard that answers 423 rather than a
plausible empty result — and I have watched what happens when the seam is left to convention. See
[the lint rule](/ideas/lint-rule) for what that convention costs.

## Language migration with an afterlife

Rewrote a lending platform's backend from Java to Node. Developers were still reading that
codebase three to five years later — which is the only code review that counts.

## Onboarding as engineering

Took a team from about nine regular members to twenty-one. Ramp-up is a system, not a vibe. If the
new person has to recover the missing context by asking around, the system is undocumented and the
cost will show up later in someone else's schedule.

## Concurrent delivery inside a rigid process

Six-week sprints with a new one starting every four, several in flight, releasing into secure
environments. Overlap, not sequence. Continuous delivery with a waterfall wrapper, in 2012.

## Financial semantics

GAAP → XBRL → IFRS taxonomy mappings, as an undergraduate. A mapping error is not a bug, it is a
misstatement. That is the earliest version of the argument in
[checkable claims](/ideas/checkable-claims): the number is only as good as the frame it was mapped
from.
