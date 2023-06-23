import styled from "styled-components";
import { categories } from "../data";
import { mobile } from "../responsive";
import CategoryITem from "./CategoryITem";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ paddingTop: "78px", flexDirection: "column" })}
`;

const Categories = () => {
  return (
    <Container>
      {categories.map((item) => {
        return <CategoryITem item={item} key={item.id} />;
      })}
    </Container>
  );
};

export default Categories;
