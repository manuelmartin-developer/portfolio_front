export interface IProject {
  id: number;
  category: string;
  title: string;
  pointOfInterest: number;
  backgroundColor: string;
}

export const projectsData = [
  // Photo by ivan Torres on Unsplash
  {
    id: 1,
    category: "Pizza",
    title: "5 Food Apps Delivering the Best of Your City",
    pointOfInterest: 80,
    backgroundColor: "#814A0E"
  },
  // Photo by Dennis Brendel on Unsplash
  {
    id: 2,
    category: "How to",
    title: "Arrange Your Apple Devices for the Gram",
    pointOfInterest: 120,
    backgroundColor: "#959684"
  },
  // Photo by Alessandra Caretto on Unsplash
  {
    id: 3,
    category: "Pedal Power",
    title: "Map Apps for the Superior Mode of Transport",
    pointOfInterest: 260,
    backgroundColor: "#5DBCD2"
  },
  // Photo by Taneli Lahtinen on Unsplash
  {
    id: 4,
    category: "Holidays",
    title: "Our Pick of Apps to Help You Escape From Apps",
    pointOfInterest: 200,
    backgroundColor: "#8F986D"
  },
  // Photo by Simone Hutsch on Unsplash
  {
    id: 5,
    category: "Photography",
    title: "The Latest Ultra-Specific Photography Editing Apps",
    pointOfInterest: 150,
    backgroundColor: "#FA6779"
  },
  // Photo by Siora Photography on Unsplash
  {
    id: 6,
    category: "They're all the same",
    title: "100 Cupcake Apps for the Cupcake Connoisseur",
    pointOfInterest: 60,
    backgroundColor: "#282F49"
  },
  // Photo by Yerlin Matu on Unsplash
  {
    id: 7,
    category: "Cats",
    title: "Yes, They Are Sociopaths",
    pointOfInterest: 200,
    backgroundColor: "#AC7441"
  },
  // Photo by Ali Abdul Rahman on Unsplash
  {
    id: 8,
    category: "Holidays",
    title: "Seriously the Only Escape is the Stratosphere",
    pointOfInterest: 260,
    backgroundColor: "#CC555B"
  }
];

export const openSpring = { type: "spring", stiffness: 200, damping: 30 };

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
  const categories = projectsData.map(({ category }) => category);
  const distinctCategories = [...new Set(categories)];

  return distinctCategories.map((category) => {
    return {
      params: {
        category
      }
    };
  });
};

export const getCategoryCount = (category: string) => {
  return projectsData.filter((item) => item.category === category).length;
};
