export type PortfolioProject = {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  mainImage: string;
  youtubeUrl: string | null;
  googlePlayLink: string | null;
  appStoreLink: string | null;
  enableVideo: boolean;
  images: string[];
  genres: string[];
};
