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
    setItems((items) => (items.map((item) => (item.id === id ? { ...item, packed: !item.packed } : {}))))
  }

  return <div className="app">

    <Logo />
    <Form itemsObj={{ items, setItems }} />
    <PackingList itemsObj={{ items, setItems }} deleteItemEvent={deleteItemEvent} checkItemEvent={checkItemEvent} />
    <Stats />

  </div>

}

function Logo() {
  return <div >
    <h1><img src={desertIsland} alt="desertIsland" /> Far Away <img src={bag} alt="bag" /></h1>
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
    <select name="select" value={quantity} onChange={(e) => { setQuantity(Number(e.target.value)) }}>
      {Array.from({ length: 20 }, (_, index) => (index + 1))
        .map((num, i) => (<option value={num} key={i}>{num}</option>))}
    </select>
    <input name="input-text" type="text" placeholder="Item..." value={description} onChange={(e) => { setDescription(e.target.value) }} />
    <button>Add</button>
  </form >
}

function PackingList({ itemsObj, deleteItemEvent, checkItemEvent }) {
  itemsObj = itemsObj;
  return (<div className="list ">
    <ul>

      {itemsObj.items.map((item) => (<Item itemObj={item} deleteItemEvent={deleteItemEvent} checkItemEvent={checkItemEvent} key={item.id} />))}

    </ul>
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



function Stats() {
  return <div className="stats">
    <em>you have X items on your list and you already packed X (X%)</em>
  </div>
}