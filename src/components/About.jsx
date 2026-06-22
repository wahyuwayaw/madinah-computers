import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useSiteData } from "../context/DataContext";

const About = () => {
  const reduce = useReducedMotion();
  const { about } = useSiteData();

  const titleVariant = {
    hidden: { x: -60, opacity: 0 },
    show: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 90, damping: 14, duration: 0.5 } }
  };

  const paraVariant = {
    hidden: { x: -30, opacity: 0 },
    show: (i = 0) => ({
      x: 0,
      opacity: 1,
      transition: { delay: 0.12 + i * 0.06, duration: 0.42 }
    })
  };

  const imgVariant = {
    hidden: { y: 30, opacity: 0 },
    show: (i = 0) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, delay: i * 0.08 }
    })
  };

  return (
    <section id="about" className="bg-white py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <motion.h2
            className="text-blue-600 font-semibold text-lg uppercase tracking-wide"
            initial={reduce ? false : "hidden"}
            animate={reduce ? false : "show"}
            variants={titleVariant}
          >
            {about.label}
          </motion.h2>

          <motion.h3
            className="text-2xl md:text-4xl font-bold mb-6"
            initial={reduce ? false : "hidden"}
            animate={reduce ? false : "show"}
            variants={titleVariant}
            transition={{ delay: 0.06 }}
          >
            {about.heading}
          </motion.h3>

          <motion.p
            className="text-gray-600 leading-relaxed max-w-3xl"
            custom={0}
            initial={reduce ? false : "hidden"}
            animate={reduce ? false : "show"}
            variants={paraVariant}
          >
            {about.description}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
          <motion.div
            className="rounded-xl overflow-hidden shadow-lg"
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? false : "show"}
            viewport={{ once: true, amount: 0.25 }}
            variants={imgVariant}
            custom={0}
          >
            <img
              src={about.image1}
              alt="Survey team"
              className="w-full h-[200px] md:h-[300px] object-cover"
            />
          </motion.div>

          <motion.div
            className="rounded-xl overflow-hidden shadow-lg"
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? false : "show"}
            viewport={{ once: true, amount: 0.25 }}
            variants={imgVariant}
            custom={1}
          >
            <img
              src={about.image2}
              alt="Survey equipment"
              className="w-full h-[200px] md:h-[300px] object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
