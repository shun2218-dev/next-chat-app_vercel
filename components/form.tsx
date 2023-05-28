'use client';

import { useState, useCallback, FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import LoadingDots from '@/components/loading-dots';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  TextField,
  Button,
  Typography,
  TypographyProps,
  ButtonProps,
} from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/lib/theme';
import styled from '@emotion/styled';

const SButton = styled(Button)<ButtonProps>(({ theme }) => ({
  textTransform: 'capitalize',
  border: '1px solid transparent',
  '&:hover': {
    backgroundColor: 'transparent',
    color: '#000000',
    border: '1px solid #000000',
  },
  '&:disabled': {
    cursor: 'not-allowed',
    pointerEvents: 'auto',
  },
}));

const STypography = styled(Typography)<TypographyProps>(({ theme }) => ({
  '& a': {
    fontWeight: 600,
    color: 'rgb(31 41 55)',
    margin: '0 0.3rem',
  },
}));

export default function Form({ type }: { type: 'login' | 'register' }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        setLoading(true);
        switch (type) {
          case 'login':
            const result = await signIn('credentials', {
              redirect: false,
              email: e.currentTarget.email.value,
              password: e.currentTarget.password.value,
            });
            if (result?.error) {
              toast.error(result.error);
              throw new Error(result.error);
            } else {
              router.refresh();
              router.push('/protected');
            }
          case 'register':
            const response = await fetch('/api/auth/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: e.currentTarget.email.value,
                password: e.currentTarget.password.value,
              }),
            });
            if (response.status === 200) {
              toast.success('Account created! Redirecting to login...');
              setTimeout(() => {
                router.push('/login');
              }, 2000);
            } else {
              const { error } = await response.json();
              toast.error(error);
              throw new Error(error);
            }
        }
      } catch (err) {
        if (err instanceof Error) console.error(err.message);
      } finally {
        setLoading(false);
      }
    },
    [router, type]
  );

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
    >
      <div>
        <TextField
          label="Email Address"
          id="email"
          name="email"
          type="email"
          placeholder="next@example.com"
          autoComplete="email"
          required
          aria-required
          fullWidth
        />
      </div>
      <div>
        <TextField
          label="Password"
          name="password"
          id="password"
          type="password"
          required
          aria-required
          fullWidth
        />
      </div>
      <ThemeProvider theme={theme}>
        <SButton
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? (
            <LoadingDots color="#808080" />
          ) : (
            <Typography>{type === 'login' ? 'Sign In' : 'Sign Up'}</Typography>
          )}
        </SButton>
      </ThemeProvider>
      {type === 'login' ? (
        <STypography align="center" variant="subtitle1" paragraph>
          Don&apos;t have an account?
          <Link href="/register">Sign up</Link>
          for free.
        </STypography>
      ) : (
        <STypography align="center" variant="subtitle1" paragraph>
          Already have an account?
          <Link href="/login">Sign in</Link>
          instead.
        </STypography>
      )}
    </form>
  );
}
