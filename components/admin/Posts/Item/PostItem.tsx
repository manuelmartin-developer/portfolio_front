import dynamic from "next/dynamic";

import axios, { AxiosError } from "axios";
import { motion } from "framer-motion";
import { useSnackbar } from "notistack";

import styles from "./PostItem.module.scss";

import ConfirmTooltip from "../../../UI/Tooltips/ConfirmTooltip";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { useCursorStore } from "../../../../store/cursorStore";
import { Post } from "../AdminPosts";
// Dynamic imports
const Markdown = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  { ssr: false }
);

const PostItem: React.FC<{
  post: Post;
  setPosts: React.Dispatch<React.SetStateAction<Post[] | undefined>>;
  setIsEditingPost: React.Dispatch<React.SetStateAction<boolean>>;
  setPostInFocus: React.Dispatch<React.SetStateAction<Post | null>>;
}> = ({ post, setPosts, setPostInFocus, setIsEditingPost }) => {
  // Hooks
  const { enqueueSnackbar } = useSnackbar();

  // Store
  const { setCursorVariant } = useCursorStore();

  // Methods
  const onEnterButton = () => {
    setCursorVariant("dot");
  };

  const onLeave = () => {
    setCursorVariant("default");
  };

  const onHandleDelete = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/posts/${post?.code}`;
    const token = localStorage.getItem("admin_token");
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      const response = await axios.delete(URL, config);
      if (response.status === 200) {
        setPosts(response.data.posts);
        enqueueSnackbar("Post eliminado", { variant: "success" });
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError && axiosError.response?.data) {
        const errorData: any = axiosError.response.data;
        enqueueSnackbar(
          errorData.errorData?.message || "Ha ocurrido un error",
          { variant: "error" }
        );
      }
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`${styles.postItem} ${
        post.isDraft ? styles.postItem__draft : ""
      }`}
    >
      <h3 className={styles.postItem__title}>{post.title}</h3>
      <Markdown source={post.content} className={styles.postItem__content} />
      <p className={styles.postItem__categories}>
        {post.categories.map((category) => category.label).join(", ")}
      </p>
      <p className={styles.postItem__author}>{post.author}</p>
      <p className={styles.postItem__date}>
        <span>Fecha de creación: </span>
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <p className={styles.postItem__date}>
        <span>Última actualización: </span>
        {new Date(post.updatedAt).toLocaleDateString()}
      </p>
      <div className={styles.postItem__actions}>
        <button
          className={styles.postItem__button}
          onMouseEnter={onEnterButton}
          onMouseLeave={onLeave}
          onClick={() => {
            setPostInFocus(post);
            setIsEditingPost(true);
          }}
        >
          <AiFillEdit />
        </button>
        <ConfirmTooltip
          confirmText="¿Estás seguro de eliminar este post?"
          onConfirm={() => onHandleDelete()}
        >
          <button
            className={styles.postItem__button}
            onMouseEnter={onEnterButton}
            onMouseLeave={onLeave}
          >
            <AiFillDelete />
          </button>
        </ConfirmTooltip>
      </div>
    </motion.div>
  );
};

export default PostItem;
