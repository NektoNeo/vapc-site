import { useState, useRef, useEffect } from "react";
import { DataGrid  } from '@mui/x-data-grid';
import styles from './AdminPanel.module.scss';
import Button from "../components/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from "react-toastify";
import SaveIcon from '@mui/icons-material/Save';
import Modal from '@mui/material/Modal';
import formStyles from '../components/Form/Form.module.scss'
import classNames from "classnames";
import CloseIcon from '@mui/icons-material/Close';
import AdminHeader from "../components/AdminHeader";
import { apiUrl } from "../config/api";

const AdminPanel = (props) => {
  const [rows, updateRows] = useState([]);
  const [modal, showModal] = useState(false);
  const [isImageHidden, updateImageHidden] = useState(false)
  const [form, setForm] = useState({
    title: '',
    price: '',
    devices: '',
    image: {
      src: '',
      preview: ''
    },
  })
  const dataGridRef = useRef(null);
  useEffect(() => {
    getProductsData()
  }, [])
  const columns = [
    { 
      field: 'id', 
      editable: false, 
      headerName: 'id',
      width: 80,
    },
    { 
      field: 'title', 
      editable: true, 
      headerName: 'Сборка',
      width: 300,
    },
    { 
      field: 'price', 
      editable: true, 
      headerName: 'Цена',
      width: 150,
      sortComparator: (a, b) => a > b
    },
    { 
      field: 'devices', 
      editable: true, 
      headerName: 'Девайсы',
      width: 500,
      sortable: false,
    },
    { 
      field: 'image', 
      sortable: false,
      // editable: true, 
      headerName: 'Изображение (256x323)',
      width: 350,
      renderCell: (params) => 
        <>
          <input id={params.row.id} onChange={(e) => uploadNewImageById(params.row.id, e.target.files[0])} hidden name="file" type="file" />
          <label for={params.row.id}>
            <img className={styles.cellImage} src={params.row?.previewUrlImg || params.row.img} alt={params.row.title} />
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
          onClick={() => deleteProductById(params.row.id, params.row.title)} 
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
          onClick={() => saveProductById(params.row)} 
          className={styles.saveIcon} 
      />
    }
  ]

  const deleteProductById = (id, title) => {
    fetch(apiUrl('/deleteProduct/'), {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        id
      })
    })
    .then(response => {
      console.log('Сборка была удалена: ', response);
      toast(`Сборка ${title} удалена`, {
        type: 'success'
      })
      getProductsData()
    })
    .catch(error => {
      toast('Что-то пошло не так', {
        type: 'error'
      })
      console.error('Ошибка при удалении сборки: ', error);
    });
  }

  const saveProductById = (product) => {
    console.log(product)
    const formData = new FormData();
    formData.append('id', product.id);
    formData.append('file', product.img);
    formData.append('devices', product.devices);
    formData.append('price', product.price);
    formData.append('title', product.title);
    fetch(apiUrl('/updateProductById/'), {
      method: 'PUT',
      body: formData
    })
    .then(response => {
      console.log('Сборка обновлена: ', response);
      toast(`Сборка ${product.title} успешно обновлена`, {
        type: 'success'
      })
      getProductsData()
    })
    .catch(error => {
      toast(`Ошибка при обновлении сборки ${product.title}`, {
        type: 'error'
      })
      console.error('Ошибка при изменении сборки: ', error);
    });
  }

  const getProductsData = async () => {
    try {
      const response = await fetch(apiUrl('/getProducts/'));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      updateRows(json);
      toast('Получены данные из базы данных', {
        type: 'success'
      });
      console.log('✅ Данные сборок получены из базы данных:', json.length, 'шт.');
    } catch (error) {
      console.error('❌ Ошибка при загрузке сборок из БД:', error);
      toast('Ошибка при загрузке данных из базы данных', {
        type: 'error'
      });
    }
  }

  const uploadNewImageById = (id, img) => {
    if (typeof img === 'object') {
      const reader = new FileReader();
      reader.onload = function(event) {
        const previewUrlImg = event.target.result;
        const updatedRows = rows.map((product) => product.id === id ? { ...product, img, previewUrlImg } : product);
        updateRows([...updatedRows]);
      };
      return reader.readAsDataURL(img);
    }
    return img;
  }

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

  const postNewProduct = () => {
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('price', form.price);
    formData.append('devices', form.devices);
    formData.append('file', form.image.src);
    fetch(apiUrl('/addNewProduct/'), {
      method: 'POST',
      body: formData
    })
    .then(response => {
      toast('Изменения успешно сохранены :)', {
        type: 'success'
      })
      console.log('Изменения успешно сохранены: ', response);
      getProductsData()
      setForm({
        title: '',
        price: '',
        devices: '',
        img: {
          src: '',
          preview: ''
        }
      })
      showModal(false)
    })
    .catch(error => {
      toast('Что-то пошло не так)', {
        type: 'error'
      })
      console.error('Ошибка при обновлении базы данных: ', error);
    });
  }

  // const clearChanges = () => {
  //   updateRows(products.map((product) => ({ ...product })));
  // }

  const saveProducts = () => {
    // const formData = new FormData();
    const productsJson = JSON.stringify(rows);
    fetch(apiUrl('/editProducts/'), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: productsJson
    })
    .then(response => {
      toast('Изменения успешно сохранены :)', {
        type: 'success'
      })
      console.log('Изменения успешно сохранены: ', response);
      getProductsData()
    })
    .catch(error => {
      toast('Что-то пошло не так)', {
        type: 'error'
      })
      console.error('Ошибка при обновлении базы данных: ', error);
    });
  }

  return (
    // Возвращение элемента JSX, когда auth равен true
    <div>
      <AdminHeader />
      <div className={styles.buttonSection}>
        <Button 
        // onClick={() => saveProducts()} 
        onClick={() => {}}
        className={styles.button}>Сохранить изменения</Button>
        <Button onClick={
          () => showModal(true)
        } className={styles.button}>Добавить новую сборку</Button>
        {/* <Button onClick={
          () => clearChanges()
      } className={styles.button}>Отменить изменения</Button> */}
      </div>
      <DataGrid
        ref={dataGridRef}
        columns={columns}
        rows={rows}
        className={styles.grid}
        processRowUpdate={processRowUpdate}
        rowHeight={!isImageHidden ? 400 : 100}
        sortingMode="client"
        sortingOrder={['asc', 'desc']}
        onColumnVisibilityModelChange={(newModel) =>
          updateImageHidden(!newModel?.image)
        }
        initialState={{
          sorting: {
            sortModel: [
              { field: 'id', sort: 'asc' }, 
            ],
          },
        }}
      />
      <Modal className={formStyles.modal} open={modal} >
        <div className={styles.modalCtn}>
          <CloseIcon className={styles.modalClose} onClick={() => showModal(false)}/>
          <input
            onChange={(e) => {
              setForm({ ...form, title: e.target.value });
            }}
            className={classNames(formStyles.formInput, styles.modalInput)}
            type="title"
            placeholder="Название сборки"
          />
          <input
            onChange={(e) => {
              setForm({ ...form, price: e.target.value });
            }}
            className={classNames(formStyles.formInput, styles.modalInput)}
            type="price"
            placeholder="Цена сборки"
          />
          <input
            onChange={(e) => {
              setForm({ ...form, devices: e.target.value });
            }}
            className={classNames(formStyles.formInput, styles.modalInput)}
            type="title"
            placeholder="Девайсы (запятые, без ковычек)"
          />
          { form.image?.preview && <img className={styles.modalPreview} src={form.image?.preview} alt="превью"/> }
          <label for="download" className={styles.modalInputFile}>
              Загрузить изображение
              <input id="download" hidden type="file" onChange={(e) => uploadImageForNewTitle(e.target.files[0])} />
          </label>
          <Button onClick={postNewProduct} className={styles.modalButton}>Сохранить сборку</Button>
        </div>
      </Modal>
    </div>
  );
}

export default AdminPanel;