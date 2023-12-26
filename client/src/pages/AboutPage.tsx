import React, { useEffect } from "react";

const AboutPage = ({
  setActivePage,
}: {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  useEffect(() => {
    setActivePage("about");
  }, []);
  return <div>AboutPage</div>;
};

export default AboutPage;
