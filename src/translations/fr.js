const fr = {
  // Hero section
  hero: {
    hello: "Hello,",
    iAm: "Je suis Hugo Galley",
    subtitle: "Développeur curieux, je crois que le code est fait pour être partagé",
  },

  // Home sections (redesign)
  sections: {
    cvLong: "Télécharger mon CV",
    aboutTitle: "À propos.",
    aboutMuted: "Qui je suis, ce que j'aime construire.",
    stackTitle: "La stack.",
    stackMuted: "Les outils avec lesquels je construis au quotidien.",
    workTitle: "Expériences.",
    workMuted: "Là où j'apprends en livrant.",
    osTitle: "Open source.",
    osMuted: "Des projets que je publie et ceux auxquels je contribue.",
    projectsTitle: "Projets.",
    projectsMuted: "Des outils construits pour être utilisés.",
    contactTitle: "Construisons quelque chose",
    contactMuted: "ensemble.",
    contactText: "Une idée, un projet ou simplement une question : écrivez-moi.",
    copyEmail: "Copier l'email",
    writeMe: "Écrire un mail",
    viewProject: "Voir le projet",
    built: "Conçu et développé par Hugo Galley.",
    language: "Switch to English"
  },

  // Bento modals
  bento: {
  },

  // Bento cards
  bentoCards: {
    me: "À propos",
    meDesc: "Développeur & DevOps chez AXA et étudiant à l'EPSI.",
    passions: "Passions",
    passionsDesc: "Course à pied, triathlon et 13 ans de violon.",
    studies: "Formation",
    studiesDesc: "En formation d'ingénierie logicielle à l'EPSI Paris La Défense (2023 — 2028).",
    language: "Langage",
    languageDesc: "Ce que j'utilise le plus pour concevoir des API et des applications backend solides.",
    docker: "DevOps",
    dockerDesc: "Conteneuriser les services et garantir des environnements de déploiement fiables et reproductibles.",
  },

  // Work experience section
  work: {
    currently: "Actuellement",
    softwareEngineerIntern: "Alternant ingénieur logiciel",
    devEngineerIntern: "Stagiaire ingénieur en développement",
    stages: "stages",
    unifDesc: "Lors de mes deux stages, j'ai développé un outil complet de monitoring du parc applicatif (.NET) de bout en bout (BDD, API, UI, CI/CD). J'ai également créé un service Windows et une interface Blazor pour synchroniser un outil interne avec Dynamics 365 CRM, améliorant grandement la vie des utilisateurs.",
    axaDesc: "Alternance ingénieur logiciel & DevOps chez AXA — développement d'applications internes en C# .NET, mise en place de pipelines CI/CD, conteneurisation Docker et participation aux cérémonies Agile."
  },

  // Contact section
  contact: {
    copied: "✓ Email copié !",
  },

  // 404 page
  notFound: {
    title: "404",
    subtitle: "Page Non Trouvée",
    description: "La page que vous recherchez s'est perdue dans l'espace. Elle a peut-être été déplacée ou n'existe plus.",
    button: "Retour à la terre ferme"
  },

  // Github button
  github: {
    sourceCode: "Voir le code source",
    demo: "Essayer la démo",
    demoNote: "Données fictives remises à zéro chaque jour, identifiants déjà remplis."
  },

  // Project pages
  projectPages: {
    phantom: {
      title: "Phantom",
      description: "Application de messagerie instantanée hautement sécurisée inspirée de protocoles de référence comme Signal et WhatsApp. Phantom intègre un chiffrement de bout en bout (E2EE) pour garantir la stricte confidentialité des échanges, une architecture client-serveur réactive en Python et JavaScript, ainsi qu'une gestion fine des clés cryptographiques et des sessions temps réel."
    },
    easyWorkEnv: {
      title: "EasyWorkEnv",
      description: "Package open-source Python publié sur PyPI conçu pour simplifier et fiabiliser la gestion des environnements de travail et des variables d'environnement. Il propose une API intuitive basée sur la programmation orientée objet, un typage fort, la validation automatique des variables requises et la prise en charge transparente des fichiers .env en développement comme en production."
    },
    cartography: {
      title: "Cartographie",
      description: "Solution d'entreprise complète conçue pour cartographier, inventorier et rechercher l'ensemble du parc de serveurs et des applications hébergées. Développée avec l'écosystème .NET et Blazor, l'application comprend la modélisation de base de données relationnelle, le développement d'une API REST performante, des batchs d'automatisation et de synchronisation, ainsi qu'une interface web réactive pour la recherche multicritère et l'analyse d'impact."
    },
    gmailAiSort: {
      title: "Gmail AI Sort",
      description: "Système d'automatisation et de tri intelligent des e-mails combinant l'API officielle Google Gmail et un grand modèle de langage (Llama 3). Le script analyse sémantiquement le contenu et le contexte des messages entrants pour les classifier automatiquement selon 5 catégories clés, appliquer les étiquettes correspondantes et prioriser les messages urgents sans intervention manuelle."
    },
    cleanFeed: {
      title: "Clean Feed",
      imageAlt: "Aperçu de l'extension Clean Feed et de son menu",
      description: "Extension open source pour Firefox et Chrome qui supprime les parties addictives de YouTube et d'Instagram : Shorts, fil d'accueil, page Explorer et Reels. Les stories, les profils et les messages restent intacts. Chaque fonction se règle depuis un menu, en français ou en anglais, sans compte ni collecte de données. Le centrage des stories repose sur la mesure de la page plutôt que sur des noms de classes, qu'Instagram change régulièrement.",
      firefox: "Ajouter à Firefox",
      chrome: "Ajouter à Chrome",
      chromeSoon: "Chrome : bientôt",
      note: "Gratuite, open source (MIT), aucune donnée collectée."
    },
    numera: {
      title: "Numera",
      description: "Application auto-hébergée de suivi de budget, d'épargne et d'investissements, pensée comme un remplaçant du tableur. Backend FastAPI et SQLite, frontend React, import de relevés CSV, projections et tableaux de bord, sauvegardes chiffrées et serveur MCP pour l'interroger avec Claude. Déployable en une commande via Docker (images amd64 et arm64) et disponible avec une démo en ligne."
    },
    syncCrd2Crm: {
      title: "SyncCRD2CRM",
      description: "Service d'intégration et de synchronisation bidirectionnelle de données à grande échelle entre les bases de données internes (CRD) et le CRM cloud Microsoft Dynamics 365. Développé en .NET et Blazor, le projet intègre un moteur de mapping configurable, des mécanismes de résilience (retry, journalisation des erreurs, batchs de rattrapage) et une IHM de supervision opérationnelle."
    }
  },

  // Open Source section
  openSource: {
    contributions: "Mes contributions",
    stars: "étoiles",
    leafwikeIntro: "Wiki auto-hébergé open source dont je suis contributeur : j'y ai apporté de quoi le construire, le livrer et le personnaliser plus facilement.",
    leafwikeC1Title: "Pipeline CI/CD multi-plateforme",
    leafwikeC1Sub: "Build automatisé sur toutes les plateformes",
    leafwikeC2Title: "Image Docker à chaque release",
    leafwikeC2Sub: "Publiée automatiquement",
    leafwikeC3Title: "Support du CSS personnalisé",
    leafwikeC3Sub: "Thème modifiable par l'utilisateur",
    leafwikiRole: "Contributeur",
    easyWorkEnvDesc: "Package Python publié sur PyPI qui prépare un environnement de travail en une commande.",
    numeraDesc: "Application auto-hébergée de budget, d'épargne et d'investissements : données locales en SQLite, installation Docker en une commande.",
    cleanFeedDesc: "Extension Firefox et Chrome qui masque les Shorts YouTube et les parties addictives d'Instagram.",
    viewProfile: "Tout voir sur GitHub"
  }
};

export default fr;
