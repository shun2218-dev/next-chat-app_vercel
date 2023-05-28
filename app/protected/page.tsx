import SignOut from '@/components/sign-out';
import UserList from '@/components/user-list';
import styles from '@/styles/pages/protected.module.scss';

export default function Home() {
  return (
    <>
      <UserList />
      <div className={styles.chatArea}>
        <SignOut />
      </div>
    </>
  );
}
