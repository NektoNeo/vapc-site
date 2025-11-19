import appStyles from '../App.module.scss';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  let navigate = useNavigate();
    return (
        <div className={appStyles.NotFound}>
          <div className={appStyles.NotFoundTitle}>
            Такой страницы не существует 404
          </div>
          <Button
             onClick={() => navigate('/')}
             className={appStyles.NotFoundButton}>
              Вернуться на главную страницу
          </Button>
        </div>
    )
}

export default NotFound;