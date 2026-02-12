import clsx from "clsx";
import styles from "./Error.module.css";
import { useState } from "react";

type ErrorProps = {
  children: React.ReactNode;
  visible: boolean;
  className?: CSSModuleClasses | string;
};

export default function Error({ children, visible, className }: ErrorProps) {
  const [lastChildren, setLastChildren] = useState(children);

  if (visible && children !== lastChildren) {
    setLastChildren(children);
  }

  return (
    <div
      className={clsx(
        styles.errorContainer,
        visible ? styles.visibleError : styles.hiddenError,
        className,
      )}
    >
      <span className={styles.errorText}>{lastChildren}</span>
    </div>
  );
}
