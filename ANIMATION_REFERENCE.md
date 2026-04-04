# Animation & Customization Quick Reference

## 🎬 GSAP Animation Presets

### Fade In (Entrance)
```javascript
gsap.from(".element", {
  opacity: 0,
  duration: 0.8,
  ease: "power3.out"
});
```

### Slide Up
```javascript
gsap.from(".element", {
  y: 100,
  opacity: 0,
  duration: 0.8,
  ease: "power4.out"
});
```

### Scale In
```javascript
gsap.from(".element", {
  scale: 0.8,
  opacity: 0,
  duration: 0.6,
  ease: "elastic.out(1, 0.5)"
});
```

### Text Character Stagger
```javascript
gsap.from(".char", {
  y: 120,
  opacity: 0,
  stagger: 0.025,      // Delay between each character
  duration: 1,
  ease: "back.out"
});
```

### Scroll-Triggered Animation
```javascript
gsap.from(".element", {
  y: 50,
  opacity: 0,
  duration: 0.8,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".element",
    start: "top 80%",
    toggleActions: "play none none reverse"
  }
});
```

## 🎨 Color Quick Reference

```css
/* Primary Palette */
--bg-primary: #0C1821         /* Dark navy background */
--bg-light: #F5F0EB           /* Cream background */
--accent: #4A9EFF             /* Blue */
--accent-warm: #E8724A        /* Coral */
--accent-gold: #C9A96E        /* Gold */

/* Text Colors */
--text-primary: #F2EDE8       /* Light text (on dark) */
--text-dark: #1A2332          /* Dark text (on light) */
--text-secondary: #7A8B9A     /* Muted text */
--text-light-secondary: #6B5E52 /* Muted text (on light) */
```

## 🔤 Font Sizes (Tailwind)

```javascript
// Hero Title
text-6xl   // 3.75rem (60px)
text-7xl   // 4.5rem (72px)

// Section Title
text-5xl   // 3rem (48px)

// Regular Text
text-lg    // 1.125rem (18px)
text-base  // 1rem (16px)
text-sm    // 0.875rem (14px)

// Small/Captions
text-xs    // 0.75rem (12px)
```

## 🎯 Common Tailwind Utilities

```html
<!-- Sizing -->
<div class="w-full h-screen">        <!-- Full width and height -->
<div class="w-96 h-96">               <!-- 384px square -->
<div class="max-w-4xl mx-auto">       <!-- Max width with center -->

<!-- Spacing -->
<div class="px-8 py-16">              <!-- 32px horizontal, 64px vertical -->
<div class="gap-6">                   <!-- 24px gap between flexbox items -->
<div class="mb-8 mt-6">               <!-- Margin bottom 32px, top 24px -->

<!-- Positioning -->
<div class="absolute top-0 left-0">   <!-- Absolute positioning -->
<div class="fixed bottom-0 right-0">  <!-- Fixed positioning -->
<div class="sticky top-0">            <!-- Sticky positioning -->

<!-- Flex Layout -->
<div class="flex items-center justify-between"> <!-- Flex with centering -->
<div class="flex flex-col gap-4">               <!-- Flex column -->
<div class="flex-shrink-0">                     <!-- Prevent shrinking -->

<!-- Responsive Prefixes -->
<div class="text-sm md:text-lg lg:text-xl">    <!-- Responsive text -->
<div class="flex-col md:flex-row">              <!-- Responsive direction -->
<div class="hidden md:block">                   <!-- Hide on mobile -->
```

## 🎪 Easing Functions (GSAP)

```javascript
// Linear
ease: "none"

// Power
ease: "power1.out"      // Slow out
ease: "power2.in"       // Slow in
ease: "power3.inOut"    // Slow in and out
ease: "power4.out"      // Stronger slow out

// Back
ease: "back.out"        // Bouncy reversal out

// Elastic
ease: "elastic.out(1, 0.5)"

// Bounce
ease: "bounce.out"

// Circ
ease: "circ.inOut"
```

## 📊 ScrollTrigger Config

```javascript
scrollTrigger: {
  trigger: ".element",           // Element to trigger animation
  start: "top 80%",              // When animation starts
  end: "bottom 20%",             // When animation ends
  scrub: 0.5,                    // Scrub duration (smooth scroll)
  pin: true,                     // Pin element during scroll
  markers: true,                 // Debug markers (remove in production)
  toggleActions: "play none none reverse"
  // - play:    Play animation on enter
  // - none:    Do nothing on leave
  // - none:    Do nothing on enter back
  // - reverse: Play in reverse on leave back
}
```

## 🎬 Hero Section Customization

### Change Entrance Duration
```jsx
// In Hero.jsx useEffect
entryTL
  .from(".hero-char", {
    duration: 1.5,    // Change this (1 = 1 second)
    stagger: 0.035,   // Increase for slower stagger
  })
```

### Adjust Scatter Distance
```jsx
// In Hero.jsx scrollTL
const randomX = (Math.random() - 0.5) * 1000;  // Wider scatter
const randomY = (Math.random() - 0.5) * 800 - 300; // Higher scatter
```

### Change Glow Effect
```jsx
// In Hero.jsx render
<div
  className="hero-glow"
  style={{
    background: "radial-gradient(circle, rgba(232,114,74,0.12) 0%, transparent 70%)"
    // Change color and opacity values
  }}
/>
```

## 🖱️ Button Styling

```css
/* Primary Button */
.cta-button {
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--text-primary);
  background: transparent;
}

.cta-button:hover {
  color: var(--bg-primary);
  border-color: white;
}

/* Dark Button */
.cta-button-dark {
  border: 1.5px solid var(--text-dark);
  color: var(--text-dark);
}

.cta-button-dark:hover {
  color: var(--bg-light);
  border-color: var(--text-dark);
}
```

## 🔄 Animation Timeline Timing

```javascript
gsap.timeline()
  .from(".element1", { duration: 1 })           // 0s to 1s
  .from(".element2", { duration: 0.6 }, "-=0.5") // 0.5s to 1.1s
  .from(".element3", { duration: 0.8 }, "-=0.3") // 0.8s to 1.6s

// The "-=" means start before the previous animation ends
```

## 📱 Mobile Optimization Tips

```javascript
// Reduce particle count on mobile
const GAP = window.innerWidth < 768 ? 5 : 3;

// Use matchMedia for responsive animations
gsap.matchMedia().add("(max-width: 768px)", () => {
  // Mobile-specific animations
});

// Disable animations on low-end devices
if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
  // User prefers reduced motion - disable heavy animations
}
```

## 🎨 Custom Gradient Examples

```css
/* Linear Gradient */
background: linear-gradient(90deg, #4A9EFF, #E8724A);

/* Radial Gradient */
background: radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%);

/* Conic Gradient */
background: conic-gradient(from 0deg, #4A9EFF, #E8724A);

/* With CSS Variables */
background: linear-gradient(90deg, var(--accent), var(--accent-warm));
```

## 🚀 Performance Optimization

```javascript
// Enable GPU acceleration
.element {
  will-change: transform, opacity;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}

// Use force3D in GSAP
gsap.to(".element", {
  x: 100,
  force3D: true       // Enable 3D acceleration
});

// Reduce DOM queries
const elements = gsap.utils.toArray(".element");
```

---

**Pro Tip**: Always test animations on actual devices, not just desktop browsers!
