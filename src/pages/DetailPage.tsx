import { useGetPost } from "@hooks/useGetPost";
import { useNavigate } from "react-router";
import { styled } from "styled-components";

export const DetailPage = () => {
  const { post } = useGetPost();
  const navigate = useNavigate();

  if (!post) return <>loading..</>;

  return (
    <Wrapper>
      <BackButton
        onClick={() => {
          navigate(-1);
        }}
      >
        <img src="/src/assets/backArrowIcon.svg" alt="" />
        <p>게시글 목록</p>
      </BackButton>

      <Div>
        <Header>
          <Title>{post.title}</Title>

          <HashTagWrapper>
            {post.hashtags?.map((hashTag: string) => (
              <HashTag key={hashTag}>{hashTag}</HashTag>
            ))}
          </HashTagWrapper>
        </Header>

        <Content dangerouslySetInnerHTML={{ __html: post.content }}></Content>
      </Div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  background: #f1f2f4;
  padding: 64px 36px;
`;

const BackButton = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 24px;
  cursor: pointer;
  border-radius: 8px;
  width: fit-content;
  padding: 4px 8px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  & > p {
    font-size: 24px;
    color: #000;
    font-weight: 500;
    line-height: 32px;
    letter-spacing: -0.456px;
    padding-top: 3px;
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  & > * {
    border-radius: 8px;
    border: 1px solid #efe9f1;
    background: #fff;
  }
`;

const Header = styled.div`
  display: flex;
  padding: 16px;
  flex-direction: column;
  justify-content: center;
  /* align-items: flex-end; */
  gap: 4px;
  align-self: stretch;
`;

const Title = styled.h2`
  color: #141314;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  font-family: "SUIT";
`;

const HashTagWrapper = styled.div`
  padding: 9px 0;
  display: flex;
  gap: 4px;
`;

const HashTag = styled.div`
  display: flex;
  padding: 4px 16px;
  justify-content: center;
  align-items: center;
  width: fit-content;

  border-radius: 9999px;
  border: 1px solid #a86ebc;
  background-color: #fff;

  color: #a86ebc;
  font-size: 14px;

  &::before {
    content: "#";
    padding: 6px;
  }
`;

const Content = styled.div`
  height: calc(100vh - 375px);
  padding: 16px;
  color: #141314;
`;
