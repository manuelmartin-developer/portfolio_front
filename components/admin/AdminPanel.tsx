import { AnimatePresence, motion } from "framer-motion";
import { useAdminStore } from "../../store/adminStore";
import styles from "./AdminPanel.module.scss";
import { useEffect, useState, useRef } from "react";
import { MdPostAdd } from "react-icons/md";
import { GrClose } from "@react-icons/all-files/gr/GrClose";
import { useCursorStore } from "../../store/cursorStore";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDropzone } from "react-dropzone";

// Dynamic import
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  {
    ssr: false
  }
);

export interface Post {
  code: string;
  title: string;
  content: string;
  image: string | null;
  categories: string[];
  isDraft: boolean;
  slug: string;
  author: string;
}

export interface User {
  name: string;
  email: string;
  role: string;
}

const AdminPanel = () => {
  // Refs
  const inputTitleRef = useRef<HTMLInputElement>(null);
  const inputSlugRef = useRef<HTMLInputElement>(null);
  const inputCategoriesRef = useRef<HTMLInputElement>(null);
  const selectAuthorRef = useRef<HTMLSelectElement>(null);

  // Hooks
  const {
    getRootProps: getRootPropsGallery,
    getInputProps: getInputPropsGallery,
    isDragAccept: isDragAcceptImage,
    isDragActive: isDragActiveImage
  } = useDropzone({
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp"] },
    multiple: true,
    onDrop: (acceptedFiles) => {
      onAddGallery();
    }
  });

  // Store
  const { setAdminLoggedIn } = useAdminStore();
  const { setCursorVariant } = useCursorStore();

  // Component states
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDraggingBtn, setIsDraggingBtn] = useState<boolean>(false);
  const [menuContent, setMenuContent] = useState<"selector" | "posts">(
    "selector"
  );
  const [posts, setPosts] = useState<Post[]>();
  const [isAddingPost, setIsAddingPost] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [content, setContent] = useState<string>();
  const [categories, setCategories] = useState<string[]>([]);
  const [author, setAuthor] = useState<string>("");
  const [isDraft, setIsDraft] = useState<boolean>(true);
  const [editorState, setEditorState] = useState<EditorState>();
  const [files, setFiles] = useState<File[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  // Methods
  const getEditorContent = () => {
    if (!editorState) return;
    const currentContent = editorState.getCurrentContent();
    const raw = convertToRaw(currentContent);
    const html = draftToHtml(raw);
    setContent(html);
  };

  const onEnterButton = () => {
    setCursorVariant("dot");
  };

  const onLeaveAdminButton = () => {
    setCursorVariant("default");
  };

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
        toast.error(errorData.message);
      } else {
        toast.error("Ha ocurrido un error");
      }
    }
  };

  const onGetUsers = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/users`;
    const token = localStorage.getItem("admin_token");
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      const response = await axios.get(URL, config);
      if (response.status === 200) {
        setUsers(response.data.users);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError && axiosError.response?.data) {
        const errorData: any = axiosError.response.data;
        toast.error(errorData.message);
      } else {
        toast.error("Ha ocurrido un error");
      }
    }
  };

  const onAddPost = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/posts/${editingPost?.code}}`;
    const token = localStorage.getItem("admin_token");
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      const response = await axios.put(
        URL,
        {
          title,
          slug,
          content,
          categories,
          author,
          isDraft
        },
        config
      );
      if (response.status === 201) {
        toast.success("Post creado");
        setIsAddingPost(false);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError && axiosError.response?.data) {
        const errorData: any = axiosError.response.data;
        toast.error(errorData.message);
      } else {
        toast.error("Ha ocurrido un error");
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
        toast.success("Post creado");
        setEditingPost(response.data.post);
        setIsAddingPost(true);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError && axiosError.response?.data) {
        const errorData: any = axiosError.response.data;
        toast.error(errorData.message);
      } else {
        toast.error("Ha ocurrido un error");
      }
    }
  };

  const onAddGallery = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/files/${editingPost?.code}`;
    const token = localStorage.getItem("admin_token");
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("gallery", file);
      });
      const response = await axios.post(URL, formData, config);
      if (response.status === 201) {
        toast.success("Archivos subidos");
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError && axiosError.response?.data) {
        const errorData: any = axiosError.response.data;
        toast.error(errorData.message);
      } else {
        toast.error("Ha ocurrido un error");
      }
    }
  };

  // Component lifecycle
  useEffect(() => {
    menuContent === "posts" && !isAddingPost && onGetPosts();
  }, [menuContent, isAddingPost]);

  useEffect(() => {
    isAddingPost && onGetUsers();
    if (!isAddingPost) {
      setTitle("");
      setSlug("");
      setContent("");
      setCategories([]);
      setAuthor("");
      setIsDraft(true);
      setEditorState(EditorState.createEmpty());
      setFiles([]);
    }
  }, [isAddingPost]);

  useEffect(() => {
    getEditorContent();
  }, [editorState]);

  return (
    <div
      className={styles.adminPanel_container}
      onMouseEnter={onLeaveAdminButton}
    >
      <motion.div
        drag
        dragMomentum={false}
        whileDrag={{ scale: 1.2 }}
        onDragStart={() => setIsDraggingBtn(true)}
        onDragEnd={() => setTimeout(() => setIsDraggingBtn(false), 100)}
        className={styles.menuBtn}
        id="adminPanelBtn"
        onClick={() => !isDraggingBtn && setIsMenuOpen(!isMenuOpen)}
        role="button"
        onMouseEnter={onEnterButton}
        onMouseLeave={onLeaveAdminButton}
      >
        {!isMenuOpen && <MdPostAdd size={"1.5rem"} />}
        {isMenuOpen && <GrClose size={"1.5rem"} />}
      </motion.div>
      <div
        className={`${styles.adminPanel_content} ${
          isMenuOpen ? styles.adminPanel_content_open : ""
        }`}
      >
        <div className={`${styles.adminPanel_content_container}`}>
          {menuContent !== "selector" && (
            <div className={styles.adminPanel_content_header}>
              <h2 className={styles.adminPanel_content_header__title}>
                {menuContent === "posts" && "Posts"}
              </h2>
              <button
                className={styles.btn}
                onClick={() => setMenuContent("selector")}
                onMouseEnter={onEnterButton}
                onMouseLeave={onLeaveAdminButton}
              >
                Atrás
              </button>
            </div>
          )}
          {menuContent === "selector" && (
            <div className={styles.adminPanel_content_selector}>
              <button
                className={styles.btn}
                onClick={() => setMenuContent("posts")}
                onMouseEnter={onEnterButton}
                onMouseLeave={onLeaveAdminButton}
              >
                Posts
              </button>
            </div>
          )}
          {menuContent === "posts" && (
            <>
              <button
                className={`${styles.btn} ${
                  isAddingPost ? styles.btn_disabled : ""
                }`}
                onClick={() => !isAddingPost && onAddEmptyPost()}
                onMouseEnter={onEnterButton}
                onMouseLeave={onLeaveAdminButton}
              >
                Agregar post
              </button>
              {!isAddingPost && (
                <div className={styles.adminPanel_content_posts}>
                  {posts &&
                    posts?.length > 0 &&
                    posts.map((post: any) => (
                      <div key={post.code} className={styles.post}>
                        <h3 className={styles.post__title}>{post.title}</h3>
                        <p className={styles.post__content}>{post.content}</p>
                        <p className={styles.post__author}>{post.author}</p>
                        <p className={styles.post__categories}>
                          {post.categories.join(", ")}
                        </p>
                      </div>
                    ))}
                  {posts?.length === 0 && (
                    <p className={styles.adminPanel_content_posts__empty}>
                      No hay posts
                    </p>
                  )}
                </div>
              )}
              {isAddingPost && (
                <div className={styles.adminPanel_content_posts}>
                  <div className={styles.adminPanel_content_posts__form}>
                    <div
                      className={styles.adminPanel_content_posts__form__gallery}
                    >
                      <AnimatePresence mode="popLayout">
                        {files.length > 0 &&
                          files.map((file: any) => (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              key={file.name}
                              style={{
                                backgroundImage: `url(${URL.createObjectURL(
                                  file
                                )})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                position: "relative",
                                width: "150px",
                                minWidth: "150px",
                                height: "150px",
                                borderRadius: "8px"
                              }}
                            >
                              <button
                                onMouseEnter={onEnterButton}
                                onMouseLeave={onLeaveAdminButton}
                                style={{
                                  position: "absolute",
                                  top: "-10px",
                                  right: "-10px",
                                  width: "20px",
                                  minWidth: "20px",
                                  height: "20px",
                                  borderRadius: "50%",
                                  backgroundColor: "#000",
                                  color: "#fff",
                                  border: "none",
                                  cursor: "pointer",
                                  zIndex: 99999
                                }}
                                onClick={() => {
                                  const newFiles = files.filter(
                                    (f) => f.name !== file.name
                                  );
                                  setFiles(newFiles);
                                }}
                              >
                                X
                              </button>
                            </motion.div>
                          ))}
                      </AnimatePresence>
                    </div>
                    <div
                      {...getRootPropsGallery({
                        className: "blog_gallery__dropzone",
                        style: {
                          transition: "all 0.3s ease",
                          border:
                            isDragActiveImage && isDragAcceptImage
                              ? "2px dashed rgba(147, 213, 0, 1)"
                              : isDragActiveImage && !isDragAcceptImage
                              ? "2px dashed #ff4b26"
                              : "0px dashed #fff"
                        }
                      })}
                    >
                      <input {...getInputPropsGallery()} />
                      <p>
                        Arrastra una imagen o haz click para seleccionar una
                      </p>
                    </div>
                    <form>
                      <input
                        type="text"
                        ref={inputTitleRef}
                        placeholder="Título"
                        className={styles.input}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <input
                        type="text"
                        ref={inputSlugRef}
                        placeholder="Slug"
                        className={`${styles.input} ${styles.input_disabled}`}
                        value={title
                          .toLocaleLowerCase()
                          .replace(/\s/g, "-")
                          .replace(/[^a-zA-Z0-9-]/g, "")}
                        disabled
                      />
                      <input
                        type="text"
                        ref={inputCategoriesRef}
                        placeholder="Categorías"
                        className={styles.input}
                        onChange={(e) =>
                          setCategories(e.target.value.split(","))
                        }
                      />
                      <select
                        className={styles.input}
                        ref={selectAuthorRef}
                        onChange={(e) => setAuthor(e.target.value)}
                      >
                        {users?.length > 0 && (
                          <>
                            <option value="" disabled selected>
                              Autor
                            </option>
                            {users.map((user: any, index: number) => (
                              <option key={index} value={user.name}>
                                {user.name}
                              </option>
                            ))}
                          </>
                        )}
                      </select>
                      <div className={styles.checkbox}>
                        <input
                          type="checkbox"
                          id="isDraft"
                          name="isDraft"
                          checked={isDraft}
                          onChange={() => setIsDraft(!isDraft)}
                        />
                        <label htmlFor="isDraft">Borrador</label>
                      </div>

                      <div
                        className={
                          styles.adminPanel_content_posts__form__footer
                        }
                      >
                        <button
                          className={styles.btn}
                          onClick={(e) => {
                            e.preventDefault();
                            setIsAddingPost(false);
                          }}
                          onMouseEnter={onEnterButton}
                          onMouseLeave={onLeaveAdminButton}
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className={`${styles.btn} ${
                            !title || !content || !categories || !author
                              ? styles.btn_disabled
                              : ""
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            onAddPost();
                          }}
                          onMouseEnter={onEnterButton}
                          onMouseLeave={onLeaveAdminButton}
                        >
                          Agregar
                        </button>
                      </div>
                    </form>
                  </div>
                  <Editor
                    localization={{
                      locale: "es"
                    }}
                    editorState={editorState}
                    toolbarClassName="blogEditorToolbar"
                    wrapperClassName="blogEditorWrapper"
                    editorClassName="blogEditor"
                    onEditorStateChange={(editorState) =>
                      setEditorState(editorState)
                    }
                  />
                </div>
              )}
            </>
          )}
          <div className={styles.adminPanel_content_footer}>
            <button
              className={styles.btn}
              onClick={() => {
                localStorage.removeItem("admin_token");
                setAdminLoggedIn(false);
              }}
              onMouseEnter={onEnterButton}
              onMouseLeave={onLeaveAdminButton}
            >
              Salir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
