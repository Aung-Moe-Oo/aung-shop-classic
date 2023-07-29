import Search from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { Tooltip, Badge } from "@mui/material";
import { mobile } from "../responsive";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  position: fixed;
  z-index: 10;
  width: 100%;
  background-color: #fff;

  height: 60px;
  overflow: hidden;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "10px 0px" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.form`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 0px;
  padding: 10px;
  border-radius: 5px;
  ${mobile({ padding: "5px", marginLeft: "5px" })}
`;
const Input = styled.input`
  border: none;
  ${mobile({ width: "60px" })}
`;

const Center = styled.div`
  text-align: center;
  flex: 1;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ paddingRight: "18px" })}
`;
const Language = styled.div`
  cursor: pointer;
  font-size: 18px;
  width: 20px;
  margin-right: 14px;
`;
const MenuItem = styled.div`
  cursor: pointer;
  font-size: 14px;
  margin-left: 8px;
  ${mobile({ fontSize: "12px" })}
`;

export const Navbar = () => {
  const [input, setInput] = useState("");
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const quantity = useSelector((state) => state.cart.products.length);
  const heart = useSelector((state) => state.cart.favourites.length);

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/searched/" + input);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      submitHandler(event);
    }
  };

  const handleLanguage = () => {
    i18next.changeLanguage(i18n.language == "en-US" ? "mm" : "en-US");
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <SearchContainer onSubmit={submitHandler}>
            <Input
              placeholder="search"
              onChange={(e) => setInput(e.target.value)}
              type="text"
              value={input}
              onKeyDown={handleKeyDown}
            />
            <Search style={{ color: "gray", fontSize: "16px" }} />
          </SearchContainer>
        </Left>

        <Center>
          <Link to="/" style={{ textDecoration: "none", color: "#000" }}>
            <Logo>AUNG.</Logo>
          </Link>
        </Center>
        <Right>
          {/* <Link to="/login" style={{ textDecoration: "none", color: "#000" }}>
            <MenuItem>SIGN IN</MenuItem>
          </Link> */}

          <Tooltip title="Change Language" arrow>
            <Language onClick={(e) => handleLanguage(e)}>
              {i18n.language == "en-US" ? "EN" : "MM"}
            </Language>
          </Tooltip>
          <Link
            to="/favourites"
            style={{ textDecoration: "none", color: "#000" }}
          >
            <MenuItem>
              <Badge badgeContent={heart} color="primary">
                <Tooltip title="Favourites" arrow>
                  <FavoriteOutlinedIcon
                    sx={{ color: "#ff2045" }}
                    aria-label="favourites"
                  />
                </Tooltip>
              </Badge>
            </MenuItem>
          </Link>
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <Tooltip title="View Cart" arrow>
                  <ShoppingCartIcon
                    sx={{ color: "#2e8094" }}
                    aria-label="cart"
                  />
                </Tooltip>
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

// export default Navbar;
