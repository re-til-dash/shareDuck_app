import { Posts } from "@/types/posts";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Button,
  Icon,
  IconButton,
  Img,
  Input,
  PlusIcon,
  SearchIcon,
  Tag,
} from "shareduck-ui";
import styled from "styled-components";

//Post UI 만들어놓은 줄 알았는데, 없네요..ㅠㅠ 급한대로 아래에 스타일 코드 추가하고 옮길 예정!

/**
 *
 * @req
 * {
  "page": 0,
  "size": 1,
  "sort": [
    "string"
  ]
}
 *  
 * @res
 * content: Array<{}>;
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
 */

export default function Post() {
  const { menu: categoryId } = useParams();

  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [posts, setPosts] = useState<Posts>({
    content: [
      {
        id: 1,
        userId: 1,
        categoryId: +categoryId!,
        title: "TEST",
        content: {
          additionalProp1: {},
          additionalProp2: {},
          additionalProp3: {},
        },
        hashtags: ["TEST"],
        properties: {
          additionalProp1: {},
          additionalProp2: {},
          additionalProp3: {},
        },
        thumbnailPath: "",
        createdAt: "",
        modifiedAt: "",
        state: "",
      },
    ],
    page: {
      size: 1,
      number: 0,
      totalElements: 0,
      totalPages: 1,
    },
  });
  const totalPage = posts.page.totalPages;
  useEffect(() => {
    // window.shareDuck
    //   .invoke("posts-get-ipc", categoryId)
    //   .then((res) => setPosts(res))
    //   .catch((error) => console.log(error));
  }, []);

  return (
    <section style={{ width: "100%" }}>
      <StyledHeader>
        <StyledLabel>
          <Icon src={SearchIcon} alt="search" />
          <Input
            type="text"
            value={query}
            placeholder="Search Here..."
            onChange={(e) => setQuery(e.target.value)}
          />
        </StyledLabel>
        <Button style={{ padding: "4px 16px " }}>
          <Button.Icon src={PlusIcon} alt="create" />
          <Button.Text>작성하기</Button.Text>
        </Button>
      </StyledHeader>
      <StyledPostUList>
        {posts ? (
          posts.content.map(
            (
              { id, title, thumbnailPath, hashtags, properties, modifiedAt },
              index
            ) => {
              return (
                <StyledPostList key={id}>
                  <p>
                    <b>#{index.toString().padStart(2, "0")}</b>
                    {modifiedAt}
                  </p>
                  <Img
                    src={
                      thumbnailPath
                        ? thumbnailPath
                        : "https://placehold.co/600x400"
                    }
                    alt={title}
                  />
                  <StyledContent>
                    <h2>{title}</h2>
                    <StyledHashUlist>
                      {hashtags.map(
                        (tag, index) =>
                          index <= 3 && (
                            <Tag.Secondary key={tag}>#{tag}</Tag.Secondary>
                          )
                      )}
                    </StyledHashUlist>
                    {/* 
                  //todo: properties 형식 백엔드와 상의 후 코드 작성
                  {Object.values(properties).map((pro) => (
                    <div key={pro}>{pro}</div>
                  ))} */}
                  </StyledContent>
                </StyledPostList>
              );
            }
          )
        ) : (
          <p>아직 게시글이 없습니다.</p>
        )}
      </StyledPostUList>
      <StyledPageList>
        <IconButton.Secondary src={ArrowLeftIcon} alt="prev" />
        <StyledPage>
          {currentPage}/{totalPage}
        </StyledPage>
        <IconButton.Secondary src={ArrowRightIcon} alt="next" />
      </StyledPageList>
    </section>
  );
}

const StyledHeader = styled.header`
  display: flex;
  margin: 64px 28px;

  & > :last-child {
    margin-left: auto;
  }
`;
const StyledLabel = styled.label`
  display: flex;
  width: 340px;
  height: 40px;
  border: 1px solid var(--wb-300);
  border-radius: 12px;
  background: var(--wb-000, #fff);
  padding: 8px;
  & > input {
    border: none;
    height: 100%;
    width: 100%;
  }
`;

const StyledPostUList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 34px 28px;
`;

const StyledPostList = styled.li`
  max-width: 320px;
  width: 25vw;
  position: relative;

  border-radius: 8px;

  & > img {
    display: block;
    width: 100%;
    min-height: 400px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0px 0px 10px 0px var(--wb-100, #efe9f1);
  }
`;

const StyledContent = styled.div`
  position: absolute;
  inset: 0;
  margin-top: auto;

  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: fit-content;
  border-radius: 8px;
  background: var(--wb-000, #fff);
`;

const StyledHashUlist = styled.ul`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

const StyledPageList = styled.div`
  display: flex;
  width: 215px;
  height: fit-content;
  align-items: center;
  gap: 40px;
  position: fixed;
  inset: 0;
  margin: auto;
  margin-bottom: 24px;

  & > button {
    border-radius: 20px;
    border: 1px solid var(--wb-300, #bfb7c1);
    background: #fff;

    /* ej_b20 */
    box-shadow: 0px 1px 20px 0px rgba(0, 0, 0, 0.08);
  }
`;

const StyledPage = styled.div`
  padding: 6px 22px;

  border-radius: 999px;
  border: 1px solid var(--wb-300, #bfb7c1);
  background: var(--wb-000, #fff);
`;
