'use client';
import React, { ReactNode } from 'react';
import { Header } from '@/components/header';
import styles from '@/styles/pages/layout.module.scss';

type Props = {
  children: ReactNode;
};

const authLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <div className={styles.layout}>{children}</div>
    </>
  );
};

export default authLayout;
