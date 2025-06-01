import React, { useEffect, useState } from "react";
import { useAuth } from "../provider/UserProvider";

const Stat = () => {
  const { session, usebooks, usemeta } = useAuth();

  const [totallikes, setTotalLikes] = useState(0);
  const [totalviews, setTotalViews] = useState(0);

  const [highestlike, setHightstLike] = useState(0);
  const [highestview, setHightstView] = useState(0);

  const [postcount, setPostCounte] = useState(0);
  const [sellpost, setSellPost] = useState(0);

  useEffect(() => {
    if (usebooks && usebooks.length > 0) {
      let highestL = 0;
      let highestV = 0;

      const totalL = usebooks.reduce((acc, item) => {
        const likes = item.likes || 0;

        if (likes > highestL) {
          highestL = likes;
        }
        return acc + likes;
      }, 0);

      const totalV = usebooks.reduce((acc, item) => {
        const views = item.views || 0;

        if (views > highestV) {
          highestV = views;
        }
        return acc + views;
      }, 0);

      //get the total sell post count
      const totalSP = usebooks.reduce((acc, item) => {
        return acc + Number(!item.ispost);
      }, 0);

      setTotalLikes(totalL);
      setTotalViews(totalV);
      setHightstLike(highestL);
      setHightstView(highestV);
      setSellPost(totalSP);
    }

    setPostCounte(usebooks?.length);
  }, [usebooks]);

  return (
    <div className="stats shadow bg-base-200 flex flex-col md:flex-row ">
      <div className="stat flex-1">
        <div className="stat-figure text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-8 w-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
        </div>
        <div className="stat-title text-base-content">Total Likes</div>
        <div className="stat-value text-primary">{totallikes} loves</div>
        <div className="stat-desc text-base-content">
          Your one post got {highestlike} likes
        </div>
      </div>

      <div className="stat flex-1">
        <div className="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-view-icon lucide-view"
          >
            <path d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" />
            <path d="M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2" />
            <circle cx="12" cy="12" r="1" />
            <path d="M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0" />
          </svg>
        </div>
        <div className="stat-title text-base-content">Book Views</div>
        <div className="stat-value text-secondary">{totalviews} eyes</div>
        <div className="stat-desc text-base-content">
          Your most popular post got {highestview} views
        </div>
      </div>

      {/* <div className="stat flex-1">
        <div className="stat-figure text-secondary"></div>
        <div className="stat-value">{postcount}</div>
        <div className="stat-title text-base-content">Total post </div>
        <div className="stat-desc text-secondary">
          {sellpost} books are posted for sell
        </div>
      </div> */}

      <div className="stat flex-1">
        <div className="stat-figure text-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-book-open-text-icon lucide-book-open-text"
          >
            <path d="M12 7v14" />
            <path d="M16 12h2" />
            <path d="M16 8h2" />
            <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
            <path d="M6 12h2" />
            <path d="M6 8h2" />
          </svg>
        </div>
        <div className="stat-title text-base-content">Total post</div>
        <div className="stat-value text-error">{postcount} script</div>
        <div className="stat-desc text-base-content">
          {sellpost} books are posted for sell
        </div>
      </div>
    </div>
  );
};

export default Stat;
