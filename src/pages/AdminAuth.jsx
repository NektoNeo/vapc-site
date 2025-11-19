import { toast } from 'react-toastify';
import Button from '../components/Button';
import styles from '../components/Form/Form.module.scss'
import Typography from '../components/Typography/Typography';
import adminStyles from './AdminStyles.module.scss'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { apiUrl } from "../config/api";

const AdminAuth = () => {
  const navigate = useNavigate();
  const [resp, updResp] = useState(false);
  const [form, setForm] = useState({
    login: '',
    password: '',
  })
  useEffect(() => {
    if (resp === 200) {
      navigate('/admin-panel/')
      toast("Авторизация прошла успешно!")
    }
  }, [resp, navigate])
  const getAccesToAdminPanel = async () => {
    const data = {
      email: form.login,
      password: form.password,
    }
    await fetch(apiUrl('/authorization/'), {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
        updResp(response.status)
    })
  }
  return (
  <div className={adminStyles.admin}>
    <Typography type='h2' text='Вход в ПА' />
        <input
          onChange={(e) => setForm({
            ...form,
            login: e.target.value
          })}
          className={styles.formInput}
          placeholder="Логин"
          value={form.login}
        />
        <input
          onChange={(e) => setForm({
            ...form,
            password: e.target.value
          })}
          className={styles.formInput}
          placeholder="Пароль"
          value={form.password}
        />
        <Button onClick={getAccesToAdminPanel}>Войти</Button>
  </div>
  )
}

export default AdminAuth;