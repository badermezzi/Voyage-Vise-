import { useState } from "react";
import desertIsland from "./desert-island_1f3dd-fe0f.png"
import bag from "./luggage_1f9f3.png"

export default function App() {
  //////// array that will store items objects
  const [items, setItems] = useState([]);

  function deleteItemEvent(id) {
    setItems((items) => (items.filter((item) => (id !== item.id))))
  }

  function checkItemEvent(id) {
    setItems((items) => (items.map((item) => (id === item.id ? { ...item, packed: !item.packed } : item))));
  }

  function clearListBtnEvent() {

    let confermed;

    if (items.length > 0) { confermed = window.confirm("Are you sure you want to delete all items ?") };


    if (confermed) setItems([]);

  }

  return <div className="app">

    <Logo />
    <Form itemsObj={{ items, setItems }} />
    <PackingList itemsObj={{ items, setItems }} deleteItemEvent={deleteItemEvent} checkItemEvent={checkItemEvent} clearListBtnEvent={clearListBtnEvent} />
    <Stats items={items} />

  </div>

}

function Logo() {
  return <div >
    <h1><img src={desertIsland} alt="desertIsland" /> Voyage Vise <img src={bag} alt="bag" /></h1>
  </div>
}



function Form({ itemsObj }) {

  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function formEvent(e) {
    e.preventDefault()

    if (!description) return;

    const newItem = { id: Date.now(), description, quantity, packed: false };
    itemsObj.setItems(items => [...items, newItem]);


    setDescription("");
    setQuantity(1);
  };

  return <form className="add-form" onSubmit={formEvent} >
    <h3> What do you need for your trip?</h3>
    <select value={quantity} onChange={(e) => { setQuantity(Number(e.target.value)) }}>
      {Array.from({ length: 20 }, (_, index) => (index + 1))
        .map((num, i) => (<option value={num} key={i}>{num}</option>))}
    </select>
    <input name="input-text" type="text" placeholder="Item..." value={description} onChange={(e) => { setDescription(e.target.value) }} />
    <button>Add</button>
  </form >
}

function PackingList({ itemsObj, deleteItemEvent, checkItemEvent, clearListBtnEvent }) {

  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = itemsObj.items;

  if (sortBy === "description") sortedItems = itemsObj.items.slice().sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed") sortedItems = itemsObj.items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));

  return (<div className="list ">
    <ul>

      {sortedItems.map((item) => (<Item itemObj={item} deleteItemEvent={deleteItemEvent} checkItemEvent={checkItemEvent} key={item.id} />))}

    </ul>

    <div className="actions">

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="input">sort by input order</option>
        <option value="description">sort by description</option>
        <option value="packed">sort by packed status</option>
      </select>
      <button onClick={() => (clearListBtnEvent())} >clear list</button>
    </div>

  </div >
  );
}

function Item({ itemObj, deleteItemEvent, checkItemEvent }) {
  return (
    <li>
      <input type="checkbox" value={itemObj.packed} onChange={() => (checkItemEvent(itemObj.id))} />
      <span style={itemObj.packed ? { textDecoration: "line-through" } : {}} >{itemObj.quantity} {itemObj.description}</span>
      <button onClick={() => (deleteItemEvent(itemObj.id))}>❌</button>
    </li >
  )
}



function Stats({ items }) {
  if (items.length === 0) {
    return <p className="stats">
      Start adding some items to your packing list
    </p>
  };

  const itemsLength = items.length;
  const packadItemsLength = items.filter((item) => (item.packed === true)).length;
  const packadItemsPersentage = Math.trunc((packadItemsLength / itemsLength) * 100);

  return <footer className="stats">
    {packadItemsPersentage === 100 ? <em>You're all packed and ready to go! Have a great trip! 🌟</em> : <em>you have {itemsLength} items on your list and you already packed {packadItemsLength} ( {packadItemsPersentage >= 0 ? packadItemsPersentage : 0} %)</em>}

  </footer>
}