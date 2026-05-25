# Portfolio Makeover Design Spec

## Goal
Transform the existing Next.js application into a high-end, agent-driven portfolio with glassmorphism, advanced animations, and a seamless dark/light mode experience.

## Technical Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion (already in project)
- **Icons:** Lucide React

## Design Principles
1. **Glassmorphism:** Use `backdrop-blur` and semi-transparent borders for cards and navigation.
2. **Motion-First:** Mouse-tracking gradient backgrounds and smooth entry animations for all sections.
3. **High Contrast:** Clear distinction between dark and light modes with smooth transitions.
4. **Agentic Execution:** Use GSD (Get Stuff Done) agents for the entire lifecycle.

## Components & Structure
### 1. Hero Section
- Animated high-impact typography.
- Mouse-responsive background blur.

### 2. Featured Projects Section
- 3 projects displayed in a 3-column grid (responsive to 1-column on mobile).
- Glass-effect cards with hover scale and glow.
- "Show All Projects" button that reveals a 4th project (initial state: hidden or modal).
- Dummy content for images/info.

### 3. Theme Toggle
- Elegant switcher for Dark/Light modes.

### 4. Layout
- Mobile-responsive navigation.
- Smooth scrolling.

## Agentic Workflow
1. **gsd-planner:** Break down the implementation into atomic tasks (Theme, Layout, Hero, Projects).
2. **gsd-executor:** Implement components sequentially.
3. **gsd-verifier:** Verify responsiveness, animation performance, and theme switching.

## Success Criteria
- [ ] Dark and Light modes function perfectly.
- [ ] Mouse motion animations are fluid and non-blocking.
- [ ] Glass effect is visually consistent across all cards.
- [ ] Mobile experience is comfortable and polished.
- [ ] 4 projects are present (3 visible + 1 on button click).
