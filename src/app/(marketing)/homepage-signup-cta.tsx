'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9\s-]+$/;

function isValidContact(value: string) {
  if (emailPattern.test(value)) {
    return true;
  }

  if (!phonePattern.test(value)) {
    return false;
  }

  const digitsOnly = value.replace(/\D/g, '');
  return digitsOnly.length >= 8 && digitsOnly.length <= 15;
}

export function HomepageSignupCta() {
  const router = useRouter();
  const [contact, setContact] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = contact.trim();

    if (!isValidContact(normalized)) {
      setError('Please enter a valid email or phone number.');
      return;
    }

    setError('');
    router.push('/register');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-9 max-w-md">
      <label htmlFor="homepage-signup" className="sr-only">
        Email or phone number
      </label>
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <input
          id="homepage-signup"
          type="text"
          value={contact}
          onChange={(event) => {
            setContact(event.target.value);
            if (error) {
              setError('');
            }
          }}
          placeholder="Email/Phone number"
          className="h-11 flex-1 rounded-none border border-lime-200 bg-white px-4 text-lime-950 text-sm placeholder:text-muted-foreground transition-colors duration-300 focus:border-ring focus:outline-hidden"
        />
        <button
          type="submit"
          className="h-11 rounded-none border border-primary bg-primary px-6 font-semibold text-lime-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
        >
          Sign Up
        </button>
      </div>
      <p className="mt-2 min-h-5 text-[13px] text-rose-600">
        {error || '\u00A0'}
      </p>
    </form>
  );
}
