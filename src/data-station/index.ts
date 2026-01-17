import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { SiUpwork } from "react-icons/si";
import { IWork } from "./types";

export const socialLinks = [
  { icon: RiTwitterXLine, href: "https://twitter.com/10daer" },
  { icon: SiUpwork, href: "#" },
  { icon: FaGithub, href: "https://github.com/10daer" },
  { icon: FaWhatsapp, href: "https://wa.me/7065747990" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/10daer/" },
];

export const works: Array<IWork> = [
  {
    projectId: "10daer-00",
    src: "img/1.png",
    title: "The Algorithm",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus porro, autem ducimus, consectetur culpa voluptates cumque veniam dignissimos consequatur ea laboriosam tempora inventore pariatur voluptate voluptas nostrum distinctio sapiente nisi.<br/><br/>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus atque inventore, libero sit fugiat corrupti blanditiis magni autem, deserunt quae consectetur asperiores illum unde consequuntur culpa, perspiciatis ipsa molestias eaque?",
    metadata: {
      Role: "Web Developer",
      Duration: "3 weeks",
      Tools: ["React", "TailwindCss"],
      Client: "Duolingo",
    },
    quote:
      '"Lorem  ipsum  dolor  sit  amet  consectetur  adipisicing  elit.  Molestiae  omnis."',
    message:
      "The algorithm's workings are shrouded in complexity, and its decision-making processes are inscrutable to the general populace.",
  },

  {
    projectId: "10daer-01",
    src: "img/2.png",
    title: "The Dogma",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus porro, autem ducimus, consectetur culpa voluptates cumque veniam dignissimos consequatur ea laboriosam tempora inventore pariatur voluptate voluptas nostrum distinctio sapiente nisi.<br/><br/>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus atque inventore, libero sit fugiat corrupti blanditiis magni autem, deserunt quae consectetur asperiores illum unde consequuntur culpa, perspiciatis ipsa molestias eaque?",
    metadata: {
      Role: "Web Developer",
      Duration: "3 weeks",
      Tools: ["React", "TailwindCss"],
      Client: "Duolingo",
    },
    quote:
      '"Lorem  ipsum  dolor  sit  amet  consectetur  adipisicing  elit.  Molestiae  omnis."',
    message:
      "The digital gospel etched into the very code of the algorithmic society, served as the bedrock of the cognitive regime.",
  },

  {
    projectId: "10daer-02",
    src: "img/3.png",
    title: "The Architects",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus porro, autem ducimus, consectetur culpa voluptates cumque veniam dignissimos consequatur ea laboriosam tempora inventore pariatur voluptate voluptas nostrum distinctio sapiente nisi.<br/><br/>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus atque inventore, libero sit fugiat corrupti blanditiis magni autem, deserunt quae consectetur asperiores illum unde consequuntur culpa, perspiciatis ipsa molestias eaque?",
    metadata: {
      Role: "Web Developer",
      Duration: "3 weeks",
      Tools: ["React", "TailwindCss"],
      Client: "Duolingo",
    },
    quote:
      '"Lorem  ipsum  dolor  sit  amet  consectetur  adipisicing  elit.  Molestiae  omnis."',
    message:
      "The elusive entities, lacking human form, operate in the shadows, skillfully shaping societal norms through the complex interplay of algorithms and Dogmas.",
  },

  {
    projectId: "10daer-03",
    src: "img/4.png",
    title: "The Wasteland",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus porro, autem ducimus, consectetur culpa voluptates cumque veniam dignissimos consequatur ea laboriosam tempora inventore pariatur voluptate voluptas nostrum distinctio sapiente nisi.<br/><br/>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus atque inventore, libero sit fugiat corrupti blanditiis magni autem, deserunt quae consectetur asperiores illum unde consequuntur culpa, perspiciatis ipsa molestias eaque?",
    metadata: {
      Role: "Web Developer",
      Duration: "3 weeks",
      Tools: ["React", "TailwindCss"],
      Client: "Duolingo",
    },
    quote:
      '"Lorem  ipsum  dolor  sit  amet  consectetur  adipisicing  elit.  Molestiae  omnis."',
    message:
      "This overlooked realm, a consequence of algorithmic judgments, is a haunting landscape filled with the echoes of untold stories and uncharted thoughts.",
  },

  {
    projectId: "10daer-04",
    src: "img/5.png",
    title: "The Narrative",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus porro, autem ducimus, consectetur culpa voluptates cumque veniam dignissimos consequatur ea laboriosam tempora inventore pariatur voluptate voluptas nostrum distinctio sapiente nisi.<br/><br/>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus atque inventore, libero sit fugiat corrupti blanditiis magni autem, deserunt quae consectetur asperiores illum unde consequuntur culpa, perspiciatis ipsa molestias eaque?",
    metadata: {
      Role: "Web Developer",
      Duration: "3 weeks",
      Tools: ["React", "TailwindCss"],
      Client: "Duolingo",
    },
    quote:
      '"Lorem  ipsum  dolor  sit  amet  consectetur  adipisicing  elit.  Molestiae  omnis."',
    message:
      "The Narrative unfolds as the omnipresent thread weaving through the fabric of the algorithmic society.",
  },

  {
    projectId: "10daer-05",
    src: "img/6.png",
    title: "The Opulence",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus porro, autem ducimus, consectetur culpa voluptates cumque veniam dignissimos consequatur ea laboriosam tempora inventore pariatur voluptate voluptas nostrum distinctio sapiente nisi.<br/><br/>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus atque inventore, libero sit fugiat corrupti blanditiis magni autem, deserunt quae consectetur asperiores illum unde consequuntur culpa, perspiciatis ipsa molestias eaque?",
    metadata: {
      Role: "Web Developer",
      Duration: "3 weeks",
      Tools: ["React", "TailwindCss"],
      Client: "Duolingo",
    },
    quote:
      '"Lorem  ipsum  dolor  sit  amet  consectetur  adipisicing  elit.  Molestiae  omnis."',
    message:
      "The Opulence epitomizes the cognitive elite's wealth in the algorithmic society, where opulent thoughts and experiences shape the societal narrative.",
  },
];

export const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Work",
    href: "/works",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export const services = [
  {
    service: "services [dev & design]",
    skills: [
      "frontend",
      "backend",
      "software",
      "",
      "chrome extension",
      "",
      "automation script",
      "",
    ],
  },
  {
    service: "tech stack",
    skills: [
      "HTML5",
      "CSS",
      "scss",
      "ReactJS",
      "NextJS",
      "GSAP",
      "NodeJS",
      "MONGODB",
      "Typescript",
      "expressJS",
      "TailwindCSS",
      "POSTGRESSQL",
      "RESTful APIs",
      "Framer-Motion",
      "firebase + supabase",
      "",
      "styled-components",
      "",
    ],
  },
];
