import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();

  if (!JSON.parse(window.localStorage.getItem("auth_token"))) {
    navigate("/login");
  }

  const [resId, setResId] = useState(1);

  const RESTAURANTS = gql`
    query byCategory($categoryId: ID!) {
      restaurantsByCategory(categoryId: $categoryId) {
        id
        name
        address
        categoryId
      }
    }
  `;
  const { data: d, loading: l } = useQuery(RESTAURANTS, {
    variables: { categoryId: resId },
  });

  let restaurants;

  if (!l) {
    restaurants = d.restaurantsByCategory;
  }

  return (
    <>
      <div className="select-wrapper">
        <select
          className="select"
          defaultValue="1"
          onChange={evt => setResId(Number(evt.target.value))}
        >
          <option value="1">Fast Food</option>
          <option value="2">Milliy taomlar</option>
        </select>
      </div>

      <ul className="res-list">
        {restaurants &&
          restaurants.map(row => (
            <li className="res-list-item" key={row.id}>
              <Link className="res__link" to={`/restaurants/${row.id}`}>
                <div>
                  <p>Restaurant: {row.name}</p>
                  <p>Address: {row.address}</p>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Home;
