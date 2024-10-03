import {
  FormEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Button,
  Icon,
  IconButton,
  Input,
  List,
  LogOutIcon,
  PlusIcon,
  SearchIcon,
  Tag,
  TitlebarIcons,
} from "shareduck-ui";
import styled from "styled-components";

/**
 *
 * todo: 메모를 처음 켰을 때 마지막 스크롤 위치 기억하기 or 스크롤의 가장 아래에서 보여주기 ex) 카톡
 *
 */
export default function Memo() {
  /** api */
  const [memoList, setMemoList] = useState<
    { id: number; category: string; content: string; date: string }[]
  >([]);

  const [currentCategory, setCurrentCategory] = useState({
    id: 0,
    category: "home",
  });

  useEffect(() => {
    window.shareDuck.send("memo-ipc", "ready", {
      categoryId: currentCategory.id,
      keyword: "",
      page: 0,
      size: 1,
    });

    window.shareDuck.on("memo-reply-ipc", (_e, payload) => {
      setMemoList((_prev) => payload);
    });
  }, []);

  /**local events */
  const [query, setQuery] = useState("");
  const [memo, setMemo] = useState("");
  const [show, setShow] = useState(-1);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!textareaRef?.current) return;
    textareaRef.current.style.height = textareaRef.current!.scrollHeight + "px";
  }, [memo]);

  const handleSubmitMemo: FormEventHandler = (e) => {
    e.preventDefault();
    window.shareDuck.on("route-reply-ipc", (_e, payload) => {
      console.log("in reply");
      setCurrentCategory((_prev) => payload);
    });
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDay();
    const time = currentDate.getTime();
    const newMemo = {
      id: 0,
      content: memo,
      categoryId: currentCategory.id,
      category: currentCategory.category,
      date: `${year}년 ${month}월 ${day}일 / ${time}`,
    };
    window.shareDuck.send("memo-ipc", "create", newMemo);

    setMemo((_prev) => "");
  };

  const handleMouseOverMemo =
    (id: number): MouseEventHandler =>
    () => {
      setShow(id);
    };

  const handleClickDeleteMemo =
    (id: number): MouseEventHandler =>
    () => {
      window.shareDuck.send("memo-ipc", "delete", id);
      window.shareDuck.on("memo-reply-ipc", (_e, payload) => {
        setMemoList(payload);
      });
    };

  const handleClickClose = () => {
    window.shareDuck.send("title-bar-action", "CLOSE", "memoWindow");
  };
  return (
    <>
      <StyledHeader onDoubleClick={(e) => e.preventDefault()}>
        <StyleGroup>
          <StyledDrag onDoubleClick={(e) => e.preventDefault()}>
            <h1>메모</h1>
          </StyledDrag>

          <TitlebarIcons os="WIN">
            <TitlebarIcons.Close onClick={handleClickClose} />
          </TitlebarIcons>
        </StyleGroup>
        <StyledSearchbar>
          <StyledLabel>
            <IconButton src={SearchIcon} alt="search" />
            <Input
              type="text"
              value={query}
              placeholder="Search Here..."
              onChange={(e) => setQuery(e.target.value)}
            />
          </StyledLabel>
        </StyledSearchbar>
      </StyledHeader>
      <div style={{ height: "120px", width: "100vw" }}></div>
      <main style={{ height: "calc(100vh - 120px)" }}>
        <StyledUlist>
          {memoList.map((list, index) => {
            const prevDate = index - 1 >= 0 ? memoList[index - 1].date : "'";
            const date = list.date.split("/")[0];
            const time = list.date.split("/")[1];
            const theDate = new Date(+time);
            const dateString = theDate.toLocaleTimeString();
            return (
              <List
                key={list.id}
                style={{ display: "block" }}
                onMouseOver={handleMouseOverMemo(list.id)}
                onMouseLeave={() => setShow(-1)}
              >
                {prevDate.split("/")[0] != date && (
                  <StyledDate>
                    <Tag.Basic>{date}</Tag.Basic>
                  </StyledDate>
                )}
                <StyledMemoInfo>
                  <Tag.Primary>{list.category}</Tag.Primary>
                  <span>{dateString}</span>
                </StyledMemoInfo>
                <p>{list.content}</p>
                {show === list.id && (
                  <IconButton
                    style={{ marginLeft: "auto" }}
                    src={LogOutIcon}
                    alt="delete memo"
                    onClick={handleClickDeleteMemo(list.id)}
                  />
                )}
              </List>
            );
          })}
        </StyledUlist>
        <StyledForm onSubmit={handleSubmitMemo}>
          <StyledTextArea
            placeholder="메모하기"
            ref={textareaRef}
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
          <div>
            <IconButton.Secondary src={PlusIcon} alt="emoji" />
            <Button type="submit">저장</Button>
          </div>
        </StyledForm>
      </main>
    </>
  );
}

const StyledHeader = styled.header`
  position: fixed;
  height: 60px;
  width: calc(100% - 2px); /*Compensate for body 1px border*/
  background: var(--wb-000, #fff);
  z-index: 9999;
`;

const StyledDrag = styled.div`
  width: 100%;
  height: 100%;

  -webkit-app-region: drag;
  -webkit-user-select: none;
  user-select: none;
  /* Allow user to drag the window using this titlebar */

  text-align: center;
`;

const StyleGroup = styled.hgroup`
  display: flex;
  /* height: 32px; */
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  padding: 14px;

  border-bottom: 1px solid var(--wb-300);
  & h1 {
    color: var(--wb-900, #141314);

    /* typo/typo-head-24-bold */
    font-family: SUIT;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 32px; /* 133.333% */
    letter-spacing: -0.456px;
  }
`;

const StyledSearchbar = styled.div`
  padding: 10px;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.08);
`;

const StyledLabel = styled.label`
  display: flex;
  height: 40px;
  border: 1px solid var(--wb-300);
  border-radius: 12px;
  background: var(--wb-000, #fff);
  padding: 8px;
  margin: auto;

  & > input {
    border: none;
    height: 100%;
    width: 100%;
  }
`;

const StyledForm = styled.form`
  width: 100vw;
  height: fit-content;
  display: flex;

  & > div {
    flex-shrink: 1;
    flex-basis: "10%";
  }

  box-shadow: 0px -1px 20px 0px rgba(0, 0, 0, 0.08);
  padding: 16px 12px;
`;

const StyledTextArea = styled.textarea`
  resize: none;
  min-height: 1.5rem;
  scrollbar-width: 0;
  padding: 6px 12px;
  margin-right: 8px;
  width: 80%;
  min-height: 80px;
  ime-mode: active;
  &::-webkit-scrollbar {
    display: none;
  }

  &:disabled {
    color: var(--wb-400, #aba5ad);
  }

  border-radius: 8px;
  border: 1px solid var(--wb-400, #aba5ad);
  background: var(--wb-000, #fff);

  &:focus {
    outline: 1px solid var(--wb-600);
    color: var(--wb-800);
  }
`;
const StyledUlist = styled.ul`
  padding: 0px 20px;
  height: calc(100vh - 120px * 2);
  width: 100vw;
  overflow: auto;
  overflow-x: hidden;
  & > li {
    margin-bottom: 12px;
    padding: 4px;
  }
  & > li > p {
    margin-top: 4px;
    white-space: pre-wrap;
    overflow-wrap: break-word;
  }
`;
const StyledDate = styled.div`
  margin: 12px auto;
  width: fit-content;
  color: var(--wb-900);

  /* typo/typo-body-14 */
  font-family: SUIT;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 171.429% */
`;

const StyledMemoInfo = styled.hgroup`
  & > :first-child {
    margin-right: 4px;
  }
  & > :last-child {
    color: var(--wb-300, #bfb7c1);
    /* typo/typo-body-12 */
    font-family: SUIT;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 133.333% */
  }
`;
