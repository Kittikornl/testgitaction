import { useState, useEffect } from "react";
import { useParams } from "react-router";
import "./shop.scss";
import Scores from "../components/scores";
import { Button } from "antd";
import { getShopData } from "../service/shop.service";
import vegThumbnail from "../img/veg-thumbnail.jpg";
import { Link } from "react-router-dom";
import { getUserInfo } from "../service/auth.service";
import { getUserData } from "../service/user.service";

const Shop = () => {
  const [showMoreBest, setShowMoreBest] = useState(false);
  const [showMoreNew, setShowMoreNew] = useState(false);
  const [newArrival, setNewArrival] = useState([]);
  const [topSell, setTopSell] = useState([]);
  const [allProduct1, setAllProduct1] = useState([]);
  const [allProduct2, setAllProduct2] = useState([]);
  const [shopDescription, setShopDescription] = useState("");
  const [role, setRole] = useState(getUserInfo().role);
  const [userID, setUserID] = useState(getUserInfo().userId);
  const [userData, setUserData] = useState("");

  let { id } = useParams();

  useEffect(async () => {
    fetchShopData(id);
    fetchUserData(userID);
  }, []);

  const fetchShopData = async (id) => {
    var showMoreB = document.getElementById("showMoreB");
    var showMoreN = document.getElementById("showMoreN");

    const result = await getShopData(id);
    setNewArrival(result.data.new_arrival_products.slice(0, 8));
    setTopSell(result.data.top_selling_products.slice(0, 8));
    setAllProduct1(result.data.all_product_type1);
    setAllProduct2(result.data.all_product_type2);
    setShopDescription(result.data.shop_information);
    if (result.data.new_arrival_products.slice(0, 8).length < 4) {
      showMoreN.innerHTML = "";
    }
    if (result.data.top_selling_products.slice(0, 8).length < 4) {
      showMoreB.innerHTML = "";
    }
  };

  const fetchUserData = async () => {
    const data = await getUserData(userID);
    setUserData(data.data.Userdata);
  };

  const handleSeeMoreBestSell = () => {
    setShowMoreBest(!showMoreBest);

    var showMoreB = document.getElementById("showMoreB");

    if (showMoreBest === false) {
      showMoreB.innerHTML = "See less >";
    } else {
      showMoreB.innerHTML = "See more >";
    }
  };

  const handleSeeMoreNewArrive = () => {
    setShowMoreNew(!showMoreNew);

    var showMoreN = document.getElementById("showMoreN");

    if (showMoreNew === false) {
      showMoreN.innerHTML = "See less >";
    } else {
      showMoreN.innerHTML = "See more >";
    }
  };

  const Product = (props) => {
    return (
      <div className="product flex-col">
        <a
          href={`/product/${
            props.product.ID === undefined ? null : props.product.ID
          }`}
        >
          <img
            src={
              props.product.PictureURL === ""
                ? `${vegThumbnail}`
                : props.product.PictureURL
            }
          />
        </a>
        <div className="name">
          {props.product.length === 0 ? "" : props.product.ProductTitle}
        </div>
      </div>
    );
  };

  const renderProduct = (product, index) => {
    return <Product product={product} />;
  };

  const ProductHidden = (props) => {
    console.log(props);
    return (
      <div className="product flex-col">
        <a href={`/product/${props.ID}`}>
          <img
            src={
              props.product.PictureURL === ""
                ? `${vegThumbnail}`
                : props.product.PictureURL
            }
          />
        </a>

        <div className="name">{props.product.ProductTitle}</div>
      </div>
    );
  };

  const renderHidden = (product, index) => {
    return <ProductHidden product={product} />;
  };

  const renderButtonContentText = (Shop) => {
    if (role === 2) {
      return (
        <div className="button-content flex-row">
          <div className="flex-row">
            <div className="score-text">
              {Shop.rating === undefined ? null : Shop.rating.toFixed(1)}
            </div>
            <Scores score={Shop.rating} />
          </div>
          <div className="name">{shopDescription.shopname}</div>
          <div className="button-group flex-row">
            <Link to="/manage/shop">
              <Button htmlType="edit" className="button-green">
                Manage Product
              </Button>
            </Link>
          </div>
        </div>
      );
    } else if (role === 1) {
      return (
        <div className="button-content flex-row">
          <div className="flex-row">
            <div className="score-text">
              {Shop.rating === undefined ? null : Shop.rating.toFixed(1)}
            </div>
            <Scores score={Shop.rating} />
          </div>
          <div className="name">{shopDescription.shopname}</div>
          <Button htmlType="edit" className="button-green">
            Review
          </Button>
        </div>
      );
    }
  };

  return (
    <div className="shop-container flex-col">
      <div className="empty-box">{shopDescription.description}</div>
      <div className="container">
        <div className="shop-page">
          <div className="head flex-row">
            {renderButtonContentText(shopDescription)}
          </div>
          <div className="best-seller-grid">
            <div className="header flex-row">
              <div>Best seller</div>
              <a
                className="see-more"
                id="showMoreB"
                onClick={handleSeeMoreBestSell}
                defaultValue=""
              >
                See more{" >"}
              </a>
            </div>
            <div class="grid-container m-t-16">
              {topSell.slice(0, 4).length === 0
                ? null
                : topSell.slice(0, 4).map(renderProduct)}
              {showMoreBest
                ? topSell.slice(4, 8).length === 0
                  ? null
                  : topSell.slice(4, 8).map(renderHidden)
                : null}
            </div>
          </div>
          <div className="new-arrivals-grid m-t-20">
            <div className="header flex-row">
              <div>New arrivals</div>
              <a
                className="see-more"
                id="showMoreN"
                onClick={handleSeeMoreNewArrive}
              >
                See more{" >"}
              </a>
            </div>
            <div class="grid-container m-t-16">
              {newArrival.slice(0, 4).length === 0
                ? null
                : newArrival.slice(0, 4).map(renderProduct)}
              {showMoreNew
                ? newArrival.slice(4, 8).length === 0
                  ? null
                  : newArrival.slice(4, 8).map(renderHidden)
                : null}
            </div>
          </div>
          <div className="all-products-grid m-t-20">
            <div className="header flex-row">
              <div>All products</div>
            </div>
            <div className="type m-t-10 flex-row">
              <div> Vegetables</div>
            </div>
            <div class="grid-container m-t-16">
              {allProduct1.length === 0 ? null : allProduct1.map(renderProduct)}
            </div>
            <div className="type flex-row">
              <div> Fruits</div>
            </div>
            <div class="grid-container m-t-16">
              {allProduct2.length === 0 ? null : allProduct2.map(renderProduct)}
            </div>
          </div>
        </div>
      </div>

      <div className="contact-container flex-col">
        <div className="contact flex-row">
          {console.log(shopDescription)}
          <div>Shop Contact: {shopDescription.phone_number}</div>
          <div>
            Address: {userData.houseNo} {userData.street} {userData.subDistrict}{" "}
            {userData.district} {userData.city} {userData.zipcode}
          </div>
        </div>
        <div className="social flex-row">
          <div>Line: {shopDescription.line}</div>
          <div>Instagram: {shopDescription.ig}</div>
          <div>Twitter: {shopDescription.twitter}</div>
          <div>Facebook: {shopDescription.facebook}</div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
