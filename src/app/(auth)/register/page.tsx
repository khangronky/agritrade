import type { Metadata } from 'next';
import { RegisterForm } from './form';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Create your AgriTrade account',
};

export default function RegisterPage() {
  return <RegisterForm />;
}
