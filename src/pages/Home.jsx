import { Link } from "react-router-dom";

function Home() {

  const categories = [
    {
      name: "Electronics",
      value: "electronics",
      icon: "💻"
    },
    {
      name: "Men's Clothing",
      value: "men's clothing",
      icon: "👕"
    },
    {
      name: "Women's Clothing",
      value: "women's clothing",
      icon: "👗"
    },
    {
      name: "Jewellery",
      value: "jewelery",
      icon: "💎"
    }
  ];


  return (

    <div>


      <section className="hero">

        <div>

          <h1>
            Discover Something
            <br />
            You'll Love
          </h1>

          <p>
            Explore products selected
            for your everyday needs.
          </p>

          <Link
            to="/products"
            className="hero-btn"
          >
            Explore Products
          </Link>

        </div>

      </section>


      <section className="categories">

        <h2>
          Shop by Category
        </h2>


        <div className="category-grid">

          {categories.map(category => (

            <Link
              key={category.value}
              to={`/products?category=${encodeURIComponent(category.value)}`}
              className="category-card"
            >

              <div style={{ fontSize: "40px" }}>
                {category.icon}
              </div>

              <h3>
                {category.name}
              </h3>

              <p>
                Explore →
              </p>

            </Link>

          ))}

        </div>

      </section>

    </div>
  );
}

export default Home;