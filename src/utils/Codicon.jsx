// VS Code Codicons - Official Icon Set
// Maps icon names to their official codicon symbols

import '@vscode/codicons/dist/codicon.css';

const CODICON_MAPPING = {
  // ── Activity Bar Icons ──────────────────────────
  'files':              'codicon-files',
  'search':             'codicon-search',
  'scm':                'codicon-source-control',
  'debug':              'codicon-debug-alt',
  'extensions':         'codicon-extensions',
  'user':               'codicon-account',
  'account':            'codicon-account',
  'settings':           'codicon-settings-gear',
  'play':               'codicon-play',

  // ── File / Folder Icons ─────────────────────────
  'folder':             'codicon-folder',
  'folderOpen':         'codicon-folder-opened',
  'file':               'codicon-file',
  'fileCode':           'codicon-file-code',
  'fileUp':             'codicon-file-upload',
  'mail':               'codicon-mail',

  // ── Chevrons / Arrows ───────────────────────────
  'chevronDown':        'codicon-chevron-down',
  'chevronRight':       'codicon-chevron-right',
  'chevronLeft':        'codicon-chevron-left',
  'chevronUp':          'codicon-chevron-up',
  'arrowRight':         'codicon-arrow-right',
  'arrowLeft':          'codicon-arrow-left',
  'arrowUp':            'codicon-arrow-up',
  'arrowDown':          'codicon-arrow-down',

  // ── Common UI Icons ─────────────────────────────
  'close':              'codicon-close',
  'moreHorizontal':     'codicon-more',
  'add':                'codicon-add',
  'remove':             'codicon-remove',
  'edit':               'codicon-edit',
  'check':              'codicon-check',
  'copy':               'codicon-copy',
  'save':               'codicon-save',

  // ── Sidebar / Explorer Actions ──────────────────
  'newFile':            'codicon-new-file',
  'newFolder':          'codicon-new-folder',
  'refresh':            'codicon-refresh',
  'collapseAll':        'codicon-collapse-all',
  'expandAll':          'codicon-expand-all',

  // ── Editor Layout Icons ─────────────────────────
  'splitHorizontal':    'codicon-split-horizontal',
  'splitVertical':      'codicon-split-vertical',
  'layoutSidebarLeft':  'codicon-layout-sidebar-left',
  'layoutSidebarRight': 'codicon-layout-sidebar-right',
  'layoutPanel':        'codicon-layout-panel',
  'layoutActivitybar':  'codicon-layout-activitybar',
  'layoutStatusbar':    'codicon-layout-statusbar',

  // ── Status / Notification Icons ─────────────────
  'warning':            'codicon-warning',
  'error':              'codicon-error',
  'info':               'codicon-info',
  'bell':               'codicon-bell',
  'pass':               'codicon-pass',
  'shield':             'codicon-shield',
  'verified':           'codicon-verified',

  // ── Source Control ──────────────────────────────
  'gitCommit':          'codicon-git-commit',
  'gitBranch':          'codicon-git-branch',
  'gitMerge':           'codicon-git-merge',
  'gitPull':            'codicon-repo-pull',
  'gitPush':            'codicon-repo-push',
  'gitFetch':           'codicon-repo-fetch',
  'diff':               'codicon-diff',

  // ── Symbol / Language Icons ─────────────────────
  'symbol-misc':        'codicon-symbol-misc',
  'symbolMethod':       'codicon-symbol-method',
  'symbolClass':        'codicon-symbol-class',
  'symbolInterface':    'codicon-symbol-interface',
  'symbolVariable':     'codicon-symbol-variable',
  'symbolEnum':         'codicon-symbol-enum',
  'symbolKey':          'codicon-symbol-key',
  'symbolString':       'codicon-symbol-string',
  'symbolNumber':       'codicon-symbol-numeric',
  'symbolBoolean':      'codicon-symbol-boolean',
  'symbolArray':        'codicon-symbol-array',
  'symbolObject':       'codicon-symbol-object',
  'symbolOperator':     'codicon-symbol-operator',
  'symbolProperty':     'codicon-symbol-property',
  'symbolEvent':        'codicon-symbol-event',
  'symbolField':        'codicon-symbol-field',
  'symbolModule':       'codicon-symbol-module',
  'symbolNamespace':    'codicon-symbol-namespace',
  'symbolPackage':      'codicon-symbol-package',
  'symbolParameter':    'codicon-symbol-parameter',
  'symbolConstant':     'codicon-symbol-constant',
  'symbolEnumMember':   'codicon-symbol-enum-member',
  'symbolSnippet':      'codicon-symbol-snippet',
  'symbolColor':        'codicon-symbol-color',
  'symbolFile':         'codicon-symbol-file',
  'symbolFolder':       'codicon-symbol-folder',
  'symbolTypeParameter':'codicon-symbol-type-parameter',
  'symbolUnit':         'codicon-symbol-unit',
  'symbolValue':        'codicon-symbol-value',
  'symbolStructure':    'codicon-symbol-structure',
  'symbolText':         'codicon-symbol-text',
  'symbolKeyword':      'codicon-symbol-keyword',
  'symbolNull':         'codicon-symbol-null',
  'symbolReference':    'codicon-symbol-reference',

  // ── Welcome Screen / Misc Icons ─────────────────
  'star':               'codicon-star',
  'starFull':           'codicon-star-full',
  'lightbulb':          'codicon-lightbulb',
  'lightbulbAutofix':   'codicon-lightbulb-autofix',
  'layers':             'codicon-layers',
  'wrench':             'codicon-tools',
  'sparkles':           'codicon-sparkle',
  'globe':              'codicon-globe',
  'link':               'codicon-link',
  'linkExternal':       'codicon-link-external',
  'pin':                'codicon-pinned',
  'unpin':              'codicon-pin',
  'trash':              'codicon-trash',
  'eye':                'codicon-eye',
  'eyeClosed':          'codicon-eye-closed',
  'lock':               'codicon-lock',
  'unlock':             'codicon-unlock',
  'key':                'codicon-key',
  'tag':                'codicon-tag',
  'comment':            'codicon-comment',
  'commentDiscussion':  'codicon-comment-discussion',
  'reactions':          'codicon-reactions',
  'mention':            'codicon-mention',
  'organization':       'codicon-organization',
  'repo':               'codicon-repo',
  'repoClone':          'codicon-repo-clone',
  'repoForked':         'codicon-repo-forked',
  'repoTemplate':       'codicon-repo-template',
  'requestChanges':     'codicon-request-changes',
  'rss':                'codicon-rss',
  'bookmark':           'codicon-bookmark',
  'heart':              'codicon-heart',
  'heartFilled':        'codicon-heart-filled',
  'trophy':             'codicon-trophy',
  'flame':              'codicon-flame',
  'zap':                'codicon-zap',
  'gift':               'codicon-gift',
  'rocket':             'codicon-rocket',
  'megaphone':          'codicon-megaphone',
  'broadcast':          'codicon-broadcast',

  // ── Terminal / Debug ────────────────────────────
  'terminal':           'codicon-terminal',
  'terminalBash':       'codicon-terminal-bash',
  'terminalPowershell': 'codicon-terminal-powershell',
  'terminalCmd':        'codicon-terminal-cmd',
  'debugStart':         'codicon-debug-start',
  'debugStop':          'codicon-debug-stop',
  'debugPause':         'codicon-debug-pause',
  'debugStepOver':      'codicon-debug-step-over',
  'debugStepInto':      'codicon-debug-step-into',
  'debugStepOut':       'codicon-debug-step-out',
  'debugRestart':       'codicon-debug-restart',
  'debugBreakpoint':    'codicon-debug-breakpoint',
  'debugConsole':       'codicon-debug-console',
  'runAbove':           'codicon-run-above',
  'runAll':             'codicon-run-all',
  'runBelow':           'codicon-run-below',
  'runErrors':          'codicon-run-errors',

  // ── Media / Actions ─────────────────────────────
  'playCircle':         'codicon-play-circle',
  'stopCircle':         'codicon-stop-circle',
  'record':             'codicon-record',
  'circleFilled':       'codicon-circle-filled',
  'circleOutline':      'codicon-circle-outline',
  'circleLarge':        'codicon-circle-large-outline',
  'circleDot':          'codicon-circle-large-filled',

  // ── View / Layout ───────────────────────────────
  'preview':            'codicon-preview',
  'openPreview':        'codicon-open-preview',
  'listTree':           'codicon-list-tree',
  'listFlat':           'codicon-list-flat',
  'listOrdered':        'codicon-list-ordered',
  'listUnordered':      'codicon-list-unordered',
  'listFilter':         'codicon-list-filter',
  'sortPrecedence':     'codicon-sort-precedence',
  'filter':             'codicon-filter',
  'filterFilled':       'codicon-filter-filled',
  'group':              'codicon-group-by-ref-type',
  'layout':             'codicon-layout',
  'window':             'codicon-window',
  'menu':               'codicon-menu',
  'kebabVertical':      'codicon-kebab-vertical',
  'kebabHorizontal':    'codicon-kebab-horizontal',
  'ellipsis':           'codicon-ellipsis',
  'gripper':            'codicon-gripper',
  'grabber':            'codicon-grabber',

  // ── Search / Replace ────────────────────────────
  'regex':              'codicon-regex',
  'caseSensitive':      'codicon-case-sensitive',
  'wholeWord':          'codicon-whole-word',
  'preserveCase':       'codicon-preserve-case',
  'replace':            'codicon-replace',
  'replaceAll':         'codicon-replace-all',
  'findReplace':        'codicon-find-replace',

  // ── Sync / Loading ──────────────────────────────
  'sync':               'codicon-sync',
  'syncIgnored':        'codicon-sync-ignored',
  'loading':            'codicon-loading codicon-modifier-spin',

  // ── Testing ─────────────────────────────────────
  'testingPassed':      'codicon-testing-passed-icon',
  'testingFailed':      'codicon-testing-failed-icon',
  'testingError':       'codicon-testing-error-icon',
  'testingSkipped':     'codicon-testing-skipped-icon',
  'testingRunIcon':     'codicon-testing-run-icon',
  'testingRunAll':      'codicon-testing-run-all-icon',

  // ── Extensions / Packages ───────────────────────
  'package':            'codicon-package',
  'cloud':              'codicon-cloud',
  'cloudDownload':      'codicon-cloud-download',
  'cloudUpload':        'codicon-cloud-upload',
  'database':           'codicon-database',
  'server':             'codicon-server',
  'serverEnvironment':  'codicon-server-environment',
  'serverProcess':      'codicon-server-process',

  // ── Notebook / Jupyter ──────────────────────────
  'notebook':           'codicon-notebook',
  'notebookTemplate':   'codicon-notebook-template',
  'kernelStarting':     'codicon-kernel-starting',
  'kernelStopping':     'codicon-kernel-stopping',

  // ── Miscellaneous ───────────────────────────────
  'briefcase':          'codicon-briefcase',
  'calendar':           'codicon-calendar',
  'clock':              'codicon-clock',
  'history':            'codicon-history',
  'graph':              'codicon-graph',
  'graphLine':          'codicon-graph-line',
  'graphScatter':       'codicon-graph-scatter',
  'pie':                'codicon-pie-chart',
  'table':              'codicon-table',
  'wand':               'codicon-wand',
  'beaker':             'codicon-beaker',
  'telescope':          'codicon-telescope',
  'microscope':         'codicon-microscope',
  'compass':            'codicon-compass',
  'location':           'codicon-location',
  'map':                'codicon-map',
  'mapFilled':          'codicon-map-filled',
  'milestone':          'codicon-milestone',
  'issues':             'codicon-issues',
  'issueClosed':        'codicon-issue-closed',
  'issueOpened':        'codicon-issue-opened',
  'issueDraft':         'codicon-issue-draft',
  'issueReopened':      'codicon-issue-reopened',
  'pullRequest':        'codicon-git-pull-request',
  'pullRequestClosed':  'codicon-git-pull-request-closed',
  'pullRequestDraft':   'codicon-git-pull-request-draft',
  'account2':           'codicon-person',
  'personAdd':          'codicon-person-add',
  'people':             'codicon-people',
  'robot':              'codicon-hubot',
  'copilot':            'codicon-copilot',
  'azure':              'codicon-azure',
  'github':             'codicon-github',
  'githubAction':       'codicon-github-action',
  'githubAlt':          'codicon-github-alt',
  'githubInverted':     'codicon-github-inverted',
  'vscode':             'codicon-vscode',
  'vscodeInsiders':     'codicon-vscode-insiders',
  'feedback':           'codicon-feedback',
  'report':             'codicon-report',
  'question':           'codicon-question',
  'emptyWindow':        'codicon-empty-window',
  'desktop':            'codicon-desktop-download',
  'deviceMobile':       'codicon-device-mobile',
  'deviceCamera':       'codicon-device-camera',
  'deviceCameraVideo':  'codicon-device-camera-video',
  'activate':           'codicon-activate-breakpoints',
  'disassembly':        'codicon-disassembly-view',
  'output':             'codicon-output',
  'diff2':              'codicon-diff-added',
  'diffModified':       'codicon-diff-modified',
  'diffRemoved':        'codicon-diff-removed',
  'diffRenamed':        'codicon-diff-renamed',
  'diffIgnored':        'codicon-diff-ignored',
  'indent':             'codicon-indent',
  'wordWrap':           'codicon-word-wrap',
  'unfold':             'codicon-unfold',
  'fold':               'codicon-fold',
  'foldDown':           'codicon-fold-down',
  'foldUp':             'codicon-fold-up',
  'gotoFile':           'codicon-go-to-file',
  'goBack':             'codicon-arrow-small-left',
  'goForward':          'codicon-arrow-small-right',
  'sourceControl':      'codicon-source-control',
  'bracket':            'codicon-bracket',
  'bracketDot':         'codicon-bracket-dot',
  'bracketError':       'codicon-bracket-error',
  'colorMode':          'codicon-color-mode',
  'primitiveSquare':    'codicon-primitive-square',
  'primitiveDot':       'codicon-primitive-dot',
  'dot':                'codicon-dot',
  'dash':               'codicon-dash',
  'blank':              'codicon-blank',
};

/**
 * Codicon Component — Renders official VS Code icons
 *
 * @param {string}  icon      - Icon name from CODICON_MAPPING (e.g. 'files', 'chevronDown')
 * @param {number}  size      - Icon size in pixels (default: 16)
 * @param {string}  className - Extra CSS classes
 * @param {object}  style     - Inline style overrides
 * @param {string}  title     - Accessible tooltip text
 */
export const Codicon = ({ icon, size = 16, className = '', style = {}, title }) => {
  const iconClass = CODICON_MAPPING[icon] ?? 'codicon-symbol-method';

  return (
    <i
      className={`codicon ${iconClass} ${className}`.trim()}
      style={{ fontSize: `${size}px`, lineHeight: `${size}px`, ...style }}
      aria-hidden={title ? undefined : 'true'}
      aria-label={title}
      title={title}
    />
  );
};

export default Codicon;