import { useState } from "react";
import "./shop.scss";
import Scores from "../components/scores";
import { Button } from "antd";

const Shop = () => {
  const initData = {
    name: "ไร่เกษตรรวมใจ",
    role: 2,
    phoneNo: "012-3456-7890",
    address: "254 ถนนพญาไท แขวงวังใหม่ เขตปทุมวัน กรุงเทพมหานคร 10330",
    shop: {
      score: 5.0,
      vote: [],
    },
    product: [
      {
        name: "lettuce",
        url:
          "https://www.vhv.rs/dpng/d/88-883016_iceberg-lettuce-png-transparent-png.png",
      },
      {
        name: "mango",
        url:
          "https://www.vhv.rs/dpng/d/88-883016_iceberg-lettuce-png-transparent-png.png",
      },
      {
        name: "banana",
        url:
          "https://www.vhv.rs/dpng/d/88-883016_iceberg-lettuce-png-transparent-png.png",
      },
      {
        name: "apple",
        url:
          "https://www.vhv.rs/dpng/d/88-883016_iceberg-lettuce-png-transparent-png.png",
      },
      {
        name: "durian",
        url:
          "https://www.vhv.rs/dpng/d/88-883016_iceberg-lettuce-png-transparent-png.png",
      },
      {
        name: "carrot",
        url:
          "https://www.vhv.rs/dpng/d/88-883016_iceberg-lettuce-png-transparent-png.png",
      },
    ],
  };
  const [data, setData] = useState(initData);
  const [showMoreBest, setShowMoreBest] = useState(false);
  const [showMoreNew, setShowMoreNew] = useState(false);

  const handleSeeMoreBestSell = () => {
    setShowMoreBest(!showMoreBest);
    var hidden0 = document.getElementById("hidden0");
    var hidden1 = document.getElementById("hidden1");
    var hidden2 = document.getElementById("hidden2");
    var hidden3 = document.getElementById("hidden3");
    var showMoreB = document.getElementById("showMoreB");

    if (showMoreBest === false) {
      hidden0.style.display = "flex";
      hidden1.style.display = "flex";
      hidden2.style.display = "flex";
      hidden3.style.display = "flex";
      showMoreB.innerHTML = "See less >";
    } else {
      hidden0.style.display = "none";
      hidden1.style.display = "none";
      hidden2.style.display = "none";
      hidden3.style.display = "none";
      showMoreB.innerHTML = "See more >";
    }
  };

  const handleSeeMoreNewArrive = () => {
    setShowMoreNew(!showMoreNew);
    var hidden4 = document.getElementById("hidden4");
    var hidden5 = document.getElementById("hidden5");
    var hidden6 = document.getElementById("hidden6");
    var hidden7 = document.getElementById("hidden7");
    var showMoreN = document.getElementById("showMoreN");

    if (showMoreBest === false) {
      hidden4.style.display = "flex";
      hidden5.style.display = "flex";
      hidden6.style.display = "flex";
      hidden7.style.display = "flex";
      showMoreN.innerHTML = "See less >";
    } else {
      hidden4.style.display = "none";
      hidden5.style.display = "none";
      hidden6.style.display = "none";
      hidden7.style.display = "none";
      showMoreN.innerHTML = "See more >";
    }
  };

  const handleEdit = () => {};

  const handleAdd = () => {};

  const handleClick = () => {
    console.log("click");
  };

  const Product = (props) => {
    return (
      <div className="product flex-col">
        <a onClick={handleClick}>
          <img src={props.product.url} />
        </a>
        <div className="name">{props.product.name}</div>
      </div>
    );
  };

  const renderProduct = (product, index) => {
    return <Product product={product} />;
  };

  const renderButtonContentText = (Shop) => {
    if (data.role === 2) {
      return (
        <div className="button-content flex-row">
          <div className="flex-row">
            <div className="score-text">{Shop.score.toFixed(1)}</div>
            <Scores score={Shop.score} />
          </div>
          <div className="name">{data.name}</div>
          <div className="button-group flex-row">
            <Button
              htmlType="edit"
              className="button-green"
              onClick={handleEdit}
            >
              Edit Product
            </Button>
            <Button
              htmlType="edit"
              className="button-green"
              onClick={handleAdd}
            >
              Add Product
            </Button>
          </div>
        </div>
      );
    } else if (data.role === 1) {
      return (
        <div className="button-content flex-row">
          <div className="flex-row">
            <div className="score-text">{Shop.score.toFixed(1)}</div>
            <Scores score={Shop.score} />
          </div>
          <div className="name">{data.name}</div>
          <Button htmlType="edit" className="button-green" onClick={handleEdit}>
            Edit Product
          </Button>
        </div>
      );
    }
  };

  return (
    <div className="shop-container flex-col">
      <div className="empty-box">Shop Description</div>
      <div className="shop-page flex-col">
        <div className="head flex-row">
          {renderButtonContentText(data.shop)}
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
            <div className="product flex-col">
              <img src="https://www.freshpoint.com/wp-content/uploads/commodity-iceberg.jpg" />
              <div className="name">Lettuce</div>
            </div>
            <div className="product flex-col">
              <img src="https://www.errenskitchen.com/wp-content/uploads/2014/04/broccoli.jpg" />
              <div className="name">Broccoli</div>
            </div>
            <div className="product flex-col">
              <img src="https://www.purina.ca/sites/g/files/auxxlc601/files/styles/large/public/Purina-Article-Can-Dogs-Eat-Mangoes_500x300.png?itok=6CK5UzqM" />
              <div className="name">Mango</div>
            </div>
            <div className="product flex-col">
              <img src="https://www.swedishnomad.com/wp-content/images/2019/09/Durian-Fruit.jpg" />
              <div className="name">Durian</div>
            </div>
            <div id="hidden0">
              {showMoreBest ? (
                <div className="product flex-col">
                  <img src="https://www.vhv.rs/dpng/d/88-883016_iceberg-lettuce-png-transparent-png.png" />
                  <div className="name">Lettuce</div>
                </div>
              ) : null}
            </div>
            <div id="hidden1">
              {showMoreBest ? (
                <div className="product flex-col">
                  <img src="https://www.vhv.rs/dpng/d/88-883016_iceberg-lettuce-png-transparent-png.png" />
                  <div className="name">Lettuce</div>
                </div>
              ) : null}
            </div>
            <div id="hidden2">
              {showMoreBest ? (
                <div className="product flex-col">
                  <img src="https://www.vhv.rs/dpng/d/88-883016_iceberg-lettuce-png-transparent-png.png" />
                  <div className="name">Lettuce</div>
                </div>
              ) : null}
            </div>
            <div id="hidden3">
              {showMoreBest ? (
                <div className="product flex-col">
                  <img src="https://www.vhv.rs/dpng/d/88-883016_iceberg-lettuce-png-transparent-png.png" />
                  <div className="name">Lettuce</div>
                </div>
              ) : null}
            </div>
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
            <div className="product flex-col">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTExscmkKqaNT_3xw1a2w0Fw5rEWmK_J6bLFw&usqp=CAU" />
              <div className="name">Kiwi</div>
            </div>
            <div className="product flex-col">
              <img src="https://experiencelife.com/wp-content/uploads/2011/07/Coconuts-1280x720.jpg" />
              <div className="name">Coconut</div>
            </div>
            <div className="product flex-col">
              <img src="https://hgic.clemson.edu/wp-content/uploads/1999/06/freshly-picked-ripe-strawberries-barbara-h-smi-scaled.jpeg" />
              <div className="name">Strawberry</div>
            </div>
            <div className="product flex-col">
              <img src="https://www.highmowingseeds.com/wordpress/wp-content/uploads/2017/05/dolciva_carrot-92416-039-2x2.jpg" />
              <div className="name">Carrot</div>
            </div>
            <div id="hidden4">
              {showMoreNew ? (
                <div className="product flex-col">
                  <img src="https://www.vhv.rs/dpng/d/88-883016_iceberg-lettuce-png-transparent-png.png" />
                  <div className="name">Lettuce</div>
                </div>
              ) : null}
            </div>
            <div id="hidden5">
              {showMoreNew ? (
                <div className="product flex-col">
                  <img src="https://www.vhv.rs/dpng/d/88-883016_iceberg-lettuce-png-transparent-png.png" />
                  <div className="name">Lettuce</div>
                </div>
              ) : null}
            </div>
            <div id="hidden6">
              {showMoreNew ? (
                <div className="product flex-col">
                  <img src="https://www.vhv.rs/dpng/d/88-883016_iceberg-lettuce-png-transparent-png.png" />
                  <div className="name">Lettuce</div>
                </div>
              ) : null}
            </div>
            <div id="hidden7">
              {showMoreNew ? (
                <div className="product flex-col">
                  <img src="https://www.vhv.rs/dpng/d/88-883016_iceberg-lettuce-png-transparent-png.png" />
                  <div className="name">Lettuce</div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="all-products-grid m-t-20">
          <div className="header flex-row">
            <div>All products</div>
          </div>
          <div class="grid-container m-t-16">
            {data.product.map(renderProduct)}
          </div>
        </div>
      </div>
      <div className="contact flex-row">
        <div>Shop Contact: {data.phoneNo}</div>
        <div style={{ marginLeft: "100px" }}>Address: {data.address}</div>
      </div>
    </div>
  );
};

export default Shop;
