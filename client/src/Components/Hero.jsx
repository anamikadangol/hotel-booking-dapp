import React from "react";
import defaultBcg from "../images/defaultBcg.jpeg";

const Hero = ({ children, hero }) => {
  const heroStyle =
    hero === "defaultHero"
      ? {
          minHeight: "70vh",
          backgroundImage: `url(${defaultBcg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }
      : {
          minHeight: "60vh",
          backgroundImage: `url(${defaultBcg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        };

  return <header style={heroStyle}>{children}</header>;
};

Hero.defaultProps = {
  hero: "defaultHero",
};

export default Hero;