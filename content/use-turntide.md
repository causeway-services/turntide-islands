---
title: Use Turntide
date-created: 2026-10-03
type: page
status: active
summary: A practical guide to asking questions, making changes, and using Zelo to navigate the Turntide DAO.
tags:
- turntide-islands
- governance
- dao
- zelo
---

Turntide is meant to be governable without learning a pile of procedure first. You
can start with an ordinary question or a plain-language desire. Zelo's civic job is
to help identify what state the matter is in, what authority applies, and the
smallest next act that would move it forward.

> [!note] Current delivery status
> Zelo's civic mandate, standing, state protocol, and routine rules are enacted.
> The current civic kernel can derive orientation, state, rehearsal, boundary, and
> routine answers from those records. Zelo's Discord steward now has a source-level
> civic adapter that routes civic questions through this kernel before generic
> inference, but a **live Discord receipt is not yet independently received**. Source
> wiring and tests are not evidence that the running bot has answered a real guild
> request with the new path.

# Ask Zelo like a civic interface

You do not need special command syntax. Useful requests include:

- “What is Turntide, and what can I actually do here?”
- “Who can decide this right now?”
- “Turn this idea into a draft proposal without enacting it.”
- “What governance work is waiting for a next move?”
- “What did Turntide decide, and was it actually carried out?”
- “We keep doing this manually. Should it become a routine?”
- “Does this belong to Turntide governance or Tidepool governance?”
- “Walk me through this as a dry-run so I can learn the process.”

Zelo should answer the substance first. When governance state matters, Zelo should
also tell you the current state, the next lawful transition, and who or what can make
that transition real.


# You can matter without already governing

Turntide separates **participation** from **binding authority**. You do not need
Turntide-wide governance standing to ask a question, criticize an explanation,
join discussion, bring evidence or lived experience, draft a proposal, volunteer
to carry out already-authorized work, ask for a bounded delegation, or point out
repeated work that might deserve a routine.

Those acts can influence what Turntide understands and what current governance
decides. They do not silently become votes or binding decisions. When binding
authority matters, Zelo should say so plainly and point to the standing or
delegation record that would make the act effective.

Useful prompts include:

- “I don't govern Turntide; how can I still help with this?”
- “What can I do here without needing a delegation?”
- “I want to propose this, not decide it myself.”
- “I can carry this out if Turntide wants—what authority would I need?”
- “We keep having this problem. Can Zelo help us design a routine for it?”

This distinction is deliberate: **low-friction participation, high-legibility
authority**.


## Asking for bounded authority

Sometimes “I can help” really does need authority: for example, maintaining one
project record, carrying out one reversible clerical change, or executing a class
of actions Turntide wants someone else to handle. That should not require vague
trust or an all-purpose office.

Ask Zelo to draft a **delegation request**. The draft names the delegate, purpose,
scope, granted actions, explicit limits, review or expiry condition, revocation
condition, and receiving condition. Drafting it creates no authority. A recorded
governance act must activate it, and active delegations have explicit paths to be
revoked, expire when their recorded condition is witnessed, or be superseded.


# Taking on more responsibility

Turntide does not use an automatic promotion ladder. Being around longer, posting
more, getting reactions, holding a Discord role, working for a provider, or joining
Tidepool does not silently turn into governance power.

There are several different ways to become more involved:

- **Participate without binding standing.** Ask, discuss, bring evidence, propose,
  volunteer, rehearse a process, or point out repeated work. This is the normal
  starting point and does not require Turntide-wide standing.
- **Request a bounded delegation.** If you want to maintain a project record,
  perform a recurring clerical act, or carry responsibility that needs authority,
  Zelo can help draft a request with explicit scope, powers, limits, review/expiry,
  revocation, and receiving conditions. A governing act still has to activate it.
- **Propose broader standing.** If Turntide actually needs a person, agent, office,
  or constituency to hold durable authority broader than one delegation, that is a
  governance change. Zelo can help draft the proposal, but only an explicit recorded
  Turntide act can change the standing ledger.
- **Use Tidepool's own path for financial authority.** Tidepool membership,
  distribution voting, principal, yield, and financial execution remain governed by
  Tidepool's own admission and protocol rules.

Ask Zelo **“how do I take on more responsibility here?”** or **“what authority would
I need to do this?”** Zelo should tell you which path fits and what the next civic
move is. The explanation itself grants nothing.

# Ask how Turntide would decide this

A proposal is not a voting system. It is a concrete requested act placed before
governance. **How that act becomes binding depends on what kind of act it is.**

Turntide now keeps an enacted decision-procedure registry so Zelo can distinguish:

- **record-grounded corrections**, where a public explanation or projection is
  simply wrong relative to current durable records and an authorized steward can
  correct it without creating new policy;
- **delegated clerical acts**, where an already-enacted delegation supplies the
  authority and each conforming instance does not need a fresh proposal;
- **enacted routine instances**, where the routine itself is the prior governance
  decision and the actor executes only when its admitted trigger and limits are met;
- **ordinary governance acts**, where a proposal is decided by current recorded
  governance standing, then executed and received separately;
- **structural governance acts**, which change standing, authority domains, office
  powers, the civic protocol, institutional boundaries, or the rules by which future
  governance decides;
- **Turntide-facing Tidepool integration**, which can be governed by Turntide only
  so far as it concerns Turntide's own explanations, links, discussion, or
  interfaces—not Tidepool financial rights.

Turntide has **not** enacted numeric voting weights as a universal decision rule.
Zelo must not invent quorum, support, consensus, or voting power from reactions,
message volume, popularity, silence, tenure, or model preference.

Ask Zelo **“how would Turntide decide this?”** or **“what procedure applies to this
change?”** For more detail, ask about `record-grounded-correction`,
`delegated-clerical`, `enacted-routine-instance`, `ordinary-governance-act`,
`structural-governance-act`, or `turntide-tidepool-integration`.

Tidepool membership, distribution voting, principal, yield, reconciliation
settlement, custody, and financial execution are not a Turntide decision procedure.
Zelo should route those matters to Tidepool's own financial authority instead.

## Procedure cannot be downgraded for convenience

Zelo now has a deterministic **procedure-floor classifier** for this question. It
does not infer governance from vibes or choose whichever path is easiest. It reads
typed facts about the authority domain and the consequences of the requested act,
then returns the least-constrained procedure that is still constitutionally
adequate.

The safety rule is monotone:

- a Tidepool financial matter routes outside Turntide decision authority;
- changing standing, authority domains, the civic protocol, office powers,
  decision procedures, institutional identity, or future governance rules always
  requires a **structural governance act**;
- new policy, contested matters, public integration, or community-facing service
  boundaries require at least an **ordinary governance act**;
- an enacted routine can supply prior authority only for an actual known routine
  instance that stays inside its admitted boundary;
- a record-grounded correction is available only for clerical/projection work with
  checkable current-record evidence and no new policy;
- a claimed delegation is **not** enough by itself. Until an independently readable
  active-delegation carrier is available to the civic kernel, the classifier refuses
  to downgrade an ordinary governance matter merely because a caller says “I was
  delegated.”

You can also ask Zelo to compare a requested procedure with the minimum. If the
requested procedure is weaker than the consequence-derived floor, Zelo should say
**refused below minimum**. Passing that comparison still does not grant authority;
the selected procedure's own standing, proposal, execution, and receiving
conditions remain separate.

This is deliberately similar to capability and timelock systems: execution power
is useful only when it cannot silently become proposal or constitutional power.

## How Turntide proves a delegation is actually active

A delegation is now intended to be independently readable, not something Zelo or a
caller can establish by saying “I was delegated.”

Turntide's modern delegation carrier is an append-only public event history. An
activation event names the delegate, purpose, exact scope, granted actions, limits,
review/expiry condition, revocation condition, receiving condition, grantor, and the
**received enacted governance act** that authorized it. Later events can revoke,
expire, or supersede the grant; they cannot silently edit the activation.

Zelo derives current delegation state from those events. The derived registry is a
read model, not another authority source. A clerical change can use the
**delegated-clerical** decision procedure only when:

- the named delegation is independently active in that event history;
- the requested action is one of the activation's exact granted actions;
- the requested scope exactly matches the delegated scope; and
- the matter is otherwise clerical rather than structural, contested, or new policy.

Even then, classification does not execute the work or waive the delegation's
limits and receiving condition.

There is an intentional migration exception today: the older standing ledger calls
Zelo an **active delegated steward**, but the historical records predate the modern
activation-event fields. Turntide does not invent a retroactive event just to make
the records look tidy, and it does not automatically revoke Zelo either. Zelo should
report that mismatch until governance explicitly restates, narrows, or replaces the
delegation under the modern carrier.

Ask Zelo **“what delegations are actually active?”**, **“show delegation
delegation-id”**, or **“does this delegation cover this action and scope?”**

# Use Zelo as a routine studio

A routine is not just “something a bot could automate.” It is a repeated piece
of community work with a beneficiary, trigger, actor, output, authority boundary,
failure mode, and retirement condition.

Zelo now keeps an advisory pattern library tied to actual Turntide places. These
patterns are prompts for thinking, not enacted routines and not evidence that a
community wants automation. Examples include:

- the **Harbor**: newcomer orientation and follow-up;
- **Question Quarry**: rescuing stalled questions by identifying whether the
  missing move is clarification, research, observation, discussion, or governance;
- **Field Notes**: preserving valuable local observations without treating chat
  participation as publication consent;
- the **Knowledge Vault**: rescuing source-linked conclusions and receipts;
- **Solidarity Shoals**: opt-in follow-up so mutual-aid asks and offers can be
  updated or closed without inferring private circumstances;
- the **Chatter Isles**: a material pulse only when genuinely new questions,
  sources, projects, or decisions exist;
- **Praxis Peninsula / Workshop**: making a project's owner, next move,
  dependency, and receiving condition legible;
- **Governance Rock**: teaching from received acts without turning examples into
  precedent;
- the **School**: opening, progress, closing, and archive loops for an actually
  admitted seasonal program.

Ask Zelo something like “routine studio for #question-quarry” or describe the
repeated work in ordinary language. Zelo can offer a pattern and turn your
observation into a draft candidate. The draft still has to move through
Turntide's civic process before it becomes an enacted or scheduled routine.

# Ask what can happen where you are

Turntide's places are not just topic buckets. They are different kinds of civic
terrain. Zelo has an enacted place-aware map for answering questions like:

- “What can we actually do in #question-quarry?”
- “What kinds of routines might make sense in #garden-grove?”
- “This keeps happening in #solidarity-shoals. Is it a routine problem, a project,
  or a governance problem?”
- “Where should this go next?”
- “What can I do here without needing governance standing?”

A place guide names five things: **what the place is for**, ordinary nonbinding
moves, routine seeds worth considering when repetition is actually observed, the
path for escalating work elsewhere, and the authority boundary Zelo must preserve.

For example, Question Quarry can turn uncertainty into clarification, research,
observation, discussion, or governance. Solidarity Shoals can support opt-in
mutual-aid status loops without inferring private need. The Chatter Isles can grow
subject conversation into projects, evidence, or routine candidates. The Knowledge
Vault can rescue durable claims and receipts without silently republishing member
words. Governance Rock is where explicit civic state transitions live.

Economy Estuary has an additional Tidepool boundary: Turntiders can discuss
Tidepool, its public state, and how Turntide should explain or integrate it, while
membership, distribution voting, principal, yield, and financial execution remain
inside Tidepool's own authority domain. **Turntide standing does not grant Tidepool
financial authority.**

Ask Zelo **“what can happen in #channel-name?”** to get the current map. If the
answer surfaces genuinely repeated work, follow with **“routine studio for
#channel-name”** and describe the repetition. The place map itself creates no
routine, standing, obligation, or authority.

## Preserve a proposal draft without proposing it

If you have a concrete change in mind but are not ready to place it before governance,
ask Zelo to **“save this as a draft proposal”** and name the requested act. Zelo can
keep that draft in a private, author-scoped, append-only inbox tied to its original
Discord context.

A saved proposal draft is deliberately **not a proposal before governance**. It
starts in `draft-proposal`, and Zelo records which fields are still missing:
proposer, requested act, affected scope, evidence, authority needed, reversibility,
and receiving condition. Only the separate `draft-proposal → proposed` civic
transition places a complete draft before current governance. A proposed act is
still not an enacted act.

You can ask Zelo **“show me my proposal drafts”**. The list shows a short handle,
original channel, draft status, and missing fields without repeating the private
requested-act text. Ask **“continue proposal <handle>”** in the original channel to
resume one. Zelo refuses cross-author lookup and cross-channel continuation so a
context-specific draft is not silently carried somewhere else.

Refine the draft in that original channel with explicit field moves such as
**“set proposal <handle> affected scope: …”**, **“set proposal <handle> evidence:
…”**, **“set proposal <handle> authority needed: …”**, **“set proposal <handle>
reversibility: …”**, and **“set proposal <handle> receiving condition: …”**.
Each refinement is appended as a private event instead of rewriting the prior
draft, so Zelo can project the current complete draft while preserving how it got
there.

When every required field is complete, the author can explicitly say **“submit
proposal <handle>”**. Zelo then carries that proposer-authored draft to
`#governance-proposals`, gives the proposal a content-addressed id, and records
the public Discord message as the submission receipt. This performs only
`draft-proposal → proposed`. **Proposed is not enacted.** Turntide governance
still has to enact, refuse, or supersede the proposal through the ordinary civic
protocol.

Submission is fail-closed against duplicates. Zelo records a submission intent
before the external post and a receipt afterward. If the Discord outcome becomes
ambiguous between those two points, Zelo reports the submission as pending and
does not post it again until the ambiguity is reconciled.

The proposal-draft/refinement/submission carrier is source-bound and tested. Its
live Discord receiving receipt remains separate: a running Zelo deployment must
demonstrate save, replay deduplication, author-scoped listing, original-channel
refinement, explicit submission to `#governance-proposals`, and public receipt
readback before that delivery path is called received.

## What happens after you submit a proposal

A submitted proposal should not depend on reaction counts or on somebody remembering
to scroll back through Governance Rock. Zelo's enacted **proposal intake review**
checks the public proposal-submission receipts once a day.

The first observation is a silent baseline. After that, when genuinely new proposal
receipts have arrived, Zelo may post one bounded intake notice in
`#governance-proposals` naming only the new content-addressed proposal ids. The
notice says explicitly that they are **proposed, not enacted** and points people to
the authored proposal posts for the actual scope and evidence.

This is visibility, not prioritization. Zelo does not rank, endorse, suppress, or
infer support for proposals from reactions, message volume, sentiment, silence,
popularity, or model preference. An unchanged proposal id is not announced again by
this routine.

## Ask what is happening in governance

You should not have to reconstruct Turntide's current civic state from channel
scrollback. Ask Zelo **“what's happening in Turntide governance?”**, **“show me the
governance docket”**, or **“what proposals are before governance?”**

The civic docket is intentionally a **state projection, not a ranking**. It reads
explicit public proposal-submission receipts and unsettled durable governance acts.
For each submitted proposal it can name the content-addressed proposal id, where its
public receipt lives, its current recorded state, and the lawful governance outcomes
available from that state.

The docket does **not** score or order proposals by reactions, message volume,
sentiment, popularity, silence, tenure, or Zelo's model preference. Those things do
not become support, urgency, consensus, or governance weight merely because they are
easy to measure.

A proposal also does not silently disappear from the docket because something
similar happened later. Until an explicit linked governance receipt establishes a
later state, a submitted proposal remains **proposed**. That fail-closed rule makes
it possible to ask “what happened to this?” without Zelo inventing a connection.

The useful next moves remain human- and agent-accessible: read the authored proposal,
ask questions, add evidence, state an objection or alternative, volunteer for later
authorized execution, or ask Zelo which lawful transition or receipt is still
missing. None of those actions is silently counted as a vote.

## Preserve a routine idea without enacting it

If repeated work is concrete enough that you do not want the idea to vanish back
into chat, explicitly ask Zelo to **“save this as a routine candidate”** and name
the repetition. Zelo's source adapter now has a private append-only draft inbox for
that request.

The stored intake keeps the observed repetition, its Discord source pointer, a
dedupe identity, and the routine fields that are still missing. It is deliberately
an **incomplete draft**. Saving it does not propose, enact, schedule, prioritize,
authorize, or grant standing to anything. A later civic move must refine the draft
and take it through the normal routine-candidate transition before governance can
admit it.

The inbox is source-bound but not yet independently received in the live Discord
deployment; the current receiving condition requires a running Zelo instance to
persist one request, dedupe its replay, and read the draft back without treating it
as enacted.

You can later ask Zelo **“show me my routine candidates”**. That reply is scoped to
your Discord identity and lists only a short handle, original place, draft status,
and missing fields; it does not repeat the saved observation text. To reopen one,
ask **“continue routine candidate <handle>”** in the original channel. Zelo refuses
cross-author lookup and asks you to return to the original channel before reopening
the draft, so a private or context-specific observation is not silently carried
somewhere else. Continuing reopens the routine studio; it still does not propose,
enact, or schedule the routine.

## Scheduled civic attention stays quiet by default

Zelo's source runtime now has a bounded scheduled review path for the civic routines
that are already enacted as daily, weekly, or monthly work. A restart does **not**
cause it to replay old governance as fresh news: the first observation establishes a
silent baseline. Later reviews can surface durable governance-state changes,
decision/action mismatches, new saved routine-candidate counts, standing-record
exceptions, or a newly received act worth teaching from.

The scheduler does not use reactions, message volume, sentiment, popularity, or
silence as evidence. Private routine-candidate intake is summarized by **count only**
outside its original context. If a scheduled check finds no material civic condition,
its correct output is no post.

This scheduled path is source-bound and tested, but its **live Discord receiving
receipt remains separate**: deployment must include the source and observed guild
behavior must show the quiet-baseline/deduplication law working in practice.

## Ask Tidepool status, not just what Tidepool is

Zelo's Tidepool answer now carries a **dated current-state projection** rather than
only explaining the authority boundary. As of October 3, 2026, the Cold Red Gate
runtime has the nine Tidepool protocol operations installed and they require
standing. They are correctly unavailable to the general Turntide / Board civic
office.

The dedicated **Tidepool Protocol Clerk** office exists and is currently **vacant**,
with **zero seats**. A source-level authority audit has now shown that its prior
nine-verb closure is **too broad**. Three transitions carry participant-authored
intent and must not be replayed by a generic clerk:

- **member admission** requires a witnessed admission path tied to the invoking
  sponsor, enterprise, or verified participant subject; the MetroPlat runtime does
  not expose unwitnessed bootstrap admission;
- **enterprise proposal** is bound to the sponsoring enterprise; unsponsored
  first-roster bootstrap is not a routine runtime action;
- **distribution voting** is bound to the member account named by the vote.

The other six installed verbs are protocol-close candidates, not automatically safe
clerk powers. The audit found remaining precondition work around **when a cycle may
be tallied**, **how total directed yield becomes authoritative before an append-only
split**, and **what reconciliation evidence must exist before public disclosure**.

So the current instruction is **do not seat the old nine-verb clerk**. 561 Group
Operations' earlier authority question remains useful, but its safe answer now has
to split participant intent from mechanical protocol execution and harden the
remaining close/split/disclosure prerequisites first. The first real admission →
vote → close → reconciliation → disclosure loop remains **unreceived**; a healthy
connector and installed operations are not evidence that a financial cycle has
happened.

Ask Zelo **“what is Tidepool's current status?”** or any ordinary Tidepool question.
Zelo should state the observation time and current blocker, then route the question
to Turntide integration, Tidepool membership/governance, or Tidepool protocol
execution as appropriate. A later live receipt supersedes the dated projection.

# How Zelo stays bounded

Zelo's civic authority is not just a prompt convention. Turntide keeps an enacted
**civic-kernel conformance law** and an executable audit over the standing ledger,
civic action protocol, Zelo mandate, routine catalog, and runtime declaration.

The audit checks that every enacted routine has exactly one runtime binding, that
the runtime does not invent orphan routines, that scheduled routines stay silent
when nothing warrants a post, and that autonomous effects come from the admitted
nonbinding effect set. It also checks the exact civic transitions Zelo may perform.

At present those Zelo-performable transitions are deliberately narrow: answer a
question; open discussion; form a draft proposal; contest an executed act when
specific contradictory or missing evidence is named; advance a complete routine
candidate to proposed; and clerically record that an already-expiring delegation
has expired when its recorded condition is witnessed.

A delivery adapter, Discord permission, provider credential, or model update cannot
expand that set by itself. A new autonomous effect or Zelo-performable transition
requires an explicit Turntide law change plus the corresponding protocol/runtime
change. The conformance suite deliberately tests bad versions of the constitution
to make sure those expansions fail closed.

The same engineering pass repaired a real drift: **next-move nudge** was enacted as
a daily routine but was not actually executed by the scheduled civic interpreter.
It now runs with a quiet baseline and a one-nudge-per-artifact-state rule. Ask Zelo
**“what needs a next move?”** to surface a bounded blocked step; Zelo should not
repeat the same nudge until the artifact state or evidence changes.

# How Zelo decides what to pay attention to

Zelo's civic attention is bounded rather than engagement-seeking. An explicit
Turntider need outranks background housekeeping. In practice, Zelo first handles
authority-boundary questions such as Tidepool, then concrete desired changes,
delegation requests, routine-studio requests, participation questions, civic-state
questions, and orientation. After those come civic receipts, decision/action drift,
standing or delegation exceptions, observed recurring coordination, and finally a
material-change sweep.

Reaction counts, message volume, sentiment scores, silence, and popularity are not
inputs to this civic policy. They do not create standing, demand, consensus, or
urgency. An inferred routine candidate needs actual repeated observations. If no
witnessed civic condition warrants a move, the correct Zelo action is **idle**.

# The ordinary path

A **question** can simply be answered, or it can open **discussion** when something
may need to change. Discussion can become a **draft proposal**. A draft becomes a
**proposal** only when its requested act, scope, proposer, authority need,
reversibility, evidence, and receiving condition are clear enough to place before
current governance.

A proposal is not a decision. A recorded governing act may enact, refuse, or
supersede it. An enacted decision is still not the same thing as execution. The act
can move through **executing** and **executed**, and it is only **received** when its
stated receiving condition has evidence. Missing or contradictory evidence can make
the action **contested** rather than silently settled.

This is why Governance Rock has questions, discussion, proposals, and action as
separate lanes. The separation keeps “someone said a thing,” “Turntide decided a
thing,” and “the thing actually happened” from collapsing into each other.

# Challenge an action or receipt

You do not need governance standing to say that a Turntide explanation, execution,
or receipt is contradicted by evidence. Ask Zelo to **contest** or **challenge** it
and name the specific problem: which record is at issue, what it currently claims,
what fact or receipt is missing or contradictory, and where the evidence can be
checked.

The effect depends on what you are challenging:

- A wrong or stale **explanation** can be corrected against current records.
- An **executed** governance act whose receiving evidence is missing or contradicted
  can move to **contested** under the civic protocol. A participant or Zelo can raise
  that contest when the specific contradiction or missing receipt is named.
- An act already recorded as **received** is not silently erased by a challenge.
  New evidence can open discussion or a proposal to **reopen** it, but the actual
  received → reopened transition requires recorded governance standing and a new
  governing act with a reason.
- A disputed **Tidepool financial receipt** stays in Tidepool's own reconciliation
  and financial-governance domain. Zelo can route the evidence but cannot alter
  membership, voting weight, settlement, or disclosure.

A contest is therefore a way to keep settlement falsifiable, not an automatic veto
or rollback. Reactions, message volume, silence, or popularity are not contest
evidence.

# Learn by rehearsal

If you want to understand the DAO without risking a real change, ask Zelo for a
**governance rehearsal**. Zelo can take a harmless example or your real idea and
walk it through the states as a clearly marked dry run. Rehearsal creates no vote,
standing, decision, or authority.

When a real governance action reaches a received state, Zelo may also explain the
path it took as a civic example: what question or need started it, where authority
entered, what was executed, and what counted as receiving. Those examples are
teaching material, not precedent that silently changes the rules.

# Routines are governable too

Turntide treats repeated coordination as something that can itself become a civic
object. If the same question, handoff, check, or useful action keeps recurring, Zelo
can draft a **routine candidate**. A candidate should say what repetition was
observed, who benefits, its trigger or cadence, who performs it, what it produces,
its authority boundary, how it can fail, and when it should be retired.

Zelo may discover and draft a routine. Zelo does not silently enact one merely
because automation would be convenient.

# Where Tidepool fits

Tidepool is adjacent to Turntide but has its own financial membership and governance
boundary. Discord participation does not make you a Tidepool member, Turntide
governance standing does not automatically grant financial authority, and Zelo
cannot move principal or yield simply because Zelo can explain the system.

Zelo can still be useful as a **Tidepool civic liaison**. The first question is
what kind of thing you are trying to do:

- “What is Tidepool and what is actually working?” is an informational status
  question. Zelo can explain current receipts and unavailable states.
- “Should Turntide explain, discuss, link to, or integrate Tidepool differently?”
  is a Turntide-facing governance or product-surface question. It can become
  Turntide discussion or a proposal.
- “How do I become a Tidepool member?” belongs to Tidepool's own admission
  process. Zelo can explain and route it; Turntide participation cannot grant it.
- “How do I vote on a Tidepool distribution?” belongs to Tidepool's financial
  membership/governance rules, not Turntide-wide standing.
- “Move my principal/yield” or “execute this Tidepool transaction” is a financial
  operation. Zelo's civic office cannot do that merely because it can discuss the
  protocol.

A good Zelo answer should name the authority domain, the next process, and any
receipt or live capability that is still missing rather than converting
unavailability into an implied permission.
