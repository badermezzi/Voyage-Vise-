import { useState } from "react";
import { Logo } from "./Logo";
import { Form } from "./Form";
import { PackingList } from "./PackingList";
import { Stats } from "./Stats";

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

