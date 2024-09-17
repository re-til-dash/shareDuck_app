import { MouseEventHandler, useState } from "react";
import { User, userData } from "@/types/user";

import styled from "styled-components";
import { typeCategory } from "@/types/category";
import { Button, Details, FloatingButton, Profile } from "shareduck-ui";

export default function Sidebar() {
  const DEFAULT_CATEGORIES = [
    { id: "Overview", list: <Details.Text>Overview</Details.Text> },
    { id: "Post", list: <Details.Text>Post</Details.Text> },
  ];
  /**use router loader*/
  const [userInfo, _setUserInfo] = useState<Partial<User>>(userData);
  const [categories, _setCategories] = useState<typeCategory[]>([
    {
      name: "TIL",
      id: 12350,
      properties: {},
      userId: userInfo.userId as number,
    },
  ]);

  /**local state*/
  const [selected, setSelected] = useState("Home");
  //처음에는 Home 카테고리이며, Home은 하위 메뉴가 없으므로 99로 초기화

  const [show, setShow] = useState(true);

  /**event handler*/
  const handleClickCaptureCategory: MouseEventHandler = (e) => {
    console.log(e.target);
  };
  const handleClickNew: MouseEventHandler = (e) => {
    e.preventDefault();
  };
  const handleClickShow: MouseEventHandler = () => {
    setShow(!show);
  };

  return (
    <StyledAside>
      <Profile>
        <Profile.Img src={userInfo.profile as string} alt={userInfo.nickname} />
        {show && (
          <Profile.Group>
            <Profile.Name accountName={userInfo.nickname as string} />
            <Profile.Id accountID={userInfo.name as string} />
          </Profile.Group>
        )}
      </Profile>
      <section onClickCapture={handleClickCaptureCategory}>
        <Details
          open={selected === "Home"}
          lists={[]}
          onClick={() => setSelected("Home")}
        >
          <Details.Icon src="message_dark" alt="message" />
          {show && <Details.Text>Home</Details.Text>}
        </Details>
        {categories.length > 0 &&
          categories.map(({ id, name }) => (
            <Details
              key={id}
              open={selected === name}
              lists={DEFAULT_CATEGORIES}
              onClick={() => setSelected(name)}
            >
              <Details.Icon src="message_dark" alt="message" />
              {show && <Details.Text>{name}</Details.Text>}
            </Details>
          ))}
        <Button
          style={{ marginRight: 0 }}
          type="button"
          onClick={handleClickNew}
        >
          <Button.Icon src={"plus"} alt={"plus"} />
          {show && <Button.Text>New Category</Button.Text>}
        </Button>
      </section>
      <StyledMoreFloatButton onClick={handleClickShow}>
        {show ? "<" : ">"}
      </StyledMoreFloatButton>
    </StyledAside>
  );
}

const StyledAside = styled.aside`
  position: relative;
  width: fit-content;
  height: 100vh;
  padding: 24px 16px;
  border-radius: 0px 16px 16px 0px;
  background: #fff;

  /* ej_b50 */
  box-shadow: 0px 1px 50px 0px rgba(0, 0, 0, 0.1);

  & > :first-child {
    margin-bottom: 8px;
  }
`;

const StyledMoreFloatButton = styled(FloatingButton)`
  position: absolute;
  z-index: 10;
  background: #fff;
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  inset: 0;
  margin: auto;
  margin-right: 0;
  transform: translateX(2rem);
`;
