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
import { useTranslation } from "react-i18next";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;
const Top = styled.div`
  padding: 78px 0 16px;
  display: flex;
  justify-content: space-between;
  align-content: center;

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
const DescWrapper = styled.div`
  height: 200px;
  margin-top: 50px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 200;
  padding-bottom: 24px;
  text-align: center;
  font-size: ${(props) => (props.language == "mm" ? "20px" : "24px")};
`;

const Desc = styled.h1`
  font-weight: 300;
  text-align: center;
  font-size: ${(props) => (props.language == "mm" ? "20px" : "24px")};
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
  const { t, i18n } = useTranslation();
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
        <Top>
          <Link to={"/"}>
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>YOUR FAVOURITES</TopTexts>
        </Top>
        {products.length > 0 ? (
          <ProductContainer>
            {products.map((item) => (
              <Product item={item} key={item._id} />
            ))}
          </ProductContainer>
        ) : (
          <DescWrapper>
            <Title language={i18n.language}>{t("fav-title")}</Title>
            <Desc language={i18n.language}>{t("search-desc")}</Desc>
          </DescWrapper>
        )}
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Favourites;
