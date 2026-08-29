Now enhance the entire PUBLIC WEBSITE + CUSTOMER DASHBOARD with significantly richer visual interactions, illustrations, hover effects, motion and a custom cursor.

IMPORTANT:
Do NOT redesign the existing UI.
Keep the current layout, branding, colors and structure.

This phase is purely for:
- Premium animations
- Micro-interactions
- Decorative illustrations
- Hover effects
- Scroll effects
- Custom cursor
- Better visual depth

The result should feel like an Awwwards-quality pet-care experience without becoming distracting or slow.

==================================================
1. CUSTOM MOUSE CURSOR
==================================================

Create a premium custom cursor for DESKTOP ONLY.

Default:
- Small soft circular cursor
- Smooth interpolation / slight trailing movement

When hovering clickable elements:
- Cursor expands smoothly
- Add subtle text where appropriate:
  "View"
  "Book"
  "Open"
  "Explore"

For image cards:
Cursor can transform into:
"View →"

For Book Appointment CTA:
"Book"

For AI Assistant:
"Ask"

IMPORTANT:
- Hide custom cursor on mobile/tablet/touch devices
- Preserve accessibility
- Do not interfere with text selection
- Do not create excessive cursor lag
- Use requestAnimationFrame / performant animation
- Respect prefers-reduced-motion

==================================================
2. HERO ANIMATIONS
==================================================

Make homepage hero feel alive.

Add:

- Headline stagger reveal
- Supporting copy fade + slide
- CTA stagger
- Pet image mask reveal
- Paw illustrations floating subtly
- Decorative lines drawing into view
- Gentle image parallax on mouse movement
- Floating review/AI badges
- Slight magnetic CTA interaction

Do NOT create exaggerated 3D movement.

==================================================
3. PET ILLUSTRATIONS
==================================================

Add custom decorative SVG illustrations throughout the platform.

Examples:

- Paw prints
- Bones
- Pet bowls
- Hearts
- Dog collars
- Small balls
- Cat toys
- Sparkles
- Grooming scissors
- Veterinary cross
- Syringe/vaccine icon
- Pet footprints

Use them as subtle visual accents.

Some can gently:

float
rotate
bounce
drift
follow scroll

Illustrations should match the brand and feel hand-crafted.

Avoid childish cartoon styling.

==================================================
4. SERVICE CARD INTERACTIONS
==================================================

Make service sections more interactive.

On hover:

- Image slightly zooms
- Card lifts subtly
- Background/accent shape moves
- Icon rotates or scales slightly
- Arrow animates
- Decorative paws appear/move
- Border/shadow transitions smoothly

Different service cards can have slightly different hover behavior.

Do NOT make every card use the exact same animation.

==================================================
5. PET PROFILE CARDS
==================================================

For customer pet cards:

Hover:
- Slight card lift
- Pet image zoom
- Soft background glow
- Pet information smoothly reveals
- Action arrow slides in

Add a tiny animated paw or heart interaction.

On click:
Smooth route transition into pet details.

==================================================
6. BOOKING FLOW ANIMATION
==================================================

Enhance booking steps significantly.

When switching steps:

Current step exits subtly.
Next step slides/fades in.

Progress indicator should animate.

Selected pet:
Card visually transforms into selected state.

Selected service:
Smooth animated border/background.

Calendar:
Date hover animation.

Time slots:
Hover → slight scale/lift
Selected → animated confirmation state

On appointment confirmation:

Create a tasteful success animation:

- Checkmark draw animation
- Small paw/confetti particles
- Appointment card reveal

Do NOT use excessive party/confetti effects.

==================================================
7. AI ASSISTANT EXPERIENCE
==================================================

Make the AI assistant feel especially premium.

Add:

- Animated AI assistant icon
- Subtle pulsing state while processing
- Typing indicator
- Smooth message appearance
- Chat input focus animation
- Suggested prompt chip interactions
- Pet selector transitions

When AI is generating:
Use subtle animated paw / sparkle loader rather than generic spinner.

==================================================
8. SCROLL ANIMATIONS
==================================================

Use IntersectionObserver / Framer Motion.

Implement:

- Fade-up
- Fade-in
- Image mask reveals
- Staggered cards
- Text line reveals
- Decorative SVG animations

Animations should happen naturally as sections enter viewport.

Avoid animating every single element.

==================================================
9. IMAGE INTERACTIONS
==================================================

For premium pet imagery:

Add subtle:

- Parallax
- Clip-path reveals
- Mask transitions
- Hover zoom
- Mouse-based movement

For circular/arch images:
Animate image slightly independently from its mask.

==================================================
10. MAGNETIC BUTTONS
==================================================

Use very subtle magnetic effects on important CTAs:

Book Appointment
Explore Services
Ask Pet Assistant
Add Pet

Cursor proximity should move button only a few pixels.

Never make buttons difficult to click.

==================================================
11. NAVBAR
==================================================

Enhance navbar:

- Smooth underline animation
- Active route indicator
- Logo subtle hover
- CTA magnetic interaction
- Sticky navbar transition
- Slight background blur only after scrolling

Mobile menu:

- Full polished animated opening
- Menu items stagger in
- Background decorative pet illustration
- Smooth close transition

==================================================
12. PAGE TRANSITIONS
==================================================

Add transitions between major routes.

Examples:

Homepage → Services
Dashboard → Pets
Pets → Pet Details
Dashboard → Booking

Use:

fade
mask reveal
very slight vertical movement

Keep transitions around 200–400ms.

Do not slow navigation.

==================================================
13. DASHBOARD ANIMATIONS
==================================================

Dashboard should not feel static.

Add:

- Welcome content entrance
- Pet card stagger
- Appointment preview entrance
- Reminder animations
- Quick action hover states
- Notification dropdown transition

Stats can animate numbers once when entering viewport.

==================================================
14. EMPTY STATE ILLUSTRATIONS
==================================================

Create beautiful custom SVG empty-state illustrations.

Examples:

No Pets:
Pet bed + paw illustration

No Appointments:
Calendar + paw

No Notifications:
Sleeping pet

No AI Conversations:
Friendly pet assistant illustration

No Search Results:
Pet looking through magnifying glass

Keep illustrations simple, premium and consistent.

==================================================
15. LOADING STATES
==================================================

Upgrade loading experience.

Instead of only generic skeletons:

Use branded loading animations when appropriate.

Example:
Animated paw prints moving across screen.

For pet content:
Skeleton cards remain preferred.

For AI:
Animated pet assistant indicator.

==================================================
16. HOVER EFFECT SYSTEM
==================================================

Define reusable hover behavior.

Buttons:
- Lift 2–3px
- Smooth shadow
- Icon movement

Cards:
- Transform
- Image zoom
- Shadow transition

Links:
- Animated underline / arrow

Images:
- Subtle scale

Icons:
- Small rotation or scale

Create reusable animation variants instead of repeating arbitrary values.

==================================================
17. DECORATIVE BACKGROUND MOTION
==================================================

Some sections may contain:

Floating blurred shapes
Pet footprints
Organic blobs
Hand-drawn lines
Tiny particles

Their movement should be extremely slow.

They exist only to add depth.

==================================================
18. SCROLL PROGRESS
==================================================

Optional on public pages:

Add a very thin branded scroll progress line at the top of the viewport.

Keep it subtle.

Do not use it inside dashboard pages unless it improves UX.

==================================================
19. PERFORMANCE
==================================================

Animations must NOT damage performance.

Requirements:

- Prefer transform + opacity
- Avoid layout-triggering animation
- Avoid heavy mouse event calculations
- Use requestAnimationFrame where needed
- Lazy-load decorative assets
- Avoid unnecessary continuous animations
- Pause animations when outside viewport where possible

Maintain smooth 60fps interactions.

==================================================
20. ACCESSIBILITY
==================================================

Respect:

prefers-reduced-motion

When enabled:
- Disable parallax
- Disable magnetic buttons
- Reduce page transitions
- Disable floating animations
- Disable custom cursor effects if necessary

Keyboard users must still receive proper focus states.

Never replace accessibility with visual effects.

==================================================
FINAL DESIGN TARGET
==================================================

The platform should now feel:

Interactive
Premium
Playful
Alive
Polished
Memorable

But NOT:

Overanimated
Childish
Gaming-like
Distracting
Slow

Think premium pet wellness brand + modern interactive editorial website.

Focus heavily on:
- Pet-related SVG illustrations
- Beautiful hover behavior
- Mouse interactions
- Image mask animation
- Scroll storytelling
- Premium micro-interactions
- Smooth booking experience
- AI assistant motion

Implement these enhancements consistently across both:

PUBLIC WEBSITE
CUSTOMER DASHBOARD

Do not modify backend functionality during this phase.
Only improve the frontend interaction and visual experience.