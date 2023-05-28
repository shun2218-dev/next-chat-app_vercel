import Image from 'next/image';
import Form from '@/components/form';
import Link from 'next/link';
import styles from '@/styles/auth.module.scss';

export default function Login() {
  return (
    <div className={styles.inner}>
      <div className={styles.card}>
        <div className={styles.header}>
          <Link href="/">
            <Image
              src="/logo.png"
              priority
              alt="Logo"
              className={styles.logo}
              width={20}
              height={20}
            />
          </Link>
          <h3 className={styles.title}>Sign Up</h3>
          <p className={styles.description}>
            Create an account with your email and password
          </p>
        </div>
        <Form type="register" />
      </div>
    </div>
  );
}
