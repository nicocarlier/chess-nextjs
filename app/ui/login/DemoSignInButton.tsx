'use client'

import { authenticate } from '@/app/lib/actions';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export function DemoSignInButton() {

  const handleDemoLoginClick = async () => {
    const imaginaryFormData = new FormData();
    imaginaryFormData.append('email', 'user@nextmail.com');
    imaginaryFormData.append('password', '123456')
    await authenticate(undefined, imaginaryFormData);
  };

  return (
    <div onClick={handleDemoLoginClick} className="button-style green-button">
      <span>DEMO</span> <ArrowRightIcon className="button-arrow" />
    </div>
  );
}
