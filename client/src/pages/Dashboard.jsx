import styled from "styled-components";
import { Announcement } from "../components/Announcement";
import Footer from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { ToastContainer, toast } from "react-toastify";

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

const Product = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const ProductDetail = styled.div`
  display: flex;
  width: 100%;
  padding-left: 1rem;
  ${mobile({ flexDirection: "column" })}
`;
const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  ${mobile({ margin: "0 auto" })}
`;
const Details = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: space-around;
  ${mobile({ flexDirection: "column" })}
`;
const Item = styled.span`
  word-break: break-all;

  flex: 20%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-contents: center;
`;
const Buttons = styled.div`
  margin: 0 auto;
  flex: 20%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  justify-contents: center;
`;
const EditButton = styled.button`
  width: 50px;
  height: 30px;
  background-color: #4fb860;
  border: none;
  outline: none;
`;
const DeleteButton = styled.button`
  width: 50px;
  height: 30px;
  background-color: #e52b26;
  border: none;
  outline: none;
`;
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, []);

  const handleDelete = async (id) => {
    try {
      await publicRequest.delete("/products/" + id, {
        withCredentials: true,
      });
      toast.success("Successfully Deleted!");
    } catch (err) {
      toast.error(err.response.data);
    }
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
      <Announcement />
      <Navbar />

      <Top>
        <Link to={"/dashboard/add-product"}>
          <TopButton>Add New Product</TopButton>
        </Link>
      </Top>
      <Wrapper>
        {products &&
          products?.map((product) => (
            <Product key={product._id}>
              <ProductDetail>
                <Image src={product.img} />
                <Details>
                  <Item>
                    <b>Products: </b>
                    {product.title}
                  </Item>
                  <Item>
                    <b>Color:</b>
                    {product.color.map((c) => c + ",")}
                  </Item>
                  <Item>
                    <b>Size: </b> {product.size.map((s) => s + ",")}
                  </Item>
                  <Item>
                    <b>Price: </b> $ {product.price}
                  </Item>
                </Details>
                <Buttons>
                  <Link to={`/dashboard/${product._id}`}>
                    <EditButton>Edit</EditButton>
                  </Link>
                  <DeleteButton onClick={() => handleDelete(product._id)}>
                    Delete
                  </DeleteButton>
                </Buttons>
              </ProductDetail>
            </Product>
          ))}
        <Hr />
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Dashboard;
