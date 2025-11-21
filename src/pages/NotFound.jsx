import appStyles from '../App.module.scss';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={appStyles.NotFound}>
      <div className={appStyles.NotFoundTitle}>
        Кажется, страница ушла собирать ПК (404)
      </div>
      <Button
        onClick={() => navigate('/')}
        className={appStyles.NotFoundButton}
      >
        Вернуться на главную
      </Button>
    </div>
  );
};

export default NotFound;
