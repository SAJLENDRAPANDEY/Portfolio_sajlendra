export const CMD_PALETTE_ITEMS = [
  // Pages
  { label: 'Go to Home',        icon: 'fa-house',            type: 'route',    action: '/'           },
  { label: 'View All Projects', icon: 'fa-diagram-project',  type: 'route',    action: '/projects'   },
  { label: 'Experience',        icon: 'fa-briefcase',        type: 'route',    action: '/experience' },
  { label: 'Resume',            icon: 'fa-file-pdf',         type: 'route',    action: '/resume'     },
  // Sections
  { label: 'About Me',          icon: 'fa-user',             type: 'route',    action: '/#about'     },
  { label: 'Skills',            icon: 'fa-code',             type: 'route',    action: '/#skills'    },
  { label: 'GitHub Activity',   icon: 'fa-code-branch',      type: 'route',    action: '/#github'    },
  { label: 'Blogs',             icon: 'fa-pen-nib',          type: 'route',    action: '/#blogs'     },
  { label: 'Contact',           icon: 'fa-paper-plane',      type: 'route',    action: '/#contact'   },
  // External
  { label: 'GitHub Profile',    icon: 'fa-github fab',       type: 'external', action: 'https://github.com/SAJLENDRAPANDEY'                          },
  { label: 'LinkedIn',          icon: 'fa-linkedin fab',     type: 'external', action: 'https://www.linkedin.com/in/sajlendra-pandey-37378627b/'  },
  { label: 'Hashnode Blog',     icon: 'fa-rss',              type: 'external', action: 'https://sajlendrapandey.hashnode.dev/'                      },
  // Actions
  { label: 'Download Resume',   icon: 'fa-download',         type: 'download', action: '/resume/resume.pdf' },
  { label: 'Toggle Theme',      icon: 'fa-circle-half-stroke', type: 'action', action: 'theme'      },
]
