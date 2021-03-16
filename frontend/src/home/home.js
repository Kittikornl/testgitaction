import { useEffect, useState } from "react";
import { getHomeData, getAllProduct } from "../service/home.service";
import "./home.scss";
import vegThumbnail from "../img/veg-thumbnail.jpg";
import Searchbar from "../components/searchbar";
import { postSearchProduct } from "../service/search.service";

const Home = () => {
  const [showMoreBest, setShowMoreBest] = useState(false);
  const [showMoreNew, setShowMoreNew] = useState(false);
  const [newArrival, setNewArrival] = useState([]);
  const [topSell, setTopSell] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [showBest, setShowBest] = useState(true);
  const [showNew, setShowNew] = useState(true);

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
        <div className="name">{props.product.ProductTitle}</div>
      </div>
    );
  };

  const renderHidden = (product, index) => {
    return <ProductHidden product={product} />;
  };

  const getSearchData = async (data) => {
    const payload = {
      Search: data.keyword,
      ProductType: data.type === "" ? null : data.type,
    };

    const result = await postSearchProduct(payload);
    console.log(result.data);
    var showMoreN = document.getElementById("showMoreN");
    var showMoreB = document.getElementById("showMoreB");
    var bestSellText = document.getElementById("bestSellText");
    var newArriveText = document.getElementById("newArriveText");

    if (payload.Search === "" && payload.ProductType === null) {
      fetchAllProduct();
      setShowBest(true);
      setShowNew(true);
      showMoreN.innerHTML = "See more >";
      showMoreB.innerHTML = "See more >";
      bestSellText.innerHTML = "Best seller";
      newArriveText.innerHTML = "New arrivals";
    } else if (payload.Search === "" && payload.ProductType !== null) {
      if (result.data.q_by_type !== undefined) {
        setAllProduct(result.data.q_by_type);
        setShowNew(false);
        setShowBest(false);
        showMoreN.innerHTML = "";
        showMoreB.innerHTML = "";
        bestSellText.innerHTML = "";
        newArriveText.innerHTML = "";
      }
    } else if (payload.Search !== "" && payload.ProductType === null) {
      if (result.data.q_by_productname !== undefined) {
        setAllProduct(result.data.q_by_productname);
        setShowNew(false);
        setShowBest(false);
        showMoreN.innerHTML = "";
        showMoreB.innerHTML = "";
        bestSellText.innerHTML = "";
        newArriveText.innerHTML = "";
      }
    } else if (payload.Search !== "" && payload.ProductType !== null) {
      if (result.data.products_information) {
        setAllProduct(result.data.products_information);
        setShowNew(false);
        setShowBest(false);
        showMoreN.innerHTML = "";
        showMoreB.innerHTML = "";
        bestSellText.innerHTML = "";
        newArriveText.innerHTML = "";
      }
    }
  };

  return (
    <div className="home-container flex-col">
      <Searchbar getSearchData={getSearchData} />
      <div className="home-page">
        <div className="promo-banner m-y-24">
          <div className="promo-code semi-bold flex-col">
            <div>Save 10% off | code ABC2D3</div>
            <div>min spend: 500 THB</div>
          </div>
        </div>
        <div className="best-seller-grid">
          <div className="header flex-row">
            <div id="bestSellText">Best seller</div>
            <a
              className="see-more"
              id="showMoreB"
              onClick={handleSeeMoreBestSell}
            >
              See more{" >"}
            </a>
          </div>
          <div class="grid-container m-t-16">
            {showBest
              ? topSell.slice(0, 4).length === 0
                ? null
                : topSell.slice(0, 4).map(renderProduct)
              : null}
            {showMoreBest
              ? topSell.slice(4, 8).length === 0
                ? null
                : topSell.slice(4, 8).map(renderHidden)
              : null}
          </div>
        </div>
        <div className="new-arrivals-grid m-t-20">
          <div className="header flex-row">
            <div id="newArriveText">New arrivals</div>
            <a
              className="see-more"
              id="showMoreN"
              onClick={handleSeeMoreNewArrive}
            >
              See more{" >"}
            </a>
          </div>
          <div class="grid-container m-t-16">
            {showNew
              ? newArrival.slice(0, 4).length === 0
                ? null
                : newArrival.slice(0, 4).map(renderProduct)
              : null}
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
