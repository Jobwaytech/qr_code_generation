import Head from "next/head";
import { useState } from "react";
import styles from "@/styles/login.module.css";
import Image from "next/image";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Handle login logic here
      console.log("Login attempt:", formData, rememberMe);
      window.alert(
        "Login attempt: " +
          JSON.stringify(formData) +
          ", Remember Me: " +
          rememberMe,
      );
      if (!formData.email || !formData.password) {
        window.alert("Please fill in both email and password.");
        return;
      }
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        window.alert("Please enter a valid email address.");
        return;
      }
      window.location.href = "/dashboard"; // Redirect to dashboard on successful login
      // You can add your login API call here
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>
          Smart Employee, Student & Document Verification Management System
        </title>
        <meta name="description" content="Enterprise verification management" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.logo}>
              <Image src="/Logo.png" alt="Logo" width={100} height={100} />
            </div>
            <h1 className={styles.title}>Smart Employee, Student & Document</h1>
            <h2 className={styles.subtitle}>Verification Management System</h2>
            <p className={styles.tagline}>Sign in to your enterprise account</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.checkboxRow}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember Me
              </label>
              <a href="#" className={styles.forgotLink}>
                Forgot password?
              </a>
            </div>

            <button type="submit" disabled={loading} className={styles.button}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
