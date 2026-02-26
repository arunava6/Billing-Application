import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import "./CategoryList.css";
import { deleteCategory } from "../../Services/CategoryService";
import toast from "react-hot-toast";

const CategoryList = () => {
  const { categories, setCategories } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    setFilteredCategories(
      categories.filter((cat) =>
        cat.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, categories]);

  // Function to decide text color based on background color brightness
  const getTextColor = (bgColor) => {
    if (!bgColor) return "#fff";
    // Convert hex to RGB
    const hex = bgColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    // Brightness formula
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 180 ? "#000" : "#fff";
  };

  const handleDelete = async (categoryId) => {
    try {
      let response = await deleteCategory(categoryId)
      if (response.status === 200) {
        const updatedCategories = categories.filter(category => category.categoryId !== categoryId)
        setCategories(updatedCategories)
        toast.success("Delete successfully")
      } else {
        toast.error("error in delete")
      }
    } catch (error) {
      toast.error("server error")
    }
  }

  return (
    <div className="category-list-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="categories-wrapper">
        {filteredCategories.length === 0 ? (
          <div className="no-category">No categories found</div>
        ) : (
          filteredCategories.map((category) => (
            <div
              key={category.categoryId}
              className="category-card"
              style={{
                backgroundColor: category.bgColor || "#2a2a40",
                color: getTextColor(category.bgColor),
              }}
            >
              <img
                src={category.imgUrl}
                alt={category.name}
                className="category-img"
              />
              <div className="category-info">
                <h5>{category.name}</h5>
                <p>items: 5 </p>
              </div>
              <button
                className="btn btn-sm btn-danger delete-btn"
                onClick={() => handleDelete(category.categoryId)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryList;
