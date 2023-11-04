import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import axios, { AxiosError } from "axios";

import TextButton from "../../UI/Buttons/TextButton";
import { useSnackbar } from "notistack";

export type PostImage = { url: string; name: string; size: number };

export interface Post {
  code: string;
  id_post: number;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: PostImage;
  gallery: PostImage[];
  categories: {
    value: number;
    label: string;
  }[];
  isDraft: boolean;
  slug: string;
  author: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  code: string;
  name: string;
  email: string;
  role: string;
}

// Dynamic imports
const PostList = dynamic(() => import("../Posts/List/PostList"));
const PostForm = dynamic(() => import("../Posts/Form/PostForm"));

const AdminPosts: React.FC<{
  isAddingPost: boolean;
  setIsAddingPost: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isAddingPost, setIsAddingPost }) => {
  // Hooks
  const { enqueueSnackbar } = useSnackbar();
  // Component states
  const [posts, setPosts] = useState<Post[]>();
  const [isEditingPost, setIsEditingPost] = useState<boolean>(false);
  const [postInFocus, setPostInFocus] = useState<Post | null>(null);

  // Methods
  const onGetPosts = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/posts/admin`;
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
        enqueueSnackbar(errorData?.message || "Ha ocurrido un error", {
          variant: "error"
        });
      }
    }
  };

  const onAddEmptyPost = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/posts`;
    const token = localStorage.getItem("admin_token");
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const payload = {
      title: "",
      slug: "",
      content: "",
      categories: [],
      isDraft: true
    };

    try {
      const response = await axios.post(URL, payload, config);
      if (response.status === 201) {
        enqueueSnackbar("Borrador de post creado", { variant: "success" });
        setPostInFocus(response.data.post);
        setIsAddingPost(true);
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

  // Component lifecycle
  useEffect(() => {
    !isAddingPost && !isEditingPost && onGetPosts();
  }, [isAddingPost, isEditingPost]);

  return (
    <>
      {!isAddingPost && !isEditingPost && (
        <TextButton
          text="Agregar post"
          onClick={() => !isAddingPost && onAddEmptyPost()}
          isDisabled={isAddingPost || isEditingPost}
        />
      )}

      {!isAddingPost && !isEditingPost && (
        <PostList
          posts={posts}
          setPosts={setPosts}
          setIsEditingPost={setIsEditingPost}
          setPostInFocus={setPostInFocus}
        />
      )}
      {(isAddingPost || isEditingPost) && (
        <PostForm
          postInFocus={postInFocus}
          isAddingPost={isAddingPost}
          setIsAddingPost={setIsAddingPost}
          isEditingPost={isEditingPost}
          setIsEditingPost={setIsEditingPost}
        />
      )}
    </>
  );
};

export default AdminPosts;
