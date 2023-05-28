// These styles apply to every route in the application
import '@/styles/globals.css';
import { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
const roboto = Roboto({
  variable: '--font-roboto',
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
});

const title = 'Next.js Prisma Postgres Auth Starter';
const description =
  'This is a Next.js starter kit that uses Next-Auth for simple email + password login and a Postgres database to persist the data.';

export const metadata: Metadata = {
  title,
  description,
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  metadataBase: new URL('https://nextjs-postgres-auth.vercel.app'),
  themeColor: '#FFF',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
