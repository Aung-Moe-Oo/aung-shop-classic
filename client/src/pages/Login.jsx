import styled from "styled-components";
// import bgPhoto from "../components/img/bg3.jpg";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.274),
      rgba(255, 255, 255, 0.151)
    ),
    url("https://i.ibb.co/nrR8S59/bg3.jpg") center no-repeat;
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
  width: 40%;
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
const Link = styled.a`
  text-transform: uppercase;
  margin-top: 15px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input placeholder="User Name" />
          <Input placeholder="Password" />
          <Button>LOG IN</Button>
          <Link>Forgot password?</Link>
          <Link>Create a new account</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
