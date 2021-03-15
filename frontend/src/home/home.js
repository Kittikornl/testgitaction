import { useEffect, useState } from "react";
import { getHomeData, getAllProduct } from "../service/product.service";
import "./home.scss";
import vegThumbnail from "../img/veg-thumbnail.jpg";

const Home = () => {
  const [showMoreBest, setShowMoreBest] = useState(false);
  const [showMoreNew, setShowMoreNew] = useState(false);
  const [newArrival, setNewArrival] = useState([]);
  const [topSell, setTopSell] = useState([]);
  const [allProduct, setAllProduct] = useState([]);

  useEffect(async () => {
    fetchHomeData();
    fetchAllProduct();
  }, []);

  const fetchHomeData = async () => {
    const result = await getHomeData();
    setNewArrival(result.data.new_products.slice(0, 8));
    setTopSell(result.data.top_selling_products.slice(0, 8));
  };

  const fetchAllProduct = async () => {
    const result = await getAllProduct();
    setAllProduct(result.data);
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
        <img
          src={
            props.product.PictureURL === ""
              ? `${vegThumbnail}`
              : props.product.PictureURL
          }
        />
        <div className="name">
          {props.product.length === 0 ? "" : props.product.ProductTitle}
        </div>
      </div>
    );
  };

  const renderProduct = (product, index) => {
    return <Product product={product} />;
  };

  // const handleClick = (product) => {
  //   console.log("click");
  // };

  const ProductHidden = (props) => {
    console.log(props);
    return (
      <div className="product flex-col">
        <img
          // onClick={handleClick}
          src={
            props.product.PictureURL === ""
              ? `${vegThumbnail}`
              : props.product.PictureURL
          }
        />

        <div className="name">{props.product.ProductTitle}</div>
      </div>
    );
  };

  const renderHidden = (product, index) => {
    return <ProductHidden product={product} />;
  };

  return (
    <div className="home-container flex-col">
      <div className="home-page flex-col">
        <div className="promo-banner m-y-24">
          <div className="promo-code semi-bold flex-col">
            <div>Save 10% off | code ABC2D3</div>
            <div>min spend: 500 THB</div>
          </div>
        </div>
        <div className="best-seller-grid">
          <div className="header flex-row">
            <div>Best seller</div>
            <a
              className="see-more"
              id="showMoreB"
              onClick={handleSeeMoreBestSell}
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
          <div class="grid-container m-t-16">
            {allProduct.length === 0 ? null : allProduct.map(renderProduct)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
