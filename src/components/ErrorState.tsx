import styles from './ErrorState.module.css';

type ErrorStateProps = {
  title?: string;
  message?: string;
};

export function ErrorState({
  title = 'Something went wrong',
  message = 'Please try again after some time.',
}: ErrorStateProps) {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}