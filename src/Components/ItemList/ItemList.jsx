import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../Context/AppContext'
import { deleteItem } from '../../Services/ItemService'
import toast from 'react-hot-toast'
import './ItemList.css'

const ItemList = () => {

  const { items, setItems } = useContext(AppContext)
  const [search, setSearch] = useState("")
  const [filteredItem, setFilteredItem] = useState([])

  useEffect(() => {
    const result = items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    setFilteredItem(result)
  }, [search, items])

  const handleDelete = async (itemId) => {
    try {
      let response = await deleteItem(itemId)
      if (response.status === 200) {
        toast.success("Delete successfully")
        const updatedItems = items.filter((item) => item.itemId !== itemId)
        setItems(updatedItems)
      }
      else {
        toast.error("Error in deleting")
      }
    } catch (error) {
      console.log(error);
      toast.error("server error")
    }
  }


  return (
    <div className="item-list-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="items-wrapper">
        {filteredItem.length === 0 ? (
          <div className="no-item">No items found</div>
        ) : (
          filteredItem.map((item) => (
            <div
              key={item.itemId}
              className="item-card"
              style={{
                backgroundColor: "#2a2a40",
              }}
            >
              <img
                src={item.imgUrl}
                alt={item.name}
                className="item-img"
              />
              <div className="item-info">
                <h5 className="item-title">{item.name}</h5>

                <div className="d-flex justify-content-between align-items-center mt-2">
                  <span className="price-badge">₹{item.price}</span>
                  <span className="category-badge">{item.categoryName}</span>
                </div>
              </div>
              <button
                className="btn btn-sm btn-danger delete-btn"
                onClick={() => handleDelete(item.itemId)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ItemList