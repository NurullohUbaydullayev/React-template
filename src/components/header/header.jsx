import "./header.css";
import Korzinka from "../../assets/images/korzinka.png";
import { useEffect, useRef, useState } from "react";
import useCount from "../../Hooks/useCount";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

const Header = () => {
  const NEW_ORDER = gql`
    mutation (
      $city: String!
      $district: String!
      $address: String!
      $owner: String!
      $tel: String!
      $productsList: [Data]
    ) {
      newOrder(
        city: $city
        district: $district
        address: $address
        owner: $owner
        tel: $tel
        productsList: $productsList
      )
    }
  `;

  const [newOrder] = useMutation(NEW_ORDER);

  const elCity = useRef(null);
  const elDistrict = useRef(null);
  const elAddress = useRef(null);
  const elOwner = useRef(null);
  const elTel = useRef(null);

  const [count, setCount] = useCount();
  const [modalActive, setModalActive] = useState(false);
  const [orderModal, setOrderModal] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {}, [modalActive, count, message]);

  async function handleSubmitForm(evt) {
    evt.preventDefault();

    const result = await newOrder({
      variables: {
        city: elCity.current.value,
        district: elDistrict.current.value,
        address: elAddress.current.value,
        owner: elOwner.current.value,
        tel: elTel.current.value,
        productsList: JSON.stringify(count),
      },
    });

    if (result) {
      setMessage("Muvaffaqiyatli yuborildi!");
      setCount([]);
    }
  }

  return (
    <>
      <header>
        <h3>Header</h3>

        <Link className="sign" to="/">
          Home
        </Link>

        <Link className="sign" to="/login">
          Login
        </Link>
        <Link className="sign" to="/register">
          Register
        </Link>

        <div
          className="korzina"
          onClick={() => {
            setModalActive(!modalActive);
          }}
        >
          <img src={Korzinka} width={30} height={30} alt="Korzinka" aria-hidden="true" />

          <span className="header__counter">{count.length}</span>
        </div>

        <div className={`modal ${modalActive ? "modal--active" : ""}`}>
          <ul className="cards">
            {count.length > 0 ? (
              count.map((row, index) => (
                <li key={row.id}>
                  <div className="card">
                    <img
                      src={`https://restaurants-nurulloh.herokuapp.com/product/${row.img}`}
                      width={100}
                      height={100}
                      alt=""
                    />{" "}
                    <p>Name: {row.name}</p>
                    <p>Cost: {row.cost * row.count} sum</p>
                    <div>
                      <button
                        className="counter"
                        disabled={row.count <= 1 ? true : false}
                        onClick={() => {
                          if (row.count > 1) {
                            count[index].count = count[index].count - 1;
                            setCount([...count]);
                          }
                        }}
                      >
                        -
                      </button>
                      <span>{row.count}</span>
                      <button
                        className="counter"
                        onClick={() => {
                          count[index].count = count[index].count + 1;
                          setCount([...count]);
                        }}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="modal__delete"
                      onClick={() => {
                        count.splice(index, 1);
                        setCount([...count]);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <>Nothing to order</>
            )}
          </ul>
          <button
            disabled={count.length > 0 ? false : true}
            className="modal__order"
            onClick={() => {
              setOrderModal(!orderModal);
              setModalActive(!modalActive);
            }}
          >
            Order
          </button>

          <span
            className="close"
            onClick={() => {
              setModalActive(!modalActive);
            }}
          >
            &#10060;
          </span>
        </div>

        <div className={`order__modal ${orderModal ? "order__modal--active" : ""}`}>
          <div className="inner-modal">
            <form className="inner__form" onSubmit={handleSubmitForm}>
              <h3>{message}</h3>
              <select ref={elCity}>
                <option value="Andijon">Andijon viloyati</option>
                <option value="Buxoro">Buxoro viloyati</option>
                <option value="Farg'ona">Farg'ona viloyati</option>
                <option value="Jizzax">Jizzax viloyati</option>
                <option value="Xorazm">Xorazm viloyati</option>
                <option value="Namangan">Namangan viloyati</option>
                <option value="Navoiy">Navoiy viloyati</option>
                <option value="Qashqadaryo">Qashqadaryo viloyati</option>
                <option value="Qoraqalpog'iston">Qoraqalpog'iston viloyati</option>
                <option value="Samarqand">Samarqand viloyati</option>
                <option value="Sirdaryo">Sirdaryo viloyati</option>
                <option value="Surxondaryo">Surxondaryo viloyati</option>
                <option value="Toshkent viloyati">Toshkent viloyati</option>
                <option value="Toshkent shahri">Toshkent shahri</option>
              </select>

              <select ref={elDistrict}>
                <option value="Olmazor">Olmazor</option>
                <option value="Shayxontoxur">Shayxontoxur</option>
                <option value="Bektemir">Bektemir</option>
                <option value="Chilonzor">Chilonzor</option>
                <option value="Hamza">Hamza</option>
                <option value="Mirobod">Mirobod</option>
                <option value="Mirzo Ulug'bek">Mirzo Ulug'bek</option>
                <option value="Sergeli">Sergeli</option>
                <option value="Uchtepa">Uchtepa</option>
                <option value="Yakkasaroy">Yakkasaroy</option>
                <option value="Yunusobod">Yunusobod</option>
              </select>

              <input ref={elAddress} type="text" placeholder="Address" />
              <input ref={elOwner} type="text" placeholder="Name" />
              <input ref={elTel} type="text" placeholder="Tel:+998" />

              <button type="submit">Submit</button>
            </form>
          </div>
          <span
            className="close"
            onClick={() => {
              setOrderModal(!orderModal);
            }}
          >
            &#10060;
          </span>
        </div>
      </header>
    </>
  );
};
export default Header;
