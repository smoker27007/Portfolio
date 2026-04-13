# Client Portfolio Website

I created this project as a client-facing portfolio website to present my work, design language, and development quality in a polished, interactive format.

My goal with this build was to make the experience feel premium and easy to explore, so potential clients can quickly understand what I do, how I work, and how to reach me.

## Project Purpose

I designed this portfolio to:

- Introduce me as a full-stack developer with a strong UI/UX mindset.
- Showcase selected projects in a structured, easy-to-browse format.
- Reflect my visual style through motion, typography, and layout decisions.
- Give clients a direct and simple contact path for collaboration.

## What Is Inside

The website includes these main sections:

- Hero section with animated intro messaging.
- About section with my profile and approach.
- Projects section with featured client-focused work cards.
- Contact section with CTA buttons, email, and social links.

## Tech Stack

- React 19
- Vite 8
- GSAP (animation)
- Lucide React (icons)
- CSS modules/files with responsive breakpoints

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Preview production build locally:

```bash
npm run preview
```

## Deployment

This repository is configured to deploy automatically to GitHub Pages using GitHub Actions.

- Workflow file: `.github/workflows/deploy-pages.yml`
- Trigger: push to `main`
- Output: Vite production build from `dist/`

Expected live URL format:

`https://<your-github-username>.github.io/Portfolio/`

## Project Structure (High Level)

```text
src/
	components/
		AboutSection/
		ContactSection/
		Navbar/
		ProjectSection/
	Pages/
		Hero/
		Projects/
		Contact/
	App.jsx
	main.jsx
```

## Notes

- The interface uses purposeful animation to improve storytelling without sacrificing usability.
- Responsive styles are included for desktop, tablet, and mobile devices.
- This project represents how I build for real client presentation: clean structure, modern motion, and clear communication.
