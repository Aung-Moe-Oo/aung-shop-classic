import styled from "styled-components";
import { mobile } from "../responsive";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  top: 58px;
  width: 100%;
  left: 0;
  position: fixed;
  z-index: 10;

  height: 30px;
  background-color: #2e8094;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1px;
  ${mobile({ top: "48px" })}
`;
export const Announcement = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <marquee>{t("announcement")}</marquee>
    </Container>
  );
};
