import {
  createContext,
  Dispatch,
  MouseEventHandler,
  useEffect,
  useReducer,
  useState,
} from "react";
import { User, userData } from "@/types/user";

import styled from "styled-components";
import { TypeCategory } from "@/types/category";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Button,
  Details,
  HomeIcon,
  IconButton,
  LogOutIcon,
  Profile,
  SettingIcon,
} from "shareduck-ui";
import Categories from "@components/sidebar/Categories";
import NewCategory from "@components/sidebar/NewCategory";
import { useNavigate } from "react-router";

export interface TypeSidebarContext {
  user: Partial<User>;
  categories: TypeCategory[];
  setCategories: Dispatch<TypeReducerParams> | null;
}

type TypeAction = "GET" | "CREATE" | "UPDATE" | "DELETE" | "";

export interface TypeReducerParams {
  action: TypeAction;
  value?: Partial<TypeCategory>;
  newValue?: [] | TypeCategory[];
}

function reducer(
  state: TypeCategory[],
  { action, value, newValue }: TypeReducerParams
) {
  if (action === "GET") {
    return (state = newValue!);
  }
  if (!value?.id) return state;
  const { id } = value;
  const prevState = [...state];
  const exceptsValueInPrevState = prevState.filter((prev) => prev.id != id);
  const indexOfValue = prevState.findIndex((prev) => prev.id === id);
  const prevCategoriesOfValue = prevState.splice(0, indexOfValue);
  const nextCategoriesOfValue =
    indexOfValue + 1 >= prevState.length
      ? []
      : prevState.splice(indexOfValue + 1, prevState.length);
  switch (action) {
    case "CREATE": {
      window.shareDuck.invoke("categories-post-ipc", value);
      state = [...prevState, value as TypeCategory];
      break;
    }
    case "UPDATE": {
      state = [
        ...prevCategoriesOfValue,
        value as TypeCategory,
        ...nextCategoriesOfValue,
      ];
      window.shareDuck.invoke("categories-patch-ipc", value.id, {
        name: value.name,
        properties: value.properties,
      });
      break;
    }
    case "DELETE": {
      state = [...exceptsValueInPrevState];
      window.shareDuck.invoke("categories-delete-ipc", value);
      break;
    }
    default: {
    }
  }
  return state;
}
//init을 TS가 넣으라고 해서 넣는데, 딱히 사용은 안 할 듯?
function init(arg: TypeCategory[]) {
  return arg as never;
}

export const SidebarContext = createContext<TypeSidebarContext>({
  user: { name: "shareDuck" },
  categories: [],
  setCategories: null,
});

export default function Sidebar() {
  /**use router loader*/

  const [userInfo, _setUserInfo] = useState<Partial<User>>(userData);
  const [categories, setCategories] = useReducer<
    typeof reducer,
    TypeCategory[]
  >(
    reducer,
    [
      {
        name: "TIL",
        id: 12350,
        properties: {},
        userId: userInfo.userId as number,
      },
    ],
    init
  );

  useEffect(() => {
    window.shareDuck
      .invoke("categories-get-ipc")
      .then((res) => {
        const data = res;
        setCategories({ action: "GET", newValue: data });
        return res;
      })
      .catch((error) => console.log(error));
  }, []);

  /**local state*/

  //sidebar 펼치기/접기
  const [show, setShow] = useState(true);

  const handleClickSetting: MouseEventHandler = (_e) => {};
  const handleClickLogOut: MouseEventHandler = (_e) => {};
  const handleClickShow: MouseEventHandler = () => {
    setShow(!show);
  };

  const navigate = useNavigate();

  return (
    <SidebarContext.Provider
      value={{ user: userInfo, categories, setCategories }}
    >
      <StyledAside>
        <Profile>
          <Profile.Img
            src={userInfo.profile as string}
            alt={userInfo.nickname}
          />
          {show && (
            <Profile.Group>
              <Profile.Name accountName={userInfo.nickname as string} />
              <Profile.Id accountID={userInfo.name as string} />
            </Profile.Group>
          )}
        </Profile>
        <section style={{ overflow: "auto", overflowX: "hidden" }}>
          <Details open lists={[]} id="home">
            <Details.Icon src={HomeIcon} alt="home" />
            {show && <Details.Text>Home</Details.Text>}
          </Details>
          <Categories categories={categories} show={show} />
        </section>
        <NewCategory show={show} />
        <Button
          style={{ marginRight: 0 }}
          type="button"
          onClick={() => {
            navigate("/writepage");
          }}
        >
          <Button.Icon src={"plus"} alt={"plus"} />
          {show && <Button.Text>Write Page</Button.Text>}
        </Button>
        <Button
          style={{ marginRight: 0 }}
          type="button"
          onClick={() => {
            navigate("/signUp");
          }}
        >
          {<Button.Text>Sign Up</Button.Text>}
        </Button>
        <Button
          style={{ marginRight: 0 }}
          type="button"
          onClick={() => {
            navigate("/signIn");
          }}
        >
          <Button.Text>Sign In</Button.Text>
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
            <Button.Icon src={LogOutIcon} alt="log out" />
            {show && <Button.Text>Log-out</Button.Text>}
          </Button>
        </StyledSettingsSection>
        <StyledMoreFloatButton
          onClick={handleClickShow}
          src={show ? ArrowLeftIcon : ArrowRightIcon}
          alt="open/close sidebar"
        />
      </StyledAside>
    </SidebarContext.Provider>
  );
}

const StyledAside = styled.aside`
  position: fixed;
  z-index: 999;
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: calc(100vh - 32px);
  padding: 24px 16px;
  border-radius: 0px 16px 16px 0px;
  background: #fff;

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
    color: var(--wb-700, #3a373a);
  }
`;
