import { useEffect, useState } from "react";
import HomePostCard from "../components/HomePostCard";
import { useAuth } from "../provider/UserProvider";
import supabase from "../utils/supabase-client";

const Post = () => {
  const [posts, setPosts] = useState([]); // should be an array, not {}
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { session } = useAuth();

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const { data, error } = await supabase
          .from("booktable")
          .select("*")
          .order("created_at", { ascending: false }); // Optional: sort newest first

        if (error) throw error;
        if (data) setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err.message);
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    getAllPosts();
  }, []);

  return (
    <div className="bg-base-200 min-h-[calc(100svh-4rem)] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {loading ? (
          <div className="text-center mt-12 text-sm">
            <span className="loading loading-infinity loading-xl"></span>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 mt-12 text-sm">{error}</div>
        ) : posts.length > 0 ? (
          <div className="flex flex-col gap-1">
            {posts.map((post) => (
              <HomePostCard key={post.id} props={post} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-12 text-sm">
            No posts available.
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
