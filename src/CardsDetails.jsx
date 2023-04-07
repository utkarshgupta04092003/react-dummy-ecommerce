import React, { useEffect, useState } from "react";
import "./App.css";
import { Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DLT, ADD, REMOVE } from "./redux/actions/action";
import { NavLink } from "react-router-dom";

const CardsDetails = () => {
  const [details, setDetails] = useState({});
  // const [cart,setCart]=useState([]);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);

  const { id } = useParams();

  const history = useNavigate();

  const getdata = useSelector((state) => state.cartReducer.carts) ;

  useEffect(() => {
    getdata.forEach((product) => {
      if (product.id == id) {
        setQuantity(product.qnty);
        setTotal(product.qnty*product.price);
      }
    });
  }, [getdata]);

  const dispatch = useDispatch();

  const products= useSelector((state)=>state.productReducer.products);

  const fetchData = () => {

    let comparedata=products.filter((e)=>{
      return e.id==id;
    });

    setDetails(comparedata[0]);
  };
    // fetch("http://localhost:3000/products").then((response) => {
    //   response.json().then((data) => {
    //     let comparedata = data.filter((e) => {
    //       return e.id == id;
    //     });
    //     setDetails(comparedata[0]);
    //   });
    // });
  

  //add data

  const send = (e) => {
    dispatch(ADD(e));
  };

  const dlt = (id) => {
    dispatch(DLT(id));
    history("/");
  };

  // useEffect(()=>{
  //   getProductDetails();
  // },[cartProducts]);

  //remove one
  const remove = (item) => {
    dispatch(REMOVE(item));
  };

  useEffect(() => {
    fetchData();
  }, [id]);
  return (
    <>
      <div className="container mt-2">
        <h2 className="text-center">Product Details Page</h2>

        {
          <div className="container fort card_style mt-3">
            <div className="items_img">
              <img src={details.image} />
            </div>

            <div className="details">
              <Table>
                <tr>
                  <td>
                    <p>
                      <strong>Product Name : </strong> {details.title}
                    </p>
                    <p>
                      <strong>Price : </strong>₹ {details.price}
                    </p>
                    <p>
                      <strong>Category : </strong> {details.category}
                    </p>
                    <p>
                      <strong>Total : </strong>₹ {total}
                    </p>

                    <div
                      className="mt-5 d-flex justify-content-between align-items-center"
                      style={{
                        width: 100,
                        cursor: "pointer",
                        background: "#ddd",
                        color: "#111",
                      }}
                    >
                      <span
                        style={{ fontSize: 24 }}
                        onClick={
                          quantity <= 1
                            ? () => dlt(details.id)
                            : () => remove(details)
                        }
                      >
                        -
                      </span>
                      <span style={{ fontSize: 22 }}>{quantity}</span>
                      <span
                        style={{ fontSize: 24 }}
                        onClick={() => {
                          send(details);
                          // getProductDetails(cart);
                        }}
                      >
                        +
                      </span>
                    </div>
                  </td>
                  <td>
                    <p>
                      <strong>Rating : </strong>
                      <span
                        style={{
                          background: "green",
                          color: "#fff",
                          padding: "2px 5px",
                          borderRadius: "5px",
                        }}
                      >
                        {details.rating?.rate} ★
                      </span>
                    </p>
                    <p>
                      <strong>Product Review : </strong>
                      <span>{details.description}</span>
                    </p>
                    <p>
                      <strong>Remove : </strong>
                      <span>
                        <i
                          onClick={() => dlt(details.id)}
                          className="fas fa-trash"
                          style={{
                            color: "red",
                            fontSize: 20,
                            cursor: "pointer",
                          }}
                        ></i>
                      </span>
                    </p>
                  </td>
                </tr>
              </Table>
            </div>
          </div>
        }

        <section className="container mt-3">
          <div className="itemsdetails " style={{ marginTop: "30px" }}></div>
        </section>
      </div>
    </>
  );
};

export default CardsDetails;
