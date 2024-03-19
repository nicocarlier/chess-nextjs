import { useFormState, useFormStatus } from 'react-dom';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../button';
import { authenticate } from '@/app/lib/actions';
import styles from './login-form.module.css';

export function EmailSignUp() {

  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  
  return (
    <form action={dispatch} className="space-y-3">
      <div className={styles.inputContainer}>
          <input
            className={styles.inputField}
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            autoComplete='username'
            required
          />
          <AtSymbolIcon className={styles.inputIcon} />
      </div>
      <div className={styles.inputContainer}>
        <input
          className={styles.inputField}
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          required
          minLength={6}
          autoComplete='current-password'
        />
        <KeyIcon className={styles.inputIcon} />
      </div>

      <LoginButton />

      <div
        className={styles.errorMessage}
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  const buttonClasses = `${styles.loginButton} ${pending ? styles.loginButtonDisabled : ''}`;
  return (
    <Button className={buttonClasses} aria-disabled={pending}>
      Log in
    </Button>
  );
}