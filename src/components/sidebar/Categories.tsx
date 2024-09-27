import CategorySettingDialog from "@components/dialog/CategorySettingDialog";
import { TypeCategory } from "@/types/category";
import { MouseEventHandler, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowRightIcon, Details, LogOutIcon, SettingIcon } from "shareduck-ui";
import styled from "styled-components";
import { SidebarContext } from "@components/template/Sidebar";
type TypeHandler = (id: number) => MouseEventHandler;

export interface TypeCategoriesProps {
  show: boolean;
  categories: TypeCategory[];
}

export default function Categories({ show }: TypeCategoriesProps) {
  const { user, categories, setCategories } = useContext(SidebarContext);

  const DEFAULT_CATEGORIES = [
    { id: "Overview", list: <Details.Text>Overview</Details.Text> },
    { id: "Post", list: <Details.Text>Post</Details.Text> },
  ];
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);
  //카테고로 설정 보기/숨기기
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [isShowSetting, setIsShowSetting] = useState(0);

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

  const handleClickCategorySetting: MouseEventHandler = (e) => {
    e.stopPropagation();
    setIsShowDialog((prev) => !prev);
  };

  const handleClickCategoryDelete: MouseEventHandler = (e) => {
    e.stopPropagation();
  };
  return (
    <section onClickCapture={handleClickCaptureCategory}>
      {categories.length > 0 &&
        categories.map(({ id, name, properties }) => (
          <Details
            style={{ position: "relative" }}
            key={id}
            id={name.toLowerCase()}
            open={!isShowDialog && selected === id}
            lists={show ? DEFAULT_CATEGORIES : []}
            onClickCapture={() => {
              setSelected(id);
            }}
            onMouseOver={handleMouseCategory(id)}
            onMouseLeave={handleMouseCategory(0)}
          >
            <Details.Icon src={ArrowRightIcon} alt={name} />
            {show && <Details.Text>{name}</Details.Text>}
            {isShowSetting === id && (
              <StyledIconList>
                <StyledIcon
                  onClick={handleClickCategorySetting}
                  src={SettingIcon}
                  alt="setting"
                />
                <StyledIcon
                  onClick={handleClickCategoryDelete}
                  src={LogOutIcon}
                  alt="setting"
                />
              </StyledIconList>
            )}
            {isShowDialog && (
              <CategorySettingDialog
                key={id}
                categoryId={id}
                name={name}
                properties={properties as { [key: string]: string }}
                open={isShowDialog}
                setOpen={setIsShowDialog}
                setCategories={setCategories}
              />
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
