import AdminHeader from "../components/AdminHeader/index.jsx";
import styles from './AdminBanners.module.scss'
import { DataGrid } from "@mui/x-data-grid";
import Button from "../components/Button";
import formStyles from '../components/Form/Form.module.scss'
import { useEffect, useState, useRef } from "react";
import Modal from '@mui/material/Modal';
import classNames from "classnames";
import CloseIcon from '@mui/icons-material/Close';
import { toast } from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { apiUrl } from "../config/api";

const AdminPanelBanners = () => {
    const [modal, showModal] = useState(false);
    const [rows, updateRows] = useState([]);
    const dataGridRef = useRef(null);
    const [form, setForm] = useState({
      link: '',
      position: 1,
      image: {
        src: '',
        preview: ''
      },
    })
    const columns = [
      {
        headerName: 'id',
        field: 'id'
      },
      {
        headerName: 'Позиция',
        field: 'position',
        width: 100,
        editable: true,
      },
      {
        headerName: 'Ссылка',
        field: 'link',
        width: 400,
        editable: true,
      },
      {
        headerName: 'Изображение (1200x356px)',
        field: 'image',
        width: 1000,
        editable: true,
        renderCell: (params) => 
        <>
          <input id={params.row.id} onChange={(e) => uploadNewImageById(params.row.id, e.target.files[0])} hidden name="file" type="file" />
          <label for={params.row.id}>
            <img className={styles.cellImage} src={params.row?.previewUrlImg || params.row.image} alt={params.row.title} />
          </label>
        </>,
      },
      {
        field: 'delete',
        sortable: false,
        headerName: 'Удалить',
        width: 70,
        renderCell: (params) => 
          <DeleteIcon 
            onClick={() => deleteBannerById(params.row.id)} 
            className={styles.deleteIcon} 
        />
      },
      {
        field: 'edit',
        sortable: false,
        headerName: 'Сохранить',
        width: 90,
        renderCell: (params) => 
          <SaveIcon 
            onClick={() => saveBannerById(params.row)} 
            className={styles.saveIcon} 
        />
      }
    ]

    const uploadNewImageById = (id, image) => {
      console.log(image);
      if (typeof image === 'object') {
        const reader = new FileReader();
        reader.onload = function(event) {
          const previewUrlImg = event.target.result;
          const updatedRows = rows.map((product) => product.id === id ? { ...product, image, previewUrlImg } : product);
          updateRows([...updatedRows]);
        };
        return reader.readAsDataURL(image);
      }
      return image;
    }

    const getBannersData = async () => {
      try {
        const response = await fetch(apiUrl('/getBanners/'));
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        updateRows(json);
        toast('Получены данные из базы данных', {
          type: 'success'
        });
        console.log('✅ Данные баннеров получены из базы данных:', json.length, 'шт.');
      } catch (error) {
        console.error('❌ Ошибка при загрузке баннеров из БД:', error);
        toast('Ошибка при загрузке данных из базы данных', {
          type: 'error'
        });
      }
    }

    useEffect(() => {
      getBannersData()
    }, [])

    const uploadImageForNewTitle = (img) => {
      const reader = new FileReader();
        reader.onload = function(event) {
          const previewUrlImg = event.target.result;
          setForm({
            ...form,
            image: {
              src: img,
              preview: previewUrlImg
            }
          })
        };
        return reader.readAsDataURL(img);
    }

    const deleteBannerById = (id) => {
      fetch(apiUrl('/deleteBanner/'), {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
          id
        })
      })
      .then(response => {
        console.log('Баннер удалён: ', response);
        toast(`Баннер ${id} удален`, {
          type: 'success'
        })
        getBannersData()
      })
      .catch(error => {
        toast('Что-то пошло не так', {
          type: 'error'
        })
        console.error('Ошибка при удалении баннера: ', error);
      });
    }
  
    const saveBannerById = (product) => {
      console.log(product)
      const formData = new FormData();
      formData.append('id', product.id);
      formData.append('file', product.image);
      formData.append('link', product.link);
      formData.append('position', product.position);
      fetch(apiUrl('/updateBannerById/'), {
        method: 'PUT',
        body: formData
      })
      .then(response => {
        console.log('Баннер обновлен: ', response);
        toast(`Баннер ${product.title} успешно обновлен`, {
          type: 'success'
        })
        getBannersData()
      })
      .catch(error => {
        toast(`Ошибка при обновлении баннера ${product.id}`, {
          type: 'error'
        })
        console.error('Ошибка при изменении баннера: ', error);
      });
    }
  

    const addNewBanner = () => {
      const formData = new FormData();
      formData.append('link', form.link);
      formData.append('position', form.position);
      formData.append('file', form.image.src);
      fetch(apiUrl('/addNewBanner/'), {
        method: 'POST',
        body: formData
      }).then((response) => {
        if (response.status === 200) {
          toast('Баннер успешно добавлен')
          getBannersData()
        } else {
          toast('Что-то пошло не так :(')
        }
      })
    }

    const processRowUpdate = (updatedRow, originalRow) => {
      const updRows = rows.map((item) => {
        if (item.id === updatedRow.id) {
          return { ...updatedRow };
        }
        return item;
      });
      console.log('updatedRows:', updRows);
      updateRows(updRows);
    };

    return <div>
      <AdminHeader />
      <div className={styles.buttonSection}>
        <Button onClick={
          () => showModal(true)
        } className={styles.button}>Добавить новый баннер</Button>
      </div>
      <DataGrid
        ref={dataGridRef}
        rowHeight={400}
        className={styles.grid}
        columns={columns}
        rows={rows}
        sortingMode="client"
        processRowUpdate={processRowUpdate}
        sortingOrder={['asc', 'desc']}
      />
      <Modal className={formStyles.modal} open={modal} >
        <div className={styles.modalCtn}>
          <CloseIcon className={styles.modalClose} onClick={() => showModal(false)}/>
          <input
            onChange={(e) => {
              setForm({ ...form, link: e.target.value });
            }}
            className={classNames(formStyles.formInput, styles.modalInput)}
            type="title"
            placeholder="Ссылка (опционально)"
          />
          <input
            onChange={(e) => {
              setForm({ ...form, position: e.target.value });
            }}
            className={classNames(formStyles.formInput, styles.modalInput)}
            type="position"
            placeholder="Позиция (DEFAULT 1)"
          />
          { form.image?.preview && <img className={styles.modalPreview} src={form.image?.preview} alt="превью"/> }
          <label for="download" className={styles.modalInputFile}>
              Загрузить изображение
              <input id="download" hidden type="file" onChange={(e) => uploadImageForNewTitle(e.target.files[0])} />
          </label>
          <Button onClick={addNewBanner} className={styles.modalButton}>Сохранить баннер</Button>
        </div>
      </Modal>
    </div>
}

export default AdminPanelBanners;