import { useEffect, useState } from "react";

const useDialog = (openTrigger: HTMLElement | null) => {
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    if (!openTrigger) return;
    openTrigger.onclick = () => {
      setOpenDialog(true);
    };
  }, [openTrigger]);
  return { openDialog, setOpenDialog };
};

export default useDialog;
