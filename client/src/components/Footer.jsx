import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const Logo = styled.h1``;
const Desc = styled.p`
  margin: 20px 0;
  min-height: 100px;
  line-height: 24px;
  text-align: left;
  font-size: ${(props) => (props.language == "mm" ? "14px" : "16px")};
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #fff;
  background-color: #${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
`;
const Title = styled.h3`
  margin-bottom: 30px;
`;
const List = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;

  ${mobile({ backgroundColor: "#FCF5F5" })}
`;
const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;
const Payment = styled.img`
  width: 70%;
  ${mobile({ width: "100%" })}
`;

const Footer = () => {
  const { t, i18n } = useTranslation();
  return (
    <Container>
      <Left>
        <Logo>AUNG.</Logo>
        <Desc language={i18n.language}>{t("long-desc")}</Desc>
        <SocialContainer>
          <SocialIcon color="3b5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="e4405f">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55acee">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="e60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>
            <Link to={"/"}>Home</Link>
          </ListItem>
          <ListItem>
            <Link to={"/cart"}>Cart</Link>
          </ListItem>
          <ListItem>
            <Link to={"/products/tshirt"}>Man Fashion</Link>
          </ListItem>
          <ListItem>
            <Link to={"/products/woman"}>Woman Fashion</Link>
          </ListItem>
          <ListItem>
            <Link to={"/favourites"}>Wishlist</Link>
          </ListItem>
          <ListItem>
            <Link to={"/login"}>Login</Link>
          </ListItem>
        </List>
      </Center>

      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> Yangon , Myanmar
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} />
          +95-9790801550
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} />
          saiaungmoeoo.lk@gmail.com
        </ContactItem>
        <Payment src="https://i.ibb.co/mhvTkzV/payment.jpg" />
      </Right>
    </Container>
  );
};

export default Footer;
