import classNames from "classnames";
import styles from "./Button.module.scss";

const Button = (props) => {
  const { onClick, onTouchEnd } = props;
  if (props.type === "pink") {
    return (
      <div
        onClick={() => onClick()}
        onTouchEnd={() => onTouchEnd()}
        className={classNames(props.className, styles.buttonPink)}
      >
        <span>{props.children}</span>
      </div>
    );
  }
  return (
    <div
      onClick={() => onClick()}
      onTouchEnd={() => onTouchEnd()}
      className={classNames(props.className, styles.button)}
    >
      <span>{props.children}</span>
    </div>
  );
};

export default Button;
