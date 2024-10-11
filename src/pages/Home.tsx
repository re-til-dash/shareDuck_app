import DashBoard from "@components/template/DashBoard";
import { Img } from "shareduck-ui";
import styled from "styled-components";

export default function Home() {
  return (
    <DashBoard>
      <StyledContainer></StyledContainer>
      <StyledContainer></StyledContainer>
      <StyledContainer></StyledContainer>
      <StyledContainer></StyledContainer>
      <StyledAds>
        <Img src="/logo-text.svg" alt="shareDuck" />
      </StyledAds>
      <StyledContainer></StyledContainer>
    </DashBoard>
  );
}
//(전체  - (marginbottom+gap) * 최소 line 수) / 자식 수
const defaultHeight = `(100% - (20px + 20px) * 3) / 6`;
const StyledContainer = styled.div`
  border-radius: 8px;
  background-color: var(--wb-000);
  min-width: 320px;
  height: calc(${defaultHeight} * 3);
  &:nth-child(n + 4) {
    height: calc(${defaultHeight});
  }

  &:nth-child(n + 6) {
    height: calc(${defaultHeight} * 2);
  }
`;

const StyledAds = styled(StyledContainer)`
  background-color: var(--vio-600);
  color: var(--wb-000);

  padding: 20px 10px;

  & > img {
    width: 100%;
    aspect-ratio: 4/1;
  }
`;
