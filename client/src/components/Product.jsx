import { FavoriteBorderOutlined } from "@mui/icons-material";
import { SearchOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { saveItem } from "../redux/cartRedux";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
`;
const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eff6fc;
  position: relative;
  &:hover ${Info} {
    opacity: 1;
  }
`;
const Circle = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background-color: #fff;
  position: absolute;
`;
const Image = styled.img`
  height: 200px;
  width: 200px;
  object-fit: contain;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
const Product = ({ item }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        <Icon
          onClick={() => dispatch(saveItem(item._id))}
          style={{
            color: cart.favourites.find((i) => i === item._id)
              ? "#ff0000e1"
              : "#000",
          }}
        >
          <FavoriteBorderOutlined />
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`} style={{ color: "#000" }}>
            <SearchOutlined />
          </Link>
        </Icon>
      </Info>
    </Container>
  );
};
Product.propTypes = {
  item: PropTypes.any,
};
export default Product;
