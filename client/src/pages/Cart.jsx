import { Announcement } from "../components/Announcement";
import { Navbar } from "../components/Navbar";
import { mobile } from "../responsive";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Tooltip } from "@mui/material";
import styled from "styled-components";
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../redux/cartRedux";

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
`;
const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
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
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
  flex: 3;
`;
const Product = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span`
  word-break: break-all;
`;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #000;
  background-color: ${(props) => props.color};
`;
const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "15px" })}
`;
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;
const Right = styled.div`
  flex: 1;
`;
const Summary = styled.div`
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
  margin-top: 30px;
  width: 100%;
  padding: 10px;
  background-color: #000;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const heart = useSelector((state) => state.cart.favourites.length);
  const dispatch = useDispatch();

  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    cart.products.forEach((item) => {
      totalQuantity += item.quantity;
      totalPrice += item.price * item.quantity;
    });
    return { totalPrice, totalQuantity };
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Top>
          <Link to={"/"}>
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bags({cart.products.length})</TopText>
            <Link
              to={"/favourites"}
              style={{ textDecoration: "none", color: "#000" }}
            >
              <TopText>Your Favourites({heart})</TopText>
            </Link>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
            {cart.products?.map((product) => (
              <Product key={product._id + product.color + product.size}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Products: </b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID: </b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size: </b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Tooltip title="Plus" arrow>
                      <AddCircleOutline
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch(
                            incrementQuantity({
                              _id: product._id,
                              color: product.color,
                              size: product.size,
                            })
                          )
                        }
                      />
                    </Tooltip>
                    <ProductAmount>{product.quantity} </ProductAmount>

                    <Tooltip title="Minus" arrow>
                      <RemoveCircleOutline
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch(
                            decrementQuantity({
                              _id: product._id,
                              color: product.color,
                              size: product.size,
                            })
                          )
                        }
                      />
                    </Tooltip>
                    <Tooltip title="Remove" arrow>
                      <DeleteOutlineIcon
                        sx={{
                          cursor: "pointer",
                          color: "red",
                          position: "absolute",
                          right: "-50px",
                        }}
                        onClick={() =>
                          dispatch(
                            removeItem({
                              _id: product._id,
                              color: product.color,
                              size: product.size,
                            })
                          )
                        }
                      />
                    </Tooltip>
                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Right>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>SubTotal</SummaryItemText>
                <SummaryItemPrice>$ {getTotal().totalPrice}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>$ 5.9</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>$ -5.9</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>$ {getTotal().totalPrice}</SummaryItemPrice>
              </SummaryItem>
              <Button>CHECKOUT NOW</Button>
            </Summary>
          </Right>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
