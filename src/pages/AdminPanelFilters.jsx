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
const AdminPanelFilters = () => {
  const [modal, showModal] = useState(false);
    const [rows, updateRows] = useState([]);
    const dataGridRef = useRef(null);
    const [form, setForm] = useState({
      from: '',
      to: ''
    })
  
  const columns = [
    {
      headerName: 'id',
      field: 'id',
      width: 250,
    },
    {
      headerName: 'От',
      field: 'filterFrom',
      width: 250,
    },
    {
      headerName: 'До',
      field: 'filterTo',
      width: 1000
    },
    {
      field: 'delete',
      sortable: false,
      headerName: 'Удалить',
      width: 70,
      renderCell: (params) => 
        <DeleteIcon 
          onClick={() => deleteFilterById(params.row.id)} 
          className={styles.deleteIcon} 
      />
    },
  ]

  useEffect(() => {
    getFiltersData()
  }, [])

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

  const getFiltersData = async () => {
    await fetch(apiUrl('/getFilters/')).then( async (response) => {
      let json = await response.json();
      updateRows(json)
      toast('Получены данные из базы данных', {
        type: 'success'
      })
    })
  }

  const deleteFilterById = (id) => {
    fetch(apiUrl('/deleteFilter/'), {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        id
      })
    })
    .then(response => {
      console.log('Фильтр удалён: ', response);
      toast(`Фильтр ${id} удален`, {
        type: 'success'
      })
      getFiltersData()
    })
    .catch(error => {
      toast('Что-то пошло не так', {
        type: 'error'
      })
      console.error('Ошибка при удалении фильтра: ', error);
    });
  }

  const addNewFilter = () => {
    const formData = new FormData();
    formData.append('filterFrom', form.from);
    formData.append('filterTo', form.to);
    fetch(apiUrl('/addNewFilter/'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filterFrom: form.from,
        filterTo: form.to
      })
    }).then((response) => {
      if (response.status === 200) {
        toast('Фильтр успешно добавлен')
        getFiltersData()
      } else {
        toast('Что-то пошло не так :(')
      }
    })
  }

  return <>
    <AdminHeader />
    <div className={styles.buttonSection}>
      <Button 
        onClick={() => showModal(true)} 
        className={styles.button}>
          Добавить новый фильтр
      </Button>
    </div>
    <DataGrid
        ref={dataGridRef}
        rowHeight={50}
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
              setForm({ ...form, from: e.target.value });
            }}
            className={classNames(formStyles.formInput, styles.modalInput)}
            type="title"
            placeholder="От"
          />
          <input
            onChange={(e) => {
              setForm({ ...form, to: e.target.value });
            }}
            className={classNames(formStyles.formInput, styles.modalInput)}
            type="position"
            placeholder="До"
          />
          <Button onClick={addNewFilter} className={styles.modalButton}>Сохранить фильтр</Button>
        </div>
      </Modal>
  </>
}

export default AdminPanelFilters;