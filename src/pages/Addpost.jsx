import React, { useEffect, useState } from "react";
import supabase from "../utils/supabase-client";
import { useAuth } from "../provider/UserProvider";

const AddPost = () => {
  const { session } = useAuth();

  const [image, setImage] = useState(null);
  const [imageuploadloading, setImageUploadLoading] = useState(false);
  const [stats, setStats] = useState({
    image_url: "", // string or File object if uploading
    title: "",
    subtitle: "",
    description: "",
    price: 0, // Only for sell post
    stars: 0, // Only for review post
    user_id: "", // Set programmatically from session
    book_condition: "", // Only for sell post
    ispost: true, // true for review, false for sell (or vice versa based on your logic)
    book_author: "",
    genre: "",
    views: 0,
    likes: 0,
    comments_count: 0,
    reviews_count: 0,
    post_author_name: "",
  });

  const handleImageUpload = async () => {
    if (!image) {
      console.error("No image selected");
      return null;
    }
    try {
      setImageUploadLoading(true);
      const imageName = `${Date.now()}-${image.name}`;
      const storage = supabase.storage.from("bookimages");

      const { error: uploadError } = await storage.upload(imageName, image, {
        cacheControl: "3600",
        upsert: false,
      });
      if (uploadError) throw new Error("Failed to upload image");

      const { data, error: urlError } = await storage.getPublicUrl(imageName);
      if (urlError || !data?.publicUrl)
        throw new Error("Failed to get public URL");

      return data.publicUrl;
    } catch (err) {
      console.error("Image upload error:", err.message || err);
      return null;
    } finally {
      setImageUploadLoading(false);
    }
  };

  const handleAddPost = async () => {
    const uploadedUrl = await handleImageUpload();
    if (!uploadedUrl) {
      console.error("Image upload failed, aborting review post creation");
      return;
    }

    const post = {
      ...stats,
      image_url: uploadedUrl, // ✅ ensure image is added
      post_author_name: session?.user?.user_metadata?.name,
    };

    try {
      const { error } = await supabase.from("booktable").insert(post);
      if (error) {
        console.error("Error Adding Post:", error.message || error);
      }
    } catch (error) {
      console.error("Post Insertion error:", error.message || error);
    }

    setStats({
      image_url: "", // string or File object if uploading
      title: "",
      subtitle: "",
      description: "",
      price: 0, // Only for sell post
      stars: 0, // Only for review post
      user_id: "", // Set programmatically from session
      book_condition: "", // Only for sell post
      ispost: true, // true for review, false for sell (or vice versa based on your logic)
      book_author: "",
      genre: "",
      views: 0,
      likes: 0,
      comments_count: 0,
      reviews_count: 0,
    });

    console.log(stats);
  };

  const handleAddSellPost = async () => {
    const uploadedUrl = await handleImageUpload();
    if (!uploadedUrl) {
      console.error("Image upload failed, aborting sell post creation");
      return;
    }

    const post = {
      ...stats,
      ispost: false,
      image_url: uploadedUrl, // ✅ ensure image is added
      post_author_name: session?.user?.user_metadata?.name,
    };

    try {
      const { error } = await supabase.from("booktable").insert(post);
      if (error) {
        console.error("Error Adding Sell Post:", error.message || error);
      } else {
        console.log("Sell post added:", post);
      }
    } catch (error) {
      console.error("Sell Post Insertion error:", error.message || error);
    }

    setStats({
      image_url: "", // string or File object if uploading
      title: "",
      subtitle: "",
      description: "",
      price: 0, // Only for sell post
      stars: 0, // Only for review post
      user_id: "", // Set programmatically from session
      book_condition: "", // Only for sell post
      ispost: true, // true for review, false for sell (or vice versa based on your logic)
      book_author: "",
      genre: "",
      views: 0,
      likes: 0,
      comments_count: 0,
      reviews_count: 0,
    });
  };

  useEffect(() => {
    if (session?.user?.id) {
      setStats((prev) => ({
        ...prev,
        user_id: session.user.id,
      }));
    }
  }, [session]);

  return (
    <div className="flex justify-center px-4 py-6 sm:py-10 ">
      <div className="tabs tabs-lift w-full max-w-4xl ">
        {/* Review Tab */}
        <input
          type="radio"
          name="my_tabs_3"
          className="tab "
          aria-label="Review"
          defaultChecked
        />
        <div className="tab-content bg-base-100 border-base-300 p-4 sm:p-6 w-full patternbg">
          <h2 className="text-xl font-bold mb-4">Create a Book Review</h2>
          <div className="space-y-4">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Add Post Cover Photo</legend>
              <input
                type="file"
                className="file-input w-full"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <label className="label text-sm">Max size 2MB</label>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Title</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Title"
                value={stats.title}
                onChange={(e) => {
                  setStats((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }));
                }}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Subtitle</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Subtitle (optional)"
                value={stats.subtitle}
                onChange={(e) => {
                  setStats((prev) => ({
                    ...prev,
                    subtitle: e.target.value,
                  }));
                }}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Description</legend>
              <textarea
                className="textarea w-full h-24"
                placeholder="Write your review..."
                value={stats.description}
                onChange={(e) => {
                  setStats((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }));
                }}
              ></textarea>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Book Author</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Author name"
                value={stats.book_author}
                onChange={(e) => {
                  setStats((prev) => ({
                    ...prev,
                    book_author: e.target.value,
                  }));
                }}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Genre</legend>
              <select
                className="select w-full"
                value={stats.genre}
                onChange={(e) =>
                  setStats((prev) => ({
                    ...prev,
                    genre: e.target.value,
                  }))
                }
              >
                <option disabled value="">
                  Pick Genre
                </option>
                <option>Fiction</option>
                <option>Non-Fiction</option>
                <option>Science Fiction</option>
                <option>Fantasy</option>
                <option>Mystery</option>
                <option>Thriller</option>
                <option>Romance</option>
                <option>Historical</option>
                <option>Biography</option>
                <option>Self-help</option>
                <option>Philosophy</option>
                <option>Religion</option>
                <option>Poetry</option>
                <option>Comics</option>
                <option>Drama</option>
                <option>Horror</option>
                <option>Adventure</option>
                <option>Children's</option>
                <option>Young Adult</option>
                <option>Educational</option>
                <option>Bangla Literature</option>
                <option>Islamic</option>
                <option>Science</option>
                <option>Technology</option>
                <option>Health</option>
                <option>Politics</option>
                <option>Economics</option>
              </select>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Rating</legend>
              <div className="rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <input
                    key={star}
                    type="radio"
                    name="rating-review"
                    className="mask mask-star"
                    aria-label={`${star} star`}
                    value={star}
                    checked={stats.stars === star}
                    onChange={() => {
                      setStats((prev) => ({
                        ...prev,
                        stars: star,
                      }));
                    }}
                  />
                ))}
              </div>
            </fieldset>
            <fieldset className="flex flex-row justify-end">
              <button
                className={`btn btn-primary ${
                  imageuploadloading && "btn-disabled"
                }`}
                onClick={handleAddPost}
              >
                Post
              </button>
            </fieldset>
          </div>
        </div>

        {/* Sell Tab */}
        <input
          type="radio"
          name="my_tabs_3"
          className="tab"
          aria-label="Sell"
        />
        <div className="tab-content bg-base-100 border-base-300 p-4 sm:p-6 w-full patternbg">
          <h2 className="text-xl font-bold mb-4">Sell a Book</h2>
          <div className="space-y-4">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Book Cover</legend>
              <input
                type="file"
                className="file-input w-full"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Book Title</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Title"
                value={stats.title}
                onChange={(e) => {
                  setStats((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }));
                }}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Description</legend>
              <textarea
                className="textarea w-full h-24"
                placeholder="Write your review..."
                value={stats.description}
                onChange={(e) => {
                  setStats((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }));
                }}
              ></textarea>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Price (৳)</legend>
              <input
                type="number"
                className="input w-full"
                placeholder="Price in Taka"
                min={1}
                value={stats.price}
                max={10000}
                onChange={(e) => {
                  setStats((prev) => ({
                    ...prev,
                    price: e.target.value,
                  }));
                }}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Condition</legend>
              <select
                className="select w-full"
                value={stats.book_condition}
                onChange={(e) =>
                  setStats((prev) => ({
                    ...prev,
                    book_condition: e.target.value,
                  }))
                }
              >
                <option value={"new"}>New</option>
                <option value={"used"}>Used</option>
                <option value={"old"}>Old</option>
              </select>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Book Author</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Author name"
                value={stats.book_author}
                onChange={(e) => {
                  setStats((prev) => ({
                    ...prev,
                    book_author: e.target.value,
                  }));
                }}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Genre</legend>
              <select
                className="select w-full"
                value={stats.genre}
                onChange={(e) => {
                  setStats((prev) => ({
                    ...prev,
                    genre: e.target.value,
                  }));
                }}
              >
                <option disabled value="">
                  Pick Genre
                </option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Mystery">Mystery</option>
                <option value="Thriller">Thriller</option>
                <option value="Romance">Romance</option>
                <option value="Historical">Historical</option>
                <option value="Biography">Biography</option>
                <option value="Self-help">Self-help</option>
                <option value="Philosophy">Philosophy</option>
                <option value="Religion">Religion</option>
                <option value="Poetry">Poetry</option>
                <option value="Comics">Comics</option>
                <option value="Drama">Drama</option>
                <option value="Horror">Horror</option>
                <option value="Adventure">Adventure</option>
                <option value="Children's">Children's</option>
                <option value="Young Adult">Young Adult</option>
                <option value="Educational">Educational</option>
                <option value="Bangla Literature">Bangla Literature</option>
                <option value="Islamic">Islamic</option>
                <option value="Science">Science</option>
                <option value="Technology">Technology</option>
                <option value="Health">Health</option>
                <option value="Politics">Politics</option>
                <option value="Economics">Economics</option>
              </select>
            </fieldset>
            <fieldset className="flex flex-row justify-end">
              <button className="btn btn-primary" onClick={handleAddSellPost}>
                Sell
              </button>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
