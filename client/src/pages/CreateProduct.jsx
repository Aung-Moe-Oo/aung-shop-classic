import styled from "styled-components";
import { Announcement } from "../components/Announcement";
import Footer from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { publicRequest } from "../requestMethods";

const Container = styled.div``;

const Top = styled.div`
  padding: 100px 20px 20px;
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
  margin: 0 auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  width: 100%;
  position: relative;

  ${mobile({ padding: "16px", height: "auto" })}
`;

const InputWrapper = styled.div`
  display: flex;
  padding-bottom: 10px;
`;

const Form = styled.form`
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;
const FormInput = styled.input`
  width: 70%;
  margin-left: auto;
  border: none;
  border-bottom: 1px solid #ccc;
`;
const CheckWrapper = styled.div`
  width: 70%;
  margin-left: auto;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const schema = yup.object().shape({
  title: yup.string().required(),
  desc: yup.string().required(),
  img: yup.string().required(),
  price: yup.number().min(1, "Enter valid number").required(),
  size: yup
    .array()
    .of(yup.string().oneOf(["S", "M", "L"]))
    .required(),
  color: yup.array().of(yup.string()).required(),
  categories: yup.array().of(yup.string()).required(),
});

const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data) => {
    try {
      await publicRequest.post("/products", data, {
        withCredentials: true,
      });
      toast.success("Successfully Added New Product!");
    } catch (err) {
      toast.error(err.response.data);
    }
    reset();
  };

  {
    errors.title && toast.error(errors.title.message);
    errors.desc && toast.error(errors.desc.message);
    errors.img && toast.error(errors.img.message);
    errors.price && toast.error(errors.price.message);
    errors.size && toast.error(errors.size.message);
    errors.color && toast.error(errors.color.message);
    errors.categories && toast.error(errors.categories.message);
  }
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
      <Announcement />
      <Navbar />
      <Top>
        <Link to={"/dashboard"}>
          <TopButton>Return to Dashboard</TopButton>
        </Link>
      </Top>
      <Wrapper>
        <Form onSubmit={handleSubmit(onSubmitHandler)}>
          <InputWrapper>
            <label>Title:</label>
            <FormInput type="text" {...register("title")} />
          </InputWrapper>

          <InputWrapper>
            <label>Description:</label>
            <FormInput type="text" {...register("desc")} />
          </InputWrapper>

          <InputWrapper>
            <label>Image URL:</label>
            <FormInput type="text" {...register("img")} />
          </InputWrapper>

          <InputWrapper>
            <label>Price:</label>
            <FormInput type="number" {...register("price")} />
          </InputWrapper>

          <InputWrapper>
            <label>Size:</label>
            <CheckWrapper>
              <label>
                <input type="checkbox" value="S" {...register("size")} />S
              </label>
              <label>
                <input type="checkbox" value="M" {...register("size")} />M
              </label>
              <label>
                <input type="checkbox" value="L" {...register("size")} />L
              </label>
            </CheckWrapper>
          </InputWrapper>
          <InputWrapper>
            <label>Color:</label>
            <CheckWrapper>
              <label>
                <input type="checkbox" value="red" {...register("color")} />
                Red
              </label>
              <label>
                <input type="checkbox" value="blue" {...register("color")} />
                Blue
              </label>
              <label>
                <input type="checkbox" value="green" {...register("color")} />
                Green
              </label>
              <label>
                <input type="checkbox" value="black" {...register("color")} />
                Black
              </label>
              <label>
                <input type="checkbox" value="white" {...register("color")} />
                White
              </label>
              <label>
                <input type="checkbox" value="gray" {...register("color")} />
                Gray
              </label>
              <label>
                <input type="checkbox" value="orange" {...register("color")} />
                Orange
              </label>
              <label>
                <input type="checkbox" value="pink" {...register("color")} />
                Pink
              </label>
            </CheckWrapper>
          </InputWrapper>
          <InputWrapper>
            <label>Categories:</label>
            <CheckWrapper>
              <label>
                <input
                  type="checkbox"
                  value="man"
                  {...register("categories")}
                />
                man
              </label>
              <label>
                <input
                  type="checkbox"
                  value="woman"
                  {...register("categories")}
                />
                woman
              </label>
              <label>
                <input
                  type="checkbox"
                  value="hat"
                  {...register("categories")}
                />
                hat
              </label>
              <label>
                <input
                  type="checkbox"
                  value="shirt"
                  {...register("categories")}
                />
                shirt
              </label>
              <label>
                <input
                  type="checkbox"
                  value="pants"
                  {...register("categories")}
                />
                pants
              </label>
              <label>
                <input
                  type="checkbox"
                  value="winter"
                  {...register("categories")}
                />
                winter
              </label>
              <label>
                <input
                  type="checkbox"
                  value="tshirt"
                  {...register("categories")}
                />
                tshirt
              </label>
            </CheckWrapper>
          </InputWrapper>

          <TopButton type="submit">Submit</TopButton>
        </Form>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default CreateProduct;
