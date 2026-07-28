'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import type { IconType } from 'react-icons';
import {
  SiAngular,
  SiApachespark,
  SiBootstrap,
  SiDjango,
  SiDocker,
  SiExpress,
  SiGithub,
  SiJavascript,
  SiKubernetes,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiOpencv,
  SiOpenjdk,
  SiPhp,
  SiPython,
  SiReact,
  SiRedis,
  SiScikitlearn,
  SiSpringboot,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
} from 'react-icons/si';
import {
  ArrowUpRight,
  Award,
  BookOpen,
  Briefcase,
  Brain,
  Code2,
  Database,
  Download,
  ExternalLink,
  FolderOpen,
  Github,
  Heart,
  Layers3,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Send,
  Sparkles,
  ShieldCheck,
  Sun,
  Target,
  User,
  X,
} from 'lucide-react';

type Project = {
  title: string;
  type: string;
  description: string;
  technologies: string[];
  highlights: string[];
  url: string;
  demoUrl?: string;
};

type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
  contract?: string;
  location?: string;
  missions: string[];
  impact: string[];
};

type EducationItem = {
  degree: string;
  school: string;
  period: string;
  status?: string;
};

type Certification = {
  title: string;
  file: string;
  category: 'AI' | 'Cloud' | 'Data' | 'Backend' | 'Frontend' | 'Fondamentaux';
};

type Section = {
  id: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

type Lang = 'fr' | 'en';

type Profile = 'tech' | 'func';

const githubProfile = 'https://github.com/aminox1';
const githubPortfolioRepo = 'https://github.com/aminox1/portfolio-mohamed-amine-moumeni';
const marocPortalRepo = 'https://github.com/aminox1/projets-rabat-pmm';
const marocPortalDemo = 'https://youtu.be/evAKBwffkno';
const jobMarketIntelligenceRepo = 'https://github.com/aminox1/job-market-intelligence';
const jobMarketIntelligenceDemo = 'https://jmi-aminox1.streamlit.app';
const covoitHubRepo = 'https://github.com/Master-2-MIAGE-MBDS/tpi-collaborative-commuting';
const covoitHubDemo = 'https://covoithub-frontend.onrender.com/';
const datasetGeneratorRepo = 'https://github.com/Master-2-MIAGE-MBDS/spring-rest-med-amine-mamitiana-1';
const mealCompanionRepo = 'https://github.com/MBDS-SOPHIA/projet-final-berserk';
const mealCompanionDemo = 'https://youtu.be/RjHr9Am-NkQ';
const calendlyLink = 'https://calendly.com/aminemoumni61/15-minute-meeting';

const navItems: Section[] = [
  { id: 'home', icon: User },
  { id: 'about', icon: BookOpen },
  { id: 'experience', icon: Briefcase },
  { id: 'projects', icon: FolderOpen },
  { id: 'github-projects', icon: Github },
  { id: 'skills', icon: Code2 },
  { id: 'code-quality', icon: ShieldCheck },
  { id: 'education', icon: Layers3 },
  { id: 'contact', icon: Mail },
];

const uiText = {
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À propos',
      experience: 'Expérience',
      projects: 'Projets',
      'github-projects': 'GitHub',
      skills: 'Compétences',
      'code-quality': 'Qualité Code',
      education: 'Formation',
      contact: 'Contact',
    },
    openToWork: 'OPEN TO WORK',
    quickFacts: ['Basé en France', 'Réponse rapide', 'Disponible pour CDI'],
    terminalKicker: 'Terminal Live',
    terminalTitle: 'Aperçu de workflow technique',
    terminalHint: 'Scroll possible dans le terminal',
    terminalPlaceholder: 'Tape une commande (help, ls, cd .., pwd...)',
    terminalUnknown: 'Commande non reconnue. Tape help pour la liste.',
    recruiterSnapshotKicker: 'Mon profil en 30 secondes',
    recruiterSnapshotTitle: 'Ce que je peux apporter à votre équipe',
    recruiterSnapshotCards: [
      'Stack moderne: Spring Boot, Node.js, React, IA/Data',
      'Capacité à livrer vite sur des bases existantes',
      'Communication claire, culture produit et qualité',
    ],
    recruiterSnapshotCta: 'Échanger 15 min',
    calendlyCta: 'Réserver 15 min',
    recruiterMode: 'Mode Recruteur',
    contactCta: 'Me Contacter',
    aboutKicker: 'À propos',
    openDiscussion: 'Ouvrir un échange CDI',
    propositionTitle: 'Ce que je propose',
    propositionText: 'Des applications robustes, une approche produit et une exécution technique orientée performance, scalabilité et qualité du code.',
    findHereTitle: 'Ce que vous trouverez ici',
    findHereText: 'Mon parcours, mes projets, mes stacks techniques et des liens directs vers mes repos GitHub.',
    objectiveTitle: 'Objectif',
    objectiveText: 'Présenter un profil d ingénieur logiciel junior, orienté IA et data, prêt à contribuer en CDI.',
    expKicker: 'Expérience',
    expTitle: 'Mon parcours professionnel',
    projectsKicker: 'Projets sélectionnés',
    projectsTitle: 'Mes projets principaux',
    portfolioRepo: 'Repo du portfolio',
    projectRepoCta: 'Voir le repo',
    projectDemoCta: 'Voir la demo',
    caseStudyKicker: 'Étude de cas',
    caseStudyTitle: 'De la veille manuelle à une prospection assistée par IA',
    caseStudyChallengeLabel: 'Défi',
    caseStudyChallenge: 'Les appels d offres étaient dispersés sur de nombreuses plateformes, rendant la veille lente et incomplète.',
    caseStudySolutionLabel: 'Solution',
    caseStudySolution: 'Pipeline de scraping multi-source + moteur de recommandations + assistant conversationnel NLP pour accélérer la qualification.',
    caseStudyImpactLabel: 'Impact',
    caseStudyImpact: 'Gain net de temps, meilleure précision de matching et base solide pour un passage en produit B2B.',
    caseStudyMetrics: ['92% précision de matching', '50+ sources suivies', '3 régions opérateur couvertes'],
    targetRoleKicker: 'Poste ciblé',
    targetRoleMeta: ['CDI - dès que possible', 'PACA: Nice, Sophia Antipolis, Antibes', 'Mobile partout en France'],
    githubKicker: 'GitHub',
    githubTitle: 'Autres projets',
    githubText: 'Chaque carte ouvre directement le dépôt GitHub correspondant.',
    skillsKicker: 'Compétences',
    skillsTitle: 'Compétences techniques claires, groupées par domaine.',
    codeQualityKicker: 'Code Quality',
    codeQualityTitle: 'Production-ready: tests, CI/CD, Docker, conventions',
    codeQualityCards: [
      { title: 'Tests & fiabilité', text: 'Tests automatisés, validations build et logique orientée robustesse.' },
      { title: 'CI/CD', text: 'Pipelines de build et livraison pour accélérer les releases sans casser la qualité.' },
      { title: 'Docker', text: 'Services conteneurisés pour des environnements cohérents du dev à la prod.' },
      { title: 'Conventions', text: 'Structure lisible, naming propre et standards de code maintenables.' },
    ],
    deliveryKicker: 'Méthodologies',
    deliveryTitle: 'Agile, Scrum, backlog et cadrage fonctionnel',
    deliveryCards: [
      { title: 'Scrum & rituels', text: 'Planification de sprint, daily stand-up, review et rétrospective pour garder le rythme et la transparence.' },
      { title: 'Backlog & user stories', text: 'Priorisation du backlog, découpage en user stories et définition des critères d’acceptation.' },
      { title: 'Cahier des charges', text: 'Rédaction de besoins fonctionnels et techniques avec périmètre clair, contraintes et livrables attendus.' },
      { title: 'Delivery orienté valeur', text: 'Découpage en incréments livrables, arbitrage avec les parties prenantes et suivi de la valeur produite.' },
    ],
    educationKicker: 'Formation',
    educationTitle: 'Formation académique et mentions.',
    certTitle: 'Certifications',
    certCount: 'certificats',
    certShowMore: 'Voir plus',
    certReduce: 'Réduire la liste',
    impactLabel: 'Impact',
    backupContactTitle: 'Canal direct',
    backupContactText: 'Si le formulaire ne passe pas, contacte-moi directement par email ou téléphone.',
    callNow: 'Appeler maintenant',
    sendEmail: 'Envoyer un email',
    positioningTitle: 'Positionnement',
    positioningText: 'Le portfolio doit surtout raconter une histoire simple: un ingénieur solide techniquement, des repos GitHub concrets, et une spécialisation visible pour viser un CDI.',
    contactKicker: 'Contact',
    contactTitle: 'Me contacter',
    detailsTitle: 'Coordonnées',
    fullName: 'Nom complet',
    email: 'Email',
    subject: 'Sujet',
    message: 'Message',
    fullNamePlaceholder: 'Votre nom',
    emailPlaceholder: 'votre.email@exemple.com',
    subjectPlaceholder: 'Opportunité CDI / entretien',
    messagePlaceholder: "Décrivez l'opportunité ou le contexte...",
    sending: 'Envoi en cours...',
    send: 'Envoyer',
    success: 'Message envoyé avec succès.',
    error: 'Erreur lors de l’envoi. Utilise l’email direct en attendant.',
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      'github-projects': 'GitHub',
      skills: 'Skills',
      'code-quality': 'Code Quality',
      education: 'Education',
      contact: 'Contact',
    },
    openToWork: 'OPEN TO WORK',
    quickFacts: ['Based in France', 'Fast response', 'Open to full-time roles'],
    terminalKicker: 'Live Terminal',
    terminalTitle: 'Technical workflow preview',
    terminalHint: 'You can scroll inside the terminal',
    terminalPlaceholder: 'Type a command (help, ls, cd .., pwd...)',
    terminalUnknown: 'Command not found. Type help for available commands.',
    recruiterSnapshotKicker: 'My profile in 30 seconds',
    recruiterSnapshotTitle: 'What I can bring to your team',
    recruiterSnapshotCards: [
      'Modern stack: Spring Boot, Node.js, React, AI/Data',
      'Fast delivery on top of existing codebases',
      'Clear communication, product mindset and quality focus',
    ],
    recruiterSnapshotCta: 'Let us talk for 15 min',
    calendlyCta: 'Book 15 min',
    recruiterMode: 'Recruiter Mode',
    contactCta: 'Contact Me',
    aboutKicker: 'About',
    openDiscussion: 'Start a conversation',
    propositionTitle: 'What I bring',
    propositionText: 'Robust applications, product mindset and technical execution focused on performance, scalability and code quality.',
    findHereTitle: 'What you will find here',
    findHereText: 'My background, projects, technical stack and direct links to my GitHub repositories.',
    objectiveTitle: 'Objective',
    objectiveText: 'Present a junior software engineer profile focused on AI and data, ready to contribute in a full-time role.',
    expKicker: 'Experience',
    expTitle: 'Professional Journey',
    projectsKicker: 'Selected Projects',
    projectsTitle: 'Main Projects',
    portfolioRepo: 'Portfolio repository',
    projectRepoCta: 'View repo',
    projectDemoCta: 'Watch demo',
    caseStudyKicker: 'Case Study',
    caseStudyTitle: 'From manual sourcing to AI-assisted opportunity discovery',
    caseStudyChallengeLabel: 'Challenge',
    caseStudyChallenge: 'Public tenders were spread across many portals, making monitoring slow and incomplete.',
    caseStudySolutionLabel: 'Solution',
    caseStudySolution: 'A multi-source scraping pipeline plus a recommendation engine and NLP assistant to speed up qualification.',
    caseStudyImpactLabel: 'Impact',
    caseStudyImpact: 'Strong time savings, better matching precision, and a solid base for a B2B product path.',
    caseStudyMetrics: ['92% matching precision', '50+ sources monitored', '3 operator regions covered'],
    targetRoleKicker: 'Target Role',
    targetRoleMeta: ['Full-time - available as soon as possible', 'PACA: Nice, Sophia Antipolis, Antibes', 'Open to opportunities across France'],
    githubKicker: 'GitHub',
    githubTitle: 'More Projects',
    githubText: 'Each card opens the corresponding GitHub repository.',
    skillsKicker: 'Skills',
    skillsTitle: 'Technical skills grouped by domain.',
    codeQualityKicker: 'Code Quality',
    codeQualityTitle: 'Production-ready: tests, CI/CD, Docker, conventions',
    codeQualityCards: [
      { title: 'Testing & reliability', text: 'Automated checks, build validations, and reliability-first implementation.' },
      { title: 'CI/CD', text: 'Build and release pipelines to ship faster without compromising quality.' },
      { title: 'Docker', text: 'Containerized services for consistent environments from dev to production.' },
      { title: 'Conventions', text: 'Readable structure, clean naming and maintainable coding standards.' },
    ],
    deliveryKicker: 'Methodologies',
    deliveryTitle: 'Agile, Scrum, backlog and functional specification',
    deliveryCards: [
      { title: 'Scrum rituals', text: 'Sprint planning, daily stand-up, review and retrospective to keep cadence and transparency.' },
      { title: 'Backlog & user stories', text: 'Backlog prioritization, user story breakdown, and acceptance criteria definition.' },
      { title: 'Specification writing', text: 'Functional and technical specification with clear scope, constraints, and expected deliverables.' },
      { title: 'Value-driven delivery', text: 'Incremental delivery, stakeholder alignment, and continuous value tracking.' },
    ],
    educationKicker: 'Education',
    educationTitle: 'Academic background and distinctions.',
    certTitle: 'Certifications',
    certCount: 'certificates',
    certShowMore: 'Show more',
    certReduce: 'Show less',
    impactLabel: 'Impact',
    backupContactTitle: 'Direct channel',
    backupContactText: 'If the form fails, reach me directly by email or phone.',
    callNow: 'Call now',
    sendEmail: 'Send email',
    positioningTitle: 'Positioning',
    positioningText: 'This portfolio tells a simple story: strong technical fundamentals, concrete GitHub repositories, and clear specialization for a full-time role.',
    contactKicker: 'Contact',
    contactTitle: 'Get in touch',
    detailsTitle: 'Contact details',
    fullName: 'Full name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
    fullNamePlaceholder: 'Your name',
    emailPlaceholder: 'your.email@example.com',
    subjectPlaceholder: 'Full-time opportunity / interview',
    messagePlaceholder: 'Describe the opportunity or context...',
    sending: 'Sending...',
    send: 'Send',
    success: 'Message sent successfully.',
    error: 'Error while sending. Please use direct email for now.',
  },
} as const;

const profileText = {
  tech: {
    fr: {
      heroBadge: 'Recherche de CDI - Développement logiciel, IA, data',
      heroSubtitle: 'Ingénieur Full Stack • Spécialiste IA • Expert Big Data',
      heroSearch: 'Disponible pour un CDI en Développement logiciel, IA et Data',
      heroPitch: 'Profil technique polyvalent, orienté résultats, prêt à rejoindre une équipe produit ou engineering.',
      aboutTitle: 'Ingénieur MIAGE, double Master IA Appliquée & MBDS',
      aboutText:
        'Ingénieur MIAGE diplômé avec un double Master en Intelligence Artificielle Appliquée et en MBDS (Mobiquité, Big Data et Intégration de Systèmes) à l’Université Côte d’Azur, je me positionne à la croisée du développement logiciel, de la data et de l’IA appliquée.',
      aboutBullets: [
        'Expertise technique solide : Java/Spring Boot, Python, React, Angular, Node.js, Docker, Azure',
        'Plateforme d’intégration déployée à l’international pour Orange chez ATOS, évaluée 18/20 et suivie d’une proposition de CDI',
        'Projets d’IA générative (LLM, RAG, agents IA) et de Machine Learning, avec Claude Code au quotidien dans mes workflows',
        'Recherche active d’un CDI : développement fullstack, data & IA, ou conseil fonctionnel/MOA',
      ],
      targetRoleTitle: 'Software Engineer Full Stack orienté AI & Data',
      targetRolePitch: 'Objectif: contribuer rapidement sur des produits métiers avec un impact mesurable.',
      downloadCv: 'Télécharger CV Technique',
    },
    en: {
      heroBadge: 'Open to full-time roles - Software, AI, Data',
      heroSubtitle: 'Full Stack Engineer • AI Specialist • Big Data Expert',
      heroSearch: 'Actively looking for a full-time role in Software, AI and Data',
      heroPitch: 'Versatile technical profile, results-driven, ready to join a product or engineering team.',
      aboutTitle: 'MIAGE Engineer with a double Master’s in Applied AI & MBDS',
      aboutText:
        'A MIAGE-trained software engineer with a double Master’s in Applied Artificial Intelligence and in MBDS (Mobility, Big Data and Systems Integration) from Université Côte d’Azur, I sit at the crossroads of software development, data and applied AI.',
      aboutBullets: [
        'Strong technical expertise: Java/Spring Boot, Python, React, Angular, Node.js, Docker, Azure',
        'Built an integration platform deployed internationally for Orange at ATOS, rated 18/20 and followed by a permanent contract offer',
        'Generative AI projects (LLM, RAG, AI agents) and Machine Learning, using Claude Code daily in my workflows',
        'Actively seeking a full-time role: fullstack development, data & AI, or functional consulting/business analysis',
      ],
      targetRoleTitle: 'Full Stack Software Engineer focused on AI & Data',
      targetRolePitch: 'Goal: deliver quickly on business products with measurable impact.',
      downloadCv: 'Download Technical CV',
    },
  },
  func: {
    fr: {
      heroBadge: 'Recherche de CDI - Conseil Fonctionnel, MOA, Chef de Projet, QA',
      heroSubtitle: 'Consultant Fonctionnel • MOA • Transformation Digitale & IA',
      heroSearch: 'Disponible pour un CDI en Conseil Fonctionnel, MOA ou Chef de Projet',
      heroPitch: 'Double compétence rare : pilotage fonctionnel (cahier des charges, backlog, UML, recette) et profil ingénieur, pour faire le lien entre métier et technique.',
      aboutTitle: 'Consultant Fonctionnel & MOA orienté Transformation Digitale',
      aboutText:
        'Évalué 18/20 sur une mission internationale pour Orange (Jordanie, Afrique du Nord, Botswana), je combine recueil de besoins, cadrage fonctionnel et pilotage de projet avec une solide culture technique (Java/Spring Boot, React).',
      aboutBullets: [
        'Recueil des besoins et rédaction de cahiers des charges et spécifications fonctionnelles',
        'Conception de maquettes (Figma) et modélisation UML (StarUML, Draw.io)',
        'Gestion de backlog produit : User Stories, critères d acceptance, Agile/Scrum',
        'Recherche active d un CDI : Conseil Fonctionnel, MOA, Chef de Projet ou QA',
      ],
      targetRoleTitle: 'Consultant Fonctionnel / MOA orienté Transformation Digitale & IA',
      targetRolePitch: 'Objectif : être le pont entre les équipes métier et techniques, du cadrage à la recette.',
      downloadCv: 'Télécharger CV Fonctionnel',
    },
    en: {
      heroBadge: 'Open to full-time roles - Functional Consulting, Business Analysis, PM, QA',
      heroSubtitle: 'Functional Consultant • Business Analyst • Digital Transformation & AI',
      heroSearch: 'Actively looking for a full-time role in Functional Consulting, Business Analysis or Project Management',
      heroPitch: 'A rare double skill set: functional leadership (requirements, backlog, UML, UAT) combined with an engineering background, bridging business and technical teams.',
      aboutTitle: 'Functional Consultant & Business Analyst focused on Digital Transformation',
      aboutText:
        'Rated 18/20 on an international mission for Orange (Jordan, North Africa, Botswana), I combine requirements gathering, functional scoping and project steering with a strong technical background (Java/Spring Boot, React).',
      aboutBullets: [
        'Gathering requirements and writing specifications and functional documents',
        'Designing mockups (Figma) and UML models (StarUML, Draw.io)',
        'Managing product backlog: user stories, acceptance criteria, Agile/Scrum',
        'Actively seeking a full-time role: Functional Consulting, Business Analysis, PM or QA',
      ],
      targetRoleTitle: 'Functional Consultant / Business Analyst focused on Digital Transformation & AI',
      targetRolePitch: 'Goal: be the bridge between business and technical teams, from scoping to UAT.',
      downloadCv: 'Download Functional CV',
    },
  },
} as const;

const certificationCategoryLabel = {
  fr: {
    Tous: 'Tous',
    AI: 'IA',
    Cloud: 'Cloud',
    Data: 'Data',
    Backend: 'Backend',
    Frontend: 'Frontend',
    Fondamentaux: 'Fondamentaux',
  },
  en: {
    Tous: 'All',
    AI: 'AI',
    Cloud: 'Cloud',
    Data: 'Data',
    Backend: 'Backend',
    Frontend: 'Frontend',
    Fondamentaux: 'Fundamentals',
  },
} as const;

const featuredProjects: Project[] = [
  {
    title: 'Portail Marocain des Marchés Publics - IA',
    type: 'Projet d innovation entrepreneuriale (PFE)',
    description: 'Plateforme de scraping multi-sites avec recommandations IA, chatbot NLP et automatisation de la veille.',
    technologies: ['React', 'Node.js', 'MongoDB', 'TensorFlow.js', 'Redis', 'JWT'],
    highlights: ['92% de précision', '50+ sites scrapés', 'Chatbot NLP'],
    url: marocPortalRepo,
    demoUrl: marocPortalDemo,
  },
  {
    title: 'Reconnaissance de Plantes',
    type: 'Projet Deep Learning',
    description: 'Application de vision par ordinateur pour identifier des espèces végétales avec une interface mobile.',
    technologies: ['Python', 'TensorFlow', 'Flutter', 'OpenCV', 'CNN'],
    highlights: ['10 000+ espèces', 'Vision par ordinateur', 'Mobile first'],
    url: `${githubProfile}/plant_recognition`,
  },
  {
    title: 'MealCompanion Social',
    type: 'App mobile Android (Master MBDS)',
    description: 'Client TheMealDB en Kotlin/Compose multi-module enrichi d’une couche sociale complète : avis, favoris partagés, communauté, notifications push, résumés de recettes générés par IA (Gemini).',
    technologies: ['Kotlin', 'Jetpack Compose', 'Firebase', 'Hilt'],
    highlights: ['23/23 fonctionnalités livrées', 'IA Gemini intégrée', 'CI GitHub Actions + tests'],
    url: mealCompanionRepo,
    demoUrl: mealCompanionDemo,
  },
  {
    title: 'CovoitHub - Plateforme de Covoiturage Collaboratif',
    type: 'Projet full stack (Master MBDS)',
    description: 'Plateforme de covoiturage pour communauté universitaire fermée : matching géospatial conducteur/passager, messagerie et appels temps réel en pair-à-pair, suivi de trajet par géolocalisation.',
    technologies: ['NestJS', 'React', 'React Native', 'MongoDB', 'TypeScript', 'Stripe'],
    highlights: ['App mobile iOS/Android', 'WebRTC temps réel', 'CI/CD + déploiement prod'],
    url: covoitHubRepo,
    demoUrl: covoitHubDemo,
  },
  {
    title: 'Dataset Generator - Architecture Microservices',
    type: 'Projet backend (Master MBDS)',
    description: 'Refonte d’un monolithe en architecture microservices (Eureka, Gateway, Config Server) avec résilience Resilience4J et exports multi-formats (JSON, XML, CSV, SQL).',
    technologies: ['Spring Boot', 'Spring Cloud', 'React', 'TypeScript'],
    highlights: ['108 tests automatisés', 'Resilience4J', 'SOLID & Design Patterns'],
    url: datasetGeneratorRepo,
  },
];

const featuredProjectsEn: Project[] = [
  {
    title: 'Moroccan Public Procurement Portal - AI',
    type: 'Entrepreneurial innovation project (Final Year)',
    description: 'Multi-source scraping platform with AI recommendations, NLP chatbot, and automated monitoring workflows.',
    technologies: ['React', 'Node.js', 'MongoDB', 'TensorFlow.js', 'Redis', 'JWT'],
    highlights: ['92% precision', '50+ scraped sources', 'NLP chatbot'],
    url: marocPortalRepo,
    demoUrl: marocPortalDemo,
  },
  {
    title: 'Plant Recognition',
    type: 'Deep Learning Project',
    description: 'Computer vision app to identify plant species through a mobile-oriented interface.',
    technologies: ['Python', 'TensorFlow', 'Flutter', 'OpenCV', 'CNN'],
    highlights: ['10,000+ species', 'Computer vision', 'Mobile first'],
    url: `${githubProfile}/plant_recognition`,
  },
  {
    title: 'MealCompanion Social',
    type: 'Android mobile app (MBDS Master)',
    description: 'Multi-module Kotlin/Compose TheMealDB client extended with a full social layer: reviews, shared favorites, community, push notifications, AI-generated recipe summaries (Gemini).',
    technologies: ['Kotlin', 'Jetpack Compose', 'Firebase', 'Hilt'],
    highlights: ['23/23 features delivered', 'Gemini AI integration', 'GitHub Actions CI + tests'],
    url: mealCompanionRepo,
    demoUrl: mealCompanionDemo,
  },
  {
    title: 'CovoitHub - Collaborative Carpooling Platform',
    type: 'Full stack project (MBDS Master)',
    description: 'Carpooling platform for a closed university community: geospatial driver/rider matching, real-time peer-to-peer messaging and calls, GPS-based trip tracking.',
    technologies: ['NestJS', 'React', 'React Native', 'MongoDB', 'TypeScript', 'Stripe'],
    highlights: ['iOS/Android mobile app', 'Real-time WebRTC', 'CI/CD + production deploy'],
    url: covoitHubRepo,
    demoUrl: covoitHubDemo,
  },
  {
    title: 'Dataset Generator - Microservices Architecture',
    type: 'Backend project (MBDS Master)',
    description: 'Refactored a monolith into a microservices architecture (Eureka, Gateway, Config Server) with Resilience4J fault tolerance and multi-format exports (JSON, XML, CSV, SQL).',
    technologies: ['Spring Boot', 'Spring Cloud', 'React', 'TypeScript'],
    highlights: ['108 automated tests', 'Resilience4J', 'SOLID & Design Patterns'],
    url: datasetGeneratorRepo,
  },
];

const githubProjects: Project[] = [
  {
    title: 'Suivi et Analyse des Consommations Électriques',
    type: 'Dashboard data',
    description: 'Analyse et visualisation des consommations dans les data centers avec logique de suivi et de reporting.',
    technologies: ['JavaScript', 'Data Viz', 'Analytics'],
    highlights: ['Monitoring', 'Reporting', 'Analyse métier'],
    url: `${githubProfile}/Suivi-et-Analyse-des-Consommations-lectriques-des-Data-Centers-en-France`,
  },
  {
    title: 'AI Visibility Tracker',
    type: 'Produit IA',
    description: 'Projet orienté visibilité et tracking avec TypeScript, pensé pour des tableaux de bord et des flux modernes.',
    technologies: ['TypeScript', 'Monitoring', 'AI'],
    highlights: ['Tracking', 'Scalable', 'Modern stack'],
    url: `${githubProfile}/ai-visibility-tracker`,
  },
  {
    title: 'Wiremock UI PCU',
    type: 'Tooling interne',
    description: 'Interface utilisateur pour la persistance et la gestion de mocks WireMock dans un contexte d’intégration.',
    technologies: ['JavaScript', 'WireMock', 'UI'],
    highlights: ['Mocks API', 'Persistance', 'Intégration'],
    url: `${githubProfile}/wiremock-ui-pcu`,
  },
  {
    title: 'Projet.NET',
    type: 'Application .NET',
    description: 'Projet C# orienté application métier avec une base propre pour une démonstration technique claire.',
    technologies: ['C#', '.NET', 'SQL'],
    highlights: ['Clean structure', 'Back-end', 'Business app'],
    url: `${githubProfile}/Projet.NET`,
  },
  {
    title: 'Job Market Intelligence',
    type: 'Application IA & Data',
    description: 'Plateforme qui collecte automatiquement des offres tech, extrait 400+ compétences, analyse les tendances et recommande les skills à apprendre.',
    technologies: ['Python', 'Scikit-learn', 'NLP', 'Docker', 'Kubernetes'],
    highlights: ['400+ compétences détectées', 'Prédictions à 30 jours', 'Recommandations personnalisées'],
    url: jobMarketIntelligenceRepo,
    demoUrl: jobMarketIntelligenceDemo,
  },
  {
    title: 'LMS avec Reconnaissance Faciale',
    type: 'Projet académique',
    description: 'Plateforme e-learning complète avec gestion des cours, quiz, paiements et authentification biométrique.',
    technologies: ['Django', 'SQLite', 'Python', 'Bootstrap', 'Face Recognition'],
    highlights: ['Cours et quiz', 'Paiements', 'Reconnaissance faciale'],
    url: `${githubProfile}/mon_projet_reconnaissance`,
  },
  {
    title: 'Portfolio professionnel',
    type: 'Ce portfolio',
    description: 'Version publique du portfolio pensée pour recruteurs, avec navigation fluide et sections orientées impact.',
    technologies: ['TypeScript', 'Next.js', 'Tailwind'],
    highlights: ['Responsive', '3D style', 'Recruiter ready'],
    url: githubPortfolioRepo,
  },
];

const githubProjectsEn: Project[] = [
  {
    title: 'Electrical Consumption Monitoring and Analysis',
    type: 'Data dashboard',
    description: 'Consumption analytics and visualization for data centers with tracking and reporting logic.',
    technologies: ['JavaScript', 'Data Viz', 'Analytics'],
    highlights: ['Monitoring', 'Reporting', 'Business analysis'],
    url: `${githubProfile}/Suivi-et-Analyse-des-Consommations-lectriques-des-Data-Centers-en-France`,
  },
  {
    title: 'AI Visibility Tracker',
    type: 'AI product',
    description: 'Visibility and tracking project built with TypeScript for modern dashboards and data flows.',
    technologies: ['TypeScript', 'Monitoring', 'AI'],
    highlights: ['Tracking', 'Scalable', 'Modern stack'],
    url: `${githubProfile}/ai-visibility-tracker`,
  },
  {
    title: 'Wiremock UI PCU',
    type: 'Internal tooling',
    description: 'UI for persistence and management of WireMock mocks in integration workflows.',
    technologies: ['JavaScript', 'WireMock', 'UI'],
    highlights: ['API mocks', 'Persistence', 'Integration'],
    url: `${githubProfile}/wiremock-ui-pcu`,
  },
  {
    title: 'Projet.NET',
    type: '.NET application',
    description: 'C# business-oriented application with clean structure for technical demonstration.',
    technologies: ['C#', '.NET', 'SQL'],
    highlights: ['Clean structure', 'Back-end', 'Business app'],
    url: `${githubProfile}/Projet.NET`,
  },
  {
    title: 'Job Market Intelligence',
    type: 'AI & Data application',
    description: 'Platform that automatically collects tech jobs, extracts 400+ skills, analyzes trends, and recommends what to learn next.',
    technologies: ['Python', 'Scikit-learn', 'NLP', 'Docker', 'Kubernetes'],
    highlights: ['400+ skills detected', '30-day forecasting', 'Personalized recommendations'],
    url: jobMarketIntelligenceRepo,
    demoUrl: jobMarketIntelligenceDemo,
  },
  {
    title: 'LMS with Face Recognition',
    type: 'Academic Project',
    description: 'Complete e-learning platform with course management, quizzes, payments, and biometric authentication.',
    technologies: ['Django', 'SQLite', 'Python', 'Bootstrap', 'Face Recognition'],
    highlights: ['Courses and quizzes', 'Payments', 'Face recognition'],
    url: `${githubProfile}/mon_projet_reconnaissance`,
  },
  {
    title: 'Professional portfolio',
    type: 'This portfolio',
    description: 'Public portfolio designed for recruiters with smooth navigation and impact-oriented sections.',
    technologies: ['TypeScript', 'Next.js', 'Tailwind'],
    highlights: ['Responsive', '3D style', 'Recruiter ready'],
    url: githubPortfolioRepo,
  },
];

const skills = {
  Frontend: ['React', 'Next.js', 'Angular', 'TypeScript', 'JavaScript', 'Tailwind', 'Bootstrap'],
  Backend: ['Node.js', 'Spring Boot', 'Django', 'Express', 'Java', 'Python', 'PHP'],
  Data: ['MongoDB', 'MySQL', 'SQLite', 'Redis', 'SQL Server', 'Pandas'],
  AI: ['TensorFlow', 'OpenCV', 'Scikit-learn', 'CNN', 'NLP', 'Deep Learning'],
  DevOps: ['Docker', 'Kubernetes', 'Git', 'GitHub', 'Azure', 'CI/CD'],
};

const experienceTechFr: ExperienceItem[] = [
  {
    company: 'Laboratoire i3S (CNRS)',
    role: 'Développeur Chercheur - Réseaux & Data Science (Stage PFE)',
    period: 'Juin 2026 - Septembre 2026',
    description: 'Étude de l’impact du changement climatique sur les réseaux de télécommunications, sous la supervision de Guillaume Urvoy-Keller (CNRS).',
    technologies: ['Python', 'Data Science', 'Big Data'],
    contract: 'Stage PFE',
    location: 'Sophia Antipolis, France · Sur site',
    missions: [
      'Analyse de données environnementales et de performance réseau à grande échelle',
      'Modélisation et traitement de données pour l étude d impact climatique sur les infrastructures télécom',
      'Cadrage du sujet de recherche et définition de la méthodologie d analyse',
    ],
    impact: ['Recherche appliquée CNRS', 'Analyse de données à grande échelle', 'Enjeux de durabilité numérique'],
  },
  {
    company: 'ATOS',
    role: 'Développeur Full Stack (Stage PFE)',
    period: 'Février 2025 - Octobre 2025',
    description: 'Développement de la plateforme d’intégration PCU pour Orange (Jordanie, Afrique du Nord, Botswana) ; projet évalué 18/20, proposition de CDI à l’issue du stage.',
    technologies: ['Java', 'Spring Boot', 'Node.js', 'React', 'Docker', 'WireMock', 'CI/CD', 'API REST'],
    contract: 'Stage PFE',
    location: 'Casablanca-Settat, Maroc · Sur site',
    missions: [
      'Conception et intégration d APIs REST avec Spring Boot et Node.js pour un système de prise de commande unifiée',
      'Développement d interfaces React et gestion des mappings/serveurs API (WiremockUI)',
      'Mise en place de tests d intégration via Docker et Wiremock dans un pipeline CI/CD',
    ],
    impact: ['18/20 - proposition de CDI', 'WiremockUI livré', '3 zones Orange couvertes'],
  },
  {
    company: '6 Solutions',
    role: 'Ingénieur logiciel stagiaire',
    period: 'Juin 2024 - Octobre 2024',
    description: 'Création, développement et conception d’une application Smart Parking avec reconnaissance automatique de plaques (ANPR).',
    technologies: ['Python', 'OpenCV', 'Angular', 'Spring Boot', 'Docker', 'SQL'],
    contract: 'CDD',
    location: 'Casablanca-Settat, Maroc · Sur site',
    missions: [
      'Conception du back-end avec Spring Boot et intégration front-end',
      'Déploiement de l application via Docker et tests d intégration',
    ],
    impact: ['ANPR intégré', 'Pipeline Dockerisé', 'App Smart Parking fonctionnelle'],
  },
  {
    company: 'ONEE - Branche Electricité',
    role: 'Stagiaire',
    period: 'Juin 2023 - Septembre 2023',
    description: 'Application web de gestion de stocks avec opérations CRUD, recherche et tri.',
    technologies: ['PHP', 'SQL', 'MySQL', 'Bootstrap'],
    contract: 'Stage',
    location: 'Oujda, Oriental, Maroc · Sur site',
    missions: [
      'Conception et développement d une application web de gestion de stocks',
      'Implémentation des fonctionnalités CRUD, recherche et tri',
      'Intégration du front-end avec Bootstrap et JavaScript',
    ],
    impact: ['CRUD complet', 'Recherche + tri', 'Déploiement opérationnel en stage'],
  },
];

const experienceTechEn: ExperienceItem[] = [
  {
    company: 'i3S Laboratory (CNRS)',
    role: 'Research Developer - Networks & Data Science (Final year internship)',
    period: 'June 2026 - September 2026',
    description: 'Studying the impact of climate change on telecommunications networks, under the supervision of Guillaume Urvoy-Keller (CNRS).',
    technologies: ['Python', 'Data Science', 'Big Data'],
    contract: 'Final year internship',
    location: 'Sophia Antipolis, France · On site',
    missions: [
      'Analyzed environmental and network performance data at scale',
      'Modeled and processed data to study the climate impact on telecom infrastructure',
      'Scoped the research topic and defined the analysis methodology',
    ],
    impact: ['Applied CNRS research', 'Large-scale data analysis', 'Digital sustainability focus'],
  },
  {
    company: 'ATOS',
    role: 'Full Stack Developer (Final year internship)',
    period: 'February 2025 - October 2025',
    description: 'Built the PCU integration platform for Orange (Jordan, North Africa, Botswana); project rated 18/20, leading to a permanent contract offer.',
    technologies: ['Java', 'Spring Boot', 'Node.js', 'React', 'Docker', 'WireMock', 'CI/CD', 'REST API'],
    contract: 'Final year internship',
    location: 'Casablanca-Settat, Morocco · On site',
    missions: [
      'Designed and integrated REST APIs with Spring Boot and Node.js for a unified order-taking system',
      'Built React interfaces and managed API mappings/servers (WiremockUI)',
      'Set up integration tests with Docker and Wiremock inside a CI/CD pipeline',
    ],
    impact: ['18/20 - permanent contract offer', 'WiremockUI delivered', '3 Orange zones covered'],
  },
  {
    company: '6 Solutions',
    role: 'Software Engineering Intern',
    period: 'June 2024 - October 2024',
    description: 'Designed and built a Smart Parking application with automatic license plate recognition (ANPR).',
    technologies: ['Python', 'OpenCV', 'Angular', 'Spring Boot', 'Docker', 'SQL'],
    contract: 'Fixed-term contract',
    location: 'Casablanca-Settat, Morocco · On site',
    missions: [
      'Designed backend with Spring Boot and integrated frontend workflows',
      'Deployed the application with Docker and integration testing',
    ],
    impact: ['Integrated ANPR', 'Dockerized pipeline', 'Working Smart Parking app'],
  },
  {
    company: 'ONEE - Electricity Branch',
    role: 'Intern',
    period: 'June 2023 - September 2023',
    description: 'Built a stock management web app with CRUD operations, search, and sorting.',
    technologies: ['PHP', 'SQL', 'MySQL', 'Bootstrap'],
    contract: 'Internship',
    location: 'Oujda, Oriental, Morocco · On site',
    missions: [
      'Designed and developed a stock management web application',
      'Implemented CRUD, search, and sorting features',
      'Integrated frontend with Bootstrap and JavaScript',
    ],
    impact: ['Full CRUD delivered', 'Search and sorting', 'Operational internship delivery'],
  },
];

const experienceFuncFr: ExperienceItem[] = [
  {
    company: 'Laboratoire i3S (CNRS)',
    role: 'Chercheur Réseaux & Data Science (Stage PFE)',
    period: 'Juin 2026 - Septembre 2026',
    description: 'Cadrage du sujet de recherche et définition de la méthodologie d’analyse, sous la supervision de Guillaume Urvoy-Keller (CNRS).',
    technologies: ['Analyse de données', 'Méthodologie de recherche', 'Python'],
    contract: 'Stage PFE',
    location: 'Sophia Antipolis, France · Sur site',
    missions: [
      'Cadrage du sujet de recherche et définition de la méthodologie d analyse',
      'Étude de l impact du changement climatique sur les infrastructures de télécommunications',
      'Analyse liée aux enjeux de durabilité numérique',
    ],
    impact: ['Recherche appliquée CNRS', 'Méthodologie de recherche définie', 'Durabilité numérique'],
  },
  {
    company: 'ATOS',
    role: 'Consultant Fonctionnel & Développeur Full Stack (Stage PFE)',
    period: 'Février 2025 - Octobre 2025',
    description: 'Recueil et analyse des besoins métier du client Orange (Jordanie, Afrique du Nord, Botswana), rédaction des spécifications fonctionnelles et du cahier des charges de la plateforme PCU.',
    technologies: ['Figma', 'Draw.io', 'StarUML', 'Cahier des charges', 'Backlog', 'Agile/Scrum'],
    contract: 'Stage PFE',
    location: 'Casablanca-Settat, Maroc · Sur site',
    missions: [
      'Conception des maquettes fonctionnelles (Figma) et des diagrammes de pipeline (Draw.io)',
      'Gestion du backlog produit : User Stories, critères d acceptance et priorisation en Agile/Scrum',
      'Analyse et cartographie des risques projet, tests fonctionnels et de recette',
      'Présentation des livrables au client et reporting d avancement au directeur de projet',
    ],
    impact: ['18/20 - proposition de CDI', 'Cahier des charges PCU livré', 'Recette validée client'],
  },
  {
    company: '6 Solutions',
    role: 'Consultant Fonctionnel & Développeur Full Stack (Stage CDD)',
    period: 'Juin 2024 - Octobre 2024',
    description: 'Recueil des besoins auprès des parties prenantes et rédaction du cahier des charges fonctionnel du système ANPR.',
    technologies: ['Figma', 'StarUML', 'Draw.io', 'Cahier des charges', 'UML', 'Cycle en V'],
    contract: 'CDD',
    location: 'Casablanca-Settat, Maroc · Sur site',
    missions: [
      'Conception des maquettes (Figma) et modélisation UML (StarUML) : cas d usage, classes, séquence',
      'Pilotage du cycle complet en Cycle en V : spécifications → développement → recette → mise en production',
    ],
    impact: ['17/20 - proposition de commercialisation', 'Cahier des charges ANPR livré', 'Cycle en V piloté'],
  },
  {
    company: 'ONEE - Branche Electricité',
    role: 'Analyste Fonctionnel & Développeur Web (Stage)',
    period: 'Juin 2023 - Septembre 2023',
    description: 'Analyse des besoins métier, rédaction des spécifications fonctionnelles et conception des maquettes pour une application de gestion de stocks.',
    technologies: ['Spécifications fonctionnelles', 'Maquettes', 'Draw.io'],
    contract: 'Stage',
    location: 'Oujda, Oriental, Maroc · Sur site',
    missions: [
      'Analyse des besoins métier et rédaction des spécifications fonctionnelles',
      'Conception des maquettes et développement de la solution (PHP, JavaScript, SQL)',
    ],
    impact: ['Spécifications validées', 'Maquettes livrées', 'Solution déployée'],
  },
];

const experienceFuncEn: ExperienceItem[] = [
  {
    company: 'i3S Laboratory (CNRS)',
    role: 'Networks & Data Science Researcher (Final year internship)',
    period: 'June 2026 - September 2026',
    description: 'Scoped the research topic and defined the analysis methodology, under the supervision of Guillaume Urvoy-Keller (CNRS).',
    technologies: ['Data analysis', 'Research methodology', 'Python'],
    contract: 'Final year internship',
    location: 'Sophia Antipolis, France · On site',
    missions: [
      'Scoped the research topic and defined the analysis methodology',
      'Studied the impact of climate change on telecommunications infrastructure',
      'Analysis tied to digital sustainability challenges',
    ],
    impact: ['Applied CNRS research', 'Research methodology defined', 'Digital sustainability focus'],
  },
  {
    company: 'ATOS',
    role: 'Functional Consultant & Full Stack Developer (Final year internship)',
    period: 'February 2025 - October 2025',
    description: 'Gathered and analyzed business requirements for client Orange (Jordan, North Africa, Botswana), writing functional specifications and the requirements document for the PCU platform.',
    technologies: ['Figma', 'Draw.io', 'StarUML', 'Requirements document', 'Backlog', 'Agile/Scrum'],
    contract: 'Final year internship',
    location: 'Casablanca-Settat, Morocco · On site',
    missions: [
      'Designed functional mockups (Figma) and pipeline diagrams (Draw.io)',
      'Managed the product backlog: user stories, acceptance criteria and Agile/Scrum prioritization',
      'Analyzed and mapped project risks, ran functional testing and UAT',
      'Presented deliverables to the client and reported progress to the project director',
    ],
    impact: ['18/20 - permanent contract offer', 'PCU requirements document delivered', 'Client UAT signed off'],
  },
  {
    company: '6 Solutions',
    role: 'Functional Consultant & Full Stack Developer (Fixed-term internship)',
    period: 'June 2024 - October 2024',
    description: 'Gathered requirements from stakeholders and wrote the functional requirements document for the ANPR system.',
    technologies: ['Figma', 'StarUML', 'Draw.io', 'Requirements document', 'UML', 'V-model'],
    contract: 'Fixed-term contract',
    location: 'Casablanca-Settat, Morocco · On site',
    missions: [
      'Designed mockups (Figma) and UML models (StarUML): use case, class, and sequence diagrams',
      'Steered the full V-model cycle: specifications → development → UAT → production release',
    ],
    impact: ['17/20 - proposed for commercialization', 'ANPR requirements document delivered', 'V-model cycle steered'],
  },
  {
    company: 'ONEE - Electricity Branch',
    role: 'Functional Analyst & Web Developer (Internship)',
    period: 'June 2023 - September 2023',
    description: 'Analyzed business needs, wrote functional specifications, and designed mockups for a stock management application.',
    technologies: ['Functional specifications', 'Mockups', 'Draw.io'],
    contract: 'Internship',
    location: 'Oujda, Oriental, Morocco · On site',
    missions: [
      'Analyzed business needs and wrote functional specifications',
      'Designed mockups and developed the solution (PHP, JavaScript, SQL)',
    ],
    impact: ['Specifications signed off', 'Mockups delivered', 'Solution deployed'],
  },
];

const education: EducationItem[] = [
  {
    degree: 'Master 2 (M2) MBDS - Mobiquité, Big Data et Intégration de Systèmes',
    school: 'Université Côte d Azur, Nice',
    period: 'Septembre 2025 - Juillet 2026',
    status: 'En cours',
  },
  {
    degree: 'Master 2 (M2) Intelligence Artificielle appliquée',
    school: 'Université Côte d Azur, Nice',
    period: 'Octobre 2024 - Septembre 2025',
    status: 'Mention Bien',
  },
  {
    degree: 'Ingénieur Informatique et Réseaux (MIAGE)',
    school: 'EMSI Rabat',
    period: 'Septembre 2020 - Août 2025',
    status: 'Mention Très Bien',
  },
  {
    degree: 'Baccalauréat Sciences Physiques',
    school: 'Lycée Qualifiant Oriental, Oujda',
    period: '2019 - 2020',
  },
];

const educationEn: EducationItem[] = [
  {
    degree: 'Master Year 2 MBDS - Mobility, Big Data and Systems Integration',
    school: 'Université Côte d Azur, Nice',
    period: 'September 2025 - July 2026',
    status: 'In progress',
  },
  {
    degree: 'Master Year 2 Applied Artificial Intelligence',
    school: 'Université Côte d Azur, Nice',
    period: 'October 2024 - September 2025',
    status: 'Honors',
  },
  {
    degree: 'Engineering Degree in Computer Science and Networks (MIAGE)',
    school: 'EMSI Rabat',
    period: 'September 2020 - August 2025',
    status: 'High Honors',
  },
  {
    degree: 'Scientific Baccalaureate - Physics',
    school: 'Lycée Qualifiant Oriental, Oujda',
    period: '2019 - 2020',
  },
];

const certifications: Certification[] = [
  { title: 'Building Scalable Java Microservices with Spring Boot and Spring Cloud', file: 'certif Building Scalable Java Microservices with Spring Boot and Spring Cloud.pdf', category: 'Backend' },
  { title: 'Neural Networks and Deep Learning', file: 'certif Neural Networks and Deep Learning.pdf', category: 'AI' },
  { title: 'Preparing Data for Analysis with Microsoft', file: 'certificat preparing Data for analusis with microsoft.pdf', category: 'Data' },
  { title: 'SAP Professional Fundamentals', file: 'SAP.pdf', category: 'Fondamentaux' },
  { title: 'Big Data with Spark and Hadoop', file: 'certif Big Data with Spark and Hadoop.pdf', category: 'Data' },
  { title: 'React Native', file: 'Coursera ReactNative.pdf', category: 'Frontend' },
  { title: 'Java (Coursera)', file: 'certificat java coursera.pdf', category: 'Backend' },
  { title: 'Azure (Coursera)', file: 'Coursera azure.pdf', category: 'Cloud' },
  { title: 'Docker (Coursera)', file: 'Coursera Docker.pdf', category: 'Cloud' },
  { title: 'Git and GitHub (Coursera)', file: 'coursera git and github.pdf', category: 'Fondamentaux' },
  { title: 'React (Coursera)', file: 'Coursera React.pdf', category: 'Frontend' },
  { title: 'UNIX', file: 'certificate unix.pdf', category: 'Fondamentaux' },
  { title: 'UML', file: 'certificate all UML.pdf', category: 'Fondamentaux' },
  { title: 'Python Certificate 1', file: 'certificate python1.pdf', category: 'AI' },
  { title: 'Python Certificate 2', file: 'certificate python 2.pdf', category: 'AI' },
  { title: 'Python Certificate 3', file: 'certificate python 3.pdf', category: 'AI' },
  { title: 'Python Certificate 5', file: 'certificate python 5.pdf', category: 'AI' },
];

const certificationCategories: Array<'Tous' | Certification['category']> = ['Tous', 'AI', 'Cloud', 'Data', 'Backend', 'Frontend', 'Fondamentaux'];

const heroTech = ['Spring Boot', 'Node.js', 'React', 'Angular', 'TensorFlow', 'Docker', 'Spark', 'CI/CD'];

const terminalScript = {
  fr: [
    '$ git clone https://github.com/aminox1/portfolio-mohamed-amine-moumeni.git',
    '$ cd portfolio-amine',
    '$ npm install',
    'added 582 packages in 24s',
    '$ npm run dev',
    '▲ Next.js 15.4.5 - ready in 1.8s',
    '$ npm run build',
    '✓ Compiled successfully',
    '$ docker compose up -d',
    '3 services started: api, redis, nginx',
    '$ echo "Disponible pour un CDI"',
    'Disponible pour un CDI',
  ],
  en: [
    '$ git clone https://github.com/aminox1/portfolio-mohamed-amine-moumeni.git',
    '$ cd portfolio-amine',
    '$ npm install',
    'added 582 packages in 24s',
    '$ npm run dev',
    '▲ Next.js 15.4.5 - ready in 1.8s',
    '$ npm run build',
    '✓ Compiled successfully',
    '$ docker compose up -d',
    '3 services started: api, redis, nginx',
    '$ echo "Open to full-time role"',
    'Open to full-time role',
  ],
} as const;

const recruiterSignals = [
  {
    title: 'Impact rapide',
    text: 'Montée en charge rapide sur un codebase existant et contribution dès les premières semaines.',
  },
  {
    title: 'Profil hybride',
    text: 'Capacité à connecter backend, frontend et IA dans une même logique produit.',
  },
  {
    title: 'Culture qualité',
    text: 'Approche orientée tests, performance, maintenabilité et collaboration équipe.',
  },
];

const techIcons: Record<string, IconType> = {
  Angular: SiAngular,
  'Spring Boot': SiSpringboot,
  'Node.js': SiNodedotjs,
  React: SiReact,
  Java: SiOpenjdk,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Python: SiPython,
  Docker: SiDocker,
  TensorFlow: SiTensorflow,
  Spark: SiApachespark,
  MongoDB: SiMongodb,
  MySQL: SiMysql,
  Redis: SiRedis,
  Django: SiDjango,
  Express: SiExpress,
  PHP: SiPhp,
  Bootstrap: SiBootstrap,
  Tailwind: SiTailwindcss,
  OpenCV: SiOpencv,
  Kubernetes: SiKubernetes,
  GitHub: SiGithub,
  'Scikit-learn': SiScikitlearn,
};

const floatingTechBadges = [
  { label: 'React', top: '18%', left: '5%', duration: '14s', delay: '0s' },
  { label: 'Node.js', top: '30%', left: '11%', duration: '17s', delay: '-2.5s' },
  { label: 'Angular', top: '62%', left: '9%', duration: '15s', delay: '-1.2s' },
  { label: 'Spring Boot', top: '20%', left: '88%', duration: '16s', delay: '-3.1s' },
  { label: 'Docker', top: '46%', left: '92%', duration: '18s', delay: '-0.8s' },
  { label: 'TypeScript', top: '72%', left: '86%', duration: '15s', delay: '-2.9s' },
  { label: 'TensorFlow', top: '78%', left: '13%', duration: '19s', delay: '-4.2s' },
  { label: 'Kubernetes', top: '14%', left: '77%', duration: '20s', delay: '-5.2s' },
  { label: 'MongoDB', top: '84%', left: '77%', duration: '17s', delay: '-1.7s' },
  { label: 'Python', top: '10%', left: '20%', duration: '16s', delay: '-2.1s' },
] as const;

function TechPill({ label, className = '' }: { label: string; className?: string }) {
  const Icon = techIcons[label] ?? null;

  return (
    <span className={`inline-flex items-center gap-2 rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-100 ${className}`}>
      {Icon ? <Icon className="text-sm" /> : null}
      {label}
    </span>
  );
}

function ProjectCard({
  project,
  index,
  compact = false,
  labels,
}: {
  project: Project;
  index: number;
  compact?: boolean;
  labels: { repo: string; demo: string };
}) {
  return (
    <motion.div
      className={`interactive-glow group block rounded-3xl border border-white/10 bg-white/6 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all ${compact ? 'h-full' : ''}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={{ y: -8, rotateX: -4, rotateY: 6, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      role="link"
      tabIndex={0}
      onClick={() => window.open(project.url, '_blank', 'noopener,noreferrer')}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          window.open(project.url, '_blank', 'noopener,noreferrer');
        }
      }}
      onMouseMove={(event) => {
        const element = event.currentTarget;
        const rect = element.getBoundingClientRect();
        element.style.setProperty('--mx', `${event.clientX - rect.left}px`);
        element.style.setProperty('--my', `${event.clientY - rect.top}px`);
        element.style.setProperty('--glow-opacity', '1');
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.setProperty('--glow-opacity', '0');
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.28em] text-cyan-300/80">{project.type}</p>
          <h3 className="text-xl font-semibold text-white transition-colors group-hover:text-cyan-200">{project.title}</h3>
        </div>
        <ArrowUpRight className="mt-1 text-white/60 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan-200" size={20} />
      </div>

      <p className="mt-4 text-sm leading-6 text-white/75">{project.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.highlights.map((highlight) => (
          <span key={highlight} className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs text-white/80">
            {highlight}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.technologies.map((technology) => (
          <TechPill key={technology} label={technology} />
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => event.stopPropagation()}
          className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/35 bg-cyan-400/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-cyan-100 transition hover:bg-cyan-400/20"
        >
          <Github size={14} />
          {labels.repo}
        </a>

        {project.demoUrl ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-300/40 bg-emerald-300/12 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-100 transition hover:bg-emerald-300/24"
          >
            <ExternalLink size={14} />
            {labels.demo}
          </a>
        ) : null}
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [lang, setLang] = useState<Lang>('fr');
  const [profile, setProfile] = useState<Profile>('tech');
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [showAllCertifications, setShowAllCertifications] = useState(false);
  const [selectedCertificationCategory, setSelectedCertificationCategory] = useState<'Tous' | Certification['category']>('Tous');
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { scrollY } = useScroll();
  const heroBgY = useTransform(scrollY, [0, 700], [0, 130]);
  const heroContentY = useTransform(scrollY, [0, 700], [0, -35]);
  const heroScale = useTransform(scrollY, [0, 700], [1, 0.96]);
  const t = uiText[lang];
  const pt = profileText[profile][lang];
  const categoryLabel = certificationCategoryLabel[lang];
  const localizedStats = lang === 'fr'
    ? [
        { value: '10+', label: 'projets livrés' },
        { value: '3', label: 'stages significatifs' },
        { value: '1', label: 'portfolio premium' },
        { value: '100%', label: 'orienté recruteur' },
      ]
    : [
        { value: '10+', label: 'delivered projects' },
        { value: '3', label: 'impactful internships' },
        { value: '1', label: 'premium portfolio' },
        { value: '100%', label: 'recruiter focused' },
      ];
  const localizedSignals = lang === 'fr'
    ? recruiterSignals
    : [
        {
          title: 'Fast impact',
          text: 'Quick ramp-up on existing codebases and contribution from the first weeks.',
        },
        {
          title: 'Hybrid profile',
          text: 'Ability to connect backend, frontend and AI into one coherent product direction.',
        },
        {
          title: 'Quality culture',
          text: 'Mindset focused on testing, performance, maintainability and team collaboration.',
        },
      ];
  const localizedFeaturedProjects = lang === 'fr' ? featuredProjects : featuredProjectsEn;
  const localizedGithubProjects = lang === 'fr' ? githubProjects : githubProjectsEn;
  const localizedExperience = profile === 'tech'
    ? (lang === 'fr' ? experienceTechFr : experienceTechEn)
    : (lang === 'fr' ? experienceFuncFr : experienceFuncEn);
  const localizedEducation = lang === 'fr' ? education : educationEn;
  const currentTerminalScript = terminalScript[lang];
  const visibleNavItems = recruiterMode
    ? navItems.filter((item) => ['home', 'projects', 'code-quality', 'contact'].includes(item.id))
    : navItems;
  const filteredCertifications = selectedCertificationCategory === 'Tous'
    ? certifications
    : certifications.filter((certification) => certification.category === selectedCertificationCategory);
  const visibleCertifications = showAllCertifications ? filteredCertifications : filteredCertifications.slice(0, 7);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [terminalCursor, setTerminalCursor] = useState(0);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalCwd, setTerminalCwd] = useState('~/portfolio-amine');
  const terminalRef = useRef<HTMLDivElement | null>(null);

  const handleGlowMove = (event: React.MouseEvent<HTMLElement>) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    element.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    element.style.setProperty('--my', `${event.clientY - rect.top}px`);
    element.style.setProperty('--glow-opacity', '1');
  };

  const handleGlowLeave = (event: React.MouseEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--glow-opacity', '0');
  };

  useEffect(() => {
    emailjs.init('hH-uCcojsS0TZGweO');

    const sections = visibleNavItems.map((item) => item.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection?.target.id) {
          setActiveSection(visibleSection.target.id);
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: 0.2,
      }
    );

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [visibleNavItems]);

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 1024px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updatePreferences = () => {
      setIsMobile(mobileQuery.matches);
      setPrefersReducedMotion(motionQuery.matches);
    };

    updatePreferences();
    mobileQuery.addEventListener('change', updatePreferences);
    motionQuery.addEventListener('change', updatePreferences);

    return () => {
      mobileQuery.removeEventListener('change', updatePreferences);
      motionQuery.removeEventListener('change', updatePreferences);
    };
  }, []);

  useEffect(() => {
    setTerminalLines([]);
    setTerminalCursor(0);
    setTerminalInput('');
    setTerminalCwd('~/portfolio-amine');
  }, [lang]);

  useEffect(() => {
    if (terminalCursor >= currentTerminalScript.length) {
      return;
    }

    const delay = currentTerminalScript[terminalCursor].startsWith('$') ? 820 : 520;
    const timer = window.setTimeout(() => {
      setTerminalLines((previous) => [...previous, currentTerminalScript[terminalCursor]]);
      setTerminalCursor((previous) => previous + 1);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [currentTerminalScript, terminalCursor]);

  useEffect(() => {
    if (!terminalRef.current) {
      return;
    }

    terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [terminalLines]);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleTerminalSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const command = terminalInput.trim();
    if (!command) {
      return;
    }

    const promptLine = `${terminalCwd} $ ${command}`;
    const commandLower = command
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const nextLines: string[] = [promptLine];

    if (commandLower === 'clear') {
      setTerminalLines([]);
      setTerminalInput('');
      return;
    }

    if (commandLower === 'help') {
      nextLines.push(
        'help, ls, pwd, cd .., cd portfolio-amine, cd projet, cd formation, cd contact, cd code-quality, cd accueil, mode recruteur on|off, npm run dev, npm run build, git status, whoami, clear'
      );
    } else if (commandLower === 'pwd') {
      nextLines.push(terminalCwd.replace('~', '/Users/user'));
    } else if (commandLower === 'ls') {
      nextLines.push('README.md  package.json  src/  public/  next.config.ts  tsconfig.json');
    } else if (commandLower === 'cd ..') {
      setTerminalCwd('~');
    } else if (commandLower === 'cd portfolio-amine') {
      setTerminalCwd('~/portfolio-amine');
    } else if (commandLower === 'npm run dev') {
      nextLines.push('▲ Next.js 15.4.5', 'ready - started server on http://localhost:3000');
    } else if (commandLower === 'npm run build') {
      nextLines.push('Creating an optimized production build ...', '✓ Compiled successfully');
    } else if (commandLower === 'git status') {
      nextLines.push('On branch main', 'nothing to commit, working tree clean');
    } else if (commandLower === 'whoami') {
      nextLines.push('Mohamed Amine Moumeni - Full Stack / AI / Data');
    } else if (commandLower === 'mode recruteur on' || commandLower === 'mode recruiter on') {
      setRecruiterMode(true);
      scrollToSection('home');
      nextLines.push(lang === 'fr' ? 'Mode recruteur activé' : 'Recruiter mode enabled');
    } else if (commandLower === 'mode recruteur off' || commandLower === 'mode recruiter off') {
      setRecruiterMode(false);
      scrollToSection('home');
      nextLines.push(lang === 'fr' ? 'Mode recruteur désactivé' : 'Recruiter mode disabled');
    } else if (commandLower.startsWith('cd ')) {
      const destination = commandLower.slice(3).trim();
      const targetMap: Record<string, { id: string; label: string }> = {
        accueil: { id: 'home', label: 'Accueil' },
        home: { id: 'home', label: 'Home' },
        apropos: { id: 'about', label: 'A propos' },
        about: { id: 'about', label: 'About' },
        experience: { id: 'experience', label: 'Experience' },
        projet: { id: 'projects', label: 'Projets' },
        projets: { id: 'projects', label: 'Projets' },
        project: { id: 'projects', label: 'Projects' },
        projects: { id: 'projects', label: 'Projects' },
        github: { id: 'github-projects', label: 'GitHub' },
        competences: { id: 'skills', label: 'Competences' },
        skills: { id: 'skills', label: 'Skills' },
        formation: { id: 'education', label: 'Formation' },
        education: { id: 'education', label: 'Education' },
        'code-quality': { id: 'code-quality', label: 'Code Quality' },
        codequality: { id: 'code-quality', label: 'Code Quality' },
        contact: { id: 'contact', label: 'Contact' },
      };

      if (targetMap[destination]) {
        const target = targetMap[destination];
        scrollToSection(target.id);
        setTerminalCwd(`~/portfolio-amine/${target.id}`);
        nextLines.push(lang === 'fr' ? `Navigation vers ${target.label}` : `Navigating to ${target.label}`);
      } else {
        nextLines.push(t.terminalUnknown);
      }
    } else {
      nextLines.push(t.terminalUnknown);
    }

    setTerminalLines((previous) => [...previous, ...nextLines]);
    setTerminalInput('');
  };

  const downloadCV = () => {
    const file = profile === 'tech' ? 'CV-Technique-Moumeni.pdf' : 'CV_Fonctionnel_Moumeni.pdf';
    const link = document.createElement('a');
    link.href = `/cv/${file}`;
    link.download = file;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const result = await emailjs.send('service_wsg9iae', 'template_tzaeeca', {
        from_name: formData.nom,
        from_email: formData.email,
        subject: formData.sujet,
        message: formData.message,
      });

      if (result.status === 200) {
        setSubmitStatus('success');
        setFormData({ nom: '', email: '', sujet: '', message: '' });
        window.setTimeout(() => setSubmitStatus('idle'), 4000);
      }
    } catch {
      setSubmitStatus('error');
      window.setTimeout(() => setSubmitStatus('idle'), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${isDark ? 'theme-dark' : 'theme-light'} lux-grid min-h-screen overflow-x-hidden transition-colors duration-300`}>
      <div className="noise-overlay" />
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="orb orb-c" />
      </div>
      <div className="pointer-events-none fixed inset-0 -z-10 hidden xl:block">
        <div className="float-tech-cloud">
          {floatingTechBadges.map((badge) => {
            const Icon = techIcons[badge.label] ?? null;

            return (
              <div
                key={`${badge.label}-${badge.top}-${badge.left}`}
                className="float-tech-item"
                style={{
                  top: badge.top,
                  left: badge.left,
                  animationDuration: badge.duration,
                  animationDelay: badge.delay,
                }}
              >
                <div className="float-tech-inner">
                  {Icon ? <Icon className="text-[26px]" /> : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:px-5 lg:px-7">
          <button onClick={() => scrollToSection('home')} className="shrink-0 text-left">
            <div className="flex items-center gap-3">
              <span className="brand-sigil" aria-hidden="true">AM</span>
              <div>
                <div className="text-sm uppercase tracking-[0.4em] text-cyan-300">Portfolio</div>
                <div className="text-base font-semibold text-white 2xl:hidden">M. A. Moumeni</div>
                <div className="hidden whitespace-nowrap text-lg font-semibold text-white 2xl:block">Mohamed Amine Moumeni</div>
              </div>
            </div>
          </button>

          <nav className="hidden min-w-0 flex-wrap items-center justify-end gap-0.5 xl:flex 2xl:gap-1">
            {visibleNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-1.5 text-sm transition-all 2xl:gap-2 2xl:px-3 2xl:py-2 ${
                  activeSection === item.id
                    ? 'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/30'
                    : 'text-white/75 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon size={14} />
                {t.nav[item.id as keyof typeof t.nav]}
              </button>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5">
            <div className="hidden items-center gap-0.5 rounded-full border border-white/10 bg-white/5 p-1 md:flex">
              <button
                onClick={() => setLang('fr')}
                className={`rounded-full px-2.5 py-1 text-xs font-semibold transition ${lang === 'fr' ? 'bg-cyan-400 text-slate-950' : 'text-white/75 hover:text-white'}`}
              >
                FR
              </button>
              <button
                onClick={() => setLang('en')}
                className={`rounded-full px-2.5 py-1 text-xs font-semibold transition ${lang === 'en' ? 'bg-cyan-400 text-slate-950' : 'text-white/75 hover:text-white'}`}
              >
                EN
              </button>
              <span className="mx-0.5 h-4 w-px bg-white/15" aria-hidden="true" />
              <button
                onClick={() => setProfile('tech')}
                className={`rounded-full px-2.5 py-1 text-xs font-semibold transition ${profile === 'tech' ? 'bg-cyan-400 text-slate-950' : 'text-white/75 hover:text-white'}`}
              >
                Tech
              </button>
              <button
                onClick={() => setProfile('func')}
                className={`rounded-full px-2.5 py-1 text-xs font-semibold transition ${profile === 'func' ? 'bg-cyan-400 text-slate-950' : 'text-white/75 hover:text-white'}`}
              >
                <span className="2xl:hidden">{lang === 'fr' ? 'Fonc.' : 'Func'}</span>
                <span className="hidden 2xl:inline">{lang === 'fr' ? 'Fonctionnel' : 'Functional'}</span>
              </button>
            </div>
            <button
              onClick={() => setIsDark((current) => !current)}
              className="rounded-full border border-white/10 bg-white/5 p-3 text-white transition hover:bg-white/10"
              aria-label={lang === 'fr' ? 'Changer le thème' : 'Toggle theme'}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsMenuOpen((current) => !current)}
              className="rounded-full border border-white/10 bg-white/5 p-3 text-white transition hover:bg-white/10 lg:hidden"
              aria-label={lang === 'fr' ? 'Ouvrir le menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="border-t border-white/10 bg-slate-950/95 px-4 py-4 lg:hidden"
            >
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <div className="flex items-center rounded-full border border-white/10 bg-white/5 p-1">
                  <button
                    onClick={() => setLang('fr')}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition ${lang === 'fr' ? 'bg-cyan-400 text-slate-950' : 'text-white/75 hover:text-white'}`}
                  >
                    FR
                  </button>
                  <button
                    onClick={() => setLang('en')}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition ${lang === 'en' ? 'bg-cyan-400 text-slate-950' : 'text-white/75 hover:text-white'}`}
                  >
                    EN
                  </button>
                </div>
                <div className="flex items-center rounded-full border border-white/10 bg-white/5 p-1">
                  <button
                    onClick={() => setProfile('tech')}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition ${profile === 'tech' ? 'bg-cyan-400 text-slate-950' : 'text-white/75 hover:text-white'}`}
                  >
                    Tech
                  </button>
                  <button
                    onClick={() => setProfile('func')}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition ${profile === 'func' ? 'bg-cyan-400 text-slate-950' : 'text-white/75 hover:text-white'}`}
                  >
                    {lang === 'fr' ? 'Fonctionnel' : 'Functional'}
                  </button>
                </div>
                <button
                  onClick={() => setRecruiterMode((current) => !current)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${recruiterMode ? 'bg-cyan-400 text-slate-950' : 'border border-white/15 bg-white/5 text-white/80 hover:bg-white/10'}`}
                >
                  {t.recruiterMode}
                </button>
              </div>
              <div className="grid gap-2">
                {visibleNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white/80 hover:bg-white/10"
                  >
                    <item.icon size={16} />
                    {t.nav[item.id as keyof typeof t.nav]}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="relative">
        <section id="home" className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pt-24">
          <motion.div
            style={isMobile || prefersReducedMotion ? undefined : { y: heroBgY }}
            className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.24),transparent_42%),radial-gradient(circle_at_70%_35%,rgba(217,70,239,0.2),transparent_44%),linear-gradient(180deg,rgba(15,23,42,0.95)_0%,rgba(30,27,75,0.95)_50%,rgba(45,17,63,0.95)_100%)]"
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto flex max-w-5xl flex-col items-center text-center"
            style={isMobile || prefersReducedMotion ? undefined : { y: heroContentY, scale: heroScale }}
          >
            <div className="mb-5 inline-flex items-center rounded-full border border-cyan-300/35 bg-cyan-300/12 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
              {pt.heroBadge}
            </div>
            <div className="mb-4 inline-flex items-center rounded-full border border-emerald-300/35 bg-emerald-300/12 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100 shadow-[0_0_24px_rgba(52,211,153,0.25)]">
              {t.openToWork}
            </div>
            <div className="relative neural-wrap">
              <span className="neural-ring" aria-hidden="true" />
              <svg className="neural-web" viewBox="0 0 100 100" aria-hidden="true">
                <path d="M50 8 A42 42 0 0 1 88 36" />
                <path d="M88 36 A42 42 0 0 1 28 90" />
                <path d="M28 90 A42 42 0 0 1 8 60" />
                <path d="M8 60 A42 42 0 0 1 50 8" />
              </svg>
              <span className="neural-node neural-node-a" aria-hidden="true"><SiTensorflow className="neural-node-icon" /></span>
              <span className="neural-node neural-node-b" aria-hidden="true"><SiSpringboot className="neural-node-icon" /></span>
              <span className="neural-node neural-node-c" aria-hidden="true"><SiReact className="neural-node-icon" /></span>
              <span className="neural-node neural-node-d" aria-hidden="true"><SiPython className="neural-node-icon" /></span>
              <motion.div
                className="h-52 w-52 overflow-hidden rounded-full border-4 border-white/20 shadow-[0_20px_90px_rgba(0,0,0,0.35)]"
                whileHover={{ rotateX: -10, rotateY: 12, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 230, damping: 18 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Image
                  src="/images/profile.jpg"
                  alt="Mohamed Amine MOUMENI"
                  width={208}
                  height={208}
                  priority
                  className="h-full w-full object-cover"
                />
              </motion.div>
              <div className="absolute bottom-4 right-2 h-11 w-11 rounded-full border-4 border-white/40 bg-emerald-400" />
            </div>

            <h1 className="mt-10 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-cyan-300 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                Mohamed Amine MOUMENI
              </span>
            </h1>

            <p className="mt-8 text-3xl leading-tight text-white/90 sm:text-4xl">
              {pt.heroSubtitle}
            </p>

            <p className="mt-10 max-w-4xl text-2xl leading-relaxed text-white sm:text-3xl">
              {pt.heroSearch}
            </p>

            <p className="mt-5 max-w-3xl text-lg text-white/80 sm:text-xl">
              {pt.heroPitch}
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-500 to-amber-400 px-8 py-4 text-2xl font-bold text-slate-950 shadow-[0_12px_48px_rgba(20,184,166,0.45)] transition hover:-translate-y-1"
              >
                <Mail size={24} />
                {t.contactCta}
              </button>
              <button
                onClick={downloadCV}
                className="inline-flex items-center gap-2 rounded-2xl border-2 border-cyan-400 bg-transparent px-8 py-4 text-2xl font-bold text-cyan-300 transition hover:bg-cyan-400/15"
              >
                <Download size={24} />
                {pt.downloadCv}
              </button>
              <a
                href={calendlyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-emerald-300/35 bg-emerald-300/15 px-6 py-4 text-base font-bold text-emerald-100 transition hover:-translate-y-1"
              >
                <Phone size={20} />
                {t.calendlyCta}
              </a>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
              {t.quickFacts.map((fact) => (
                <span key={fact} className="rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-white/85">
                  {fact}
                </span>
              ))}
            </div>

            <div className="mt-6 w-full rounded-3xl border border-white/10 bg-white/6 p-5 text-left backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/90">{t.targetRoleKicker}</p>
              <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">{pt.targetRoleTitle}</h3>
              <p className="mt-3 text-sm text-white/80">{pt.targetRolePitch}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {t.targetRoleMeta.map((item) => (
                  <span key={item} className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => setRecruiterMode((current) => !current)}
                  className={`inline-flex items-center justify-center rounded-full border px-4 py-2 text-xs font-bold tracking-[0.08em] transition ${recruiterMode ? 'border-cyan-300/40 bg-cyan-300/15 text-cyan-100' : 'border-white/15 bg-white/5 text-white/80 hover:bg-white/10'}`}
                  aria-label={lang === 'fr' ? 'Activer le mode recruteur' : 'Toggle recruiter mode'}
                >
                  {recruiterMode ? 'MODE RECRUTEUR ON' : t.recruiterMode}
                </button>
                <span className="text-xs text-white/60">
                  {lang === 'fr' ? 'Version 60 secondes pour recruteur' : '60-second recruiter view'}
                </span>
              </div>
            </div>

            <div className="mt-14 grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4" style={{ perspective: '1400px' }}>
              {heroTech.map((tech, index) => (
                <motion.div
                  key={tech}
                  className="rounded-2xl border border-white/20 bg-white/8 px-4 py-3 text-base font-semibold text-white shadow-[0_14px_40px_rgba(0,0,0,0.25)] backdrop-blur-md"
                  animate={isMobile || prefersReducedMotion ? { y: 0 } : { y: [0, -3, 0] }}
                  transition={isMobile || prefersReducedMotion ? { duration: 0 } : { duration: 3.8 + index * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={isMobile ? { scale: 1.01 } : { scale: 1.05, rotateX: -8, rotateY: 8, y: -6 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <TechPill label={tech} className="bg-transparent p-0 text-base font-semibold text-white" />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 grid w-full gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {localizedStats.map((stat) => (
                <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-md">
                  <div className="text-3xl font-black text-white">{stat.value}</div>
                  <div className="mt-2 text-sm text-white/75">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-10 grid w-full gap-4 md:grid-cols-3">
              {localizedSignals.map((signal, index) => (
                <motion.div
                  key={signal.title}
                  className="interactive-glow rounded-2xl border border-white/15 bg-white/8 p-5 text-left backdrop-blur-md"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.45, delay: index * 0.09 }}
                  whileHover={isMobile ? { y: -2 } : { y: -6, rotateX: -5, rotateY: 6 }}
                  onMouseMove={handleGlowMove}
                  onMouseLeave={handleGlowLeave}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <h3 className="text-lg font-semibold text-white">{signal.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/75">{signal.text}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="interactive-glow mt-12 w-full rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-500/20 via-teal-500/10 to-amber-400/20 p-6 text-left shadow-[0_22px_70px_rgba(0,0,0,0.25)] backdrop-blur-md"
              onMouseMove={handleGlowMove}
              onMouseLeave={handleGlowLeave}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/90">{t.recruiterSnapshotKicker}</p>
              <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">{t.recruiterSnapshotTitle}</h2>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {t.recruiterSnapshotCards.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/85">
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <a
                  href={calendlyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5"
                >
                  <Phone size={16} />
                  {t.recruiterSnapshotCta}
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-10 w-full rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-left shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-5"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/90">{t.terminalKicker}</p>
                  <h3 className="mt-1 text-lg font-semibold text-white sm:text-xl">{t.terminalTitle}</h3>
                </div>
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold text-white/75">
                  {t.terminalHint}
                </span>
              </div>
              <p className="mb-2 text-[11px] text-white/55">
                {lang === 'fr' ? 'Astuce: tape mode recruteur on/off ou utilise le bouton RM en haut.' : 'Tip: type mode recruiter on/off or use the RM button in header.'}
              </p>

              <div className="rounded-2xl border border-white/10 bg-[#05070f]">
                <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs text-white/50">zsh - /portfolio-amine</span>
                </div>

                <div ref={terminalRef} className="terminal-scroll max-h-64 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-6 sm:text-sm">
                  {terminalLines.map((line, index) => (
                    <div key={`${line}-${index}`} className={line.startsWith('$') ? 'text-cyan-300' : 'text-white/80'}>
                      {line}
                    </div>
                  ))}
                  <div className="terminal-caret mt-1 text-cyan-200">_</div>
                </div>

                <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 border-t border-white/10 px-4 py-3 font-mono text-[13px] sm:text-sm">
                  <span className="shrink-0 text-cyan-300">{terminalCwd} $</span>
                  <input
                    value={terminalInput}
                    onChange={(event) => setTerminalInput(event.target.value)}
                    className="w-full bg-transparent text-white/90 outline-none placeholder:text-white/40"
                    placeholder={t.terminalPlaceholder}
                  />
                </form>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {!recruiterMode && (
        <motion.section id="about" className="section-reveal px-4 py-20 sm:px-6 lg:px-8" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55 }}>
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <div className="mb-4 text-sm uppercase tracking-[0.35em] text-cyan-300">{t.aboutKicker}</div>
              <h2 className="text-4xl font-bold text-white sm:text-5xl">{pt.aboutTitle}</h2>
              <p className="mt-6 text-lg leading-8 text-white/80">
                {pt.aboutText}
              </p>
              <div className="mt-6 space-y-4 text-base text-white/80">
                <div className="flex items-start gap-3"><Target size={18} className="mt-1 text-cyan-300" /> {pt.aboutBullets[0]}</div>
                <div className="flex items-start gap-3"><Brain size={18} className="mt-1 text-cyan-300" /> {pt.aboutBullets[1]}</div>
                <div className="flex items-start gap-3"><Database size={18} className="mt-1 text-cyan-300" /> {pt.aboutBullets[2]}</div>
                <div className="flex items-start gap-3"><Phone size={18} className="mt-1 text-cyan-300" /> {pt.aboutBullets[3]}</div>
              </div>
              <div className="mt-8 flex gap-4">
                <button onClick={downloadCV} className="rounded-full border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10">
                  {pt.downloadCv}
                </button>
                <a href={`mailto:aminemoumni61@gmail.com`} className="rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:-translate-y-0.5">
                  {t.openDiscussion}
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-md">
                <User className="text-cyan-300" size={22} />
                <h3 className="mt-4 text-xl font-semibold text-white">{t.propositionTitle}</h3>
                <p className="mt-3 text-base leading-7 text-white/70">{t.propositionText}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-md">
                <Mail className="text-cyan-300" size={22} />
                <h3 className="mt-4 text-xl font-semibold text-white">{t.findHereTitle}</h3>
                <p className="mt-3 text-base leading-7 text-white/70">{t.findHereText}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-md sm:col-span-2">
                <Sparkles className="text-cyan-300" size={22} />
                <h3 className="mt-4 text-xl font-semibold text-white">{t.objectiveTitle}</h3>
                <p className="mt-3 text-sm leading-6 text-white/70">{t.objectiveText}</p>
              </div>
            </div>
          </div>
        </motion.section>
        )}

        {!recruiterMode && (
        <motion.section id="experience" className="section-reveal px-4 py-20 sm:px-6 lg:px-8" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55 }}>
          <div className="mx-auto max-w-5xl">
            <div className="mb-4 text-sm uppercase tracking-[0.35em] text-cyan-300">{t.expKicker}</div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">{t.expTitle}</h2>
            <div className="timeline-rail mt-10">
              {localizedExperience.map((item, index) => (
                <motion.div
                  key={`${item.company}-${item.period}`}
                  className="timeline-item interactive-glow rounded-3xl border border-white/10 bg-white/6 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.2)] backdrop-blur-md"
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  whileHover={isMobile ? { y: -3 } : { y: -8 }}
                  onMouseMove={handleGlowMove}
                  onMouseLeave={handleGlowLeave}
                >
                  <span className="timeline-dot" />
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-lg font-semibold text-white">{item.company}</div>
                      <div className="mt-1 text-sm text-cyan-200/80">{item.role}</div>
                      {'contract' in item && item.contract ? <div className="mt-1 text-xs text-white/60">{item.contract}</div> : null}
                    </div>
                    <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">
                      {item.period}
                    </div>
                  </div>
                  {'location' in item && item.location ? <p className="mt-3 text-xs text-white/60">{item.location}</p> : null}
                  <p className="mt-4 text-sm leading-6 text-white/75">{item.description}</p>
                  {'missions' in item && Array.isArray(item.missions) ? (
                    <ul className="mt-4 space-y-1 text-sm text-white/75">
                      {item.missions.map((mission: string) => (
                        <li key={mission}>• {mission}</li>
                      ))}
                    </ul>
                  ) : null}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.technologies.map((technology) => (
                      <TechPill key={technology} label={technology} className="bg-white/8 text-white/75" />
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.impact.map((impactItem) => (
                      <span key={impactItem} className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-100">
                        {t.impactLabel}: {impactItem}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
        )}

        <motion.section id="projects" className="section-reveal px-4 py-20 sm:px-6 lg:px-8" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55 }}>
          <div className="mx-auto max-w-7xl">
            <div className="mb-4 text-sm uppercase tracking-[0.35em] text-cyan-300">{t.projectsKicker}</div>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">{t.projectsTitle}</h2>
              <a href={githubPortfolioRepo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-cyan-100">
                {t.portfolioRepo} <ExternalLink size={16} />
              </a>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {localizedFeaturedProjects.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} labels={{ repo: t.projectRepoCta, demo: t.projectDemoCta }} />
              ))}
            </div>

            <div className="interactive-glow mt-10 rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-500/15 via-teal-500/10 to-amber-400/15 p-6 shadow-[0_22px_70px_rgba(0,0,0,0.25)] backdrop-blur-md md:p-8">
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/90">{t.caseStudyKicker}</div>
              <h3 className="mt-3 max-w-4xl text-2xl font-bold text-white md:text-3xl">{t.caseStudyTitle}</h3>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">{t.caseStudyChallengeLabel}</p>
                  <p className="mt-2 text-sm leading-6 text-white/80">{t.caseStudyChallenge}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">{t.caseStudySolutionLabel}</p>
                  <p className="mt-2 text-sm leading-6 text-white/80">{t.caseStudySolution}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">{t.caseStudyImpactLabel}</p>
                  <p className="mt-2 text-sm leading-6 text-white/80">{t.caseStudyImpact}</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {t.caseStudyMetrics.map((metric) => (
                  <span key={metric} className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-100">
                    {metric}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {!recruiterMode && (
        <motion.section id="github-projects" className="section-reveal px-4 py-20 sm:px-6 lg:px-8" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55 }}>
          <div className="mx-auto max-w-7xl">
            <div className="mb-4 text-sm uppercase tracking-[0.35em] text-cyan-300">{t.githubKicker}</div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">{t.githubTitle}</h2>
            <p className="mt-4 max-w-3xl text-white/75">{t.githubText}</p>
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {localizedGithubProjects.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index + 3} compact labels={{ repo: t.projectRepoCta, demo: t.projectDemoCta }} />
              ))}
            </div>
          </div>
        </motion.section>
        )}

        {!recruiterMode && (
        <motion.section id="skills" className="section-reveal px-4 py-20 sm:px-6 lg:px-8" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55 }}>
          <div className="mx-auto max-w-7xl">
            <div className="mb-4 text-sm uppercase tracking-[0.35em] text-cyan-300">{t.skillsKicker}</div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">{t.skillsTitle}</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
              {Object.entries(skills).map(([category, values]) => (
                <motion.div
                  key={category}
                  className="interactive-glow rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45 }}
                  whileHover={isMobile ? { y: -3, scale: 1.01 } : { y: -8, rotateX: -8, rotateY: 7, scale: 1.02 }}
                  onMouseMove={handleGlowMove}
                  onMouseLeave={handleGlowLeave}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <h3 className="text-lg font-semibold text-white">{category}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {values.map((value) => (
                      <motion.div
                        key={value}
                        className="inline-block"
                        whileHover={{ y: -4, scale: 1.08, rotateX: 12 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <TechPill label={value} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
        )}

        <motion.section id="code-quality" className="section-reveal px-4 py-20 sm:px-6 lg:px-8" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55 }}>
          <div className="mx-auto max-w-7xl">
            <div className="mb-4 text-sm uppercase tracking-[0.35em] text-cyan-300">{t.codeQualityKicker}</div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">{t.codeQualityTitle}</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {t.codeQualityCards.map((card) => (
                <div key={card.title} className="interactive-glow rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-md">
                  <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/75">{card.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <div className="mb-4 text-sm uppercase tracking-[0.35em] text-cyan-300">{t.deliveryKicker}</div>
              <h3 className="text-2xl font-bold text-white sm:text-3xl">{t.deliveryTitle}</h3>
              <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {t.deliveryCards.map((card) => (
                  <div key={card.title} className="interactive-glow rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-md">
                    <h4 className="text-lg font-semibold text-white">{card.title}</h4>
                    <p className="mt-3 text-sm leading-6 text-white/75">{card.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {!recruiterMode && (
        <motion.section id="education" className="section-reveal px-4 py-20 sm:px-6 lg:px-8" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55 }}>
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <div className="mb-4 text-sm uppercase tracking-[0.35em] text-cyan-300">{t.educationKicker}</div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">{t.educationTitle}</h2>
              <div className="mt-8 space-y-4">
                {localizedEducation.map((item) => (
                  <div key={`${item.degree}-${item.period}`} className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-md">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{item.degree}</h3>
                        <p className="mt-1 text-sm text-cyan-200/80">{item.school}</p>
                        {item.status && <p className="mt-2 text-sm text-emerald-200">{item.status}</p>}
                      </div>
                      <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">{item.period}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-md">
                <Award className="text-cyan-300" size={22} />
                <div className="mt-4 flex items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold text-white">{t.certTitle}</h3>
                  <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                    {filteredCertifications.length} / {certifications.length}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {certificationCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCertificationCategory(category);
                        setShowAllCertifications(false);
                      }}
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                        selectedCertificationCategory === category
                          ? 'bg-cyan-400 text-slate-950'
                          : 'border border-white/15 bg-white/5 text-white/80 hover:bg-white/10'
                      }`}
                    >
                      {categoryLabel[category]}
                    </button>
                  ))}
                </div>

                <div className="mt-4 max-h-96 space-y-3 overflow-y-auto pr-1">
                  {visibleCertifications.map((certification, index) => (
                    <motion.a
                      key={certification.file}
                      href={`/certif/${encodeURIComponent(certification.file)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="interactive-glow flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition hover:bg-white/10"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ duration: 0.35, delay: index * 0.04 }}
                      whileHover={{ y: -3, scale: 1.01 }}
                      onMouseMove={handleGlowMove}
                      onMouseLeave={handleGlowLeave}
                    >
                      <span className="line-clamp-2">{certification.title}</span>
                      <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-2 py-0.5 text-[10px] font-semibold text-cyan-200">
                        {certification.category}
                      </span>
                      <ExternalLink size={15} className="shrink-0 text-cyan-300" />
                    </motion.a>
                  ))}
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setShowAllCertifications((current) => !current)}
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
                  >
                    {showAllCertifications ? t.certReduce : `${t.certShowMore} (${Math.max(filteredCertifications.length - visibleCertifications.length, 0)})`}
                  </button>
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-400/10 to-violet-500/10 p-6 backdrop-blur-md">
                <Heart className="text-pink-300" size={22} />
                <h3 className="mt-4 text-xl font-semibold text-white">{t.positioningTitle}</h3>
                <p className="mt-3 text-sm leading-6 text-white/75">
                  {t.positioningText}
                </p>
              </div>
            </div>
          </div>
        </motion.section>
        )}

        <motion.section id="contact" className="section-reveal px-4 py-20 sm:px-6 lg:px-8" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55 }}>
          <div className="mx-auto max-w-7xl">
            <div className="mb-4 text-sm uppercase tracking-[0.35em] text-cyan-300">{t.contactKicker}</div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">{t.contactTitle}</h2>

            <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-md">
                <h3 className="text-xl font-semibold text-white">{t.detailsTitle}</h3>
                <div className="mt-6 space-y-4 text-white/80">
                  <div className="flex items-center gap-3"><Mail size={18} className="text-cyan-300" /> aminemoumni61@gmail.com</div>
                  <div className="flex items-center gap-3"><Phone size={18} className="text-cyan-300" /> +33 631 908 979</div>
                  <div className="flex items-center gap-3"><MapPin size={18} className="text-cyan-300" /> Antibes, France</div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={githubProfile} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                    <Github size={16} /> GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/mohamed-amine-moumeni-598699209/?locale=ar_AE" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                    <ExternalLink size={16} /> LinkedIn
                  </a>
                </div>

                <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4">
                  <h4 className="text-sm font-semibold text-amber-100">{t.backupContactTitle}</h4>
                  <p className="mt-2 text-xs text-white/80">{t.backupContactText}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a href="tel:+33631908979" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10">
                      <Phone size={14} /> {t.callNow}
                    </a>
                    <a href="mailto:aminemoumni61@gmail.com" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10">
                      <Mail size={14} /> {t.sendEmail}
                    </a>
                    <a href={calendlyLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-2 text-xs font-semibold text-cyan-100 hover:bg-cyan-300/20">
                      <Phone size={14} /> {t.calendlyCta}
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-md">
                <form onSubmit={handleSubmit} className="grid gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/75">{t.fullName}</label>
                    <input
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                      placeholder={t.fullNamePlaceholder}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/75">{t.email}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                      placeholder={t.emailPlaceholder}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/75">{t.subject}</label>
                    <input
                      name="sujet"
                      value={formData.sujet}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                      placeholder={t.subjectPlaceholder}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/75">{t.message}</label>
                    <textarea
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="w-full resize-none rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                      placeholder={t.messagePlaceholder}
                    />
                  </div>

                  {submitStatus === 'success' && (
                    <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                      {t.success}
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                      {t.error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <Send size={16} />
                    {isSubmitting ? t.sending : t.send}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950/80 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <p>Mohamed Amine Moumeni</p>
          <div className="flex items-center gap-4">
            <a href={githubProfile} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/mohamed-amine-moumeni-598699209/?locale=ar_AE" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              LinkedIn
            </a>
            <button onClick={downloadCV} className="hover:text-white">
              CV
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}