import React, { useEffect } from "react";

const LibraryPage = ({
  setActivePage,
}: {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  useEffect(() => {
    setActivePage("library");
  });
  return <div>LibraryPage</div>;
};

export default LibraryPage;
