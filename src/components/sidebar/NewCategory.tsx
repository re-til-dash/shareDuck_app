import CategoryNewDialog from "@components/dialog/CategoryNewDialog";
import { SidebarContext } from "@components/template/Sidebar";
import { MouseEventHandler, useContext, useRef, useState } from "react";
import { Button, PlusIcon } from "shareduck-ui";

export interface TypeNewCategoryProps {
  show: boolean;
}

export default function NewCategory({ show }: TypeNewCategoryProps) {
  const { categories, setCategories } = useContext(SidebarContext);

  const [ref, setRef] = useState<HTMLElement | null>(null);
  const newBtnRef = useRef(ref);
  const handleClickNew: MouseEventHandler = (e) => {
    e.preventDefault();
    setRef(newBtnRef.current);
  };
  return (
    <section>
      <Button style={{ marginRight: 0 }} type="button" onClick={handleClickNew}>
        <Button.Icon src={PlusIcon} alt="add new category" />
        {show && <Button.Text ref={newBtnRef}>New Category</Button.Text>}
      </Button>
      {ref && (
        <CategoryNewDialog openTrigger={ref} setCategories={setCategories} />
      )}
    </section>
  );
}
