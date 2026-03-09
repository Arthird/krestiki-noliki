import styles from "./ActionsContainer.module.css";

export type ActionItem = {
  label: string;
  onClick: () => void;
};

type ActionsContainerProps = {
  actions: ActionItem[];
  hasError?: boolean;
};

export default function ActionsContainer({
  actions,
  hasError = false,
}: ActionsContainerProps) {
  return (
    <div className={styles.actionsContainer} data-error={hasError}>
      {actions.map((action, index) => (
        <button key={index} onClick={action.onClick}>
          {action.label}
        </button>
      ))}
    </div>
  );
}
