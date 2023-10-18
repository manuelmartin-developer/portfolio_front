export interface IProject {
  id: number;
  category: string[];
  title: string;
  backgroundColor: string;
  color?: string;
  url?: string;
}

export const projectsData: IProject[] = [
  {
    id: 1,
    category: ["PWA", "Mobile APP", "IOS", "Android"],
    title: "Touryme",
    backgroundColor: "#52BBBC",
    color: "#fff",
    url: "https://touryme.com"
  },
  {
    id: 2,
    category: ["PWA"],
    title: "ConBdeBoda",
    backgroundColor: "#fff",
    color: "#3e3e3e",
    url: "https://conbdeboda.es"
  },
  {
    id: 3,
    category: ["PWA", "Mobile APP", "IOS", "Android"],
    title: "Weagus",
    backgroundColor: "#14213D",
    color: "#fff",
    url: "https://weagus.netlify.app/#/"
  },
  {
    id: 4,
    category: ["AI"],
    title: "EmotionAI",
    backgroundColor: "#3e3e3e",
    color: "#fff",
    url: "https://face-recognition-snowy.vercel.app/"
  },
  {
    id: 5,
    category: ["AI"],
    title: "TrivIA",
    backgroundColor: "#354397",
    color: "#fff",
    url: "https://trivial-ashy.vercel.app/"
  },
  {
    id: 6,
    category: ["Web", "Server"],
    title: "No+vello",
    backgroundColor: "#fff",
    color: "#93D500",
    url: "https://www.nomasvello.es/"
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
