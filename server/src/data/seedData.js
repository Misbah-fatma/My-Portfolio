export const seedData = {
  profile: {
    name: "Misbah Fatma",
    firstName: "Misbah",
    lastName: "Fatma",
    role: "Full-Stack Engineer",
    tagline:
      "I build scalable full-stack applications, data-driven platforms, and seamless digital experiences across modern web technologies.",
    location: "New Delhi, India",
    email: "misbah7370@gmail.com",
    phone: "+919169849066",
    availability: "Open to new opportunities",
    bio: [
      "I’m a Full-Stack Engineer experienced in building production-grade applications using React.js, Angular, Next.js, Node.js, Express.js, and MongoDB.",
      "My work spans vehicle marketplaces, training and certification platforms, analytics portals, e-commerce applications, LMS platforms, and AI-enabled products — with a focus on clean UI, reliable backend systems, authentication, integrations, and scalable workflows.",
    ],
    stats: [
      { label: "Years Experience", value: "01+" },
      { label: "Full-stack", value: "MERN" },
      { label: "Projects", value: "10+" },
      { label: "Publications", value: "02" },
    ],
    socials: [
      {
        label: "GitHub",
        href: "https://github.com/Misbah-fatma",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/misbah-fatma-b3b0b4310/",
      },
      {
        label: "Email",
        href: "mailto:misbah7370@gmail.com",
      },
    ],
    education: [
      {
        institution: "Jamia Hamdard",
        degree: "B.Tech in Computer Science & Engineering",
        period: "2019 — 2023",
        location: "New Delhi, India",
        grade: "CGPA: 8.4",
      },
      {
        institution: "St. Joseph's School",
        degree: "Intermediate — PCM",
        period: "2019",
        location: "Gorakhpur, Uttar Pradesh",
        grade: "",
      },
    ],
    publications: [
      {
        title:
          "Personalization and Filter Bubble in Google Search Results: An Empirical Investigation",
        venue: "Information Retrieval Journal",
        date: "17 April 2023",
      },
      {
        title: "A Bibliometric Analysis on Filter Bubble",
        venue: "IEEE Conference",
        date: "",
      },
    ],
  },

  projects: [
    {
      slug: "operational-management-system",
      title: "Operational Management System",
      category: "Enterprise Platform",
      year: "2026",
      summary:
        "A multi-module operational platform covering vehicle management, training, analytics, client management, authentication, payments, and reporting. Teams work from one surface instead of jumping between portals. Role-based access and automated PDFs keep day-to-day operations consistent.",
      description:
        "Developed and maintained a full-stack operational management platform designed to streamline business workflows. The system includes vehicle management, training and certification, analytics, client management, RBAC, 2FA, payment integrations, REST APIs, real-time workflows, and automated PDF generation. Shared services keep client records, auth, and reporting aligned across modules. Operators can move from a task to a certificate or report without leaving the product.",
      problem:
        "Business operations were spread across multiple workflows and portals, requiring a centralized platform with secure access and consistent data flow.",
      outcome:
        "Built and maintained interconnected modules and portals supporting operational workflows, authentication, reporting, payments, and data management.",
      stack: [
        "React.js",
        "Angular",
        "Next.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "JWT",
        "RBAC",
        "2FA",
      ],
      accent: "#c4a574",
      accent2: "#1a2e0a",
      liveUrl: "",
      repoUrl: "",
      featured: true,
      order: 8,
    },
    {
      slug: "you-are-the-dealer",
      title: "YouAreTheDealer",
      category: "Vehicle Marketplace",
      year: "2025",
      summary:
        "A buyer-seller vehicle marketplace supporting vehicle listings, negotiations, leads, offers, and payment workflows. Sellers publish inventory; buyers track offers in one thread. APIs cover users, vehicles, leads, and transactions so sales don’t stall between tools.",
      description:
        "Developed a full-stack vehicle marketplace connecting buyers and sellers through vehicle listings, onboarding, negotiation, lead management, offer tracking, and sales workflows. Built RESTful APIs supporting users, vehicles, leads, and transactions. Real-time offer state keeps both sides on the same version of a deal. Onboarding and lead routing sit on the same auth and data model as checkout.",
      problem:
        "The platform required an integrated workflow for managing vehicles, buyers, sellers, leads, offers, and transactions.",
      outcome:
        "Implemented end-to-end marketplace workflows with structured APIs and real-time offer tracking.",
      stack: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "REST APIs",
        "JWT",
      ],
      accent: "#7cf0ff",
      accent2: "#062428",
      liveUrl: "",
      repoUrl: "",
      featured: true,
      order: 1,
    },

    {
      slug: "training-drivonic-portal",
      title: "Training Drivonic Portal",
      category: "Training & Certification",
      year: "2025",
      summary:
        "A training and certification platform for course management, user progress, completion workflows, and automated certificates. Learners move from enrollment to a signed PDF without a manual step. Training records stay tied to the same user and client model as the rest of the suite.",
      description:
        "Developed a training platform supporting course management, user progress tracking, completion workflows, training data management, and automated personalized PDF certificate generation. Completion rules decide when a certificate is issued and what name and course data it carries. Admins can follow a learner from first session through the generated file.",
      problem:
        "Training completion required a streamlined digital workflow from course participation through certification.",
      outcome:
        "Implemented automated certificate generation and integrated training workflows across the platform.",
      stack: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "PDF Generation",
        "REST APIs",
      ],
      accent: "#ffb4a2",
      accent2: "#2a1210",
      liveUrl: "",
      repoUrl: "",
      featured: true,
      order: 5,
    },

    {
      slug: "aip-audience-intelligence",
      title: "AIP",
      category: "Audience Intelligence",
      year: "2025",
      summary:
        "A map-based analytics platform providing geographic insights, dataset processing, filtering, visualization, and paid analytical reports. Uploaded lists are enriched, cleaned, and turned into layers you can filter. Stripe unlocks downloads in CSV, XLSX, and PDF.",
      description:
        "Developed an interactive map-based analytics platform with multi-layer visualization, geographic insights, advanced filtering, reverse append functionality, suppression rules, downloadable reports, dynamic charts, and visualization workflows. Reverse append matches uploaded records to geographic attributes; suppression drops thin or sensitive rows before they hit a chart. Paid reports and subscriptions are gated through Stripe so access matches what was purchased.",
      problem:
        "Users needed to transform large datasets into meaningful geographic insights while maintaining data quality and flexible reporting.",
      outcome:
        "Built analytical workflows for geographic enrichment, data suppression, visualization, and downloadable reporting, with Stripe-powered report purchases and subscriptions.",
      stack: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Maps",
        "Stripe",
        "CSV",
        "XLSX",
        "PDF",
      ],
      accent: "#c4a7ff",
      accent2: "#1a1230",
      liveUrl: "",
      repoUrl: "",
      featured: true,
      order: 2,
    },

    {
      slug: "drivonic-platform",
      title: "Drivonic Platform",
      category: "Multi-portal product",
      year: "2025",
      summary:
        "Three interconnected portals and shared backend services — client management, 2FA, JWT/RBAC, and consistent APIs across the suite. Auth and client records stay in sync when users move between apps. Middleware and role checks keep each portal on the same security model.",
      description:
        "Managed and maintained three interconnected frontend portals and backend services, keeping API integration and cross-portal navigation consistent. Added client management across portals, Two-Factor Authentication, JWT-based auth, RBAC, middleware, and production troubleshooting across React, Angular, Node.js, Express.js, and MongoDB. Shared clients and sessions mean a change in one portal is visible in the others. Production issues were traced across the stack instead of treated as isolated frontend bugs.",
      problem:
        "Separate portals drifted in auth, client data, and API contracts, which broke workflows between teams and users.",
      outcome:
        "Unified authentication, role access, and client management so the suite behaves as one product with reliable cross-portal flows.",
      stack: [
        "React.js",
        "Angular",
        "Node.js",
        "Express.js",
        "MongoDB",
        "JWT",
        "RBAC",
        "2FA",
      ],
      accent: "#9ecbff",
      accent2: "#0a1628",
      liveUrl: "",
      repoUrl: "",
      featured: true,
      order: 4,
    },

    {
      slug: "learning-management-system",
      title: "Learning Management System",
      category: "EdTech",
      year: "2024",
      summary:
        "A role-based LMS with courses, assignments, scheduling, payments, collaborative coding, and real-time communication. Students enroll, pay with Razorpay, and work in a shared editor. JWT and RBAC keep teachers, learners, and billing on separate paths.",
      description:
        "Developed a role-based learning management system with course enrollment, progress tracking, assignments, scheduling, shopping cart functionality, Razorpay payments, automated invoices, and real-time collaborative coding using Monaco Editor and Socket.io. Live sessions share the same login as coursework so a student doesn’t bounce between tools. Invoices follow a successful payment without a separate admin pass.",
      problem:
        "The platform needed to combine learning workflows, payments, assignments, and real-time collaborative coding into one system.",
      outcome:
        "Delivered a full-stack LMS with secure JWT/RBAC APIs and real-time collaboration capabilities.",
      stack: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Socket.io",
        "Monaco Editor",
        "Razorpay",
        "JWT",
        "RBAC",
      ],
      accent: "#ffd166",
      accent2: "#2a2208",
      liveUrl: "",
      repoUrl: "",
      featured: false,
      order: 6,
    },

    {
      slug: "kalamlab",
      title: "KalamLab",
      category: "AI-Powered Virtual School",
      year: "2024",
      summary:
        "An AI-enabled virtual school platform with live classes, teacher moderation, assignments, discussions, and real-time notifications. Jitsi rooms, coursework, and announcements live behind JWT and RBAC. The Node/Express/Mongo backend was deployed with Docker, Nginx, and PM2.",
      description:
        "Developed an AI-enabled virtual school platform featuring Jitsi live classes, teacher moderation, assignments, discussions, announcements, and real-time notifications. Built and deployed the backend using Node.js, Express.js, and MongoDB with secure authentication and role-based access. Cloudinary holds class media; Socket-based alerts keep teachers and students in the same loop. Production runs behind Nginx and PM2 so live sessions stay up under load.",
      problem:
        "The platform needed to bring live teaching, learning activities, communication, and administration into one scalable virtual environment.",
      outcome:
        "Delivered a scalable backend and real-time learning workflows with secure authentication, media management, and production deployment.",
      stack: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "Jitsi",
        "JWT",
        "RBAC",
        "Socket.io",
        "Cloudinary",
        "Docker",
        "Nginx",
        "PM2",
      ],
      accent: "#9bffce",
      accent2: "#08221a",
      liveUrl: "",
      repoUrl: "",
      featured: true,
      order: 3,
    },

    {
      slug: "curalynx",
      title: "CuraLynx",
      category: "Medicine E-Commerce",
      year: "2025",
      summary:
        "A full-stack medicine e-commerce platform with product management, cart, order tracking, customer communication, and administration. Shoppers manage quantity and price in a responsive catalog. SendGrid covers order and newsletter mail; admins watch submissions from one dashboard.",
      description:
        "Developed a responsive medicine e-commerce platform with product pricing and quantity management, shopping cart, order tracking, contact and newsletter management, and an administrative dashboard for monitoring submissions and orders. Integrated SendGrid for automated email communication and notifications. Catalog and checkout share the same product records so stock and price stay honest. Staff can follow an order from cart through email without a second system.",
      problem:
        "The platform needed a complete digital shopping workflow along with reliable order communication and administrative visibility.",
      outcome:
        "Delivered a functional medicine marketplace with customer ordering, order tracking, automated email communication, and admin management.",
      stack: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "SendGrid",
        "REST APIs",
      ],
      accent: "#ff8fab",
      accent2: "#2a1019",
      liveUrl: "",
      repoUrl: "",
      featured: true,
      order: 7,
    },
  ],

  skills: [
    {
      group: "Frontend",
      order: 1,
      items: [
        "React.js",
        "Angular",
        "Next.js",
        "JavaScript",
        "TypeScript",
        "HTML5",
        "CSS",
        "SCSS",
        "Responsive UI",
        "Server-Side Rendering",
        "Dynamic Routing",
      ],
    },
    {
      group: "Backend",
      order: 2,
      items: [
        "Node.js",
        "Python",
        "Express.js",
        "RESTful APIs",
        "Authentication",
        "Authorization",
        "JWT",
        "RBAC",
        "2FA",
        "bcrypt",
      ],
    },
    {
      group: "Database",
      order: 3,
      items: [
        "MongoDB",
        "NoSQL",
        "MySQL",
        "Mongoose",
        "Data Processing",
        "Data Visualization",
        "Aggregation",
        "Schema Design",
      ],
    },
    {
      group: "DevOps & Tools",
      order: 4,
      items: [
        "Linux",
        "PM2",
        "Gunicorn",
        "Nginx",
        "Docker",
        "Git",
        "GitHub",
        "PDF Generation",
      ],
    },
    {
      group: "Payments & Integrations",
      order: 5,
      items: [
        "Stripe",
        "Razorpay",
        "SendGrid",
        "Third-Party API Integration",
        "Cloudinary",
        "Jitsi",
        "Socket.io",
        "Real-time Applications",
      ],
    },
    {
      group: "AI/ML",
      order: 6,
      items: [
        "Machine Learning",
        "NLP",
        "OCR",
        "Text Processing",
        "Transformer-based Models",
        "Information Retrieval",
        "Document Processing",
      ],
    },
  ],

  experience: [
    {
      company: "Epek Software Solutions Pvt. Ltd. (ESS)",
      role: "Full-Stack & AI/ML Engineer",
      period: "February 2025 — Present",
      location: "India",
      order: 1,
      highlights: [
        "Develop and maintain production-grade full-stack applications using React.js, Angular, Next.js, Node.js, Express.js, and MongoDB.",
        "Design and integrate RESTful APIs, authentication, authorization, RBAC, 2FA, and cross-portal workflows.",
        "Develop responsive dashboards, data-driven interfaces, backend services, and third-party integrations including SendGrid.",
        "Work across frontend and backend codebases to implement features, troubleshoot production issues, optimize applications, and support deployments.",
        "Contributed to vehicle marketplace, training and certification, audience intelligence, and operational management platforms.",
      ],
    },

    {
      company: "Advisions Research and Development Private Limited",
      role: "Software Developer",
      period: "January 2024 — February 2025",
      location: "India",
      order: 2,
      highlights: [
        "Developed full-stack applications using React.js, Node.js, Express.js, MongoDB, and RESTful APIs.",
        "Built a role-based Learning Management System with course enrollment, assignments, scheduling, payments, and real-time collaboration.",
        "Developed KalamLab, an AI-enabled virtual school with live classes, assignments, discussions, announcements, and real-time notifications.",
        "Implemented JWT/RBAC authentication, media management, Docker-based deployment, Nginx, and PM2.",
      ],
    },
  ],
};