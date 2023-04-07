import React, { useEffect, useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Table,
  Button,
  Form,
  Dropdown,
} from "react-bootstrap";
import "./App.css";
import { Badge } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  DLT,
  SEARCH,
  SORT,
  RESET,
  SORTHTL,
  SORTLTH,
} from "./redux/actions/action";

const Header = () => {
  const [isSortClicked, setIsSortClicked] = useState(false);

  const [price, setPrice] = useState(0);

  const getdata = useSelector((state) => state.cartReducer.carts);
  console.log(getdata);

  const dispatch = useDispatch();
  const history = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dlt = (id) => {
    dispatch(DLT(id));
    history("/");
  };

  const total = () => {
    let price = 0;
    getdata.map((ele, k) => {
      price = ele.price * ele.qnty + price;
    });

    setPrice(price);
  };

  const handleChange = (data) => {
    if (data === "None") {
      dispatch(RESET());
    } else if (data === "Price(High To Low)") {
      dispatch(SORTHTL());
    } else if (data === "Price(Low To High)") {
      dispatch(SORTLTH());
    }
  };

  useEffect(() => {
    total();
  }, [total]);
  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ height: "60px" }}>
        <Container>
          <NavLink to="/add" className="text-decoration-none text-light ">
            Add A Product
          </NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className="text-decoration-none text-light mx-3">
              Home
            </NavLink>
          </Nav>

          <span style={{ color: "#fff", fontSize: "20px", margin: "0.5rem" }}>
            Sort By
          </span>

          <Form.Select
            aria-label="Default select example"
            style={{ width: "15%", margin: "1rem" }}
            onChange={(e) => handleChange(e.target.value)}
          >
            <option>None</option>
            <option>Price(High To Low)</option>
            <option>Price(Low To High)</option>
          </Form.Select>

          <Badge
            badgeContent={getdata.length}
            color="primary"
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <i
              class="fa-solid fa-cart-shopping text-light"
              style={{ fontSize: 25, cursor: "pointer" }}
            ></i>
          </Badge>
        </Container>

        <Button
          variant="light"
          style={{ margin: "2rem" }}
          onClick={() => dispatch(RESET())}
        >
          Reset
        </Button>

        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          {getdata.length ? (
            <div
              className="card_details"
              style={{ width: "24rem", padding: 10 }}
            >
              <Table>
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Product Name</th>
                  </tr>
                </thead>
                <tbody>
                  {getdata.map((e) => {
                    return (
                      <>
                        <tr>
                          <td>
                            <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                              <img
                                src={e.image}
                                style={{ width: "5rem", height: "5rem" }}
                              />
                            </NavLink>
                          </td>
                          <td>
                            <p>{e.title} </p>
                            <p>Price : ₹ {e.price} </p>
                            <p>Quantity : {e.qnty} </p>
                            <p
                              onClick={() => dlt(e.id)}
                              className="smalltrash"
                              style={{
                                color: "red",
                                fontSize: 20,
                                cursor: "pointer",
                              }}
                            >
                              <i className="fas fa-trash"></i>
                            </p>
                          </td>
                          <td
                            onClick={() => dlt(e.id)}
                            className="mt-5 largetrash "
                            style={{
                              color: "red",
                              fontSize: 20,
                              cursor: "pointer",
                            }}
                          >
                            <i className="fas fa-trash"></i>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                  <p className="text-center">Total : ₹ {price}</p>
                </tbody>
              </Table>
            </div>
          ) : (
            <div
              className="card_details d-flex justify-content-center align-items-center"
              style={{
                width: "20rem",
                height: "6rem",
                overflow: "hidden",
                padding: 10,
                position: "relative",
              }}
            >
              <i
                className="fas fa-close smallclose"
                style={{
                  position: "absolute",
                  top: 2,
                  right: 20,
                  fontsize: 10,
                  cursor: "pointer",
                }}
                onClick={handleClose}
              ></i>
              <p style={{ fontSize: 15, textAlign: "center" }}>
                Your Cart is Empty
              </p>
              <img
                src="https://i.pinimg.com/originals/66/22/ab/6622ab37c6db6ac166dfec760a2f2939.gif"
                className="emptycart_img"
                style={{ width: "10rem", padding: 10, backgroundSize: "cover" }}
              />
            </div>
          )}
        </Menu>
      </Navbar>
    </>
  );
};

export default Header;
