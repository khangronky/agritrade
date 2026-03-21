import type { Metadata } from 'next';
import { ForgotPasswordForm } from './form';

export const metadata: Metadata = {
  title: 'Forgot Password | AgriTrade',
  description: 'Reset your AgriTrade password',
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
