const en = {
  // Hero section
  hero: {
    hello: "Hello,",
    iAm: "I'm Hugo Galley",
    subtitle: "A curious developer, I believe in open and collaborative code.",
  },

  // Home sections (redesign)
  sections: {
    builtWith: "Built with.",
    builtWithMuted: "The tools behind it.",
    nextProject: "Next project",
    cvLong: "Download my resume",
    aboutTitle: "About.",
    aboutMuted: "Who I am and what I like to build.",
    stackTitle: "The stack.",
    stackMuted: "The tools I build with every day.",
    workTitle: "Experience.",
    workMuted: "Where I learn by shipping.",
    osTitle: "Open source.",
    osMuted: "Projects I publish and projects I contribute to.",
    projectsTitle: "Projects.",
    projectsMuted: "Tools built to be used.",
    contactTitle: "Let's build something",
    contactMuted: "together.",
    contactText: "An idea, a project or just a question: drop me a line.",
    copyEmail: "Copy email",
    writeMe: "Send an email",
    viewProject: "View project",
    built: "Designed and built by Hugo Galley.",
    language: "Passer en français"
  },

  // Bento modals
  bento: {
  },

  // Bento cards
  bentoCards: {
    me: "About",
    meDesc: "Software developer & DevOps at AXA and student at EPSI.",
    passions: "Passions",
    passionsDesc: "Running, triathlons and 13 years of violin.",
    studies: "Education",
    studiesDesc: "Software engineering degree at EPSI Paris La Défense (2023 — 2028).",
    language: "Language",
    languageDesc: "What I use most to build solid APIs and backend applications.",
    docker: "DevOps",
    dockerDesc: "Containerizing services and ensuring reliable, reproducible deployment environments.",
  },

  // Work experience section
  work: {
    currently: "Currently",
    softwareEngineerIntern: "Software Engineer & DevOps Apprentice",
    devEngineerIntern: "Development Engineer Intern",
    stages: "internships",
    unifDesc: "Over two internships, I developed an end-to-end .NET application monitoring tool (DB, API, UI, CI/CD). I also created a Windows service and a Blazor interface to synchronize an internal tool with Dynamics 365 CRM, significantly improving user efficiency.",
    axaDesc: "Software Engineer & DevOps apprentice at AXA — building internal applications in C# .NET, setting up CI/CD pipelines, Docker containerization and participating in Agile ceremonies."
  },

  // Contact section
  contact: {
    copied: "✓ Email copied!",
  },

  // 404 page
  notFound: {
    kicker: "Error 404",
    title: "Page not found.",
    muted: "This point isn't on the map.",
    description: "The page you're looking for may have moved, or never existed.",
    button: "Back home",
    projects: "See the projects"
  },

  // Github button
  github: {
    sourceCode: "Get source code",
    demo: "Try the live demo",
    demoNote: "Fictional data reset every day, credentials already filled in."
  },

  // Project pages
  projectPages: {
    phantom: {
      title: "Phantom",
      description: "Highly secure instant messaging platform inspired by state-of-the-art protocols like Signal and WhatsApp. Phantom features end-to-end encryption (E2EE) ensuring strict communication privacy, a responsive client-server architecture in Python and JavaScript, cryptographic key negotiation, and real-time session management."
    },
    easyWorkEnv: {
      title: "EasyWorkEnv",
      description: "Open-source Python library published on PyPI crafted to streamline and secure workplace environment variable workflows. It delivers an intuitive object-oriented API, strict typing, automated validation for required variables, and seamless support for .env files across development and production pipelines.",
      pypi: "View on PyPI",
    },
    cartography: {
      title: "Cartography",
      description: "Comprehensive enterprise infrastructure mapping system designed to catalog, inspect, and search an entire network of application servers. Developed with the .NET ecosystem and Blazor, the system encompasses relational database design, a high-throughput REST API, scheduled synchronization batches, and an intuitive web UI for multi-criteria search and impact analysis."
    },
    gmailAiSort: {
      title: "Gmail AI Sort",
      description: "Intelligent email triage and automation pipeline integrating Google's official Gmail API with a local large language model (Llama 3). Performs contextual semantic parsing of inbound communications to automatically classify messages across 5 distinct categories, apply appropriate labels, and prioritize urgent items with zero manual friction."
    },
    cleanFeed: {
      title: "Clean Feed",
      imageAlt: "Preview of the Clean Feed extension and its menu",
      description: "Open source extension for Firefox and Chrome that removes the addictive parts of YouTube and Instagram: Shorts, the home feed, the Explore page and Reels. Stories, profiles and messages stay untouched. Each feature has its own toggle in a menu available in English and French, with no account and no data collection. Story centering relies on measuring the page rather than on class names, which Instagram changes regularly.",
      firefox: "Add to Firefox",
      chrome: "Add to Chrome",
      chromeSoon: "Chrome: coming soon",
      note: "Free, open source (MIT), no data collected."
    },
    numera: {
      title: "Numera",
      description: "Self-hosted app to track budget, savings and investments, built as a replacement for the spreadsheet. FastAPI and SQLite backend, React frontend, CSV statement import, projections and dashboards, encrypted backups and an MCP server to query it with Claude. Deployable in one command with Docker (amd64 and arm64 images), with a live demo available."
    },
    syncCrd2Crm: {
      title: "SyncCRD2CRM",
      description: "Robust data synchronization bridge facilitating continuous two-way alignment between legacy internal databases (CRD) and Microsoft Dynamics 365 Cloud CRM. Built with .NET and Blazor, it incorporates a flexible schema mapping interface, automated reconciliation batches, fault-tolerant retry policies, and operational audit dashboards."
    }
  },

  // Open Source section
  openSource: {
    contributions: "My contributions",
    stars: "stars",
    leafwikeIntro: "Open source self-hosted wiki I contribute to: I added what makes it easier to build, ship and customize.",
    leafwikeC1Title: "Multi-platform CI/CD pipeline",
    leafwikeC1Sub: "Automated builds on every platform",
    leafwikeC2Title: "Docker image on every release",
    leafwikeC2Sub: "Published automatically",
    leafwikeC3Title: "Custom CSS support",
    leafwikeC3Sub: "User-editable theme",
    leafwikiRole: "Contributor",
    easyWorkEnvDesc: "Python package on PyPI that sets up a work environment in a single command.",
    numeraDesc: "Self-hosted budget, savings and investments app: local SQLite data, one-command Docker install.",
    cleanFeedDesc: "Firefox and Chrome extension that hides YouTube Shorts and the addictive parts of Instagram.",
    viewProfile: "See everything on GitHub"
  }
};

export default en;
