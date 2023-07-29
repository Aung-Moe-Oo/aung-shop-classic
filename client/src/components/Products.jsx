import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import PropTypes from "prop-types";
import { publicRequest } from "../requestMethods";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  overflow-x: auto;
  max-width: 100%;
  max-height: 50%;
  scroll-snap-type: x mandatory;
  padding: 20px;
  flex-wrap: wrap;
`;
const ButtonWrapper = styled.div`
  flex: 100%;
  display: flex;
`;
const Button = styled.button`
  margin-left: auto;
  margin-top: 1rem;
  font-weight: 700;
  padding: 10px 25px;
  border: 2px solid #2e8094;
  background-color: #fff;
  cursor: pointer;
  transition: 0.5s ease;
  &:hover {
    background-color: #2e8094;
    color: #fff;
  }
  ${mobile({
    width: "150px",
  })}
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [seemore, setSeemore] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          cat ? `/products?category=${cat}` : "/products"
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {cat
        ? filteredProducts.length > 0
          ? filteredProducts.map((item) => (
              <Product item={item} key={item._id} />
            ))
          : products
              .slice(0, 8)
              .map((item) => <Product item={item} key={item._id} />)
        : seemore
        ? products.map((item) => <Product item={item} key={item._id} />)
        : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item._id} />)}
      <ButtonWrapper>
        {products.length > 8 && (
          <Button onClick={() => setSeemore(!seemore)}>
            {!seemore ? "See more" : "See less"}
          </Button>
        )}
      </ButtonWrapper>
    </Container>
  );
};

Products.propTypes = {
  cat: PropTypes.string,
  filters: PropTypes.object,
  sort: PropTypes.string,
};

export default Products;
