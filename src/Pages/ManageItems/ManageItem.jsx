import React from 'react'
import './ManageItem.css'
import ItemForm from '../../Components/Itemform/ItemForm'
import ItemList from '../../Components/ItemList/ItemList'

const ManageItem = () => {
  return (
    <div className="item-container text-light">
      <div className="item-left">
        <ItemForm/>
      </div>
      <div className="item-right">
        <ItemList/>
      </div>
    </div>
  )
}

export default ManageItem