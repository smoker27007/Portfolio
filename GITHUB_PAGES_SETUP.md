# GitHub Pages Configuration

Your Portfolio is configured to deploy via **GitHub Actions** to GitHub Pages.

## Important: Verify GitHub Pages Settings

⚠️ **If you're seeing JSX MIME type errors, your GitHub Pages source is incorrectly configured.**

### Fix GitHub Pages Settings:

1. Go to your repository: https://github.com/smoker27007/Portfolio
2. Click **Settings** tab
3. Scroll down to **"Pages"** section
4. Under **"Build and deployment"**:
   - **Source**: Select **"GitHub Actions"** (NOT "Deploy from a branch")
   - If you see "Deploy from a branch", change it to "GitHub Actions"
5. **Save** and refresh the page

## What Should Happen:

✅ When you push to `main`:
1. GitHub Actions builds your project
2. Creates `/dist` folder with optimized files
3. Uploads artifact to GitHub Pages
4. GitHub Pages deploys the artifact automatically

✅ Users visit: https://smoker27007.github.io/Portfolio/
✅ GitHub serves the optimized build from `/dist` folder
✅ No JSX files are exposed to browser (they're bundled into single JS file)

## Troubleshooting:

- **Seeing source imports (src/main.jsx)?** → GitHub Pages source is wrong (set to branch instead of Actions)
- **404 on favicon?** → Clear browser cache or wait 5 minutes for GitHub Pages to update
- **Check GitHub Actions runs** → https://github.com/smoker27007/Portfolio/actions
