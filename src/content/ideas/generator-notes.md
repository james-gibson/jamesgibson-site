---
title: The last five years
description: Eight working notes from trying to make one generator honest — transports, ownership, identity, ports, order and read-only surfaces.
order: 30
updated: 2026-11-20
tags: generator, architecture, notes
---

# The last five years

Most of what I know about systems at scale I learned by trying to make one generator honest. The
working notes are public: [lemon-x-files](https://github.com/gibsunas/lemon-x-files) is the
multi-transport generator corpus, and [lemon-extract](https://github.com/gibsunas/lemon-extract)
is the cross-repo introspection that came out of it. Neither is a portfolio piece; both are the
record of what broke.

## A transport is a dimension, not a rewrite

One surface spec, seven transports — REST, GraphQL, SSE, JSON-RPC, UDP, Socket.IO and OTLP —
declared as modules in the same surface rather than forks. A generator that only writes a demo
feature is hollow, and hollow is a state you can see.

## Decomposition ends when every surface has exactly one owner

A controller mounted on two apps with no routes is not a REST surface; a registered-but-inert
service is not a service. Writing them down as out of scope is what makes the decomposition
complete. This is the boundary question from [the lint rule](/ideas/lint-rule) applied to a
generator.

## Identity is an address, not a name

Specs presuppose each other by pinned address, so a rename is free and drift is loud. A name can be
reused by two things; an address cannot be silently swapped.

## A port is part of the identity

The same note surface mounted on 3001 and 3002 is a straddle. Treating the port as a family value
makes it two frames of one signature instead of a fork.

## Composition order is load-bearing

The introspection plugins bootstrap sequentially because the init step creates the project list
every later plugin reads. Concurrency there is a silent data-loss bug, not a speedup. The order is
the argument — see [checkable claims](/ideas/checkable-claims).

## Read-only is the default, including when you cannot tell

An unknown credential is a read-only credential. A stale ambient `GITHUB_TOKEN` turns a valid
request into a 401 that reads like "not found," so the tool reads exactly one variable and never
the ambient one.

## The MCP surface is the security boundary

Three read-only tools, no shell, no arbitrary path reader; scan, npm and git are withheld because
they mutate or execute. A smaller tool list is the entitlement.

## Snapshot the schema like a lockfile

A GraphQL schema, a `package-lock.json` and a `yarn.lock` are all strings that describe what a
deploy believed. Store them as extracts against a commit, and "what changed?" stops being an
archaeology project.

## What connects these

Each note is the same move: write down the thing that could drift, pin it, and let the build fail
when it does. The parts are ordinary; the invariant is the work. The projects that came out of
this period are under [work](/work), with [lemon-x-files](https://github.com/gibsunas/lemon-x-files)
and [lemon-extract](https://github.com/gibsunas/lemon-extract) carrying the raw record.
