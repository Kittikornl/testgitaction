import { useEffect, useState } from "react";
import {
  getHomeData,
  getAllProduct,
  getAllShop,
} from "../service/home.service";
import "./home.scss";
import vegThumbnail from "../img/veg-thumbnail.jpg";
import Searchbar from "../components/searchbar";
import { postSearchProduct } from "../service/search.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [showMoreBest, setShowMoreBest] = useState(false);
  const [showMoreNew, setShowMoreNew] = useState(false);
  const [newArrival, setNewArrival] = useState([]);
  const [topSell, setTopSell] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [showBest, setShowBest] = useState(true);
  const [showNew, setShowNew] = useState(true);
  const [allShop, setAllShop] = useState([]);
  const [productInShop, setProductInShop] = useState([]);

  useEffect(() => {
    fetchHomeData();
    fetchAllProduct();
    fetchAllShop();
  }, []);

  const fetchHomeData = async () => {
    var showMoreB = document.getElementById("showMoreB");
    var showMoreN = document.getElementById("showMoreN");

    const result = await getHomeData();
    setNewArrival(result.data.new_products.slice(0, 8));
    setTopSell(result.data.top_selling_products.slice(0, 8));
    if (result.data.new_products.slice(0, 8).length < 4) {
      showMoreN.innerHTML = "";
    }
    if (result.data.top_selling_products.slice(0, 8).length < 4) {
      showMoreB.innerHTML = "";
    }
  };

  const fetchAllProduct = async () => {
    const result = await getAllProduct();
    setAllProduct(result.data);
    console.log(result.data);
  };

  const fetchAllShop = async () => {
    const result = await getAllShop();
    setAllShop(result.data);
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
            alt={props.product.ProductTitle}
          />
        </a>
        <div className="name">
          {props.product.length === 0 ? "" : props.product.ProductTitle}
        </div>
        <div className="shop-name-container flex-row">
          <FontAwesomeIcon className="store-icon m-t-16" icon={faStore} />
          <div className="shop-name">
            {allShop.length === 0
              ? null
              : allShop[props.product.ShopID - 1].shopname}
          </div>
        </div>
      </div>
    );
  };

  const renderProduct = (product, index) => {
    return product.Amount === 0 ? null : <Product product={product} />;
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
            alt={props.product.ProductTitle}
          />
        </a>
        <div className="name">{props.product.ProductTitle}</div>
        <div className="shop-name-container flex-row">
          <FontAwesomeIcon className="store-icon m-t-16" icon={faStore} />
          <div className="shop-name">
            {allShop.length === 0
              ? null
              : allShop[props.product.ShopID - 1].shopname}
          </div>
        </div>
      </div>
    );
  };

  const renderHidden = (product, index) => {
    return product.Amount === 0 ? null : <ProductHidden product={product} />;
  };

  const getSearchData = async (data) => {
    const payload = {
      Search: data.keyword === "" ? null : data.keyword,
      ProductType: data.type === "" ? null : data.type,
    };

    const result = await postSearchProduct(payload);
    console.log(result);

    if (payload.Search === null && payload.ProductType === null) {
      fetchAllProduct();
      setProductInShop([]);
      setShowBest(true);
      setShowNew(true);
    } else if (payload.Search === null && payload.ProductType !== null) {
      if (result.data.q_by_type !== undefined) {
        setAllProduct(result.data.q_by_type);
        setProductInShop([]);
        setShowNew(false);
        setShowBest(false);
      }
    } else if (payload.Search !== null && payload.ProductType === null) {
      if (result.data.q_by_productname !== undefined) {
        setProductInShop(result.data.all_products_inshop);
        setAllProduct(result.data.q_by_productname);
        setShowNew(false);
        setShowBest(false);
      }
    } else if (payload.Search !== null && payload.ProductType !== null) {
      if (result.data.products_information) {
        setAllProduct(result.data.products_information);
        setProductInShop(result.data.allproducts_for_shop);
        setShowNew(false);
        setShowBest(false);
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
        {showBest ? (
          <div className="best-seller-grid">
            <div className="header flex-row">
              <div id="bestSellText">Best seller</div>
              <button
                className="see-more"
                id="showMoreB"
                onClick={handleSeeMoreBestSell}
              >
                {topSell.length > 4 ? "See more >" : ""}
              </button>
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
        ) : null}
        {showNew ? (
          <div className="new-arrivals-grid m-t-20">
            <div className="header flex-row">
              <div id="newArriveText">New arrivals</div>
              <button
                className="see-more"
                id="showMoreN"
                onClick={handleSeeMoreNewArrive}
              >
                {newArrival.length > 4 ? "See more >" : ""}
              </button>
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
        ) : null}
        <div className="all-products-grid m-t-20">
          <div className="header flex-row">
            <div>All products</div>
          </div>
          <div class="grid-container m-t-16">
            {productInShop.length === 0
              ? null
              : productInShop.map(renderProduct)}
            {allProduct.length === 0 ? null : allProduct.map(renderProduct)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
