'use client';
import { useState, useEffect, memo } from 'react';
import { Avatar } from '@mui/material';
import { Session } from 'next-auth';
import { Profile } from '@prisma/client';
import { getSession } from 'next-auth/react';

const AuthStatusMemo = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const getProfile = async (session: Session | null) => {
    if (session === null) return null;
    const res = await fetch('/api/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: session.user?.email }),
    });
    const data: Profile | null = await res.json();
    return data;
  };
  useEffect(() => {
    getSession().then((session) => {
      getProfile(session).then((data) => setProfile(data));
    });
  }, []);
  return (
    // <div className="absolute top-5 w-full flex justify-center items-center">
    <>
      {profile ? (
        <Avatar alt="avatar image" src={profile.phoroURL} />
      ) : (
        <Avatar alt="avatar image" />
      )}
    </>
    // </div>
  );
};

const AuthStatus = memo(AuthStatusMemo);

export { AuthStatus };
