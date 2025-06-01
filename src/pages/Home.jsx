import React from "react";
import { Link } from "react-router";

const Home = () => {
  return (
    <div className="hero bg-base-200 h-[calc(100svh-4rem)] patternbg">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">
            Discover Your Next Favorite Book
          </h1>
          <p className="py-6">
            Begin your journey through the world of Bangla literature. Explore
            stories, poems and novels books—all in one place. Every page opens a
            new world of imagination and knowledge.
          </p>
          <Link to={"/post"} className="btn btn-primary">
            Start Reading
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
