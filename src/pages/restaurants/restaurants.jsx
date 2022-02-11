import "./res.css";
import { useParams, useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import useCount from "../../Hooks/useCount";

const PRODUCTS_BY_RESTAURANT = gql`
  query productsByRestaurant($restaurantId: ID!) {
    byRestaurant(restaurantId: $restaurantId) {
      id
      name
      cost
      img
      restaurantId
    }
  }
`;

const Restaurants = () => {
  const navigate = useNavigate();

  if (!JSON.parse(window.localStorage.getItem("auth_token"))) {
    navigate("/login");
  }

  const [count, setCount] = useCount();

  const { id } = useParams();

  const { data } = useQuery(PRODUCTS_BY_RESTAURANT, {
    variables: { restaurantId: id },
  });

  function addCart(evt, row) {
    let isExist = false;
    if (count.length > 0) {
      for (let index = 0; index < count.length; index++) {
        if (evt.target.dataset.product_id === count[index].id) {
          isExist = true;
          break;
        }
      }

      if (!isExist) {
        setCount([
          ...count,
          { cost: row.cost, id: row.id, img: row.img, name: row.name, count: 1 },
        ]);
      }
    } else {
      setCount([
        ...count,
        { cost: row.cost, id: row.id, img: row.img, name: row.name, count: 1 },
      ]);
    }
  }

  return (
    <>
      Restaurants {id}
      <ul className="cards">
        {data &&
          data.byRestaurant.map(row => (
            <li key={row.id}>
              <div className="card">
                <img
                  src={`https://restaurants-nurulloh.herokuapp.com/product/${row.img}`}
                  width={100}
                  height={100}
                  alt=""
                />{" "}
                <p>Name: {row.name}</p>
                <p>Cost: {row.cost} sum</p>
                <button
                  onClick={evt => {
                    addCart(evt, row);
                  }}
                  className="add-cart"
                  data-product_id={row.id}
                >
                  Add to card +
                </button>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Restaurants;
