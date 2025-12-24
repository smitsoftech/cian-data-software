import React from "react";
import Hero from "../components/Hero";
import Footer from "../layout/Footer";

const Home = () => {
  return (
    <section className="relative min-h-screen bg-gray-50">
      <Hero />
      <Footer />
    </section>
  );
};

export default Home;
