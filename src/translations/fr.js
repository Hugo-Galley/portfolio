const fr = {
  // Hero section
  hero: {
    hello: "Hello,",
    iAm: "Je suis Hugo Galley",
    subtitle: "Développeur curieux, je crois que le code est fait pour être partagé",
    aboutButton: "À propos",
    workButton: "Mon Travail",
    cvButton: "Mon CV"
  },

  // Aptitude bar
  aptitude: {
    developer: "Développeur",
    backend: "Backend",
    web: "Web",
    design: "Design"
  },

  // About / Bento section
  about: {
    title: "À propos",
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
      text: "Je suis Hugo Galley, un étudiant en informatique avec une forte envie d'apprendre. J'aime développer des projets informatiques et acquérir de nouvelles compétences."
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
    meDesc: "Développeur & DevOps chez AXA et étudiant à l'EPSI. J'aime construire des projets utiles et bien pensés.",
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
    title: "Mes compétences"
  },

  // Work experience section
  work: {
    title: "Expériences professionnelles",
    currently: "Actuellement",
    softwareEngineerIntern: "Alternant ingénieur logiciel",
    devEngineerIntern: "Stagiaire ingénieur en développement",
    weeks: "semaines",
    stages: "stages",
    unifDesc: "Lors de mes deux stages, j'ai développé un outil complet de monitoring du parc applicatif (.NET) de bout en bout (BDD, API, UI, CI/CD). J'ai également créé un service Windows et une interface Blazor pour synchroniser un outil interne avec Dynamics 365 CRM, améliorant grandement la vie des utilisateurs.",
    axaDesc: "Alternance ingénieur logiciel & DevOps chez AXA — développement d'applications internes en C# .NET, mise en place de pipelines CI/CD, conteneurisation Docker et participation aux cérémonies Agile."
  },

  // Projects section
  projects: {
    title: "Mes Projets",
    adminInterface: "Interface d'administration",
    sportApp: "Application de sport",
    platformerGame: "Jeu de plateforme",
    cybersecurity: "Cybersécurité"
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
    copyright: "©Copyright Hugo Galley"
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
      description: "Interface d'administration et portail de connexion moderne développé en Python avec la bibliothèque graphique CustomTkinter. Ce projet simule un environnement de laboratoire sécurisé avec gestion des sessions, authentification, navigation multi-fenêtres et journalisation des accès pour expérimenter l'ergonomie desktop moderne en Python."
    },
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
    instaClone: {
      title: "Instagram Clone",
      techTitle: "Technologies utilisées",
      description: "Application web interactive développée en React reproduisant les fonctionnalités clés d'Instagram : flux d'actualités dynamique, navigation par stories, filtres, exploration de profils et système d'interactions (likes, commentaires). Ce projet a servi de banc d'essai pour maîtriser l'état global, les composants modulaires réutilisables et le design responsive."
    },
    sportApp: {
      title: "ActiFit",
      description: "Application mobile cross-platform de coaching sportif développée avec React Native et l'écosystème Expo. ActiFit permet aux utilisateurs de concevoir des programmes d'entraînement sur-mesure, de suivre l'exécution des exercices avec minuteurs et consignes techniques, et de visualiser leur progression grâce à des graphiques et indicateurs de performance."
    },
    platformerGame: {
      title: "Mario Briss",
      description: "Jeu de plateforme 2D rétro développé en Python avec le moteur Pygame, inspiré des mécaniques classiques de Super Mario. Le jeu intègre un moteur physique personnalisé (gravité, inertie, détection de collisions par boîtes englobantes), la gestion d'animations par spritesheets, un système de score, des niveaux progressifs et un easter egg caché."
    },
    ransomware: {
      title: "Ransomware Éducatif",
      description: "Projet de recherche et de démonstration en cybersécurité développé en Python à visée purement pédagogique et défensive. Il simule les mécanismes opératoires des ransomwares réels (chiffrement symétrique/asymétrique des fichiers cibles, génération et échange de clefs sécurisées, vectorisation d'attaque) afin de tester la résilience des systèmes et d'analyser les contre-mesures de détection et de sauvegarde."
    },
    gmailAiSort: {
      title: "Gmail AI Sort",
      description: "Système d'automatisation et de tri intelligent des e-mails combinant l'API officielle Google Gmail et un grand modèle de langage (Llama 3). Le script analyse sémantiquement le contenu et le contexte des messages entrants pour les classifier automatiquement selon 5 catégories clés, appliquer les étiquettes correspondantes et prioriser les messages urgents sans intervention manuelle."
    },
    syncCrd2Crm: {
      title: "SyncCRD2CRM",
      description: "Service d'intégration et de synchronisation bidirectionnelle de données à grande échelle entre les bases de données internes (CRD) et le CRM cloud Microsoft Dynamics 365. Développé en .NET et Blazor, le projet intègre un moteur de mapping configurable, des mécanismes de résilience (retry, journalisation des erreurs, batchs de rattrapage) et une IHM de supervision opérationnelle."
    }
  },

  // Open Source section
  openSource: {
    title: "Open Source",
    subtitle: "Partager, contribuer, apprendre au contact de la communauté.",
    statRepos: "Repos publics",
    statPackage: "Package PyPI",
    statStars: "Stars reçues",
    featuredBadge: "Contribution Devops",
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
