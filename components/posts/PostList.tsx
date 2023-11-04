import { useEffect, useState } from "react";

import styles from "./Post.module.scss";

import axios, { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { AnimatePresence, motion } from "framer-motion";

import { Post } from "../admin/Posts/AdminPosts";
import { Category } from "../admin/Categories/AdminCategories";
import { useCursorStore } from "../../store/cursorStore";
import PostItem from "./PostItem";
import { BlogPageProps } from "../../pages/blog";
import Link from "next/link";

const PostList: React.FC<{
  data: BlogPageProps;
  categoriesFilters: boolean;
}> = ({ data, categoriesFilters }) => {
  // Hooks
  const { enqueueSnackbar } = useSnackbar();
  const postCount = data.count;

  // Componet states
  const [posts, setPosts] = useState<Post[]>(data.posts);
  const [categories, setCategories] = useState<Category[]>([]);
  const [initialPosts, setInitialPosts] = useState<Post[]>();
  const [categorySelected, setCategorySelected] = useState<number | null>(null);

  // Store
  const { setCursorVariant, setCursorText } = useCursorStore();

  // Methods
  const onGetPostsCategories = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories/?type=post`;
    const token = localStorage.getItem("admin_token");
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      const response = await axios.get(URL, config);
      if (response.status === 200) {
        setCategories(response.data.categories);
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

  const getCategoryCount = (id_category: number) => {
    return initialPosts
      ?.map((post) => {
        return post.categories.filter(
          (category) => category.value === id_category
        );
      })
      .filter((post) => post.length > 0).length;
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
    categoriesFilters && onGetPostsCategories();
  }, []);

  useEffect(() => {
    categorySelected !== null && onGetPosts();
  }, [categorySelected]);

  useEffect(() => {
    setInitialPosts(data.posts);
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.container_left}>
        {categoriesFilters && (
          <div className={styles.filters}>
            {categories?.map((category) => (
              <button
                aria-label="Filter projects"
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
                  {category.id_category !== 0
                    ? getCategoryCount(category.id_category)
                    : posts.length}
                </span>
              </button>
            ))}
          </div>
        )}

        <div className={styles.card_list_title}>
          <h1>Publicaciones recientes</h1>
          <span>{postCount} publicaciones</span>
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
