import styles from './DemoSignInButton.module.css';
import { Button } from '../button';
import { ForwardIcon } from '@heroicons/react/24/outline';
import { authenticate } from '@/app/lib/actions';

export function DemoSignInButton() {

  const handleDemoLoginClick = async () => {
    const imaginaryFormData = new FormData();
    imaginaryFormData.append('email', 'user@nextmail.com');
    imaginaryFormData.append('password', '123456')
    await authenticate(undefined, imaginaryFormData);
  };

  return (
    <Button className={styles.button} onClick={handleDemoLoginClick}>
      <ForwardIcon style={{ width: '18px', height: '18px' }} /> Demo Login
    </Button>
  );
}
