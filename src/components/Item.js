
export function Item({ itemObj, deleteItemEvent, checkItemEvent }) {
    return (
        <li>
            <input type="checkbox" value={itemObj.packed} onChange={() => (checkItemEvent(itemObj.id))} />
            <span style={itemObj.packed ? { textDecoration: "line-through" } : {}}>{itemObj.quantity} {itemObj.description}</span>
            <button onClick={() => (deleteItemEvent(itemObj.id))}>❌</button>
        </li>
    );
}
