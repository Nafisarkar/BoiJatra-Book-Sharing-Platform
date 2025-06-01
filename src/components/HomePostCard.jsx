import {
  Book,
  Eye,
  Heart,
  MessageSquareMore,
  PencilLine,
  Sparkles,
} from "lucide-react";

const HomePostCard = ({ props }) => {
  const {
    title,
    subtitle,
    description,
    image_url,
    book_author,
    genre,
    likes,
    views,
    stars,
    user_id,
    post_author_name,
    ispost,
    price,
    comments_count,
    book_condition,
  } = props;

  if (!props.ispost) {
    console.log("this is false");
  }
  if (props.book_author) {
    console.log(props.book_author);
  }
  return (
    <div className="border border-base-300 rounded-xl shadow-md overflow-hidden patternbg">
      {/* Content within the card */}
      <div className="p-4">
        {/* Author Info */}
        <div className="flex items-center mb-2">
          <div className="min-w-10 min-h-10 bg-neutral rounded-full flex items-center justify-center text-neutral-content mr-3 font-semibold">
            {post_author_name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className=" text-base-content text-xl font-bold">
              {post_author_name}
              {/* {"  "}
              {user_id} */}
            </p>
          </div>
        </div>

        {/* Post Text */}
        {title && !description && (
          <>
            <p className="text-base-content mb-3 leading-relaxed whitespace-normal break-words">
              {title}
            </p>
            <p className="text-xs">{subtitle}</p>
          </>
        )}

        {description && (
          <div className="text-base-content mb-3 leading-relaxed whitespace-normal break-words">
            {title && (
              <div className="flex flex-row text-lg mb-1 gap-3 justify-start items-center mx-2 my-1">
                <Book /> {title}
              </div>
            )}
            <div className="flex flex-row justify-start gap-3 mx-2 my-1">
              <PencilLine />
              <p className="underline underline-offset-1">{book_author}</p>
            </div>
            <div className="border-t border-base-300 my-4"></div>
            <div className="text-justify">{description}</div>
          </div>
        )}
      </div>

      {/* Image */}
      {image_url && (
        <div className="w-full aspect-[3/2]">
          <img
            src={image_url}
            alt={title || "Post image"}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}

      {/* Stats and Actions */}
      <div className="p-4">
        <div className="flex justify-between items-center text-sm mb-3">
          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-red-500 cursor-pointer">
              <Heart className="w-5 h-5" /> {likes}
            </div>
            <div className="flex items-center gap-2 text--600 cursor-pointer">
              <MessageSquareMore className="w-5 h-5" /> {comments_count}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 cursor-pointer">
              <Eye className="w-5 h-5" /> {views}
            </div>
            {stars > 0 && (
              <div className="flex items-center gap-2 text-sm cursor-pointer">
                <Sparkles className="w-5 h-5" />
                {stars}
              </div>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="flex flex-wrap gap-2 justify-start items-center text-xs border-t border-base-300 pt-3">
          {genre && (
            <span className=" badge badge-soft badge-primary ">{genre}</span>
          )}
          {!props.ispost && (
            <>
              {price && (
                <span className="badge badge-soft badge-accent">৳ {price}</span>
              )}
              {book_condition && (
                <span className="badge badge-soft badge-info">
                  {book_condition}
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePostCard;
