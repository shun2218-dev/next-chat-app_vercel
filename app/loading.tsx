'use client';
import React from 'react';
import { CircularProgress } from '@mui/material';
import styles from '@/styles/pages/loading.module.scss';

const Loading = () => {
  return (
    <div className={styles.loading}>
      <CircularProgress color="inherit" />
    </div>
  );
};

export default Loading;
