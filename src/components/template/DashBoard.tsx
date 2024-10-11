import { HTMLAttributes, useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";

export interface TypeChartData {
  title: string;
  count: string; //콤마 붙인 형태로 가져오기
  chart: string;
  data: [];
}

interface TypeDashBoard extends HTMLAttributes<HTMLElement> {}

export default function DashBoard({ children }: TypeDashBoard) {
  const { menu } = useParams();
  const [currentMenu, setCurrentMenu] = useState("");
  useEffect(() => {
    if (menu) setCurrentMenu(menu);
    //TODO: category 관련 핸들러 추가 ~ getCategoryById
    // window.shareDuck.invoke("get-category-ipc", menu).then((res) => {
    //   setCurrentMenu(res);
    // });
  }, [menu]);
  return (
    <>
      <header className="a11y-hidden">{currentMenu}</header>
      <StyledGrid>{children}</StyledGrid>
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 99,
          backgroundColor: "rgb(89, 86, 90)",
          opacity: 0.5,
        }}
      ></div>
      <p
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 99,
          width: "fit-content",
          height: "fit-content",
          margin: "auto",
          color: "var(--wb-000)",
        }}
      >
        대시보드는 아직 준비중입니다🥲
      </p>
    </>
  );
}
//grid로 하려다가 flex-wrap으로 반응형 적용하는 게 좋을 것 같아 flex를 사용합니다.
const StyledGrid = styled.main`
  height: 100%;
  overflow: auto;
  width: 100%;
  padding: 5vh;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  & > * {
    flex-shrink: 0;
    flex-basis: calc(100% / 3 - 20px);
    margin-bottom: 20px;
  }

  & > :nth-child(4) {
    flex-basis: calc(100% / 3 * 2 - 20px);
  }

  & > :last-child {
    flex-basis: calc(100% - 20px);
  }
`;
