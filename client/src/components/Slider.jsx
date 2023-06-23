import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import styled from "styled-components";
import { useState } from "react";
import { sliderItems } from "../data";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })}
`;
const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 50%;
  opacity: 0.8;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  cursor: pointer;
  margin: auto;
  z-index: 2;
`;
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideindex * -100}vw);
`;
const Slide = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
`;
const ImgContainer = styled.div`
  height: 100%;
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  align-self: flex-end;
  height: 95%;
  margin: 0 auto;
`;

const InfoContainer = styled.div`
  flex: 3;
  padding: 50px 20px;
`;
const Title = styled.h1`
  font-size: 60px;
`;
const Desc = styled.p`
  margin: 50px 0;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 2px;
`;
const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

const Slider = () => {
  const [slideindex, setSlideindex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideindex(slideindex > 0 ? slideindex - 1 : 2);
    } else {
      setSlideindex(slideindex < 2 ? slideindex + 1 : 0);
    }
  };
  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>

      <Wrapper slideindex={slideindex}>
        {sliderItems.map((sliderItem) => (
          <Slide bg={sliderItem.bg} key={sliderItem.id}>
            <ImgContainer>
              <Image src={sliderItem.img} alt="model" />
            </ImgContainer>

            <InfoContainer>
              <Title>{sliderItem.title}</Title>
              <Desc>{sliderItem.desc}</Desc>
              <Link to={`/products/tshirt`}>
                <Button>SHOP NOW</Button>
              </Link>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>

      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
