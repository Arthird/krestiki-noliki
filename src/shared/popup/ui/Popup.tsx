import clsx from "clsx";
import styles from "./Popup.module.css";
import type { PopupAction } from "../model/PopupAction";
import { useEffect, useRef } from "react";

type PopupPrpos = {
  children: React.ReactNode;
  actions: PopupAction[];
  isOpen: boolean;
  className?: CSSModuleClasses | string;
};

export default function Popup({
  actions,
  className,
  children,
  isOpen,
}: PopupPrpos) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    }

    if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} className={clsx(styles.dialog, className)}>
      {children}
      <hr className={ styles.dividingLine} />
      <menu className={styles.actionMenu}>
        {actions.map((action, index) => {
          return (
            <li key={index}>
              <button onClick={action.fun} type="button">
                {action.name}
              </button>
            </li>
          );
        })}
        <li>
          <button type="button" onClick={() => dialogRef.current?.close()}>
            Закрыть
          </button>
        </li>
      </menu>
    </dialog>
  );
}
