import styles from './GoogleSignInButton.module.css';
import { signIn } from "next-auth/react";

export function GoogleSignInButton() {
  const handleSignIn = () => {
    signIn('google'); // The provider ID should match the one used in your NextAuth configuration
  };
  
  return (
    <button className={styles.button}>
      <span className={styles.logo}>
        {/* Inline SVG for the Google logo */}
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.45 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.9 13.68 18.11 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.56 24.96c0-1.45-.13-2.87-.38-4.24H24v8.04h12.74c-.55 2.96-2.18 5.48-4.62 7.18l7.1 5.51c4.16-3.85 6.56-9.51 6.56-16.49z"/>
          <path fill="#FBBC05" d="M10.34 28.91c-.6-1.79-.94-3.71-.94-5.66s.34-3.87.94-5.66l-7.98-6.19C.96 15.82 0 19.77 0 24s.96 8.18 2.36 11.6l7.98-6.19z"/>
          <path fill="#34A853" d="M24 48c6.45 0 11.9-2.13 15.89-5.79l-7.1-5.51c-2.15 1.45-4.9 2.3-8.05 2.3-5.89 0-10.9-3.98-12.67-9.33l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          <path fill="none" d="M0 0h48v48H0z"/>
        </svg>
      </span>
      <span className={styles.text}>Continue with Google</span>
    </button>
  );
}