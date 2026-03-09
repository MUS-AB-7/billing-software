import React, { useContext, useState } from 'react'
import { AppContext } from '../../Context/AppContext';
import { deleteItem } from '../../Service/ItemService';
import toast from 'react-hot-toast';
import './ItemList.css'

const ItemList = () => {

  const [searchTerm, setSearchTerm] = useState('');

  const { itemsData, setItemsData } = useContext(AppContext)

  const filteredItems = itemsData.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  })

  const removeItem = async (itemId) => {
    try {
      const response = await deleteItem(itemId);

      if (response.status === 204) {
        setItemsData((prevItems) =>
          prevItems.filter((item) => item.itemId !== itemId)
        );

        toast.success("Item Deleted");
      } else {
        toast.error("Unable to delete item");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete item");
    }
  };

  return (
    <div className='category-list-container' style={{ height: '100vh', overflowX: 'auto', overflowY: 'hidden' }}>
      <div className='row pe-2'>
        <div className='input-group mb-3'>
          <input type="text"
            name='keyword'
            id='keyword'
            placeholder='Search by keyword'
            className='form-control'
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <span className='input-group-text bg-warning'>
            <i className='bi bi-search'></i>
          </span>
        </div>
      </div>
      <div className='row g-3 pe-2'>
        {
          filteredItems.map((item, index) => (
            <div className='col-12' key={index}>
              <div className='card p-3 bg-dark'>
                <div className='d-flex align-items-center'>
                  <div style={{ marginRight: '15px' }}>
                    <img src={item.imgUrl} alt={item.name} className='items-image' width={48} />
                  </div>
                  <div className='flex-grow-1'>
                    <h6 className='mb-1 text-white'>{item.name}</h6>
                    <p className='mb-0 text-white'>
                      Category : {item.categoryName}
                    </p>
                    <span className='mb-0 text-block badge rounded-pill text-bg-warning'>&#8377;{item.price}</span>
                  </div>
                  <div className='btn btn-danger btn-sm' onClick={() => removeItem(item.itemId)}>
                    <i className='bi bi-trash'></i>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ItemList
