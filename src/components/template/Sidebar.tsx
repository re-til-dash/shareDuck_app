import { MouseEventHandler, useState } from "react";
import { User } from "@/types/user";
import { Button, FloatingButton, ListButton, Profile } from "shareduck-ui";
import styled from "styled-components";
import { typeCategory } from "@/types/category";

const DEFAULT_CATEGORIES = ["Overview", "Post"];

export default function Sidebar() {
  /**use router loader*/
  const [userInfo, setUserInfo] = useState<User>({
    userId: 0,
    email: "",
    nickname: "",
    profile: "",
    role: "USER",
    phone: "",
    created: "",
    updated: "",
    provider: "JWT",
    idx: "",
    state: "ACTIVE",
    lastConnect: "",
  });
  const [categories, setCategories] = useState<typeCategory[]>([
    {
      name: "TIL",
      id: 12350,
      properties: {},
      userId: userInfo.userId,
    },
  ]);

  /**local state*/
  const [isSelected, setIsSelected] = useState(false);
  //처음에는 Home 카테고리이며, Home은 하위 메뉴가 없으므로 99로 초기화
  const [selectIndex, setSelectIndex] = useState([1, 99]);

  /**event handler*/
  const handleClickCaptureCategory = (e) => {
    console.log(e.target);
  };
  const handleClickNew: MouseEventHandler = (e) => {
    e.preventDefault();
  };
  return (
    <StyledAside>
      <Profile>
        <Profile.Img src={userInfo.profile} alt={userInfo.nickname} />
        <Profile.Group>
          <Profile.Name accountName={userInfo.nickname} />
          <Profile.Id accountID={userInfo.idx} />
        </Profile.Group>
      </Profile>
      <section onClickCapture={handleClickCaptureCategory}>
        <ListButton isSelected={isSelected} lists={[]}>
          <ListButton.Icon name="message_dark" alt="message" />
          <ListButton.Text>Home</ListButton.Text>
        </ListButton>
        {categories.length > 0 &&
          categories.map(({ id, name }, currentIndex) => (
            <ListButton
              key={id}
              isSelected={isSelected}
              lists={DEFAULT_CATEGORIES.map((content, detailIndex) => (
                <ListButton.SubButton
                  key={content}
                  $isSelected={selectIndex[1] === detailIndex}
                  onClick={() => setSelectIndex([currentIndex, detailIndex])}
                >
                  {content}
                </ListButton.SubButton>
              ))}
              onClick={function handleClick() {
                setIsSelected(!isSelected);
              }}
            >
              <ListButton.Icon name="message_dark" alt="message" />
              <ListButton.Text>{name}</ListButton.Text>
            </ListButton>
          ))}
        <Button type="button" onClick={handleClickNew}>
          <Button.Icon name={"plus"} alt={"plus"} />
          <Button.Text>New Category</Button.Text>
        </Button>
      </section>
      <StyledMoreFloatButton onClick={() => console.log("test")}>
        {">"}
      </StyledMoreFloatButton>
    </StyledAside>
  );
}

const StyledAside = styled.aside`
  position: relative;
  height: 100vh;
  padding: 24px 16px;
  border-radius: 0px 16px 16px 0px;
  background: #fff;

  /* ej_b50 */
  box-shadow: 0px 1px 50px 0px rgba(0, 0, 0, 0.1);
`;

const StyledMoreFloatButton = styled(FloatingButton)`
  position: absolute;
  z-index: 10;
  border-radius: 9999px;
  background: #fff;
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.25);
  inset: 0;
  margin: auto;
  margin-right: 0;
  transform: translateX(2rem);
`;
