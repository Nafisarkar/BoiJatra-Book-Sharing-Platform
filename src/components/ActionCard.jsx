import { DiamondMinus, DiamondPlus } from "lucide-react";
import React from "react";
import { Link, Links } from "react-router";

const ActionCard = () => {
  return (
    <div className="stats shadow bg-base-200 flex flex-col md:flex-row mt-4  ">
      <div className="stat flex flex-row justify-center items-center">
        <Link to={"/add-post"} className="text-sx flex flex-row gap-4">
          <h1>Add</h1>
          <DiamondPlus className="text-primary" />
        </Link>
      </div>
    </div>
  );
};

export default ActionCard;
