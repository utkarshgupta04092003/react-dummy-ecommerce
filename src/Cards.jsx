import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Send } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { ADD } from "./redux/actions/action";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { DLT } from "./redux/actions/action";
import { toast } from "react-toastify";
import { DELETE, SORT, SEARCH } from "./redux/actions/action";

const Cards = () => {
  const [details, setDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSortClicked, setIsSortClicked] = useState(true);

  const dispatch = useDispatch();

  const products = useSelector((state) => state.productReducer.products);

  const send = (e) => {
    dispatch(ADD(e));
    toast.success("Product Added To Cart !!");
  };

  const dlt = (id) => {
    dispatch(DELETE(id));
    toast.success("Product Deleted Successfully !!");
  };

  // const fetchData = () => {
  //   fetch("http://localhost:3000/products").then((response) => {
  //     response.json().then((data) => {
  //       setDetails(data);
  //     });
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SEARCH(searchTerm));
    setSearchTerm("");
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <>
      <div className="container mt-3">
        <h2 className="text-center">Add To Cart Products</h2>

        <form
          className="d-flex input-group w-auto mx-5"
          onSubmit={handleSubmit}
          
        >
          <input
            type="text"
            className="form-control"
            placeholder="Search Product..."
            value={searchTerm}
            
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="dark" type="submit">
            Search
          </Button>
        </form>

        <div className="row d-flex justify-content-center align-items-center">
          {
            
            
            (products.map((element, id) => {
            return (
              <>
                <Card
                  style={{ width: "22rem", border: "none" }}
                  className="mx-2 mt-4 card_style"
                >
                  <NavLink to={`/cart/${element.id}`}>
                    <Card.Img
                      variant="top"
                      src={element.image}
                      style={{ height: "16rem" }}
                      className="mt-3"
                    />
                  </NavLink>
                  <Card.Body>
                    <Card.Title>{element.title}</Card.Title>

                    <Card.Text>
                      Price : ₹ {element.price}
                      <NavLink to={`/edit/${element.id}`}>
                        <span>
                          <FontAwesomeIcon
                            icon={faPen}
                            color="blue"
                            style={{ marginLeft: "8.5rem", fontSize: "20px" }}
                          />
                        </span>
                      </NavLink>
                      &nbsp; &nbsp;
                      <span onClick={() => dlt(element.id)}>
                        <FontAwesomeIcon
                          icon={faTrash}
                          color="red"
                          fontSize="20px"
                        />
                      </span>
                    </Card.Text>

                    <div className="button_div d-flex justify-content-center">
                      <Button
                        variant="primary"
                        onClick={() => send(element)}
                        className="col-lg-12"
                      >
                        Add To Cart
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </>
            );
          }))}
        </div>
      </div>
    </>
  );
};

export default Cards;
