import React, { useState } from "react";
import Logo from "./Logo";
import Stats from "./Stats";

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("General");

  function handleSubmit(e) {
    e.preventDefault();

    if (!description.trim()) {
      alert("Please enter a valid item description.");
      return;
    }

    const newItem = {
      id: Date.now(),
      description: description.trim(),
      quantity,
      category,
      packed: false,
    };

    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
    setCategory("General");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>
      <label>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </label>
      <input
        type="text"
        placeholder="Item"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
        
          <option value="Clothes">Clothes</option>
          <option value="Toiletries">Toiletries</option>
          <option value="Electronics">Electronics</option>
          <option value="Miscellaneous">Miscellaneous</option>
        </select>
      </label>
      <button type="submit">Add</button>

      
    </form>
  );
}

function Item({ id, description, quantity, packed, onDelete, onTogglePacked }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={packed}
        onChange={() => onTogglePacked(id)}
      />
      <span className={packed ? "packed" : ""}>
        {description} - {quantity}
      </span>
      <button className="delete-button" onClick={() => onDelete(id)}>
        X
      </button>
    </li>
  );
}

function PackingList({ items, onDeleteItem, onTogglePacked }) {
  return (
    <ul>
      {items.map((item) => (
        <Item
          key={item.id}
          id={item.id}
          description={item.description}
          quantity={item.quantity}
          packed={item.packed}
          onDelete={onDeleteItem}
          onTogglePacked={onTogglePacked}
        />
      ))}
    </ul>
  );
}



function App() {
  const [items, setItems] = useState([]);
  const [searchQuery,setSearchQuery]=useState(""); //search

  function handleAddItems(item) {
    setItems((prevItems) => [...prevItems, item]);
  }

  function handleDeleteItem(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  function handleTogglePacked(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  
   // Filter items based on the search query
  const filteredItems = items.filter((item) =>
  item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const categories = {
    
    Clothes: items.filter((item) => item.category === "Clothes"),
    Toiletries: items.filter((item) => item.category === "Toiletries"),
    Electronics: items.filter((item) => item.category === "Electronics"),
    Miscellaneous: items.filter((item) => item.category === "Miscellaneous"),
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems}></Form>

      {/* Search input */}
      <div className="search">
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state
        />
      </div>



      <div className="categories">
        {Object.entries(categories).map(([category, items]) => (
          <div key={category} className="category-column">
            <h3>{category}</h3>
            <PackingList
              items={items}
              onDeleteItem={handleDeleteItem}
              onTogglePacked={handleTogglePacked}
            />
          </div>
        ))}
      </div>
      <Stats items={items} />
    </div>
  );
}

export default App;