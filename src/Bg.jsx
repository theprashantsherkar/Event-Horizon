import React, { useEffect, useState } from "react";
import "./Bg.css"; // Add a CSS file for styles
import Leaderboard from "./leaderboard";

const Bg = () => {
  const starCount = 300
  const shootingStarInterval = 8000; // Interval between shooting stars in milliseconds

  const [stars, setStars] = useState([]); // State for stars
  const [shootingStars, setShootingStars] = useState([]); // State for shooting stars

  useEffect(() => {
    // Generate stars on mount
    const generateStars = () => {
      const starElements = [];
      for (let i = 0; i < starCount; i++) {
        starElements.push({
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        });
      }
      setStars(starElements);
    };

    generateStars();

    // Function to create a new shooting star
    const createShootingStar = () => {
      const newShootingStar = {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        id: Date.now(), // Unique ID for each shooting star
      };

      setShootingStars((prev) => [...prev, newShootingStar]);

      // Remove the shooting star after 3 seconds
      setTimeout(() => {
        setShootingStars((prev) =>
          prev.filter((star) => star.id !== newShootingStar.id)
        );
      }, 3000);
    };

    // Randomize shooting star interval
    const randomizeShootingStarInterval = () => {
      const interval = Math.random() * shootingStarInterval;
      setTimeout(() => {
        createShootingStar();
        randomizeShootingStarInterval();
      }, interval);
    };

    // Start shooting star intervals
    randomizeShootingStarInterval();

    return () => {
      // Cleanup intervals when component unmounts
      clearTimeout();
    };
  }, []); // Empty dependency array ensures effect only runs once on mount

  return (
    <div id="stars" className="stars-container">
      {/* Render static stars */}
      {stars.map((star, index) => (
        <div
          key={index}
          className="star"
          style={{ top: star.top, left: star.left }}
        ></div>
      ))}

      {/* Render shooting stars */}
      {shootingStars.map((star) => (
        <div
          key={star.id}
          className="shooting-star"
          style={{ top: star.top, left: star.left }}
        ></div>
      ))}
      {/* <Leaderboard /> */}
    </div>
  );
};

export default Bg;
