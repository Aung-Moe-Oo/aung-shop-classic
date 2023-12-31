import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import styled from "styled-components";
import { useState } from "react";
import { sliderItems } from "../data";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
  left: 10px;
  cursor: pointer;
  margin: auto;
  z-index: 2;
`;
const ArrowRight = styled.div`
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
  right: 10px;
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
  display: flex;
  flex-direction: column;
  padding: 50px 20px;
  gap: 20px;
`;
const Title = styled.h1`
  font-size: ${(props) => (props.language !== "mm" ? "40px" : "30px")};
  height: 40px;
`;
const Desc = styled.h4`
  margin: 30px 10px 30px 0;
  font-size: ${(props) => (props.language !== "mm" ? "20px" : "19px")};
  line-height: 35px;
  font-weight: 400;
  letter-spacing: ${(props) => (props.language !== "mm" ? "0px" : "1.5px")};
`;
const Button = styled.button`
  padding: 10px;
  height: 50px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

const Slider = () => {
  const [slideindex, setSlideindex] = useState(0);
  const { t, i18n } = useTranslation();
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
        <Slide bg={sliderItems[0].bg}>
          <ImgContainer>
            <Image src={sliderItems[0].img} alt="model" />
          </ImgContainer>

          <InfoContainer>
            <Title language={i18n.language}>{t("hero-popular")}</Title>
            <Desc language={i18n.language}>
              {t("hero-desc")} <br /> {t("hero-desc2")}
            </Desc>
            <Link to={`/products/man`}>
              <Button>SHOP NOW</Button>
            </Link>
          </InfoContainer>
        </Slide>
        <Slide bg={sliderItems[1].bg}>
          <ImgContainer>
            <Image src={sliderItems[1].img} alt="model" />
          </ImgContainer>

          <InfoContainer>
            <Title language={i18n.language}>{t("hero-winter")}</Title>{" "}
            <Desc language={i18n.language}>
              {t("hero-desc")} <br /> {t("hero-desc2")}
            </Desc>
            <Link to={`/products/winter`}>
              <Button>SHOP NOW</Button>
            </Link>
          </InfoContainer>
        </Slide>
        <Slide bg={sliderItems[2].bg}>
          <ImgContainer>
            <Image src={sliderItems[2].img} alt="model" />
          </ImgContainer>

          <InfoContainer>
            <Title language={i18n.language}>{t("hero-summer")}</Title>{" "}
            <Desc language={i18n.language}>
              {t("hero-desc")} <br /> {t("hero-desc2")}
            </Desc>
            <Link to={`/products/tshirt`}>
              <Button>SHOP NOW</Button>
            </Link>
          </InfoContainer>
        </Slide>
      </Wrapper>

      <ArrowRight direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </ArrowRight>
    </Container>
  );
};

export default Slider;
