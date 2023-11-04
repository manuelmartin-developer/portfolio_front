import { AnimatePresence, motion } from "framer-motion";
import styles from "./PostList.module.scss";
import PostItem from "../Item/PostItem";
import { Post } from "../AdminPosts";

const PostList: React.FC<{
  posts: Post[] | undefined;
  setPosts: React.Dispatch<React.SetStateAction<Post[] | undefined>>;
  setIsEditingPost: React.Dispatch<React.SetStateAction<boolean>>;
  setPostInFocus: React.Dispatch<React.SetStateAction<Post | null>>;
}> = ({ posts, setPosts, setPostInFocus, setIsEditingPost }) => {
  return (
    <div className={styles.postList_container}>
      <AnimatePresence mode="popLayout">
        {posts &&
          posts?.length > 0 &&
          posts.map((post: any) => (
            <PostItem
              key={post.code}
              post={post}
              setPosts={setPosts}
              setPostInFocus={setPostInFocus}
              setIsEditingPost={setIsEditingPost}
            />
          ))}
        {posts?.length === 0 && (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.postList_container__empty}
          >
            No hay posts
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PostList;
