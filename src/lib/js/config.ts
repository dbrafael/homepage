export interface PageConfig {
  title: string,
  path: string,
  hidden?: boolean,
}

export interface SiteConfig {
  pages: PageConfig[];
  background: {
    tickLength: number;
  },
  gradient: {
    tickLength: number;
    fullCycleDuration: number;
  };
};

const SITE_CONFIG: SiteConfig = {
  pages: [{
    title: "Home",
    path: "/",
    hidden: true,
  },
  {
    title: "Portfolio",
    path: "/portfolio",
  },
  {
    title: "Resume",
    path: "/cv",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  }],
  gradient: {
    tickLength: 200,
    fullCycleDuration: 10000,
  },
  background: {
    tickLength: 50,
  }
};

export default SITE_CONFIG;
