import React from "react";
import Hero from "../Components/Hero";
import Banner from "../Components/Banner";
import { Link } from "react-router-dom";
import Services from "../Components/Services";
import FeaturedRooms from "../Components/FeaturedRooms";

const Home = () => {
  return (
    <>
      <Hero hero="defaultHero">
      <Banner title="Luxurious Rooms" subtitle="Deluxe rooms starting at £100/">
        <Link to="/rooms" >
          Our Rooms
        </Link>
        </Banner>
      </Hero>  
          <Services />
          <FeaturedRooms />
    </>
  );
};

export default Home;
