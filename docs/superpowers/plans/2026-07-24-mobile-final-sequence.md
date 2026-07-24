# Mobile Final-Page Sequence Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Preserve the complete 10:50 narrative on mobile, then reveal the commitment card below it through an independently scrollable middle content area while the timeline and video window stay fixed.

**Architecture:** Wrap the final stage narrative in a mobile-only arrival panel and place an accessible swipe cue between it and the commitment card. At the mobile breakpoint, turn `.commute-body` into the only vertical scroller and keep the two sections in normal document order; desktop keeps its existing absolute side-card layout.

**Tech Stack:** React 19, TypeScript, Motion, CSS media queries, Vitest, Testing Library, Vite.

---

### Task 1: Define the mobile final-page DOM contract

**Files:**
- Modify: `src/components/commute/CommuteExperience.test.tsx`
- Modify: `src/components/commute/CommuteExperience.tsx`

- [ ] **Step 1: Write the failing component test**

Extend the arrived-layout test with:

```tsx
const storyPanel = document.querySelector('.arrival-story')
const cue = screen.getByText('向上滑，看看我会怎么做')
expect(storyPanel).toContainElement(screen.getByRole('heading', { name: '这一次，我们把早晨好好说完。' }))
expect(storyPanel?.nextElementSibling).toBe(cue)
expect(cue.nextElementSibling).toBe(closingCard)
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
pnpm test --run src/components/commute/CommuteExperience.test.tsx
```

Expected: FAIL because `.arrival-story` and the swipe cue do not exist.

- [ ] **Step 3: Implement the minimal DOM order**

In `CommuteExperience.tsx`, wrap `StageNarrative` and add the cue:

```tsx
<div className="arrival-story">
  <StageNarrative progress={timeline.progress} perspective={perspective} />
</div>
{arrived && <p className="mobile-closing-cue">向上滑，看看我会怎么做 <span aria-hidden="true">↑</span></p>}
```

Keep `present-closing` immediately after the cue. Change its Motion entrance to a reduced-motion-aware viewport reveal:

```tsx
initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, amount: .18 }}
transition={{ duration: reduceMotion ? 0 : .36, ease: [0.22, 1, 0.36, 1] }}
```

- [ ] **Step 4: Run the focused test and verify GREEN**

Run:

```bash
pnpm test --run src/components/commute/CommuteExperience.test.tsx
```

Expected: all `CommuteExperience` tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/commute/CommuteExperience.tsx src/components/commute/CommuteExperience.test.tsx
git commit -m "fix: sequence mobile final-page content"
```

### Task 2: Replace mobile overlap with an internal scroll flow

**Files:**
- Modify: `src/styles/letter.test.ts`
- Modify: `src/styles/letter.css`

- [ ] **Step 1: Write the failing CSS regression test**

Replace the previous short-landscape absolute-card assertions with checks that the mobile final state is an internal scroller and the card is in normal flow:

```ts
it('stacks the final narrative and commitments in a mobile scroll flow', () => {
  expect(css).toMatch(/@media \(max-width:700px\)[\s\S]*\.has-arrived \.commute-body\s*\{[^}]*overflow-y:auto[^}]*scroll-snap-type:y proximity/)
  expect(css).toMatch(/@media \(max-width:700px\)[\s\S]*\.has-arrived \.arrival-story\s*\{[^}]*min-height:100%[^}]*scroll-snap-align:start/)
  expect(css).toMatch(/@media \(max-width:700px\)[\s\S]*\.has-arrived \.present-closing\s*\{[^}]*position:relative[^}]*inset:auto[^}]*max-height:none/)
  expect(css).toMatch(/@media \(max-width:700px\)[\s\S]*\.mobile-closing-cue\s*\{[^}]*display:flex/)
})
```

- [ ] **Step 2: Run the focused CSS test and verify RED**

Run:

```bash
pnpm test --run src/styles/letter.test.ts
```

Expected: FAIL because the mobile final card is still absolutely positioned.

- [ ] **Step 3: Implement the mobile content flow**

Add the shared wrapper defaults:

```css
.arrival-story { display:contents; }
.mobile-closing-cue { display:none; }
```

Inside `@media (max-width:700px)`, replace the overlapping final-card rules with:

```css
.has-arrived .commute-body { height:100%; overflow-y:auto; overscroll-behavior:contain; scroll-snap-type:y proximity; scrollbar-width:thin; }
.has-arrived .arrival-story { display:block; position:relative; min-height:100%; scroll-snap-align:start; }
.has-arrived .arrival-story .stage-narrative { min-height:100%; }
.mobile-closing-cue { display:flex; position:absolute; left:0; right:0; bottom:.4rem; z-index:7; justify-content:center; gap:.45rem; color:var(--muted); font-size:.56rem; letter-spacing:.08em; pointer-events:none; }
.has-arrived .present-closing { position:relative; inset:auto; z-index:6; max-height:none; overflow:visible; margin:1rem 0 .75rem; scroll-snap-align:start; }
```

Retain the compact two-column typography inside the short-landscape query, but remove its absolute positioning, inset, and height constraints.

- [ ] **Step 4: Run focused tests and verify GREEN**

Run:

```bash
pnpm test --run src/styles/letter.test.ts src/components/commute/CommuteExperience.test.tsx
```

Expected: both test files pass.

- [ ] **Step 5: Commit**

```bash
git add src/styles/letter.css src/styles/letter.test.ts
git commit -m "fix: stack mobile closing sections"
```

### Task 3: Verify responsive behavior and publish

**Files:**
- No source changes expected.

- [ ] **Step 1: Run the complete automated verification**

Run:

```bash
pnpm test --run
VITE_BASE_PATH=/if-i-got-it-right/ pnpm build
git diff --check
```

Expected: 46 or more tests pass, production build exits 0, and `git diff --check` prints no errors.

- [ ] **Step 2: Verify 400×897 in the browser**

At `http://localhost:5175/`, enter the timeline and choose `10:50 到公司`. Verify:

- The heading `这一次，我们把早晨好好说完。` is visible before scrolling.
- The swipe cue is visible near the bottom of the middle content area.
- Scrolling only the middle content reveals all five commitments.
- The bottom timeline and top-right video window keep their viewport positions.

- [ ] **Step 3: Verify 667×375 in the browser**

Repeat the final-state check and verify the compact two-column commitment card remains readable without covering the clock or timeline.

- [ ] **Step 4: Integrate and deploy**

Fast-forward merge `fix/mobile-final-sequence` into `main`, push `main`, wait for the `deploy.yml` GitHub Actions run, then verify the public page and `YaYa.mp3` both return HTTP 200.
