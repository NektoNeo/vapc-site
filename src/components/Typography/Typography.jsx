import styles from './Typography.module.scss';
import classNames from 'classnames';

const Typography = ({ type = 'h1', text = '', className = ''}) => {
  switch (type) {
    case 'h1':
      return <h1 className={classNames(styles.h1, className)}>{text}</h1>
    case 'h2':
      return <h2 className={classNames(styles.h2, className)}>{text}</h2>
    case 'h3':
      return <h3 className={classNames(styles.h3, className)}>{text}</h3>
    case 'p':
      return <p className={classNames(styles.p, className)}>{text}</p>
    default:
      <></>
  }
}

export default Typography;