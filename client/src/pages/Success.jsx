import styled from "styled-components";
import { Announcement } from "../components/Announcement";
import Footer from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

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

const Title = styled.p`
  font-size: 24px;
`;

const Desc = styled.p`
  font-size: 20px;
  margin: 20px 0;
`;

const Success = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Announcement />
      <Navbar />
      <Top>
        <Link to={"/"}>
          <TopButton>CONTINUE SHOPPING</TopButton>
        </Link>
      </Top>
      <Wrapper>
        <Title>{t("success-title")}</Title>
        <Desc>{t("success-desc")}</Desc>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Success;
