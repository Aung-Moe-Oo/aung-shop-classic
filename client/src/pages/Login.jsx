import styled from "styled-components";
import { mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useContext, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../redux/authContextProvider";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.274),
      rgba(255, 255, 255, 0.151)
    ),
    url("https://i.ibb.co/sqnYc78/bg2.jpg") center no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.205);
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.288);
  backdrop-filter: blur(3px);
  border-radius: 5px;

  ${mobile({ width: "75%" })}
`;
const Title = styled.h1`
  text-transform: uppercase;
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;

  background-color: rgba(255, 255, 255, 0.205);
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.288);
  border: none;

  &::placeholder {
    font-weight: 800;
  }
`;
const Button = styled.button`
  width: 50%;
  border: none;
  cursor: pointer;
  padding: 10px 15px;
  color: #000;
  text-transform: uppercase;
  transition: 0.3s ease;
  margin: 10px 0;

  background-color: rgba(255, 255, 255, 0.205);
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.288);
  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;
const SideLink = styled.span`
  text-transform: uppercase;
  margin-top: 15px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({
      email,
      password,
    })
      .then((res) => {
        toast.success("Login Successfully.");
        if (res.data.isAdmin) {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };
  return (
    <Container>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="User Email"
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            placeholder="Password"
            type="password"
            name="password"
            autoComplete="on"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">LOG IN</Button>
          <Link to="/register">
            <SideLink>Create a new account</SideLink>
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
