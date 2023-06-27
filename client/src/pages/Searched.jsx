import styled from "styled-components";
import { Announcement } from "../components/Announcement";
import Footer from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { mobile } from "../responsive";
import { Link, useParams } from "react-router-dom";
import Product from "../components/Product";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";

const Container = styled.div``;

const Top = styled.div`
  padding: 100px 20px 0;
  display: flex;
  justify-content: space-between;
  align-content: center;
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 300px;

  ${mobile({ padding: "16px", height: "auto" })}
`;

const Title = styled.h1`
  font-weight: 200;
  text-align: center;
`;

const Desc = styled.p`
  margin: 20px 0;
`;

const ProductContainer = styled.div`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Searched = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get("/products");
        const searchedData = res.data.filter((i) =>
          i.desc.toLowerCase().includes(params.name.toLowerCase())
        );
        setProducts(searchedData);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [params]);

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Top>
        <Link to={"/"}>
          <TopButton>CONTINUE SHOPPING</TopButton>
        </Link>
      </Top>
      {products.length > 0 ? (
        <ProductContainer>
          {products.map((item) => (
            <Product item={item} key={item._id} />
          ))}
        </ProductContainer>
      ) : (
        <Wrapper>
          <Title>There is no product you search.</Title>
          <Desc>Happy shopping.</Desc>
        </Wrapper>
      )}

      <Footer />
    </Container>
  );
};

export default Searched;
