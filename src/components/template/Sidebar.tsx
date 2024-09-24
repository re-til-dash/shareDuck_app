import { MouseEventHandler, useEffect, useState } from "react";
import { User, userData } from "@/types/user";

import styled from "styled-components";
import { typeCategory } from "@/types/category";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Button,
  Details,
  HomeIcon,
  IconButton,
  PlusIcon,
  Profile,
  SettingIcon,
} from "shareduck-ui";
import { useNavigate } from "react-router";

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

  useEffect(() => {
    window.shareDuck
      .invoke("categories-get-ipc")
      .then((res) => {
        const data = res;
        _setCategories(data.categories);
        return res;
      })
      .catch((error) => console.log(error));
  }, []);

  const navigate = useNavigate();

  /**local state*/
  const [selected, setSelected] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState(selected);
  //처음에는 Home 카테고리이며, Home은 하위 메뉴가 없으므로 99로 초기화

  const [show, setShow] = useState(true);

  /**event handler*/
  const handleClickCaptureCategory: MouseEventHandler = (e) => {
    const target = e.target as HTMLElement;
    const menu = target.innerText.toLocaleLowerCase();
    if (menu === "overview" || menu === "post") {
      navigate(`/${selectedCategories}/${menu}`);
    } else navigate(`/${menu}`);
  };
  const handleClickNew: MouseEventHandler = (e) => {
    e.preventDefault();
  };
  const handleClickSetting: MouseEventHandler = (_e) => {};
  const handleClickLogOut: MouseEventHandler = (_e) => {};
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
      <section
        style={{ overflow: "auto", overflowX: "hidden" }}
        onClickCapture={handleClickCaptureCategory}
      >
        <Details
          open={selected === 0}
          lists={[]}
          id="home"
          onClick={() => {
            setSelected(0);
          }}
        >
          <Details.Icon src={HomeIcon} alt="home" />
          {show && <Details.Text>Home</Details.Text>}
        </Details>
        {categories.length > 0 &&
          categories.map(({ id, name }) => (
            <Details
              key={id}
              id={name.toLowerCase()}
              open={selected === id}
              lists={show ? DEFAULT_CATEGORIES : []}
              onClickCapture={() => {
                setSelected(id);
                setSelectedCategories(id);
              }}
            >
              <Details.Icon src={ArrowRightIcon} alt={name} />
              {show && <Details.Text>{name}</Details.Text>}
            </Details>
          ))}
      </section>
      <Button style={{ marginRight: 0 }} type="button" onClick={handleClickNew}>
        <Button.Icon src={PlusIcon} alt="add new category" />
        {show && <Button.Text>New Category</Button.Text>}
      </Button>
      <StyledSettingsSection>
        <Button
          style={{ marginRight: 0 }}
          type="button"
          onClick={handleClickSetting}
        >
          <Button.Icon src={SettingIcon} alt="setting" />
          {show && <Button.Text>Settings</Button.Text>}
        </Button>
        <Button
          style={{ marginRight: 0 }}
          type="button"
          onClick={handleClickLogOut}
        >
          {/* 임시 아이콘 */}
          <Button.Icon src={PlusIcon} alt="log out" />
          {show && <Button.Text>Log-out</Button.Text>}
        </Button>
      </StyledSettingsSection>
      <StyledMoreFloatButton
        onClick={handleClickShow}
        src={show ? ArrowLeftIcon : ArrowRightIcon}
        alt="open/close sidebar"
      />
    </StyledAside>
  );
}

const StyledAside = styled.aside`
  position: relative;
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: calc(100vh - 32px);
  padding: 24px 16px;
  border-radius: 0px 16px 16px 0px;
  background: #fff;
  margin-top: 32px;

  /* ej_b50 */
  box-shadow: 0px 1px 50px 0px rgba(0, 0, 0, 0.1);

  & > :first-child {
    margin-bottom: 8px;
  }

  @media (max-width: 200px) {
    box-shadow: 0px 1px 50px 10px rgba(0, 0, 0, 0.1);
  }
`;

const StyledMoreFloatButton = styled(IconButton.Primary)`
  position: absolute;
  z-index: 10;
  background: #fff;
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  inset: 0;
  margin: auto;
  margin-right: 0;
  width: fit-content;
  height: fit-content;
  transform: translateX(1rem);
`;

const StyledSettingsSection = styled.section`
  margin-top: auto;
  margin-bottom: 0;
  & button {
    background-color: var(--wb-000);
  }
  & button > span {
    width: 100%;
    color: var(--color-wb-700, #3a373a);
  }
`;
