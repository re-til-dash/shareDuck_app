import CategorySettingDialog from "@components/dialog/CategorySettingDialog";
import { TypeCategory } from "@/types/category";
import { MouseEventHandler, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowRightIcon, Details, LogOutIcon, SettingIcon } from "shareduck-ui";
import styled from "styled-components";
import { SidebarContext } from "@components/template/Sidebar";
import CategoryDeleteDialog from "@components/dialog/CategoryDeleteDialog";
type TypeHandler = (id: number) => MouseEventHandler;

export interface TypeCategoriesProps {
  show: boolean;
}

export default function Categories({ show }: TypeCategoriesProps) {
  const { categories, setCategories } = useContext(SidebarContext);

  const DEFAULT_CATEGORIES = [
    { id: "Overview", list: <Details.Text>Overview</Details.Text> },
    {
      id: "Post",
      list: <Details.Text>Post</Details.Text>,
    },
  ];
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);
  //카테고리 설정 보기/숨기기
  const [isShowSetting, setIsShowSetting] = useState(0);
  const [ref, setRef] = useState<HTMLImageElement | null>(null);
  const settingIconRef = useRef(ref);
  const deleteIconRef = useRef(ref);
  const [currentCetgory, setCurrentCategory] = useState<TypeCategory | null>(
    null
  );

  /**event handler*/
  const handleClickCaptureCategory: MouseEventHandler = (e) => {
    const target = e.target as HTMLElement;
    const menu = target.innerText.toLocaleLowerCase();
    if (menu === "overview" || menu === "post") {
      navigate(`/${selected}/${menu}`);
    } else navigate(`/${menu}`);
  };

  //개별 카테고리 세팅
  const handleMouseCategory: TypeHandler = (id) => (_e) => {
    setIsShowSetting(id);
  };

  const handleClickCategorySetting =
    ({ id, name, properties, userId }: TypeCategory): MouseEventHandler =>
    (e) => {
      e.stopPropagation();
      setRef(e.target as HTMLImageElement);
      setCurrentCategory((_prev) => ({ id, name, properties, userId }));
    };

  const handleClickCategoryDelete =
    ({ id, name, properties, userId }: TypeCategory): MouseEventHandler =>
    (e) => {
      e.stopPropagation();
      setCurrentCategory((_prev) => ({ id, name, properties, userId }));
    };

  return (
    <section onClickCapture={handleClickCaptureCategory}>
      {categories.length > 0 &&
        categories.map(({ id, name, properties, userId }) => (
          <Details
            style={{ position: "relative" }}
            key={id}
            id={id + ""}
            open={selected === id}
            lists={show ? DEFAULT_CATEGORIES : []}
            onClick={() => {
              setSelected((_prev) => id);
            }}
            onMouseOver={handleMouseCategory(id)}
            onMouseLeave={handleMouseCategory(0)}
          >
            <Details.Icon src={ArrowRightIcon} alt={name} />
            {show && <Details.Text>{name}</Details.Text>}
            {isShowSetting === id && (
              <StyledIconList>
                <StyledIcon
                  onClick={handleClickCategorySetting({
                    id,
                    name,
                    properties,
                    userId,
                  })}
                  src={SettingIcon}
                  alt="setting"
                  ref={settingIconRef}
                />
                <StyledIcon
                  onClick={handleClickCategoryDelete({
                    id,
                    name,
                    properties,
                    userId,
                  })}
                  src={LogOutIcon}
                  alt="delete"
                  ref={deleteIconRef}
                />
              </StyledIconList>
            )}

            {currentCetgory && (
              <>
                <CategorySettingDialog
                  categoryId={currentCetgory!.id}
                  name={currentCetgory!.name}
                  properties={
                    currentCetgory!.properties as { [key: string]: string }
                  }
                  openTrigger={settingIconRef.current as HTMLElement}
                  setCategories={setCategories}
                />
                <CategoryDeleteDialog
                  category={currentCetgory!}
                  openTrigger={deleteIconRef.current as HTMLElement}
                  setCategories={setCategories}
                />
              </>
            )}
          </Details>
        ))}
    </section>
  );
}

const StyledIconList = styled.div`
  position: absolute;
  inset: 0;
  margin: auto;
  margin-top: 1rem;
  margin-right: 1rem;
  z-index: 9;
  width: fit-content;
`;

const StyledIcon = styled.img`
  padding: 4px;
  background-color: var(--wb-000);
  border-radius: 50%;
  margin: 2px;
`;
