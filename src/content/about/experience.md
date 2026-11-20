---
title: Experience
description: Where the work has been tested — U.S. Navy installations, warehouse routing, lending, cannabis compliance, infrastructure and the lab.
order: 40
updated: 2026-11-20
tags: CV, employment, history
---

# Experience

The role record is short: GISi, Geospatial Developer, July 2012 to present, remote from Denver
since August 2013. The work inside it is not short. What follows is the tested history rather than
a list of stacks; the stacks belong in the [technical CV](/about/cv-technical).

## 2012 — NSGEM, U.S. Navy (CNIC, worldwide installations)

Created by Sandrine Schultz, energy program manager at Commander, Navy Installations Command — the
project I'm proudest of. Over 62,000 facility billing statements were mapped to utility-level usage
across multiple time zones, and we shipped the Data Quality Score that told the reader how much of
each number to believe. The Energy Biggest Loser competition was scored on it; the program won the
International Special Achievement Award, and the Navy credited CNIC for standing out among more
than 100,000 organizations
([navy.mil](https://www.navy.mil/Press-Office/News-Stories/display-news/Article/2265327/from-the-shore-navy-installations-take-energy-initiatives-to-the-next-level/)).

This is where [user ease became a correctness property](/about/values): the score was part of the
product, not a footnote about it.

## 2014–2015 — agrig8.in

Genomic sorting applied to warehouse pick routing, inspired in college by a travelling salesman
weighted by product density. Abandoned on purpose, because I realized I did not know enough
discrete math to do it honestly. That reason is the artifact: see
[agrig8](https://github.com/james-gibson/agrig8).

## 2014–2016 — GeoMetri (acquired by Acuity Brands)

Built the prototype servers. The lead wanted data in RAM because it beat DynamoDB on reads. It
did. It also removed durability, which was the only axis that mattered. The rest of the project
used Node.js, Angular.js, socket.io, Leaflet and AWS/Dynamo; migrating `api/v0` to `api/v1` and
implementing the new v1 features earned GISi's Innovation Application Award at the 2014 ESRI
partner conference.

## 2016–2017 — Apto

Source-driven deployment for a Salesforce managed package, early 2016 — committed metadata,
scripted deploy, a fixture repo to test the build step. Also the year I learned that a commission
engine can be arithmetically perfect and still be wrong, because the hard part is not computing the
residue, it is assigning it.

## 2017 — Flowhub

Proposed the fix for purchase-limit looping before the Sweet Leaf raid: hash the license details,
verify the limit against a public ledger. Enforcement without identification. Sweet Leaf lost 26
licenses and three owners went to prison; their implicit defense was not that they did not know
where the flower went, it was that nobody had told them they were liable for treating sales like
alcohol purchasing. Also consolidated about a dozen production databases into one and began the
move off managed hosting onto Kubernetes.

## 2016–2019 — infrastructure

DesignOps by 2019; the chat-native deploy and incident habits earlier than the vocabulary for
them. Watched an etcd cluster lose quorum to an expired certificate, where the monitoring lived
inside the thing it monitored and could not report its own death — the same failure shape as
[checkable claims](/ideas/checkable-claims), with a pager attached.

Then a rebuild nobody had documented because the builder quit the same day: twelve hundred to two
thousand prototype deploys, brought back one at a time, while pre-scheduled user testing slipped
and 8 a.m. emergency calls with vendors like Rancher became routine. The cost of undocumented
systems is measured in the wages of the people rebuilding them: repairs, delays and the lost
window, at a Fortune 500 company — approximately seven to eleven million.

## 2025–now — the lab

Six Go services sharing one trust protocol: advertise over mDNS, verify capability before granting
a rung, refuse to display a peer you cannot attest. The composition is the point — protocol,
monitor, dashboard, orchestrator and a docs corpus, with the argument published before the
product. The projects are under [work](/work); the reasoning is under [ideas](/ideas).

## Naval Shore Geospatial Energy Module

Separate from the energy work above: led system architecture and design of the client application.
Stack: Flex, AS3, .NET 4.5, Oracle. Covered by *ArcNews*, Summer 2013.

For the leadership view, see the [executive CV](/about/cv-executive).
