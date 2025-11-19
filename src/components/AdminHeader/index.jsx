import HeaderMenu from "../HeaderMenu"
import styles from './AdminHeader.module.scss';

const AdminHeader = () => {
  const menuLinks = [
    {
      name: 'Баннеры',
      link: '/admin-panel/banners',
    },
    {
      name: 'Сборки',
      link: '/admin-panel'
    },
    {
      name: 'Фильтры',
      link: '/admin-panel/filters'
    }
  ]
  return <div className={styles.header}>
    <HeaderMenu menuItems={menuLinks} />
  </div>
}

export default AdminHeader;