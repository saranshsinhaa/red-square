import React, { useEffect, useState, useRef } from "react";
import Rating from "../../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";

import {
  listProductDetails,
  createproductReview,
} from "../../actions/productActions";

import { IoLogoFacebook } from "react-icons/io";
import {
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillShop,
} from "react-icons/ai";
import { MdDoNotDisturb } from "react-icons/md";

import {
  Image,
  Select,
  Button,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import HashLoader from "react-spinners/HashLoader";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_REVIEW_RESET,
} from "../../constants/productConstants";
import "./product.css";
import { Link } from "react-router-dom";
const Productpage = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setrating] = useState(0);
  const [comment, setcomment] = useState("");

  const imgs = document.querySelectorAll(".img-select a");
  const imgShowcase = useRef(null);
  const imgBtns = [...imgs];
  let imgId = 1;
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  imgBtns.forEach((imgItem) => {
    imgItem.addEventListener("click", (event) => {
      event.preventDefault();
      imgId = imgItem.dataset.id;
      slideImage();
    });
  });

  function slideImage() {
    const displayWidth = document.querySelector(
      ".img-showcase img:first-child"
    ).clientWidth;
    imgShowcase.current.style.transform = `translateX(${
      -(imgId - 1) * displayWidth
    }px)`;
  }

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted!");
      setrating(0);
      setcomment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  const submithanlder = () => {
    dispatch(
      createproductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };
  //Handler of button add to cart
  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };
  return (
    <>
      <Helmet>
        <title>{product.name}</title>
      </Helmet>
      <div className="productpage">
        {loading ? (
          <div className="loading-product">
            <HashLoader color={"#1e1e2c"} loading={loading} size={50} />
          </div>
        ) : error ? (
          <h2>{error} </h2>
        ) : (
          <div className="card-wrapper">
            <div className="card">
              <div className="product-imgs">
                <div className="img-display">
                  <div ref={imgShowcase} className="img-showcase">
                    {product.images.map((i) => (
                      <Image src={i} />
                    ))}
                  </div>
                </div>
                <div className="img-select">
                  <div className="img-item">
                    <a href="#" data-id="1">
                      <Image
                        objectFit="cover"
                        boxSize="200px"
                        src={product.images[0]}
                        alt="shoe image"
                      />
                    </a>
                  </div>
                  <div className="img-item">
                    <a href="#" data-id="2">
                      <Image
                        objectFit="cover"
                        boxSize="200px"
                        src={product.images[1]}
                        alt="shoe image"
                      />
                    </a>
                  </div>
                  <div className="img-item">
                    <a href="#" data-id="3">
                      <Image
                        objectFit="cover"
                        boxSize="200px"
                        src={product.images[2]}
                        alt="shoe image"
                      />
                    </a>
                  </div>
                </div>
              </div>

              <div className="product-content">
                <h2 className="product-title">{product.name} </h2>
                <div className="product-price">
                  <p className="new-price">
                    Price: <span>${product.price} (5%)</span>
                  </p>
                </div>

                <div className="product-detail">
                  <h2>about this item: </h2>
                  <p>{product.description}</p>
                  <div>
                    <ul>
                      <li>Size</li>{" "}
                      <Select
                        className="select-product"
                        placeholder="Choose an option"
                      >
                        {product.sizes.map((size) => (
                          <option value={size}>{size}</option>
                        ))}
                      </Select>
                    </ul>
                  </div>
                  <ul>
                    <li>
                      Status:{" "}
                      <span>
                        {product.countInStock > 0 ? "ìn stock" : "Out Of Stock"}
                      </span>
                    </li>
                    <li>
                      Category:{" "}
                      <span>
                        {product.category.map((cg) => " | " + cg + " | ")}
                      </span>
                    </li>
                    <li>
                      Shipping Area: <span>All over the world</span>
                    </li>
                    <div>
                      <ul>
                        {" "}
                        <li>Qty :</li>
                        {product.countInStock > 0 ? (
                          <Select
                            as="select"
                            size="md"
                            maxW={20}
                            value={qty}
                            className="select-product"
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Select>
                        ) : (
                          <span style={{ display: "flex" }}>
                            <MdDoNotDisturb size="26" /> OUT OF STOCK{" "}
                          </span>
                        )}
                      </ul>
                    </div>
                  </ul>
                </div>

                <div className="purchase-info">
                  <Button
                    onClick={addToCartHandler}
                    type="button"
                    className="btn-shop"
                    disabled={product.countInStock === 0}
                  >
                    {" "}
                    <AiFillShop size="24" />
                    Add to Cart{" "}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Productpage;
