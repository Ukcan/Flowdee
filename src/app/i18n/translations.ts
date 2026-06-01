export type Language = 'fr' | 'en';

export interface Translations {
  // Navigation
  nav: {
    services: string;
    caseStudies: string;
    about: string;
    contact: string;
    bookCall: string;
  };

  // Hero Section
  hero: {
    badge: string;
    title: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };

  // Services Section
  services: {
    title: string;
    timeline: {
      audit: string;
      sprint: string;
      partner: string;
    };
    cardTitle: {
      audit: string;
      sprint: string;
      partner: string;
    };
    price: {
      auditFrom: string;
      sprintFrom: string;
      partnerQuote: string;
    };
    deliverables: {
      auditHeuristic: string;
      backlogPriority: string;
      correctiveMockups: string;
      qaChecklist: string;
      discoveryLight: string;
      userFlowsPrototype: string;
      rapidTests: string;
      uiHandoff: string;
      continuousIterations: string;
      abTests: string;
      designSystem: string;
      designOps: string;
    };
    ctaQuote: string;
  };

  // Problem Cards Section
  problems: {
    title: string;
    cards: {
      onboarding: {
        title: string;
        description: string;
      };
      funnel: {
        title: string;
        description: string;
      };
      debt: {
        title: string;
        description: string;
      };
      support: {
        title: string;
        description: string;
      };
    };
  };

  // Case Studies Section
  caseStudies: {
    title: string;
    tags: {
      saasB2B: string;
      ecommerce: string;
      saasB2C: string;
    };
    metrics: {
      activationIncrease: string;
      dropOffReduction: string;
      conversionIncrease: string;
      cartAbandonmentReduction: string;
      engagementIncrease: string;
      supportReduction: string;
    };
    deliverables: {
      heuristicAudit: string;
      figmaPrototype: string;
      userTesting: string;
      uiSpecs: string;
      userFlowMapping: string;
      abTestingProtocol: string;
      checkoutRedesign: string;
      mobileOptimization: string;
      informationArchitecture: string;
      dataVisualization: string;
      designSystem: string;
      componentLibrary: string;
    };
    iaNote: {
      case1: string;
      case2: string;
      case3: string;
    };
    cta: string;
    detailPanel: {
      keyResults: string;
      challenge: string;
      solution: string;
      detailedResults: string;
      timeline: string;
      toolsUsed: string;
      similarProject: string;
      bookFreeCall: string;
    };
    case1: {
      title: string;
      description: string;
      challenge: string;
      solution: string;
      results: string[];
      timeline: string;
    };
    case2: {
      title: string;
      description: string;
      challenge: string;
      solution: string;
      results: string[];
      timeline: string;
    };
    case3: {
      title: string;
      description: string;
      challenge: string;
      solution: string;
      results: string[];
      timeline: string;
    };
  };

  // About Section
  about: {
    title: string;
    description: string;
    highlights: {
      expertise: {
        title: string;
        description: string;
      };
      ai: {
        title: string;
        description: string;
      };
      collaborative: {
        title: string;
        description: string;
      };
      results: {
        title: string;
        description: string;
      };
    };
    mission: {
      title: string;
      description: string;
    };
  };

  // Contact Section (from ContactCard)
  contact: {
    title: string;
    name: string;
    email: string;
    message: string;
    placeholders: {
      name: string;
      email: string;
      message: string;
    };
    ctaSend: string;
    successTitle: string;
    successMessage: string;
    reachDirect: string;
  };

  // FAQ Section
  faq: {
    title: string;
    questions: {
      q1: {
        question: string;
        answer: string;
      };
      q2: {
        question: string;
        answer: string;
      };
      q3: {
        question: string;
        answer: string;
      };
      q4: {
        question: string;
        answer: string;
      };
      q5: {
        question: string;
        answer: string;
      };
    };
  };

  // Footer
  footer: {
    tagline: string;
    navigation: string;
    followMe: string;
    copyright: string;
  };

  // Trusted Clients Section
  trustedClients: {
    subtitle: string;
    title: string;
    badge: string;
  };

  // Aria Labels
  aria: {
    mainNav: string;
    heroSection: string;
    servicePackages: string;
    problemsSection: string;
    caseStudiesSection: string;
    aboutSection: string;
    faqSection: string;
    footerNav: string;
    switchToLight: string;
    switchToDark: string;
    switchToFrench: string;
    switchToEnglish: string;
    languageSelector: string;
    navigateTo: string;
    bookCall: string;
    closeMenu: string;
    openMenu: string;
    closePanel: string;
    sendMessage: string;
  };

  // Cookies
  cookies: {
    badge: string;
    title: string;
    description: string;
    acceptAll: string;
    refuseAll: string;
    settings: string;
    save: string;
    essential: {
      title: string;
      description: string;
    };
    analytics: {
      title: string;
      description: string;
    };
    marketing: {
      title: string;
      description: string;
    };
  };
}

export const translations: Record<Language, Translations> = {
  fr: {
    nav: {
      services: 'Services',
      caseStudies: 'Réalisations',
      about: 'À propos',
      contact: 'Contact',
      bookCall: 'Réserver un appel',
    },

    hero: {
      badge: 'UX/UI Design & IA',
      title: 'Chez Flowdee on améliore la conversion et activation via UX/UI testable — accéléré par l\'IA, sans sacrifier la qualité.',
      description: 'De l\'audit au prototype testé : je résous les frictions d\'onboarding, checkout, dashboards. L\'IA accélère les tâches répétitives, je garde le jugement UX.',
      ctaPrimary: 'Réserver un appel (20 min)',
      ctaSecondary: 'Case studies',
    },

    services: {
      title: '3 formats pour chaque phase',
      timeline: {
        audit: '72h–5 jours',
        sprint: '1–3 semaines',
        partner: 'Mensuel',
      },
      cardTitle: {
        audit: 'Audit & Quick Wins',
        sprint: 'Sprint Design',
        partner: 'Design Partner',
      },
      price: {
        auditFrom: 'À partir de 279€',
        sprintFrom: 'À partir de 2 500€',
        partnerQuote: 'Sur devis',
      },
      deliverables: {
        auditHeuristic: 'Audit heuristique + a11y',
        backlogPriority: 'Backlog priorisé (impact/effort)',
        correctiveMockups: 'Maquettes correctives',
        qaChecklist: 'Checklist QA',
        discoveryLight: 'Discovery light',
        userFlowsPrototype: 'User flows + prototype',
        rapidTests: 'Tests rapides',
        uiHandoff: 'UI + specs handoff',
        continuousIterations: 'Itérations continues',
        abTests: 'A/B tests',
        designSystem: 'Design System',
        designOps: 'DesignOps',
      },
      ctaQuote: 'Demander un devis',
    },

    problems: {
      title: 'Vos frictions en 4 points',
      cards: {
        onboarding: {
          title: 'Onboarding qui décroche',
          description: 'Les utilisateurs abandonnent dès les premières étapes, ne comprenant pas la valeur du produit.',
        },
        funnel: {
          title: 'Tunnel trop long',
          description: 'Le parcours d\'achat ou d\'inscription comporte trop d\'étapes et freine la conversion.',
        },
        debt: {
          title: 'Dette UI',
          description: 'Interface incohérente, composants fragmentés, expérience utilisateur désorganisée.',
        },
        support: {
          title: 'Support submergé',
          description: 'Les mêmes questions reviennent sans cesse, signe d\'une UX peu claire ou mal conçue.',
        },
      },
    },

    caseStudies: {
      title: 'Cas clients récents',
      tags: {
        saasB2B: 'SaaS B2B',
        ecommerce: 'E-commerce',
        saasB2C: 'SaaS B2C',
      },
      metrics: {
        activationIncrease: '+40% activation',
        dropOffReduction: '-25% drop-off',
        conversionIncrease: '+32% conversion',
        cartAbandonmentReduction: '-18% abandon panier',
        engagementIncrease: '+55% engagement',
        supportReduction: '-40% questions support',
      },
      deliverables: {
        heuristicAudit: 'Audit heuristique',
        figmaPrototype: 'Prototype Figma',
        userTesting: 'Tests utilisateurs',
        uiSpecs: 'UI specs',
        userFlowMapping: 'User flow mapping',
        abTestingProtocol: 'A/B testing protocol',
        checkoutRedesign: 'Checkout redesign',
        mobileOptimization: 'Mobile optimization',
        informationArchitecture: 'Information architecture',
        dataVisualization: 'Data visualization',
        designSystem: 'Design system',
        componentLibrary: 'Component library',
      },
      iaNote: {
        case1: 'IA : synthèse de 12 interviews + variantes CTA',
        case2: 'IA : analyse 500+ sessions + états d\'erreur',
        case3: 'IA : structuration des métriques + tooltips',
      },
      cta: 'Voir le cas détaillé',
      detailPanel: {
        keyResults: 'Résultats clés',
        challenge: 'Le défi',
        solution: 'La solution',
        detailedResults: 'Résultats détaillés',
        timeline: 'Timeline',
        toolsUsed: 'Outils utilisés',
        similarProject: 'Un projet similaire en tête ?',
        bookFreeCall: 'Réserver un appel gratuit',
      },
      case1: {
        title: 'Réduction de 40% du temps d\'activation',
        description: 'Un SaaS B2B de gestion de projet rencontrait un taux d\'abandon élevé pendant l\'onboarding. L\'objectif était de simplifier le parcours d\'activation pour permettre aux nouveaux utilisateurs de créer leur premier projet en moins de 5 minutes.',
        challenge: 'Les utilisateurs abandonnaient face à un formulaire complexe de 8 étapes avec des champs techniques difficiles à comprendre.',
        solution: 'Simplification du parcours à 3 étapes essentielles, ajout de templates pré-configurés, et création d\'un assistant guidé avec des tooltips contextuels générés par IA.',
        results: [
          'Temps d\'activation réduit de 12 à 7 minutes',
          'Taux de complétion passé de 45% à 85%',
          'Drop-off réduit de 25%',
          '40% d\'augmentation des comptes actifs',
        ],
        timeline: '6 semaines',
      },
      case2: {
        title: 'Optimisation du tunnel d\'achat',
        description: 'Une plateforme e-commerce mode souffrait d\'un taux d\'abandon panier élevé, particulièrement sur mobile. L\'analyse des sessions utilisateurs a révélé des frictions majeures dans le processus de paiement.',
        challenge: 'Le tunnel d\'achat comportait 5 pages avec de nombreux champs obligatoires, causant 68% d\'abandon sur mobile.',
        solution: 'Refonte complète en checkout one-page, auto-complétion intelligente des adresses, intégration Apple Pay/Google Pay, et réassurance dynamique (stock, livraison, sécurité).',
        results: [
          'Conversion mobile passée de 1.8% à 2.4%',
          'Abandon panier réduit de 68% à 50%',
          'Temps de checkout réduit de 4min à 1min30',
          '+470K€ de revenus mensuels additionnels',
        ],
        timeline: '8 semaines',
      },
      case3: {
        title: 'Refonte dashboard analytics',
        description: 'Une application de suivi fitness présentait un dashboard surchargé qui rendait difficile la compréhension des données personnelles. Les utilisateurs contactaient fréquemment le support pour interpréter leurs statistiques.',
        challenge: 'Interface dense avec 40+ métriques affichées simultanément, pas de hiérarchie visuelle, graphiques peu lisibles, absence de guidance.',
        solution: 'Réorganisation en 3 vues (Vue d\'ensemble, Progression, Détails), priorisation des 5 métriques clés, visualisations simplifiées avec tooltips contextuels IA, et système de recommandations personnalisées.',
        results: [
          'Temps passé sur le dashboard +55%',
          'Questions support réduites de 40%',
          'Taux de rétention J30 passé de 32% à 51%',
          'NPS augmenté de 28 à 47',
        ],
        timeline: '10 semaines',
      },
    },

    about: {
      title: 'Une approche design,\nune vision stratégique',
      description: 'J\'aide les fondateurs de startups et product managers à concevoir des expériences utilisateur exceptionnelles, en intégrant l\'intelligence artificielle pour créer des workflows plus efficaces et intuitifs.',
      highlights: {
        expertise: {
          title: 'Expertise UX/UI',
          description: 'Plus de 10 ans d\'expérience dans la conception d\'interfaces centrées utilisateur',
        },
        ai: {
          title: 'IA & Automation',
          description: 'Spécialiste des workflows augmentés par l\'intelligence artificielle',
        },
        collaborative: {
          title: 'Approche collaborative',
          description: 'Design Partner pour startups et scale-ups ambitieuses',
        },
        results: {
          title: 'Résultats mesurables',
          description: 'Focus on l\'impact business et la valeur utilisateur',
        },
      },
      mission: {
        title: 'Ma mission',
        description: 'Transformer vos idées en produits digitaux performants, en combinant excellence en design, expertise technique et compréhension approfondie des besoins utilisateurs. Mon objectif : accélérer votre time-to-market tout en garantissant une expérience utilisateur exceptionnelle.',
      },
    },

    contact: {
      title: 'Get In Touch',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      placeholders: {
        name: 'Your name',
        email: 'your@email.com',
        message: 'Tell me about your project...',
      },
      ctaSend: 'Send Message',
      successTitle: 'Message Sent!',
      successMessage: 'Thanks for reaching out. I\'ll get back to you soon!',
      reachDirect: 'Or reach me directly at',
    },

    faq: {
      title: 'Questions fréquentes',
      questions: {
        q1: {
          question: 'Quels sont vos délais de livraison ?',
          answer: 'Cela dépend du format choisi. Un audit & quick wins prend 72h à 5 jours, un sprint design 1 à 3 semaines, et le design partner est un engagement mensuel. Nous communiquons toujours clairement les délais dès le début du projet et nous nous engageons à les respecter.',
        },
        q2: {
          question: 'Comment garantissez-vous la confidentialité ?',
          answer: 'Nous signons systématiquement un NDA avant tout projet. Toutes les données restent confidentielles, aucune donnée client n\'est exposée à des outils tiers sans accord préalable, et nous respectons scrupuleusement le RGPD. La confidentialité est une priorité absolue chez Flowdee.',
        },
        q3: {
          question: 'Travaillez-vous en remote ou sur site ?',
          answer: 'Nous travaillons principalement en remote, ce qui nous permet d\'être flexibles et de collaborer avec des clients partout en France et à l\'international. Pour certains projets stratégiques, we can travel occasionally for workshops or in-person work sessions.',
        },
        q4: {
          question: 'Quelle est votre stack d\'outils ?',
          answer: 'Nous utilisons principalement Figma pour le design et le prototypage, Notion pour la documentation, Miro pour les workshops collaboratifs, et des outils d\'IA comme Claude ou ChatGPT pour accélérer certaines tâches (toujours avec validation manuelle). Pour les tests utilisateurs, nous utilisons Maze ou UserTesting selon les besoins.',
        },
        q5: {
          question: 'Proposez-vous du développement ou uniquement du design ?',
          answer: 'Nous nous concentrons sur le design UX/UI et ne codons pas en production. Cependant, nous avons de solides connaissances techniques qui nous permettent de créer des specs détaillées et de collaborer efficacement avec les équipes de développement. Nous pouvons également créer des prototypes interactifs avancés dans Figma.',
        },
      },
    },

    footer: {
      tagline: 'UX/UI Design & IA — J\'améliore activation et conversion via UX/UI testable.',
      navigation: 'Navigation',
      followMe: 'Suivez-moi',
      copyright: '© 2026 Flowdee. Tous droits réservés.',
    },

    trustedClients: {
      subtitle: 'Nos clients de confiance',
      title: 'Entreprises qui ont fait confiance à Flowdee',
      badge: 'Client vérifié',
    },

    aria: {
      mainNav: 'Main navigation',
      heroSection: 'Hero section',
      servicePackages: 'Service packages',
      problemsSection: 'Problems we solve',
      caseStudiesSection: 'Recent client cases',
      aboutSection: 'About Flowdee',
      faqSection: 'Frequently asked questions',
      footerNav: 'Footer navigation',
      switchToLight: 'Switch to light mode',
      switchToDark: 'Switch to dark mode',
      switchToFrench: 'Switch to French',
      switchToEnglish: 'Switch to English',
      languageSelector: 'Language selector',
      navigateTo: 'Navigate to',
      bookCall: 'Book a call',
      closeMenu: 'Close menu',
      openMenu: 'Open menu',
      closePanel: 'Close panel',
      sendMessage: 'Send message',
    },

    cookies: {
      badge: 'Confidentialité d\'abord',
      title: 'Politique des cookies',
      description: 'Nous utilisons des cookies pour améliorer votre expérience et analyser notre trafic.',
      acceptAll: 'Tout accepter',
      refuseAll: 'Tout refuser',
      settings: 'Paramétrer',
      save: 'Enregistrer les préférences',
      essential: {
        title: 'Essentiels',
        description: 'Nécessaires au bon fonctionnement du site. Ne peuvent pas être désactivés.',
      },
      analytics: {
        title: 'Analytiques',
        description: 'Nous aident à comprendre comment les visiteurs interagissent avec le site.',
      },
      marketing: {
        title: 'Marketing',
        description: 'Utilisés pour suivre les visiteurs sur les sites web afin de proposer des publicités pertinentes.',
      },
    },
  },

  en: {
    nav: {
      services: 'Services',
      caseStudies: 'Case Studies',
      about: 'About',
      contact: 'Contact',
      bookCall: 'Book a Call',
    },

    hero: {
      badge: 'UX/UI Design × AI',
      title: 'At Flowdee we improve conversion & activation with testable UX/UI — AI-accelerated, without sacrificing quality.',
      description: 'From audit to tested prototype: I solve onboarding, checkout, and dashboard frictions. AI speeds up repetitive tasks, I keep the UX judgment.',
      ctaPrimary: 'Book 20 min',
      ctaSecondary: 'Case studies',
    },

    services: {
      title: '3 formats for every phase',
      timeline: {
        audit: '72h–5 days',
        sprint: '1–3 weeks',
        partner: 'Monthly',
      },
      cardTitle: {
        audit: 'Audit & Quick Wins',
        sprint: 'Design Sprint',
        partner: 'Design Partner',
      },
      price: {
        auditFrom: 'From €279',
        sprintFrom: 'From €2,500',
        partnerQuote: 'Custom quote',
      },
      deliverables: {
        auditHeuristic: 'Heuristic + a11y audit',
        backlogPriority: 'Prioritized backlog (impact/effort)',
        correctiveMockups: 'Corrective mockups',
        qaChecklist: 'QA checklist',
        discoveryLight: 'Light discovery',
        userFlowsPrototype: 'User flows + prototype',
        rapidTests: 'Rapid tests',
        uiHandoff: 'UI + specs handoff',
        continuousIterations: 'Continuous iterations',
        abTests: 'A/B tests',
        designSystem: 'Design System',
        designOps: 'DesignOps',
      },
      ctaQuote: 'Request a quote',
    },

    problems: {
      title: 'Your frictions in 4 points',
      cards: {
        onboarding: {
          title: 'Dropping onboarding',
          description: 'Users abandon in the first steps, not understanding the product value.',
        },
        funnel: {
          title: 'Funnel too long',
          description: 'The purchase or signup journey has too many steps and slows conversion.',
        },
        debt: {
          title: 'UI debt',
          description: 'Inconsistent interface, fragmented components, disorganized user experience.',
        },
        support: {
          title: 'Overwhelmed support',
          description: 'Same questions keep coming back, sign of unclear or poorly designed UX.',
        },
      },
    },

    caseStudies: {
      title: 'Recent client cases',
      tags: {
        saasB2B: 'SaaS B2B',
        ecommerce: 'E-commerce',
        saasB2C: 'SaaS B2C',
      },
      metrics: {
        activationIncrease: '+40% activation',
        dropOffReduction: '-25% drop-off',
        conversionIncrease: '+32% conversion',
        cartAbandonmentReduction: '-18% cart abandon',
        engagementIncrease: '+55% engagement',
        supportReduction: '-40% support questions',
      },
      deliverables: {
        heuristicAudit: 'Heuristic audit',
        figmaPrototype: 'Figma prototype',
        userTesting: 'User testing',
        uiSpecs: 'UI specs',
        userFlowMapping: 'User flow mapping',
        abTestingProtocol: 'A/B testing protocol',
        checkoutRedesign: 'Checkout redesign',
        mobileOptimization: 'Mobile optimization',
        informationArchitecture: 'Information architecture',
        dataVisualization: 'Data visualization',
        designSystem: 'Design system',
        componentLibrary: 'Component library',
      },
      iaNote: {
        case1: 'AI: synthesis of 12 interviews + CTA variants',
        case2: 'AI: analysis 500+ sessions + error states',
        case3: 'AI: metrics structuring + tooltips',
      },
      cta: 'View detailed case',
      detailPanel: {
        keyResults: 'Key results',
        challenge: 'The challenge',
        solution: 'The solution',
        detailedResults: 'Detailed results',
        timeline: 'Timeline',
        toolsUsed: 'Tools used',
        similarProject: 'Similar project in mind?',
        bookFreeCall: 'Book a free call',
      },
      case1: {
        title: '40% activation time reduction',
        description: 'A B2B SaaS project management tool had a high abandonment rate during onboarding. The goal was to simplify the activation journey to enable new users to create their first project in under 5 minutes.',
        challenge: 'Users abandoned when faced with a complex 8-step form with difficult-to-understand technical fields.',
        solution: 'Simplified journey to 3 essential steps, added pre-configured templates, and created a guided assistant with AI-generated contextual tooltips.',
        results: [
          'Activation time reduced from 12 to 7 minutes',
          'Completion rate went from 45% to 85%',
          'Drop-off reduced by 25%',
          '40% increase in active accounts',
        ],
        timeline: '6 weeks',
      },
      case2: {
        title: 'Purchase funnel optimization',
        description: 'A fashion e-commerce platform suffered from high cart abandonment, especially on mobile. User session analysis revealed major frictions in the payment process.',
        challenge: 'The purchase funnel had 5 pages with many required fields, causing 68% mobile abandonment.',
        solution: 'Complete redesign into one-page checkout, intelligent address auto-completion, Apple Pay/Google Pay integration, and dynamic reassurance (stock, delivery, security).',
        results: [
          'Mobile conversion went from 1.8% to 2.4%',
          'Cart abandonment reduced from 68% to 50%',
          'Checkout time reduced from 4min to 1min30',
          '+€470K additional monthly revenue',
        ],
        timeline: '8 weeks',
      },
      case3: {
        title: 'Analytics dashboard redesign',
        description: 'A fitness tracking app had an overloaded dashboard that made personal data difficult to understand. Users frequently contacted support to interpret their statistics.',
        challenge: 'Dense interface with 40+ metrics displayed simultaneously, no visual hierarchy, hard-to-read charts, lack of guidance.',
        solution: 'Reorganization into 3 views (Overview, Progress, Details), prioritization of 5 key metrics, simplified visualizations with AI contextual tooltips, and personalized recommendation system.',
        results: [
          'Time spent on dashboard +55%',
          'Support questions reduced by 40%',
          'D30 retention rate went from 32% to 51%',
          'NPS increased from 28 to 47',
        ],
        timeline: '10 weeks',
      },
    },

    about: {
      title: 'A design approach,\na strategic vision',
      description: 'I help startup founders and product managers design exceptional user experiences, integrating artificial intelligence to create more efficient and intuitive workflows.',
      highlights: {
        expertise: {
          title: 'UX/UI Expertise',
          description: '10+ years of experience designing user-centered interfaces',
        },
        ai: {
          title: 'AI & Automation',
          description: 'Specialist in AI-augmented workflows',
        },
        collaborative: {
          title: 'Collaborative approach',
          description: 'Design Partner for ambitious startups and scale-ups',
        },
        results: {
          title: 'Measurable results',
          description: 'Focus on business impact and user value',
        },
      },
      mission: {
        title: 'My mission',
        description: 'Transform your ideas into high-performing digital products, combining design excellence, technical expertise, and deep understanding of user needs. My goal: accelerate your time-to-market while ensuring an exceptional user experience.',
      },
    },

    contact: {
      title: 'Get In Touch',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      placeholders: {
        name: 'Your name',
        email: 'your@email.com',
        message: 'Tell me about your project...',
      },
      ctaSend: 'Send Message',
      successTitle: 'Message Sent!',
      successMessage: 'Thanks for reaching out. I\'ll get back to you soon!',
      reachDirect: 'Or reach me directly at',
    },

    faq: {
      title: 'Frequently asked questions',
      questions: {
        q1: {
          question: 'What are your delivery timelines?',
          answer: 'It depends on the chosen format. An audit & quick wins takes 72h to 5 days, a design sprint 1 to 3 weeks, and the design partner is a monthly engagement. We always communicate timelines clearly from the start and commit to meeting them.',
        },
        q2: {
          question: 'How do you ensure confidentiality?',
          answer: 'We systematically sign an NDA before any project. All data remains confidential, no client data is exposed to third-party tools without prior consent, and we strictly comply with GDPR. Confidentiality is an absolute priority at Flowdee.',
        },
        q3: {
          question: 'Do you work remotely or on-site?',
          answer: 'We work primarily remotely, which allows us to be flexible and collaborate with clients throughout France and internationally. For certain strategic projects, we can travel occasionally for workshops or in-person work sessions.',
        },
        q4: {
          question: 'What is your tool stack?',
          answer: 'We mainly use Figma for design and prototyping, Notion for documentation, Miro for collaborative workshops, and AI tools like Claude or ChatGPT to accelerate certain tasks (always with manual validation). For user testing, we use Maze or UserTesting depending on needs.',
        },
        q5: {
          question: 'Do you offer development or only design?',
          answer: 'We focus on UX/UI design and don\'t code in production. However, we have strong technical knowledge that allows us to create detailed specs and collaborate effectively with development teams. We can also create advanced interactive prototypes in Figma.',
        },
      },
    },

    footer: {
      tagline: 'UX/UI Design × AI\nI improve activation & conversion with testable UX/UI.',
      navigation: 'Navigation',
      followMe: 'Follow me',
      copyright: '© 2026 Flowdee. All rights reserved.',
    },

    trustedClients: {
      subtitle: 'Our trusted clients',
      title: 'Companies that have trusted Flowdee',
      badge: 'Verified client',
    },

    aria: {
      mainNav: 'Main navigation',
      heroSection: 'Hero section',
      servicePackages: 'Service packages',
      problemsSection: 'Problems we solve',
      caseStudiesSection: 'Recent client cases',
      aboutSection: 'About Flowdee',
      faqSection: 'Frequently asked questions',
      footerNav: 'Footer navigation',
      switchToLight: 'Switch to light mode',
      switchToDark: 'Switch to dark mode',
      switchToFrench: 'Switch to French',
      switchToEnglish: 'Switch to English',
      languageSelector: 'Language selector',
      navigateTo: 'Navigate to',
      bookCall: 'Book a call',
      closeMenu: 'Close menu',
      openMenu: 'Open menu',
      closePanel: 'Close panel',
      sendMessage: 'Send message',
    },

    cookies: {
      badge: 'Privacy First',
      title: 'Cookie Policy',
      description: 'We use cookies to improve your experience and analyze our traffic.',
      acceptAll: 'Accept All',
      refuseAll: 'Refuse All',
      settings: 'Settings',
      save: 'Save Preferences',
      essential: {
        title: 'Essential',
        description: 'Necessary for the site to function properly. Cannot be disabled.',
      },
      analytics: {
        title: 'Analytics',
        description: 'Help us understand how visitors interact with the site.',
      },
      marketing: {
        title: 'Marketing',
        description: 'Used to track visitors across websites to provide relevant ads.',
      },
    },
  },
};