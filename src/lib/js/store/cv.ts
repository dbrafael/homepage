const CV_PATH = "/cv.json";

export interface CVData {
  user: {
    name: string;
    title: string;
    email: string;
    phone: string;
    address: string;
    website: string;
  };
  academic: {
    title: string;
    type: string;
    company: string;
    location: string;
    stack: string[];
    date: {
      from: Date;
      to: Date;
    };
    points: string[];
    description: string;
  }[];
  about: {
    title: string;
    description: string;
  }[];
}

export async function getCVData(): Promise<CVData> {
  const response = fetch(CV_PATH, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });

  return response as Promise<CVData>;
}
