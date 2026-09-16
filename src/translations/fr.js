const fr = {
  // Hero section
  hero: {
    hello: "Hello,",
    iAm: "Je suis Hugo Galley",
    subtitle: "Développeur curieux, je crois que le code est fait pour être partagé",
    aboutButton: "A propos",
    workButton: "Mon Travail",
    cvButton: "Mon CV"
  },

  // Aptitude bar
  aptitude: {
    developer: "Developpeur",
    backend: "Backend",
    web: "Web",
    design: "Design"
  },

  // About / Bento section
  about: {
    title: "A propos",
    whoAmI: "Qui suis-je ?",
    whoAmIText: "Je suis un jeune développeur passionné étudiant à l'EPSI, basé à Paris.",
    passions: "Mes Passions",
    sport: "Sport",
    sportText: "Je pratique la course à pied et j'ai réalisé plusieurs triathlons, ce qui me passionne vraiment.",
    travel: "Voyages",
    travelText: "J'aime les voyages, car j'adore bouger et découvrir le monde.",
    music: "Musique",
    musicText: "J'ai joué du violon pendant plus de 13 ans, ce qui a développé mon goût pour la musique."
  },

  // Bento modals
  bento: {
    me: {
      title: "Moi : Hugo",
      text: "Je suis Galley Hugo, un étudiant en informatique avec une forte envie d'apprendre. J'aime développer des projets informatiques et acquérir de nouvelles compétences."
    },
    studies: {
      title: "Mes études",
      text: "J'ai obtenu mon baccalauréat avec une spécialisation en Math/NSI en 2023 avec la mention 'assez bien.' Actuellement, j'étudie l'informatique à l'EPSI Paris et j'aspire à obtenir un master pour devenir ingénieur logiciel."
    },
    language: {
      title: "Langage",
      text: "Mon langage préféré est le C#, car, lorsqu'il est combiné avec .NET, il permet de réaliser une grande variété de projets allant des batchs aux API, en passant par les applications web."
    },
    docker: {
      title: "Docker & DevOps",
      text: "J'utilise Docker pour isoler les dépendances, concevoir des environnements homogènes et assurer des déploiements fiables et reproductibles."
    },
    passion: {
      title: "Passion",
      text: "Mes passions dans la vie sont les voyages, car j'adore bouger et découvrir le monde. La musique, j'ai joué du violon pendant plus de 13 ans, ce qui a développé mon goût pour la musique. Et le sport, je pratique la course à pied et j'ai réalisé plusieurs triathlons, ce qui me passionne vraiment."
    },
    location: {
      title: "Localisation",
      text: "Je vis en France, plus précisément à Paris, et j'étudie à La Défense, l'un des plus grands quartiers d'affaires du monde, ce qui offre un excellent environnement d'apprentissage."
    }
  },

  // Bento cards
  bentoCards: {
    me: "À propos",
    meDesc: "Développeur chez AXA et étudiant à l'EPSI. J'aime construire des projets utiles et bien pensés.",
    studies: "Formation",
    studiesDesc: "En formation d'ingénierie logicielle à l'EPSI Paris La Défense (2023 — 2028).",
    language: "Langage",
    languageDesc: "Ce que j'utilise le plus pour concevoir des API et des applications backend solides.",
    docker: "DevOps",
    dockerDesc: "Conteneuriser les services et garantir des environnements de déploiement fiables et reproductibles.",
    passions: "Passions",
    passionsDesc: "Course à pied, triathlon, 13 ans de violon et voyages dès que l'occasion se présente.",
    location: "Localisation",
    locationDesc: "Disponible sur place ou en télétravail."
  },

  // Skills section
  skills: {
    title: "Mes competences"
  },

  // Work experience section
  work: {
    title: "Experiences professionnelles",
    currently: "Actuellement",
    softwareEngineerIntern: "Alternant ingenieur logiciel",
    devEngineerIntern: "Stagiaire ingenieur en developpement",
    weeks: "semaines",
    stages: "stages",
    unifDesc: "Lors de mes deux stages, j'ai développé un outil complet de monitoring du parc applicatif (.NET) de bout en bout (BDD, API, UI, CI/CD). J'ai également créé un service Windows et une interface Blazor pour synchroniser un outil interne avec Dynamics 365 CRM, améliorant grandement la vie des utilisateurs.",
    axaDesc: "Alternance en tant qu'ingénieur logiciel."
  },

  // Projects section
  projects: {
    title: "Mes Projets",
    sportApp: "Application de sport",
    platformerGame: "Jeu de plateforme",
    cybersecurity: "Cybersecurite"
  },

  // Contact section
  contact: {
    title: "Contact",
    subtitle: "Si vous souhaitez me contacter ou collaborer avec moi.",
    copied: "✓ Email copié !",
    copyHint: "Cliquer pour copier",
    openMail: "Ouvrir l'application mail"
  },

  // Footer
  footer: {
    info: "Informations",
    copyright: "©Copyright Galley Hugo"
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
    sourceCode: "Voir le code source"
  },

  // Project pages
  projectPages: {
    adminInterface: {
      title: "AdminInterface",
      description: "Ceci est une interface de connexion pour un laboratoire simulé visant à tester l'utilisation de la bibliothèque graphique CustomTkinter en Python."
    },
    phantom: {
      title: "Phantom",
      description: "Il s'agit d'un projet de messagerie securisee comme WhatsApp ou Signal. Le but est de pouvoir echanger des messages ou d'autres types de communication de maniere chiffree de bout en bout."
    },
    easyWorkEnv: {
      title: "EasyWorkEnv",
      description: "Il s'agit de la creation d'un package Python permettant de gerer facilement ses variables d'environnement grace a un objet."
    },
    cartography: {
      title: "Cartographie",
      description: "Ceci est une application conçue pour cartographier tous les serveurs de l'entreprise afin d'identifier sur quel serveur une application est localisée ou non, ainsi que pour permettre la recherche, le tri et l'ajout de fichiers de recherche. Pour cette application, je crée la base de données, les batchs, l'API, l'application web et le déploiement."
    },
    instaClone: {
      title: "Instagram Clone",
      techTitle: "Technologies utilisees",
      description: "Il s'agit d'un site web développé en React, visant à reproduire Instagram. Le site se concentre sur le front-end et m'a permis d'apprendre les bases de React."
    },
    sportApp: {
      title: "ActiFit",
      description: "Il s'agit d'une application sportive conçue pour vous proposer des séances d'entraînement personnalisées ainsi que des options d'exercices, tout en affichant votre progression. J'ai également utilisé React Native pour garantir sa compatibilité avec tous les types d'appareils."
    },
    platformerGame: {
      title: "Mario Briss",
      description: "C'est un jeu de plateforme imitant Mario, réalisé en Python avec Pygame. Un petit easter egg y est caché."
    },
    ransomware: {
      title: "Ransomware",
      description: "Il s'agit d'un ransomware conçu pour sensibiliser à la cybersécurité et en apprendre davantage sur la protection des données."
    },
    gmailAiSort: {
      title: "Gmail Ai Sort",
      description: "Ce projet vise à trier vos e-mails en cinq catégories principales à l'aide de l'IA. En utilisant Llama 3, il permet de communiquer avec Gmail. Ce code vous permet d'organiser facilement vos e-mails par étiquette afin de les retrouver plus facilement."
    },
    syncCrd2Crm: {
      title: "SyncCRD2CRM",
      description: "Il s'agit d'un service de synchronisation entre les outils internes de l'entreprise (CRD) et le CRM Dynamics 365 de Microsoft. Le service est accompagné d'une IHM pour faire le mapping entre les deux, ainsi que d'un batch de rattrapage pour remettre d'équerre les données entre CRD et CRM."
    }
  },

  // Open Source section
  openSource: {
    title: "Open Source",
    subtitle: "Partager, contribuer, apprendre au contact de la communauté.",
    statRepos: "Repos publics",
    statPackage: "Package PyPI",
    statStars: "Stars reçues",
    featuredBadge: "Contribution Majeure",
    leafwikiRole: "Contributeur DevOps & Features",
    leafwikiIntro: "LeafWiki est un moteur de documentation et wiki open-source moderne et léger.",
    contributionsTitle: "Contributions clés :",
    contribution1: "Automatisation des builds multi-plateformes et pipeline CI/CD GitHub Actions",
    contribution2: "Conteneurisation Docker & intégration dans le workflow de release",
    contribution3: "Ajout du support pour le CSS personnalisé & beta-testing actif",
    viewRepo: "Voir le dépôt GitHub",
    hubBadge: "Philosophie",
    hubTitle: "Esprit Open Source",
    hubDesc: "Partager des solutions réutilisables, collaborer sur des projets communautaires et continuellement apprendre au contact d'autres développeurs.",
    myPackageBadge: "Créateur de Package",
    myPackageTitle: "EasyWorkEnv",
    myPackageDesc: "Package Python d'automatisation d'environnement de travail publié sur PyPI.",
    viewProfile: "Mon Profil GitHub"
  }
};

export default fr;
