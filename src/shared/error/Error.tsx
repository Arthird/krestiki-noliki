import clsx from "clsx";
import styles from "./Error.module.css";

type ErrorProps = {
  children: React.ReactNode;
  visible: boolean;
};

export default function Error({ children, visible }: ErrorProps) {
  return (
    <div
      className={clsx(
        styles.errorContainer,
        visible ? styles.visibleError : styles.hiddenError,
      )}
    >
      <span className={styles.errorText}>{children}</span>
    </div>
  );
}
