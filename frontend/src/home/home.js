import { useState } from "react";
import "./home.scss";

const Home = () => {
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
        name: "lettuce",
        url:
          "https://www.vhv.rs/dpng/d/88-883016_iceberg-lettuce-png-transparent-png.png",
      },
      {
        name: "lettuce",
        url:
          "https://www.vhv.rs/dpng/d/88-883016_iceberg-lettuce-png-transparent-png.png",
      },
      {
        name: "lettuce",
        url:
          "https://www.vhv.rs/dpng/d/88-883016_iceberg-lettuce-png-transparent-png.png",
      },
      {
        name: "lettuce",
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

  const Product = (props) => {
    return (
      <div className="product flex-col">
        <img src={props.product.url} />
        <div className="name">{props.product.name}</div>
      </div>
    );
  };

  const renderProduct = (product, index) => {
    return <Product product={product} />;
  };

  return (
    <div className="home-container flex-col">
      <div className="home-page flex-col">
        <div className="promo-banner m-y-24">
          <div className="promo-code semi-bold flex-col">
            <div>Code: ABC123</div>
            <div>min spend</div>
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
    </div>
  );
};

export default Home;
