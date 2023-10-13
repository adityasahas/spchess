// components/Challenges.js

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { motion } from "framer-motion";
interface Challenge {
  player1: string;
  player2: string;
  visibility: string;
}
const Challenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await fetch("/api/getChallenges");
        const data = await response.json();
        setChallenges(data);
      } catch (error) {
        console.error("Failed to fetch challenges:", error);
      }
    };

    fetchChallenges();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  if (challenges.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h2 className="text-5xl text-center">Challenges are not public yet.</h2>
        <h3 className="text-2xl text-center mt-4">
          Check back later around Friday Morning!
        </h3>
      </div>
    );
  }

  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold">Challenges</h1>
      </div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {challenges.map((challenge, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card>
              <CardHeader>
                <h3>Challenge</h3>
              </CardHeader>
              <CardBody>
                <h4>
                  {challenge.player1} vs {challenge.player2}
                </h4>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default Challenges;
