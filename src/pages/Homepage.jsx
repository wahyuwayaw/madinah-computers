// src/pages/Homepage.jsx
import React from "react";
import Hero from "../components/Hero";
import CoreFeatures from "../components/CoreFeatures";
import MainServices from "../components/MainServices";
import About from "../components/About";
import Service from "../components/Service";
import SoftwareDownload from "../components/SoftwareDownload";
import InquiryForm from "../components/InquiryForm";
import WhatsAppWidget from "../components/WhatsAppWidget";

const Homepage = () => {
  const backgroundImageUrl = "/bg.jpeg";

  return (
    <div
      className="min-h-screen bg-scroll md:bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className="min-h-screen bg-black/70">
        {/* Hero */}
        <section id="home" className="scroll-mr-15">
          <Hero />
        </section>

        {/* 6 Core Feature Cards */}
        <CoreFeatures />

        {/* 3 Main Service Columns (Laptop, Komputer, Printer) */}
        <MainServices />

        {/* About */}
        <section id="about" className="scroll-mr-15">
          <About />
        </section>

        {/* Full Services Browser (existing component) */}
        <section id="service" className="scroll-mr-15">
          <Service />
        </section>

        {/* Software Download */}
        <section id="download" className="scroll-mr-15">
          <SoftwareDownload />
        </section>

        {/* Inquiry Form & FAQ */}
        <section id="inquiry" className="scroll-mr-15">
          <InquiryForm />
        </section>
      </div>

      {/* WhatsApp floating widget — outside bg overlay so always visible */}
      <WhatsAppWidget />
    </div>
  );
};

export default Homepage;
