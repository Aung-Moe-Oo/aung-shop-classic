import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import PropTypes from "prop-types";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "30vh" })}
`;
const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  color: #fff;
  text-shadow: 1px 1px #555;
  margin-bottom: 20px;
  text-align: center;
  ${mobile({ fontSize: "18px" })}
`;
const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: #fff;
  color: #555;
  cursor: pointer;
  font-weight: 600;
  text-transform: uppercase;
  ${mobile({ padding: "8px" })}
`;

const CategoryITem = ({ item }) => {
  return (
    <Container>
      <Link to={`/products/${item.cat}`}>
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button>Shop Now</Button>
        </Info>
      </Link>
    </Container>
  );
};
CategoryITem.propTypes = {
  item: PropTypes.any,
};

export default CategoryITem;
