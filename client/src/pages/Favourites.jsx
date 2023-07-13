import styled from "styled-components";
import Footer from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import Product from "../components/Product";
import { Announcement } from "../components/Announcement";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 100px 20px 20px;

  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  align-self: flex-start;
  ${mobile({ alignSelf: "center" })}
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 20px;

  ${mobile({ flexDirection: "column", justifyContent: "center", gap: "1rem" })}
`;
const TopTexts = styled.div`
  font-size: 20px;
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;
const ProductContainer = styled.div`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  justify-content: space-between;

  ${mobile({ padding: "0" })}}
`;

const Favourites = () => {
  const [products, setProducts] = useState([]);
  const heart = useSelector((state) => state.cart.favourites);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get("/products");
        const likedItems = res.data.filter((i) =>
          heart.some((j) => i._id === j)
        );
        setProducts(likedItems);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [heart]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to={"/"}>
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>YOUR FAVOURITES</TopTexts>
        </Top>
        <ProductContainer>
          {products.slice(0, 8).map((item) => (
            <Product item={item} key={item._id} />
          ))}
        </ProductContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Favourites;
