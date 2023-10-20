import { IconType } from "react-icons";

export type GalleryItem = {
  original: string;
  thumbnail: string;
  width: number;
  height: number;
};

export interface ProjectData {
  id: number;
  category: string[];
  title: string;
  backgroundColor: string;
  color: string;
  url: string;
  isSideProject: boolean;
  paragraphs: string[];
  role?: string;
  gallery?: GalleryItem[];
  technologies?: string[];
}

export const projectsData: ProjectData[] = [
  {
    id: 1,
    category: ["PWA", "Mobile APP", "IOS", "Android"],
    title: "Touryme",
    backgroundColor: "#52BBBC",
    color: "#fff",
    url: "https://touryme.com",
    isSideProject: false,
    paragraphs: [
      "Touryme is a web application that allows users to create custom tours and share them with other users.",
      "Touryme was born as a web application, but it was decided to create a mobile application so that users could enjoy the experience in a more comfortable way."
    ],
    gallery: [
      {
        original: "1.webp",
        thumbnail: "1_thumb.webp",

        width: 626,
        height: 835
      },
      {
        original: "2.png",
        thumbnail: "2_thumb.webp",
        width: 626,
        height: 835
      },
      {
        original: "3.webp",
        thumbnail: "3_thumb.webp",
        width: 626,
        height: 835
      },
      {
        original: "4.png",
        thumbnail: "4_thumb.webp",
        width: 626,
        height: 835
      }
    ],
    role: "I was in charge of development for frontend in web and mobile applications.",
    technologies: ["Next.js", "Ionic", "React"]
  },
  {
    id: 2,
    category: ["PWA"],
    title: "ConBdeBoda",
    backgroundColor: "#fff",
    color: "#3e3e3e",
    url: "https://conbdeboda.es",
    isSideProject: false,
    paragraphs: [
      "Conbdeboda is a web application that allows users to organize their wedding in a simple way. It has a blog with articles about weddings, a directory of suppliers and a wedding planner.",
      "Conbdeboda is a quite complex project. SEO was a very important part of the project, so I had to take care of it. I also had to implement a server-side rendering system to improve the loading speed of the web application and the SEO."
    ],
    role: "I was in charge of development for frontend and backend.",
    technologies: ["Next.js", "React", "Node.js", "Express.js"]
  },
  {
    id: 3,
    category: ["PWA", "Mobile APP", "IOS", "Android"],
    title: "Weagus",
    backgroundColor: "#14213D",
    color: "#fff",
    url: "https://weagus.netlify.app/#/",
    isSideProject: true,
    paragraphs: []
  },
  {
    id: 4,
    category: ["AI"],
    title: "EmotionAI",
    backgroundColor: "#3e3e3e",
    color: "#fff",
    url: "https://face-recognition-snowy.vercel.app/",
    isSideProject: true,
    paragraphs: []
  },
  {
    id: 5,
    category: ["AI"],
    title: "TrivIA",
    backgroundColor: "#354397",
    color: "#fff",
    url: "https://trivial-ashy.vercel.app/",
    isSideProject: true,
    paragraphs: []
  },
  {
    id: 6,
    category: ["Web", "Server"],
    title: "No+vello",
    backgroundColor: "#fff",
    color: "#93D500",
    url: "https://www.nomasvello.es/",
    isSideProject: false,
    paragraphs: [],
    role: ""
  }
];

export const getAllProjectsIds = () => {
  return projectsData.map(({ id }) => {
    return {
      params: {
        id
      }
    };
  });
};

export const getAllDistinctProjectsCategories = () => {
  const categories = projectsData
    .map(({ category }) => category)
    .flat()
    .filter((item, index, array) => array.indexOf(item) === index);

  return categories.map((category) => {
    return {
      params: {
        category
      }
    };
  });
};

export const getCategoryCount = (category: string) => {
  return projectsData.filter((item) => item.category.includes(category)).length;
};

export const getProjectData = (id: number) => {
  return projectsData.find((item) => item.id === id);
};
