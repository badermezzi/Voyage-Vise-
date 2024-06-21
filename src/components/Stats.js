export function Stats({ items }) {
    if (items.length === 0) {
        return <p className="stats">
            Start adding some items to your packing list
        </p>;
    };

    const itemsLength = items.length;
    const packadItemsLength = items.filter((item) => (item.packed === true)).length;
    const packadItemsPersentage = Math.trunc((packadItemsLength / itemsLength) * 100);

    return <footer className="stats">
        {packadItemsPersentage === 100 ? <em>You're all packed and ready to go! Have a great trip! 🌟</em> : <em>you have {itemsLength} items on your list and you already packed {packadItemsLength} ( {packadItemsPersentage >= 0 ? packadItemsPersentage : 0} %)</em>}

    </footer>;
}
