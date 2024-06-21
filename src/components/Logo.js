import desertIsland from "../imgs/desert-island_1f3dd-fe0f.png";
import bag from "../imgs/luggage_1f9f3.png";

export function Logo() {
    return <div>
        <h1><img src={desertIsland} alt="desertIsland" /> Voyage Vise <img src={bag} alt="bag" /></h1>
    </div>;
}
