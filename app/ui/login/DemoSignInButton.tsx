import { useFormState, useFormStatus } from 'react-dom';
import styles from './DemoSignInButton.module.css';
import { authenticate } from '@/app/lib/actions';
import { Button } from '../button';

export function DemoSignInButton() {
  const [_, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={dispatch}>
      <div className={styles.hiddenForm}>
        <input
          value="user@nextmail.com"
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          autoComplete='username'
          required
        />
        <input
          id="password"
          value="123456"
          type="password"
          name="password"
          placeholder="Password"
          required
          minLength={6}
          autoComplete='current-password'
        />
      </div>
      <DemoButton />
    </form>
  );
}


function DemoButton() {
  const { pending } = useFormStatus();
  return (
    <Button className={styles.button} aria-disabled={pending}>
        Demo login
    </Button>
  );
}