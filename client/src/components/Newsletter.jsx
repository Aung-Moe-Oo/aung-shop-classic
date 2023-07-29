import { Send } from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../responsive";
import { publicRequest } from "../requestMethods";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
  ${mobile({ fontSize: "30px" })}
`;
const Desc = styled.div`
  margin-bottom: 40px;
  font-weight: 300;
  height: 24px;
  font-size: ${(props) => (props.language == "mm" ? "20px" : "24px")};
  ${mobile({ textAlign: "center", fontSize: "14px", padding: "0 5px" })};
`;
const InputContainer = styled.form`
  width: 50%;
  height: 40px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;

  ${mobile({ width: "80%" })}
`;
const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;
const Button = styled.button`
  flex: 1;
  border: none;
  color: #fff;
  background-color: #2e8094;
`;

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const sendMail = async () => {
    await publicRequest
      .post("/mail", { email })
      .then(navigate("/success"))
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc language={i18n.language}>{t("newsletter")}</Desc>
      <InputContainer onSubmit={sendMail}>
        <Input
          type="email"
          required
          placeholder="Your Email"
          value={email}
          onChange={handleEmailChange}
        />
        <Button type="submit">
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
