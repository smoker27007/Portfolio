# GitHub Pages Deployment Guide

Your portfolio is now configured for automatic deployment to GitHub Pages. Follow these steps to ensure it's properly set up and deployed.

## Step 1: Verify GitHub Actions Workflow

The deployment workflow has been pushed to your repository. You can monitor it here:

https://github.com/smoker27007/Portfolio/actions

Look for a workflow named **"Deploy to GitHub Pages"** triggered by your recent push.

## Step 2: Check Repository Settings

Go to your repository settings and configure GitHub Pages:

1. Navigate to: **Settings → Pages**
2. Under "Build and deployment":
   - Source: Select **"GitHub Actions"**
   - This should already be set if the workflow is configured correctly
3. Click **"Save"** if you made any changes

## Step 3: Expected Live URL

Once the workflow completes successfully, your portfolio will be live at:

```
https://smoker27007.github.io/Portfolio/
```

(Replace `smoker27007` with your GitHub username if different)

## Step 4: Verify Deployment Success

- Check the Actions tab to see if the workflow completed without errors
- Look for a green checkmark ✓ on the latest commit
- Wait 1-2 minutes after workflow completion for the site to appear at the URL above

## Step 5: Troubleshooting

### Workflow Failed?
- Check the workflow logs in the Actions tab for error messages
- Common issues:
  - Missing `npm ci` cache — resolved by our newer workflow version
  - Node version mismatch — we use Node 20 (latest stable)

### URL Shows 404?
- Verify the base path: `/Portfolio/` is correctly set in `vite.config.js`
- Clear your browser cache (Ctrl+Shift+Del)
- Wait an additional 2-3 minutes for GitHub to fully publish

### Want to Deploy Again?
Push any change to `main` or manually trigger the workflow:

1. Go to Actions tab
2. Select "Deploy to GitHub Pages"
3. Click "Run workflow"

## Automatic Deployment

From now on, every push to the `main` branch will automatically trigger a new deployment. No manual steps needed!

---

**Questions?**
- Review the workflow file: `.github/workflows/deploy-pages.yml`
- Check Vite config: `vite.config.js`
