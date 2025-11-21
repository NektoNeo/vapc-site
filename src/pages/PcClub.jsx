import appStyles from '../App.module.scss';
import { Header } from '../components/Header';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const PcClub = () => {
  const navigate = useNavigate();

  return (
    <div className={appStyles.main}>
      <Header />
      <div className={appStyles.container}>
        <div style={{
          paddingTop: '120px',
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontFamily: 'RS',
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '24px'
          }}>
            ПК-клуб
          </h1>
          <p style={{
            fontSize: 'clamp(16px, 2vw, 18px)',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '32px',
            maxWidth: '600px'
          }}>
            Страница находится в разработке
          </p>
          <Button onClick={() => navigate('/')}>
            Вернуться на главную
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PcClub;

