import type { ReactNode } from "react";


import portfolioImage from "../assets/about/profile.png"; 
import objectImage from "../assets/about/object.png";
import leftPic from "../assets/heroSection/left.png";
import middlePic from "../assets/heroSection/middle.png";
import rightPic from "../assets/heroSection/right.png";
import contactRightmage from "../assets/contact/right.svg";

import project1 from "../assets/project/project1.png";
import project2 from "../assets/project/project2.png";
import project3 from "../assets/project/project3.png";
import project4 from "../assets/project/project4.png";
import {
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";




export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  description: string;
};

export type ProjectItem = {
    id: number;
  title: string;
  description: string;
  image: string;
  href: string;
};
export interface heroSectionProps {
  badgeText: string;
  badgeEmoji: string;
  nameHighlight: string;
  headlinePrimary: string;
  headlineSuffix: string;
  description: string;
  ctaText: string;
  heroImages: {
    left: string;
    middle: string;
    right: string;
  };
}
export interface personalSectionProps {
  name: string;
  title: string;
  about_description: string;
}
export interface aboutSectionProps {
  aboutTop: {
    badgeText: string;
    badgeEmoji: string;
    description: string;
    profileImage: string;
    profileAlt: string;
    floatingObject: string;
  };
  aboutBottom: {
    headlinePrimary: string;
    headlineSecondary: string;
    paragraphs: string[];
    services: string[];
  };
}
export interface skillSectionProps {
 title: string;
 description: string;
 items: { name: string }[];
}
export interface contactSectionProps {
  badgeText: string;
  badgeEmoji: string;
  titlePrimary: string;
  titleHighlight: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta: {
    text: string;
    mobileText: string;
    href: string;
  };
  email: string;
  handle: string;
  rightImage: string;
  rightImageAlt: string;
}
export interface footerSectionProps {
  ctaHeadline: string;
  ctaLinkText: string;
  socialLinks: {
    title: string;
    href: string;
    icon: ReactNode;
    hiddenOnMd?: boolean;
  }[];
  authorName: string;
  authorSite: string;
} 
export interface ITestimonial {
  id: number;
  name: string;
  title: string;
  review: string;
}

export type IPortfolioData = {
  userName: string;
  hero: heroSectionProps;
  about: aboutSectionProps;
  skills: skillSectionProps[];
  experiences: ExperienceItem[];
  personal: personalSectionProps;
  projects: ProjectItem[];
  contact: contactSectionProps;
  footer: footerSectionProps;
  testimonials: ITestimonial[];
};

export const portfolioData: IPortfolioData = {
  userName: "Daniel",
  hero: {
  badgeText: "Hi, I'm",
  badgeEmoji: "👋",
  nameHighlight: "Salek Masud",
  headlinePrimary: "Building",
  headlineSuffix: "with passion",
  description: "Frontend developer specializing in React & modern web technologies.",
  ctaText: "Contact Me",
  heroImages: {
    left: leftPic,
    middle: middlePic,
    right: rightPic,
  },
},
 personal: {
    name: "Salek Masud",
    title: "Frontend Developer",
    about_description:
      "I build modern web experiences with React and TypeScript."
  },
  about: {
 

  aboutTop: {
    badgeText: "About Me",
    badgeEmoji: "👋",
    description:
      "I’m passionate about creating clean, scalable interfaces with great UX.",

    profileImage: portfolioImage,
    profileAlt: "Salek Masud portrait",
    floatingObject: objectImage
  },

  aboutBottom: {
    headlinePrimary: "What I Do",
    headlineSecondary: "Best",

    paragraphs: [
      "I work with startups and agencies worldwide.",
      "My strength lies in turning designs into pixel-perfect interfaces.",
      "I care deeply about code quality and performance."
    ],

    services: [
      "React Development",
      "Next.js",
      "UI Engineering",
      "API Integration",
      "Performance Tuning"
    ]
  }
}
,
  skills : [
  {
    title: "Frontend Development",
    description: "Building responsive and modern user interfaces using the latest technologies.",
    items: [
      { name: "React" },
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "Framer Motion" },
    ],
  },
  {
    title: "Backend Development",
    description: "Designing and implementing robust backend systems and APIs.",
    items: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "MongoDB" },
      { name: "PostgreSQL" },
      { name: "Prisma ORM" },
    ],
  },
  {
    title: "DevOps & Tools",
    description: "Managing deployments, CI/CD pipelines, and developer workflows.",
    items: [
      { name: "Docker" },
      { name: "GitHub Actions" },
      { name: "Vercel" },
      { name: "AWS" },
      { name: "Linux CLI" },
    ],
  },
],
  experiences: [
    {
      role: "Frontend Developer",
      company: "TechCorp Solutions",
      period: "Jan 2023 - Present",
      description:
        "Building responsive, high-performance web applications using React, Next.js, and Tailwind CSS. Collaborate with designers to implement modern UI/UX designs.",
    },
    {
      role: "Backend Developer",
      company: "Innovatech Labs",
      period: "Jun 2022 - Dec 2022",
      description:
        "Designed and implemented RESTful APIs using Node.js, Express, and MongoDB. Ensured secure authentication and efficient data handling for multiple projects.",
    },
    {
      role: "Full Stack Intern",
      company: "WebWorks Agency",
      period: "Jan 2022 - May 2022",
      description:
        "Assisted in developing full-stack applications, integrating frontend components with backend APIs, and deploying projects using Vercel and Docker.",
    },
  ],
  projects: [
    {
      id: 1,
      title: "Drinks NG Product Suite",
      description:
        "An e-commerce store designed to cater to ordering and delivery of drinks.",
      image: project1,
      href: "#",
    },
    {
        id: 2,
      title: "Kyshi Product Suite",
      description:
        "A peer-to-peer currency exchange platform built primarily for users in diaspora.",
      image: project2,
      href: "#",
    },
    {
      id: 3,
      title: "Float Mobile App",
      description:
        "A credit-based finance management tool for fast-growing businesses.",
      image: project3,
      href: "#",
    },
    {
      id: 4,
      title: "Wholesome Craft Website",
      description:
        "A lifestyle app for healthy weight management and diet plans.",
      image: project4,
      href: "#",
    },
  ],
  testimonials: [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Product Manager, Stripe",
    review:
      "Working with Salek was an absolute pleasure. His attention to detail, clean architecture, and ability to turn complex ideas into intuitive user experiences exceeded our expectations.",
  },
  {
    id: 2,
    name: "David Kim",
    title: "Founder & CEO, LaunchBase",
    review:
      "Salek delivered a production-ready frontend with pixel-perfect UI and exceptional performance. Communication was smooth and deadlines were respected.",
  },
  {
    id: 3,
    name: "Emily Carter",
    title: "Senior UX Designer, Framer",
    review:
      "What impressed me most was Salek’s design sense combined with strong engineering skills. He understands both aesthetics and scalability.",
  },
  {
    id: 4,
    name: "Michael Brown",
    title: "CTO, SaaSify",
    review:
      "From animations to data flow, everything was thoughtfully implemented. The result felt premium, fast, and reliable.",
  },
],
  contact: {
    badgeText: "Get in Touch",
    badgeEmoji: "📩",
    titlePrimary: "Let's work together",
    titleHighlight: "and build amazing things",
    primaryCta: {
      text: "Send Email",
      href: "mailto:salek@example.com"
    },
    secondaryCta: {
      text: "LinkedIn Profile",
      mobileText: "LinkedIn",
      href: "https://www.linkedin.com/in/salekmasud"
    },
    email: "salek@example.com",
    handle: "@salekmasud",
    rightImage: contactRightmage,
    rightImageAlt: "Contact Illustration"
  },
  footer: {
  ctaHeadline: "Let's build something amazing together.",
  ctaLinkText: "Contact Me",
  socialLinks: [
    {
      title: "GitHub",
      href: "https://github.com/username",
      icon: <Github className="w-4 h-4" />,
    },
    {
      title: "LinkedIn",
      href: "https://linkedin.com/in/username",
      icon: <Linkedin className="w-4 h-4" />,
    },
    {
      title: "Twitter",
      href: "https://twitter.com/username",
      icon: <Twitter className="w-4 h-4" />,
      hiddenOnMd: true, // optional
    },
  ],
  authorName: "Salek Masud Parvez",
  authorSite: "https://yourwebsite.com",
},

};
