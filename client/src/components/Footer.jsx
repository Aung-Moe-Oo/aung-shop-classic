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

  ${mobile({ display: "none" })}
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
  return (
    <Container>
      <Left>
        <Logo>AUNG.</Logo>
        <Desc>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
          dicta! Perferendis nam quidem dolorum! Culpa repellendus corporis
          architecto ad ullam!
        </Desc>
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
            <Link to={"/"}>Wishlist</Link>
          </ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>

      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> Yangon , Myanmar
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} />
          +95-9123456789
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} /> contact@aung.com
        </ContactItem>
        <Payment src="https://i.ibb.co/mhvTkzV/payment.jpg" />
      </Right>
    </Container>
  );
};

export default Footer;
