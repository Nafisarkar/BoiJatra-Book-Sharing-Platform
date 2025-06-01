import React from "react";
import { useAuth } from "../provider/UserProvider";
import { CircleX, Heart, ScanEye } from "lucide-react";
import supabase from "../utils/supabase-client";

const PostListCard = () => {
  const { usebooks, setUserBooks } = useAuth();

  console.log("from the cards", usebooks);

  function extractStoragePath(publicUrl) {
    const marker = `/public/bookimages/`;
    const index = publicUrl.indexOf(marker);
    if (index === -1) return null;
    return publicUrl.slice(index + marker.length);
  }

  const removeBookPost = async (book) => {
    try {
      console.log("Deleting book:", book);

      const filePath = extractStoragePath(book.image_url);
      if (filePath) {
        const { error: storageError } = await supabase.storage
          .from("bookimages")
          .remove([filePath]);

        if (storageError) {
          console.log(
            "Error removing image from storage:",
            storageError.message
          );
        } else {
          console.log("Image removed from storage");
        }
      }

      const { data, error: deleteError } = await supabase
        .from("booktable")
        .delete()
        .eq("id", book.id)
        .select(); // include to confirm deletion

      if (deleteError) {
        console.error("Error deleting post:", deleteError.message);
      } else {
        console.log("Post deleted:", data);
      }

      if (typeof setUserBooks === "function") {
        setUserBooks((prev) => prev.filter((bookp) => bookp.id !== book.id));
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };
  

  return (
    <ul className="list bg-base-200 rounded-box shadow-md mt-4">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">My Books</li>
      {usebooks?.map((book) => (
        <li
          key={book.id}
          className="flex flex-col justify-center items-center bg-base-300 p-3 pt-6 rounded-2xl
          md:flex-row md:justify-center md:items-center md:pt-3 m-1
          "
        >
          <img
            className="size-20 rounded object-cover"
            src={book.image_url || "https://via.placeholder.com/100"}
            alt={book.title}
            onError={(e) => (e.target.src = "https://via.placeholder.com/100")}
          />

          <div className="flex-1 ">
            <div
              className="flex flex-col justify-center items-center gap-1
            md:justify-start md:items-start md: px-4
            "
            >
              <div className="font-semibold text-sm pt-2 md:pt-0">
                {book.title}
              </div>
              <div className="text-xs uppercase font-medium opacity-60 mb-1 md:mb-0">
                {book.ispost ? "Review" : "Sell"}
              </div>
              <p className="text-xs line-clamp-3">
                {book.description || "No description available."}
              </p>
            </div>
          </div>

          <div className="flex gap-1">
            <div
              className="flex justify-center items-center tooltip"
              data-tip="Views"
            >
              <h1>{book.views}</h1>
              <button className="btn btn-square btn-ghost" title="View">
                <ScanEye size={18} />
              </button>
            </div>
            <div
              className="flex justify-center items-center tooltip"
              data-tip="Likes"
            >
              <h1>{book.likes}</h1>
              <button className="btn btn-square btn-ghost" title="Like">
                <Heart size={18} />
              </button>
            </div>

            <div
              className=" flex justify-center items-center tooltip"
              data-tip="Delete"
            >
              <button
                className="btn btn-square btn-ghost text-error"
                title="Delete"
                onClick={() => removeBookPost(book)}
              >
                <CircleX size={18} />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PostListCard;
