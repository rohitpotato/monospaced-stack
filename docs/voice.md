# How Rohit writes

A short guide for editing posts in `frontend/content/thoughts/`. It comes from
a voice sample Rohit recorded about the AI agents post (November 2026). Read
it before rewriting or drafting anything.

## How he sounds

- **He opens with what actually happened.** "I was in office and wanted to
  publish a quick post, but my work machine can't reach my cluster." The
  situation and the constraint come first, then "that's how it started." No
  hook line, no summary box.
- **He's plain and conversational.** Short words. He says "basically" and
  "right?" when he talks. In writing, keep at most one "right?" per post, where
  he's checking the reader is with him. Drop the "basically"s.
- **His opinions are flat statements.** "I fully believe this is a platform
  engineering problem." No "arguably" or "it could be said".
- **He's honest about gaps.** "I just started, so there aren't real numbers
  yet." "I still don't know how to do that." Keep these in. They're why the
  post reads as true.
- **He explains a choice by what he wanted.** "I want it to be very generic,
  so egress is open." He states the tradeoff and owns it.
- **He compares himself with what others do.** "A lot of the agents people
  build are scoped to one task. I wanted the opposite."
- **He stops when the point is made.** There's no big closing line.

## What to cut

These read as machine-written:

- TL;DR boxes and "this post covers X, Y and Z" lines
- a heading every couple of paragraphs; use one per real section
- bullet lists with bold labels, where prose would do
- groups of three and tidy pairs ("propose, don't merge" / "look, don't touch")
- aphorisms ("if my phone can reach the internet, I can reach my agent")
- "The rule is simple:", "Here's the thing:", "The takeaway"
- em dashes; use a full stop, a comma or brackets
- bold in the middle of sentences
- example tasks that never happened; use the real ones

## Facts

Don't invent experiences, numbers or feelings. If the story needs a detail
only Rohit knows, ask him. Every technical claim has to match what's running
(check `rohitpotato/k8s-apps`). Where the post and the repo disagree, the repo
wins, or the post says it's planned.
