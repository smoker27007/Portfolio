import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(() => {
  const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]
  const isGitHubActions = process.env.GITHUB_ACTIONS === 'true'

  return {
    plugins: [react()],
    base: isGitHubActions && repoName ? `/${repoName}/` : '/',
  }
})
