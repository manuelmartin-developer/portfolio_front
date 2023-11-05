import { useEffect, useRef, useState } from "react";

import styles from "./Post.module.scss";

import axios, { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { AnimatePresence, motion } from "framer-motion";
import { useDraggable } from "react-use-draggable-scroll";

import { Post } from "../admin/Posts/AdminPosts";
import { useCursorStore } from "../../store/cursorStore";
import PostItem from "./PostItem";
import { BlogPageProps } from "../../pages/blog";
import Link from "next/link";

const PostList: React.FC<{
  data: BlogPageProps;
  hasCategoriesFilters: boolean;
}> = ({ data, hasCategoriesFilters }) => {
  // Refs
  const filtersButtonsRef = useRef<HTMLDivElement>(null);

  // Hooks
  const { enqueueSnackbar } = useSnackbar();
  const { events } = useDraggable(
    filtersButtonsRef && (filtersButtonsRef as any)
  );
  const postCount = data.count;

  // Componet states
  const [posts, setPosts] = useState<Post[]>(data.posts);
  const [categorySelected, setCategorySelected] = useState<number | null>(null);

  // Store
  const { setCursorVariant, setCursorText } = useCursorStore();

  // Methods
  const onGetPosts = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/posts/${
      categorySelected ? `?id_category=${categorySelected}` : ""
    }`;
    const token = localStorage.getItem("admin_token");
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      const response = await axios.get(URL, config);
      if (response.status === 200) {
        setPosts(response.data.posts);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError && axiosError.response?.data) {
        const errorData: any = axiosError.response.data;
        enqueueSnackbar(errorData.message || "Ha ocurrido un error", {
          variant: "error"
        });
      }
    }
  };

  const onEnterLink = (text?: string) => {
    text && setCursorText(text);
    setCursorVariant("link");
  };

  const onEnterSelected = () => {
    setCursorVariant("link");
    setCursorText("Clear filter");
  };

  const onLeaveLink = () => {
    setCursorVariant("default");
    setCursorText("");
  };

  // Component Lifecycle
  useEffect(() => {
    categorySelected !== null && onGetPosts();
  }, [categorySelected]);

  return (
    <div className={styles.container}>
      <div className={styles.container_left}>
        <div className={styles.filters}>
          <div
            className={styles.filters__buttons}
            ref={filtersButtonsRef}
            {...events}
          >
            {hasCategoriesFilters &&
              data.categories?.map((category) => (
                <button
                  aria-label="Filter posts"
                  className={`${styles.filters_item} ${
                    category.id_category === categorySelected
                      ? styles.filters_item_active
                      : ""
                  }`}
                  key={category.id_category}
                  onClick={() => {
                    category.id_category !== categorySelected
                      ? setCategorySelected(category.id_category)
                      : setCategorySelected(0);
                  }}
                  onMouseEnter={
                    category.id_category === categorySelected
                      ? () => onEnterSelected()
                      : () => onEnterLink()
                  }
                  onMouseLeave={onLeaveLink}
                >
                  {category.name}
                  <span className={styles.filters_item__count}>
                    {category.post_count || 0}
                  </span>
                </button>
              ))}
          </div>
          <span className={styles.filters__overlay}></span>
        </div>
        <div className={styles.card_list_title}>
          <h1>Publicaciones recientes</h1>
          <span>{postCount || 0} publicaciones</span>
        </div>
        <ul className={styles.card_list}>
          <AnimatePresence mode="popLayout">
            {posts &&
              posts.length > 0 &&
              posts.map((post) => <PostItem key={post.id_post} post={post} />)}
            {posts && posts.length === 0 && (
              <motion.h2 layoutId="no-posts">
                No hay publicaciones en esta categoría
              </motion.h2>
            )}
          </AnimatePresence>
        </ul>
      </div>
      <div className={styles.container_right}>
        <h2>Publicaciones populares</h2>
        {data.mostPopular && data.mostPopular.length > 0 ? (
          <ul className={styles.card_popular_list}>
            {data.mostPopular.map((post) => (
              <li className={styles.card_popular_list__item} key={post.slug}>
                <Link
                  className={styles.link}
                  prefetch={false}
                  href={`/blog/${post.slug}`}
                  onMouseEnter={() =>
                    onEnterLink(post.likes?.toString() + " 🎉​")
                  }
                  onMouseLeave={onLeaveLink}
                  onClick={onLeaveLink}
                >
                  <span className={styles.link_popular} aria-label="Likes">
                    {post.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <h2>No hay publicaciones destacadas</h2>
        )}
      </div>
    </div>
  );
};

export default PostList;
