import { useState } from "react";

export function Form({ itemsObj }) {

    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);

    function formEvent(e) {
        e.preventDefault();

        if (!description) return;

        const newItem = { id: Date.now(), description, quantity, packed: false };
        itemsObj.setItems(items => [...items, newItem]);


        setDescription("");
        setQuantity(1);
    };

    return <form className="add-form" onSubmit={formEvent}>
        <h3> What do you need for your trip?</h3>
        <select value={quantity} onChange={(e) => { setQuantity(Number(e.target.value)); }}>
            {Array.from({ length: 20 }, (_, index) => (index + 1))
                .map((num, i) => (<option value={num} key={i}>{num}</option>))}
        </select>
        <input name="input-text" type="text" placeholder="Item..." value={description} onChange={(e) => { setDescription(e.target.value); }} />
        <button>Add</button>
    </form>;
}
