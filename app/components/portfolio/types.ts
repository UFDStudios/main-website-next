/** Lightweight row for the portfolio grid — no gallery images or long description. */
export type PortfolioProjectSummary = {
  id: string;
  title: string;
  shortDescription: string;
  mainImage: string;
  youtubeUrl: string | null;
  enableVideo: boolean;
  genres: string[];
  mediaCount: number;
};

export type PortfolioProject = PortfolioProjectSummary & {
  longDescription: string;
  googlePlayLink: string | null;
  appStoreLink: string | null;
  images: string[];
};

export type PortfolioPageResponse = {
  projects: PortfolioProjectSummary[];
  pagination: {
    page: number;
    limit: number;
    hasMore: boolean;
  };
};
