---
title: Why Reperoo checks every file three times
date: 2026-09-30
author: The Reperoo team
excerpt: Move mode deletes originals from your iPhone. Here's exactly what has to be true before it's allowed to.
cover: /images/blog-verification.svg
---

Copying photos to a drive is easy. Deleting them from your phone afterwards is the scary part, because if the copy is broken, that photo is gone. So Reperoo treats deletion as a ceremony, not a checkbox.

## Check 1: while it's written

As each original streams to your drive, Reperoo computes its **SHA-256** fingerprint and records its exact size.

## Check 2: read back from the drive

Once the file is closed, Reperoo reads it **back from the drive** and fingerprints it again. Both fingerprints and both sizes must match exactly. This catches truncated or mangled writes that a simple "bytes written" counter would miss.

## Check 3: right before deleting

Only when the whole batch is done, and immediately before deleting anything, Reperoo sweeps every file one more time: is it still there, is it still the right size, does it still hash the same? This catches a drive that was unplugged or remounted along the way.

## And then iOS asks you

Deletion goes through iOS's own delete confirmation, which Reperoo can't skip. Deleted photos land in **Recently Deleted** for 30 days, so even then there's a way back.

For a Live Photo, both the photo and its video have to pass every check, or the whole thing stays on your iPhone. Anything that fails is kept and listed, never deleted.
