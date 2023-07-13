import styled from "styled-components";
import { Announcement } from "../components/Announcement";
import Footer from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { mobile } from "../responsive";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { publicRequest } from "../requestMethods";
import { useEffect, useState } from "react";

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
  title: yup.string(),
  desc: yup.string(),
  img: yup.string(),
  price: yup.number(),
  size: yup.array().of(yup.string().oneOf(["S", "M", "L"])),
  color: yup.array().of(yup.string()),
  categories: yup.array().of(yup.string()),
});

const EditProduct = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);

        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);

  const onSubmitHandler = async (data) => {
    try {
      await publicRequest.put("/products/" + id, data, {
        withCredentials: true,
      });
      navigate("/dashboard");
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
          {product.title && (
            <InputWrapper>
              <label>Title:</label>
              <FormInput
                type="text"
                defaultValue={product.title}
                {...register("title")}
              />
            </InputWrapper>
          )}

          {product.desc && (
            <InputWrapper>
              <label>Description:</label>
              <FormInput
                type="text"
                defaultValue={product.desc}
                {...register("desc")}
              />
            </InputWrapper>
          )}

          {product.img && (
            <InputWrapper>
              <label>Image URL:</label>
              <FormInput
                type="text"
                defaultValue={product.img}
                {...register("img")}
              />
            </InputWrapper>
          )}

          {product.price && (
            <InputWrapper>
              <label>Price:</label>
              <FormInput
                type="number"
                defaultValue={parseInt(product.price.toString())}
                {...register("price")}
              />
            </InputWrapper>
          )}

          {product.size && (
            <InputWrapper>
              <label>Size:</label>
              <CheckWrapper>
                <label>
                  <input
                    type="checkbox"
                    value="S"
                    defaultChecked={product.size?.includes("S")}
                    {...register("size")}
                  />
                  S
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="M"
                    defaultChecked={product.size?.includes("M")}
                    {...register("size")}
                  />
                  M
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="L"
                    defaultChecked={product?.size?.includes("L")}
                    {...register("size")}
                  />
                  L
                </label>
              </CheckWrapper>
            </InputWrapper>
          )}

          {product.color && (
            <InputWrapper>
              <label>Color:</label>
              <CheckWrapper>
                <label>
                  <input
                    type="checkbox"
                    value="red"
                    defaultChecked={product?.color?.includes("red")}
                    {...register("color")}
                  />
                  Red
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="blue"
                    defaultChecked={product?.color?.includes("blue")}
                    {...register("color")}
                  />
                  Blue
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="green"
                    defaultChecked={product?.color?.includes("green")}
                    {...register("color")}
                  />
                  Green
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="black"
                    defaultChecked={product?.color?.includes("black")}
                    {...register("color")}
                  />
                  Black
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="white"
                    defaultChecked={product?.color?.includes("white")}
                    {...register("color")}
                  />
                  White
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="gray"
                    defaultChecked={product?.color?.includes("gray")}
                    {...register("color")}
                  />
                  Gray
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="orange"
                    defaultChecked={product?.color?.includes("orange")}
                    {...register("color")}
                  />
                  Orange
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="pink"
                    defaultChecked={product?.color?.includes("pink")}
                    {...register("color")}
                  />
                  Pink
                </label>
              </CheckWrapper>
            </InputWrapper>
          )}

          {product.categories && (
            <InputWrapper>
              <label>Categories:</label>
              <CheckWrapper>
                <label>
                  <input
                    type="checkbox"
                    value="man"
                    defaultChecked={product?.categories?.includes("man")}
                    {...register("categories")}
                  />
                  man
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="woman"
                    defaultChecked={product?.categories?.includes("woman")}
                    {...register("categories")}
                  />
                  woman
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="hat"
                    defaultChecked={product?.categories?.includes("hat")}
                    {...register("categories")}
                  />
                  hat
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="shirt"
                    defaultChecked={product?.categories?.includes("shirt")}
                    {...register("categories")}
                  />
                  shirt
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="pants"
                    defaultChecked={product?.categories?.includes("pants")}
                    {...register("categories")}
                  />
                  pants
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="winter"
                    defaultChecked={product?.categories?.includes("winter")}
                    {...register("categories")}
                  />
                  winter
                </label>
                <label>
                  <input
                    type="checkbox"
                    defaultChecked={product?.categories?.includes("tshirt")}
                    value="tshirt"
                    {...register("categories")}
                  />
                  tshirt
                </label>
              </CheckWrapper>
            </InputWrapper>
          )}
          <TopButton type="submit">Submit</TopButton>
        </Form>
      </Wrapper>

      <Footer />
    </Container>
  );
};

export default EditProduct;
