import React from "react";
import { useAuth } from "../provider/UserProvider";
import Stat from "../components/Stat";
import ActionCard from "../components/ActionCard";
import PostListCard from "../components/PostListCard";

const Deshboard = () => {
  const { session, usebooks, usemeta } = useAuth();
  console.log(usemeta);

  return (
    <div className="flex justify-center items-center ">
      <div className="m-8">
        {session && (
          <div className="flex flex-col justify-center items-center patternbg rounded-2xl p-4 border-1 border-base-300">
            <div className="avatar">
              <div className="w-26 md:w-30 lg:w-34 rounded-full border-1 border-base-300 overflow-hidden ">
                <img
                  src={usemeta?.avatar_url}
                  alt={usemeta?.full_name || "User Avatar"}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <section>
              <h1 className="text-xl text-center md:text-2xl font-bold px-2 mx-2 pt-2 mt-2">
                {usemeta?.full_name}
              </h1>
              <h1 className="text-xs text-center md:text-sm font-bold pt-1">
                {usemeta?.email}
              </h1>
            </section>
            <section className="pt-2 mt-2">
              <Stat />
              <ActionCard />
              <PostListCard />
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default Deshboard;
