import { NextPage } from "next";
import Head from "next/head";
import styles from "@/styles/Admin.module.scss";
import { useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useAdminStore } from "../store/adminStore";
import { BsEye } from "@react-icons/all-files/bs/BsEye";
import { BsEyeSlash } from "@react-icons/all-files/bs/BsEyeSlash";
import { AnimatePresence, motion } from "framer-motion";

const AdminPage: NextPage = () => {
  // Refs
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  // Store
  const { isAdminLoggedIn, setAdminLoggedIn } = useAdminStore();

  // Component states
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  // Methods
  const onHandleLogin = async () => {
    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;
    const body = {
      email,
      password
    };
    try {
      const response = await axios.post(URL, body);
      if (response.status === 200) {
        toast.success("Login correcto");
        console.log(response.data);
        localStorage.setItem("admin_token", response.data.token);
        setAdminLoggedIn(true);
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err && err.response?.data) {
        const errorData: any = err.response.data;
        toast.error(errorData.message);
      } else {
        toast.error("Ha existido un error en el servidor");
      }
    }
  };

  const isShowPasswordHandler = () => {
    setIsPasswordShow(!isPasswordShow);
  };

  return (
    <>
      <Head>
        <title>Manuel Martín | Admin</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AnimatePresence mode="wait">
        <div className={styles.container}>
          {!isAdminLoggedIn && (
            <motion.form
              onSubmit={(e) => {
                e.preventDefault();
                onHandleLogin();
              }}
              key="login"
              className={styles.container_form}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className={styles.formGroup}>
                <input
                  className={`${styles.input}`}
                  type="email"
                  name="email"
                  id="email"
                  onChange={() => {
                    emailInputRef.current?.value
                      ? setIsButtonDisabled(false)
                      : setIsButtonDisabled(true);
                  }}
                  ref={emailInputRef}
                  placeholder="Email"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  className={`${styles.input}`}
                  type={isPasswordShow ? "text" : "password"}
                  name="password"
                  id="password"
                  ref={passwordInputRef}
                  placeholder="Contraseña"
                  required
                />
                {isPasswordShow ? (
                  <BsEyeSlash
                    onClick={isShowPasswordHandler}
                    className={styles.passIcon}
                    color="#fff"
                  />
                ) : (
                  <BsEye
                    onClick={isShowPasswordHandler}
                    className={styles.passIcon}
                    color="#fff"
                  />
                )}
              </div>
              <div className={styles.formGroup}>
                <button type="submit" disabled={isButtonDisabled}>
                  Iniciar sesión
                </button>
              </div>
            </motion.form>
          )}
          {isAdminLoggedIn && (
            <motion.div
              className={styles.adminPanel_container}
              key="logged"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className={styles.adminPanel_content}>
                <h1>Ya estás logueado como administrador</h1>
              </div>
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    </>
  );
};

export default AdminPage;
