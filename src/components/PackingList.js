import { useState } from "react";
import { Item } from "./Item";

export function PackingList({ itemsObj, deleteItemEvent, checkItemEvent, clearListBtnEvent }) {

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
            <button onClick={() => (clearListBtnEvent())}>clear list</button>
        </div>

    </div>
    );
}
