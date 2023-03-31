import React, { useState } from "react";

const ReadMore = ({ text, maxLength }) => {
  const [hidden, setHidden] = useState(true);

  const toggleReadMore = () => {
    setHidden(!hidden);
  };

  if (text.length <= maxLength) {
    return <p>{text}</p>;
  }

  return (
    <>
      <p>{hidden ? `${text.slice(0, maxLength)}...` : text}</p>
      <button style={{ backgroundColor: "transparent", border: "1" }}onClick={toggleReadMore}>
        {hidden ? "Read more" : "Show less"}
      </button>
    </>
  );
};

export default ReadMore;