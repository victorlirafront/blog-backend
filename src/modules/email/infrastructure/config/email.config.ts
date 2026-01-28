import { registerAs } from '@nestjs/config';

export default registerAs('email', () => ({
  resendApiKey: process.env.RESEND_API_KEY,
  fromEmail: process.env.EMAIL_FROM || 'onboarding@resend.dev',
  defaultRecipient:
    process.env.EMAIL_DEFAULT_RECIPIENT || 'victorliradev@gmail.com',
}));
