import classNames from "classnames";
import styles from "./Button.module.scss";

const Button = (props) => {
  const { onClick, onTouchEnd, disabled } = props;
  const handleClick = (e) => {
    if (e) {
      e.stopPropagation();
    }
    if (!disabled && onClick) {
      onClick();
    }
  };
  
  if (props.type === "pink") {
    return (
      <button
        onClick={handleClick}
        onTouchEnd={() => onTouchEnd && onTouchEnd()}
        className={classNames(props.className, styles.buttonPink, {
          [styles.buttonDisabled]: disabled
        })}
        disabled={disabled}
        type="button"
      >
        <span>{props.children}</span>
      </button>
    );
  }
  return (
    <button
      onClick={handleClick}
      onTouchEnd={() => onTouchEnd && onTouchEnd()}
      className={classNames(props.className, styles.button, {
        [styles.buttonDisabled]: disabled
      })}
      disabled={disabled}
      type="button"
    >
      <span>{props.children}</span>
    </button>
  );
};

export default Button;
