import styled from "styled-components";
import { Announcement } from "../components/Announcement";
import Footer from "../components/Footer";
import { Navbar } from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { addToCart } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

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
  padding: 0 30px 30px;
  min-height: 400px;
  display: flex;

  ${mobile({ flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  height: 40vh;
  object-fit: cover;
  ${mobile({ paddingTop: "50px" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  ${mobile({ padding: "10px", alignItems: "center" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 80%;
  margin: 30px 0;
  display: flex;
  justify-content: space-between;

  ${mobile({ margin: "30px auto" })}
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  outline: 2px solid ${(props) => (props.selected ? "#000" : "transparent")};
  margin: 0 5px;
  cursor: pointer;
`;
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;
const FilterSizeOption = styled.option``;
const AddContainer = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%", flexDirection: "column-reverse", gap: "16px" })}
`;
const Button1 = styled.button`
  font-weight: 700;
  padding: 15px;
  border: 2px solid #0080806b;
  background-color: #fff;
  cursor: pointer;
  transition: 0.5s ease;
  &:hover {
    background-color: teal;
    color: #fff;
  }
  ${mobile({
    width: "150px",
  })}
`;
const Button = styled.button`
  font-weight: 700;
  padding: 15px;
  border: 2px solid teal;
  background-color: #fff;
  cursor: pointer;
  transition: 0.5s ease;
  &:hover {
    background-color: teal;
    color: #fff;
  }
  ${mobile({
    width: "150px",
  })}
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);

  const handleClick = () => {
    // update cart
    dispatch(
      addToCart({
        ...product,
        color: color.length > 0 ? color : product.color[0],
        size: size.length > 0 ? size : product.size[0],
      })
    );
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Top>
        <Link to={"/"}>
          <TopButton>CONTINUE SHOPPING</TopButton>
        </Link>
      </Top>
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>

        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color:</FilterTitle>
              {product.color?.map((c) => (
                <FilterColor
                  color={c}
                  selected={color === c}
                  key={c}
                  onClick={() => setColor(c)}
                />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size:</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <Link to="/cart">
              <Button1>GO TO CART</Button1>
            </Link>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
