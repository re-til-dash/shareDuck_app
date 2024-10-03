import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { useRef } from "react";
import { UseFormSetValue } from "react-hook-form";
import "tui-color-picker/dist/tui-color-picker.css";

export const ToastUIEditor = ({
  setValue,
}: {
  setValue: UseFormSetValue<{
    // value: string;
    title: string;
    content: string;
    hashtags: string;
  }>;
}) => {
  const editorRef = useRef<any>(null);

  const onChange = () => {
    if (!editorRef.current) return;

    const data = editorRef.current?.getInstance().getHTML();
    setValue("content", data);
  };

  return (
    <div className="edit_wrap">
      <Editor
        initialValue="## "
        previewStyle="vertical"
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={false}
        language="ko-KR"
        ref={editorRef}
        onChange={onChange}
        plugins={[colorSyntax]}
      />
    </div>
  );
};

// https://leego.tistory.com/entry/React-%EC%97%90%EB%94%94%ED%84%B0%EB%A1%9C-TOAST-UI-Editor-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EA%B8%B0
