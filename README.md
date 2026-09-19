# Noir & Form Studio

PROJECT: PREMIUM MEN’S GROOMING STUDIO

Build a complete, production-quality, modern men’s grooming / premium barbershop website and booking experience.

This is NOT a simple landing page and NOT a generic barbershop template.

The goal is to create a visually outstanding, highly interactive, premium digital experience that can later be customized and reused for real barbershops.

The initial content must use fictional but realistic demo data.

The architecture must be data-driven so names, photos, services, prices, barbers, schedules, contact information, gallery items, testimonials, and branding can be replaced later without rebuilding the UI architecture.

⸻

1. CORE CONCEPT

Create a premium men’s grooming studio called:

“NOIR & FORM”

Tagline:

“YOUR STYLE. YOUR SIGNATURE.”

Brand positioning:

A contemporary, high-end men’s grooming studio focused on precision, personal style, craftsmanship, and premium experience.

The website should feel:

* premium
* masculine
* sophisticated
* editorial
* cinematic
* modern
* confident
* minimal
* artistic
* technologically polished

It must NOT feel like:

* a traditional local barbershop website
* a generic WordPress template
* a cheap salon website
* an overly decorative luxury website
* a UI made from repetitive rounded cards
* an excessive glassmorphism design
* a page overloaded with gradients
* a neon gaming-style website

The experience should feel closer to a premium fashion / grooming / editorial brand.

⸻

2. VISUAL DIRECTION

Use a luxury dark editorial design system.

Primary visual language:

* deep charcoal / near-black backgrounds
* warm off-white typography
* subtle warm metallic / bronze accent
* muted neutral surfaces
* thin borders
* large editorial typography
* generous negative space
* asymmetric layouts
* cinematic imagery
* strong visual hierarchy

Avoid excessive gold.

The accent color should be restrained and sophisticated.

Do not use bright yellow, neon colors, excessive gradients, or excessive shadows.

Avoid excessive rounded corners.

Use mostly sharp or subtly rounded rectangular elements.

Buttons should feel premium and architectural rather than playful.

⸻

3. TYPOGRAPHY

Use a strong modern display typeface for major headings.

Use a highly readable modern sans-serif for body text.

The typography should create an editorial hierarchy:

* huge hero headline
* oversized section numbers
* small uppercase labels
* restrained body copy
* strong CTA typography

Use letter spacing intentionally for English uppercase labels.

The system must support both English and Persian content.

The initial demo should primarily use English brand/UI language with Persian-ready architecture.

The layout must support RTL content correctly when Persian content is inserted later.

⸻

4. RESPONSIVE DESIGN

Build mobile-first.

The website must work beautifully on:

* iPhone
* Android phones
* tablets
* laptops
* desktop monitors
* large desktop screens

Do not simply shrink the desktop layout.

Create intentional mobile layouts.

Pay special attention to:

* touch targets
* booking interaction
* horizontal scrolling
* navigation
* gallery
* image cropping
* typography scaling
* sticky booking CTA
* form usability

The mobile experience must feel like a premium mobile product.

⸻

5. HEADER

Create a sophisticated sticky header.

Desktop:

* NOIR & FORM logo
* WORK
* BARBERS
* SERVICES
* THE CRAFT
* ABOUT
* CONTACT
* prominent BOOK NOW CTA

Mobile:

* logo
* compact menu button
* full-screen / large overlay navigation

The mobile menu should animate smoothly.

Header behavior on scroll:

* initially transparent / integrated into Hero
* gradually becomes more solid as the user scrolls
* subtle backdrop / border transition
* smooth animation
* never distracting

⸻

6. HERO — MAKE THIS THE FIRST WOW MOMENT

The Hero must be visually stunning.

Use a full-screen cinematic composition.

Use a high-quality fictional barber/grooming image or video placeholder.

The implementation must be prepared to accept either:

1. a cinematic background video
2. a high-quality image
3. a future real video from the barbers

Hero concept:

Large editorial typography:

“YOUR STYLE.”

“YOUR SIGNATURE.”

Secondary label:

“NOIR & FORM”

Supporting copy:

“Precision grooming shaped around your style.”

Primary CTA:

“BOOK YOUR APPOINTMENT”

Secondary CTA:

“EXPLORE THE STUDIO”

Include a subtle scroll indicator.

Hero should contain cinematic motion:

* slow image/video movement
* subtle parallax
* text reveal
* opacity transitions
* controlled scale
* elegant entrance animations

Do NOT create excessive animation.

The Hero should feel expensive and cinematic.

The user should immediately understand:

1. what this business is
2. that it is premium
3. that they can book an appointment

⸻

7. INTRO / STUDIO SECTION

After Hero, introduce the studio.

Headline:

“CRAFTED WITH PRECISION.”

Create a strong editorial composition combining:

* short brand statement
* large typography
* image
* subtle decorative line
* small metadata

Example content:

“NOIR & FORM is a modern grooming studio built around precision, personal style and attention to detail.”

Include a small visual statistic area:

“02 BARBERS”
“10+ YEARS EXPERIENCE”
“1000+ APPOINTMENTS”
“ONE STANDARD”

Use fictional demo numbers only.

⸻

8. BARBER SELECTION — IMPORTANT

Create a major section:

“MEET YOUR BARBERS”

Subheading:

“Choose the barber who fits your style.”

There are exactly TWO demo barbers.

BARBER 01:

“Alex Morgan”

Specialties:

“FADE · MODERN CUT · STYLING”

BARBER 02:

“Daniel Morgan”

Specialties:

“CLASSIC CUT · BEARD · GROOMING”

These are fictional demo identities.

Design the barber cards as large editorial visual blocks rather than generic cards.

Each barber should have:

* large portrait
* name
* role
* specialties
* experience
* short biography
* selected work count
* BOOK WITH ALEX / BOOK WITH DANIEL
* VIEW PROFILE

Hover interaction:

* image subtly moves / scales
* information transitions
* accent line appears
* CTA becomes visually stronger

On mobile, interactions must be touch-friendly.

⸻

9. BARBER PROFILE EXPERIENCE

Create reusable barber profile architecture.

Each barber profile should support:

* portrait
* name
* biography
* specialties
* experience
* services
* prices
* working days
* working hours
* selected gallery
* testimonials
* booking CTA

The profile architecture must be reusable for future barbers.

Do not hardcode the UI specifically around only these two people.

⸻

10. BOOKING SYSTEM — CORE FUNCTIONALITY

This is one of the most important parts of the website.

Create a real interactive front-end booking experience.

There must be TWO separate entry points:

“BOOK WITH ALEX”

and

“BOOK WITH DANIEL”

Both must lead into ONE centralized booking engine.

The booking system must support:

STEP 1 — SELECT BARBER

* Alex Morgan
* Daniel Morgan

STEP 2 — SELECT SERVICE

Demo services:

* Signature Haircut
* Skin Fade
* Haircut + Beard
* Beard Sculpt
* Classic Cut
* Styling
* Grooming Facial

Each service must have:

* duration
* price
* short description

STEP 3 — SELECT DATE

Create an interactive date selector.

STEP 4 — SELECT TIME

Display available time slots.

Unavailable slots must look clearly unavailable.

STEP 5 — CUSTOMER INFORMATION

Fields:

* Full Name
* Mobile Number
* Optional Email
* Optional Note

STEP 6 — REVIEW

Show:

* selected barber
* service
* date
* time
* duration
* price
* customer name

STEP 7 — CONFIRM

Primary CTA:

“CONFIRM APPOINTMENT”

Then show a polished success state.

Example:

“APPOINTMENT REQUEST RECEIVED”

Show appointment details and a confirmation reference number.

⸻

11. BOOKING ARCHITECTURE

Do NOT build the booking as a fake static form.

Create a structured booking state model.

Conceptually support:

Barber
Service
Duration
Price
Working Days
Working Hours
Availability
Date
Time
Customer
Booking

Keep the architecture ready for future real booking integration.

For this first demo version, the booking can operate client-side without a backend.

However, separate booking logic from presentation so a real backend/API/calendar/SMS integration can be added later.

Do not require a complete backend in this version.

⸻

12. TWO BARBER BOOKING BUTTONS

The two main barber CTAs must behave like this:

Alex:

BOOK WITH ALEX
→ centralized booking engine
→ Alex already selected

Daniel:

BOOK WITH DANIEL
→ centralized booking engine
→ Daniel already selected

The user must be able to change barber later.

Also provide:

BOOK NOW
→ centralized booking engine
→ user chooses barber

This creates three valid booking entry paths.

⸻

13. SERVICES SECTION

Create an editorial interactive services section.

Title:

“THE SERVICES”

Instead of repetitive cards, create a refined list.

Example:

01 — SIGNATURE HAIRCUT
02 — SKIN FADE
03 — HAIRCUT + BEARD
04 — BEARD SCULPT
05 — CLASSIC CUT
06 — STYLING
07 — GROOMING FACIAL

When hovering or selecting a service:

* corresponding image changes
* service description changes
* duration appears
* price appears
* BOOK THIS SERVICE CTA appears

On mobile, convert this into an elegant accordion / interactive list.

⸻

14. THE CRAFT — SIGNATURE ANIMATION SECTION

Create a visually memorable section called:

“THE CRAFT”

This should be the site’s signature interactive storytelling section.

Use scroll-driven storytelling.

Concept:

01
PRECISION

02
THE FADE

03
THE DETAIL

04
THE FINISH

As the user scrolls:

* visual changes
* text changes
* image/video transitions
* subtle scale
* controlled movement
* typography transitions

Possible visual concept:

A barber tool / clipper / scissors / hair transformation sequence.

The implementation must be prepared so real short videos can replace demo imagery later.

If video is not available, create an elegant image-based animation fallback.

The animation must be smooth and performant.

Respect prefers-reduced-motion.

Do not make the animation distracting or gimmicky.

This section should feel like an interactive editorial film.

⸻

15. GALLERY — SECOND WOW MOMENT

Create a premium editorial Gallery.

Title:

“THE WORK”

Subtitle:

“Precision you can see.”

Do NOT use a boring uniform grid.

Use an asymmetric editorial / masonry composition.

Include:

* large feature image
* medium images
* smaller images
* varying aspect ratios
* strong whitespace
* controlled image cropping

Each gallery item should support:

* image
* barber
* service
* category
* optional title

Categories:

ALL
FADE
CLASSIC
BEARD
STYLING
GROOMING

Filtering must actually work.

⸻

16. BARBER-LINKED GALLERY

Gallery items must be associated with a barber.

When a user views a barber:

“WORK BY ALEX”

or:

“WORK BY DANIEL”

should be available.

Allow filtering the gallery by barber.

This creates a direct relationship between:

Barber → Work → Service → Booking.

⸻

17. FULLSCREEN IMAGE VIEWER

When a Gallery image is clicked:

Open a polished fullscreen viewer / lightbox.

Support:

* large image
* title
* barber
* service
* next / previous
* close
* keyboard navigation
* touch swipe on mobile

Animate the viewer smoothly.

⸻

18. BEFORE / AFTER

Create:

“THE TRANSFORMATION”

Use an interactive before/after comparison slider.

Include:

* before image
* after image
* draggable divider
* labels
* smooth interaction

This should work on both desktop and mobile.

Add a small disclaimer:

“Results shown are representative examples. Individual results may vary.”

⸻

19. WHY NOIR & FORM

Create a sophisticated editorial section.

Instead of standard icon cards, use large typography and numbered statements.

01
PRECISION

02
PERSONAL STYLE

03
CRAFTSMANSHIP

04
CONSISTENCY

Each item should animate subtly into view.

⸻

20. CLIENT STORIES

Create testimonials.

Title:

“CLIENT STORIES”

Use 4–5 fictional testimonials.

Each testimonial includes:

* quote
* customer name
* service
* rating

Create an elegant responsive carousel.

Support:

* swipe on mobile
* keyboard controls
* previous / next
* accessible labels

Do not make the carousel overly complicated.

⸻

21. APPOINTMENT CTA

Create a large conversion section:

“READY FOR YOUR NEXT CUT?”

Supporting text:

“Choose your barber and reserve your chair.”

Buttons:

“BOOK WITH ALEX”

“BOOK WITH DANIEL”

This should be visually strong but minimal.

⸻

22. LOCATION / CONTACT

Create:

“FIND THE STUDIO”

Include fictional demo information:

Address:
“24 West Avenue, London”

Phone:
“+44 20 0000 0000”

Instagram:
“@noirandform”

Opening hours:

MON–FRI
09:00–20:00

SAT
10:00–18:00

SUN
Closed

Include:

* map placeholder
* phone CTA
* WhatsApp CTA
* Instagram CTA

Keep these values data-driven so they can later be replaced.

⸻

23. FOOTER

Premium dark footer.

Include:

NOIR & FORM

“YOUR STYLE. YOUR SIGNATURE.”

Navigation:

WORK
BARBERS
SERVICES
THE CRAFT
ABOUT
CONTACT

Booking CTA:

BOOK APPOINTMENT

Social:

Instagram
WhatsApp

Legal:

Privacy
Terms

Copyright.

⸻

24. MOBILE BOOKING EXPERIENCE

On mobile, provide a persistent bottom booking CTA.

Example:

[ BOOK AN APPOINTMENT ]

It should remain accessible without covering important content.

When tapped, open the booking experience smoothly.

The booking interface must be optimized for one-handed mobile use.

⸻

25. MICRO INTERACTIONS

Use subtle premium interactions throughout the site:

* hover image movement
* button transitions
* underline animations
* text reveals
* section reveal
* image scale
* navigation transitions
* booking step transitions
* gallery transitions
* smooth scrolling

Use animation intentionally.

Do not animate everything.

The goal is:

“premium motion”

not:

“motion everywhere.”

⸻

26. SCROLL ANIMATIONS

Implement subtle scroll reveal animations.

Examples:

* fade + translate
* image reveal
* masked text reveal
* number transitions
* section entrance

Respect:

prefers-reduced-motion.

If reduced motion is enabled, simplify or disable non-essential motion.

⸻

27. ACCESSIBILITY

Build accessibility into the system.

Include:

* semantic HTML
* keyboard navigation
* visible focus states
* accessible buttons
* accessible form labels
* appropriate ARIA where needed
* sufficient contrast
* reduced-motion support
* accessible gallery viewer
* accessible booking flow
* error messages associated with fields

Do not sacrifice accessibility for visual effects.

⸻

28. PERFORMANCE

The site must be performant.

Avoid unnecessary dependencies.

Optimize image loading.

Use lazy loading where appropriate.

Do not load huge assets unnecessarily.

Animations should use performant CSS / transform / opacity techniques where possible.

Avoid excessive JavaScript animation when CSS is sufficient.

Do not create heavy 3D/WebGL effects unless absolutely necessary.

The site should feel fast on mobile.

⸻

29. SEO

Implement a professional SEO foundation.

Include:

* page title
* meta description
* semantic headings
* Open Graph metadata
* Twitter metadata
* canonical metadata
* appropriate image alt text
* LocalBusiness / BarberShop structured data where appropriate
* service information
* location information

Use fictional demo business information.

Make the SEO/data architecture easy to replace later.

⸻

30. DATA-DRIVEN ARCHITECTURE

Do not scatter business information throughout components.

Create reusable structured data for:

BARBERS
SERVICES
GALLERY
TESTIMONIALS
BUSINESS INFO
OPENING HOURS
BOOKING SETTINGS

For example conceptually:

barbers:

* id
* name
* title
* image
* bio
* specialties
* experience
* services
* workingDays
* workingHours

services:

* id
* name
* description
* duration
* price
* barberIds
* image

gallery:

* id
* image
* title
* category
* barberId
* serviceId

business:

* name
* phone
* WhatsApp
* Instagram
* address
* openingHours

This architecture must make future customization easy.

⸻

31. COMPONENT ARCHITECTURE

Build reusable components.

At minimum consider:

Header
MobileMenu
Hero
StudioIntro
BarberSection
BarberCard
BarberProfile
Services
ServiceItem
CraftSection
Gallery
GalleryFilter
GalleryViewer
BeforeAfter
Testimonials
Booking
BookingSteps
BarberSelector
ServiceSelector
DateSelector
TimeSelector
BookingSummary
BookingSuccess
Contact
Footer
FloatingBookButton

Avoid creating one enormous component.

Keep concerns separated.

⸻

32. BOOKING STATE

Use clean state management.

The booking state should track:

selectedBarber
selectedService
selectedDate
selectedTime
customerName
customerPhone
customerEmail
customerNote

Validate required fields.

Prevent confirmation when required information is missing.

Show clear validation feedback.

Include loading state.

Include success state.

Include reset / book another appointment.

⸻

33. ERROR HANDLING

Create polished user-friendly error states.

Examples:

No available times:

“No appointments available for this day. Please choose another date.”

Invalid phone:

“Please enter a valid mobile number.”

Missing service:

“Please choose a service.”

Missing barber:

“Please choose a barber.”

Do not expose technical errors to users.

⸻

34. EMPTY STATES

Handle empty states gracefully.

Gallery empty state.

No available appointments.

No testimonials.

No selected service.

No available barber.

The UI must never look broken.

⸻

35. DESIGN SYSTEM

Create consistent design tokens for:

* colors
* typography
* spacing
* borders
* radii
* shadows
* animation timing
* breakpoints

Do not randomly choose values throughout the project.

Create a coherent system.

⸻

36. IMPORTANT VISUAL RULES

Do:

* use large typography
* use cinematic images
* use editorial spacing
* use asymmetry
* use subtle borders
* use high-quality visual hierarchy
* use dark premium surfaces
* use sophisticated transitions
* use strong CTA placement

Do NOT:

* use excessive rounded cards
* use excessive gradients
* use excessive glassmorphism
* use excessive shadows
* use cartoon icons
* use generic stock-style salon graphics
* use bright neon colors
* use huge numbers of floating elements
* make every section look like a card grid

⸻

37. ICONOGRAPHY

Use a consistent modern icon library if icons are needed.

Keep icons minimal.

Do not use emoji as UI icons.

Icons should support the interface, not dominate it.

⸻

38. REALISTIC DEMO CONTENT

Use fictional data throughout the first version.

Do not use real people.

Demo barbers:

Alex Morgan
Daniel Morgan

Demo brand:

NOIR & FORM

Demo location:

24 West Avenue, London

Demo contact details can be placeholders.

Make it extremely easy to replace these values later.

⸻

39. IMPORTANT: NO BACKEND YET

Do not implement:

* authentication
* payment processing
* admin dashboard
* real SMS service
* real WhatsApp API
* real database
* real calendar synchronization
* real customer accounts

The booking system should be a sophisticated front-end demo with clean architecture prepared for future integration.

⸻

40. FUTURE REAL BOOKING INTEGRATION

Structure the booking logic so it can later connect to:

* database
* calendar
* booking API
* SMS confirmation
* WhatsApp
* email confirmation
* admin dashboard

Do not hardwire the UI to a specific future provider.

⸻

41. NO PLACEHOLDER-LOOKING DESIGN

Even though the data is fictional, the website must NOT look like a demo.

It should feel like a real premium business.

Use realistic copy.

Use cohesive fictional imagery.

Use realistic services and pricing.

Use consistent business identity.

⸻

42. CONTENT HIERARCHY

The page flow should be:

HEADER
↓
HERO
↓
STUDIO INTRO
↓
BARBERS
↓
SERVICES
↓
THE CRAFT
↓
GALLERY
↓
BEFORE / AFTER
↓
WHY US
↓
CLIENT STORIES
↓
BOOKING CTA
↓
LOCATION / CONTACT
↓
FOOTER

The booking CTA must appear naturally throughout the experience without becoming annoying.

⸻

43. UX PRINCIPLE

The user’s journey should feel like:

DISCOVER
→ TRUST
→ EXPLORE
→ CHOOSE BARBER
→ CHOOSE SERVICE
→ SEE AVAILABILITY
→ BOOK

The website is not only a portfolio.

It is a conversion and booking experience.

⸻

44. FINAL QUALITY BAR

Before considering the project complete, verify:

* Desktop layout
* Tablet layout
* Mobile layout
* Navigation
* Mobile menu
* Hero animation
* Barber selection
* Barber profile
* Service interaction
* Gallery filters
* Gallery fullscreen viewer
* Before/After slider
* Testimonials
* Booking flow
* Validation
* Booking success state
* Mobile sticky booking CTA
* Contact links
* Accessibility
* Keyboard navigation
* Reduced motion
* SEO metadata
* Responsive image behavior
* Performance
* No broken links
* No console errors
* No obvious layout overflow
* No unfinished placeholder sections

⸻

45. MOST IMPORTANT IMPLEMENTATION RULE

Do not stop after creating a visually attractive homepage.

Build the COMPLETE EXPERIENCE.

Every major section must be implemented.

The booking experience must actually work as a front-end interaction.

Gallery filters must work.

Gallery viewer must work.

Before/After must work.

Mobile menu must work.

Navigation must work.

Barber-specific booking buttons must work.

Service selection must work.

Date/time selection must work.

Form validation must work.

Success state must work.

All responsive layouts must be implemented.

⸻

46. FINAL CREATIVE DIRECTION

The final result should feel like:

A premium men’s grooming brand launched in 2026.

It should combine:

EDITORIAL DESIGN
+
CINEMATIC VISUALS
+
INTERACTIVE MOTION
+
REAL BOOKING UX
+
STRONG MOBILE EXPERIENCE
+
CLEAN MODERN ARCHITECTURE

The first impression should be:

“این یک سایت معمولی آرایشگاه نیست.”

The user should immediately want to explore the work, meet the barbers, and book an appointment.

Build the experience with restraint, confidence and attention to detail.

Do not over-design.

Do not add unnecessary features just to make the project larger.

Every visual and interactive element should have a purpose.

Create the complete website now.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8442d877-ae73-433c-9fc3-7e603af5c755).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
