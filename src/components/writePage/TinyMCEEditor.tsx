import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { UseFormSetValue } from "react-hook-form";
import { Editor as TinyMCEEditor } from "tinymce";

const EnhancedTinyMCEExample = ({
  setValue,
  value,
}: {
  value: string;
  setValue: UseFormSetValue<{
    // value: string;
    title: string;
    content: string;
    hashtags: string;
  }>;
}) => {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  const handleEditorChange = (content: string) => {
    setValue("content", content);
  };

  return (
    <Editor
      apiKey="ijcvu2l5rz12w8pd4z4g790x5pqqpsluxr0zzjsfyzdfal4f"
      // @ts-ignore
      // TODO: 일단 타입에러 나는데, 무시함
      // env 파일에 저장했다가, ignore되니까 다른 분들은 안될것 같아서 일단 때려 박은 상태, 나중에 변경경
      // apiKey={import.meta.env.VITE_TINYMCE_EDITOR_API_KEY}
      onInit={(evt, editor) => (editorRef.current = editor)}
      init={{
        plugins:
          "preview powerpaste casechange importcss searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link codesample table charmap pagebreak nonbreaking tableofcontents insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker editimage help formatpainter permanentpen pageembed charmap mentions quickbars linkchecker emoticons advtable footnotes mergetags autocorrect typography advtemplate markdown",
        mobile: {
          plugins:
            "preview powerpaste casechange importcss searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link codesample table charmap pagebreak nonbreaking tableofcontents insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker help formatpainter pageembed charmap mentions quickbars linkchecker emoticons advtable footnotes mergetags autocorrect typography advtemplate",
        },
        toolbar:
          "undo redo | | aidialog aishortcuts | blocks fontsizeinput | bold italic | align numlist bullist | link  | table pageembed | lineheight outdent indent | strikethrough forecolor backcolor formatpainter removeformat | charmap emoticons checklist | code fullscreen preview | save print | pagebreak codesample footnotes mergetags | addtemplate inserttemplate | addcomment showcomments | ltr rtl casechange | spellcheckdialog a11ycheck",
        height: "calc(100vh - 440px)",
      }}
      onEditorChange={handleEditorChange}
      value={value}
    />
  );
};

export default EnhancedTinyMCEExample;
