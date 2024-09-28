import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";

const EnhancedTinyMCEExample: React.FC = () => {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  const handleEditorChange = (content: string, editor: TinyMCEEditor) => {
    console.log("Content was updated:", content);
  };

  return (
    <Editor
    apiKey="ijcvu2l5rz12w8pd4z4g790x5pqqpsluxr0zzjsfyzdfal4f"
    // @ts-ignore
      // TODO: 일단 타입에러 나는데, 무시함
      // env 파일에 저장했다가, ignore되니까 다른 분들은 안될것 같아서 일단 때려 박은 상태, 나중에 변경경
      // apiKey={import.meta.env.VITE_TINYMCE_EDITOR_API_KEY}
      onInit={(evt, editor) => (editorRef.current = editor)}
      initialValue="<p>Welcome to the enhanced TinyMCE editor!</p>"
      init={{
        plugins:
          "preview powerpaste casechange importcss searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed codesample table charmap pagebreak nonbreaking anchor tableofcontents insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker editimage help formatpainter permanentpen pageembed charmap tinycomments mentions quickbars linkchecker emoticons advtable footnotes mergetags autocorrect typography advtemplate markdown",
        mobile: {
          plugins:
            "preview powerpaste casechange importcss searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed codesample table charmap pagebreak nonbreaking anchor tableofcontents insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker help formatpainter pageembed charmap mentions quickbars linkchecker emoticons advtable footnotes mergetags autocorrect typography advtemplate",
        },
        menu: {
          tc: {
            title: "Comments",
            items: "addcomment showcomments deleteallconversations",
          },
        },
        menubar: "file edit view insert format tools table tc help",
        toolbar:
          "undo redo | | aidialog aishortcuts | blocks fontsizeinput | bold italic | align numlist bullist | link  | table media pageembed | lineheight outdent indent | strikethrough forecolor backcolor formatpainter removeformat | charmap emoticons checklist | code fullscreen preview | save print | pagebreak anchor codesample footnotes mergetags | addtemplate inserttemplate | addcomment showcomments | ltr rtl casechange | spellcheckdialog a11ycheck",
        autosave_ask_before_unload: true,
        autosave_interval: "30s",
        autosave_prefix: "{path}{query}-{id}-",
        autosave_restore_when_empty: false,
        autosave_retention: "2m",
        image_advtab: true,
        typography_rules: [
          "common/punctuation/quote",
          "en-US/dash/main",
          "common/nbsp/afterParagraphMark",
          "common/nbsp/afterSectionMark",
          "common/nbsp/afterShortWord",
          "common/nbsp/beforeShortLastNumber",
          "common/nbsp/beforeShortLastWord",
          "common/nbsp/dpi",
          "common/punctuation/apostrophe",
          "common/space/delBeforePunctuation",
          "common/space/afterComma",
          "common/space/afterColon",
          "common/space/afterExclamationMark",
          "common/space/afterQuestionMark",
          "common/space/afterSemicolon",
          "common/space/beforeBracket",
          "common/space/bracket",
          "common/space/delBeforeDot",
          "common/space/squareBracket",
          "common/number/mathSigns",
          "common/number/times",
          "common/number/fraction",
          "common/symbols/arrow",
          "common/symbols/cf",
          "common/symbols/copy",
          "common/punctuation/delDoublePunctuation",
          "common/punctuation/hellip",
        ],
        typography_ignore: ["code"],
        advtemplate_list: () => {
          return Promise.resolve([
            {
              id: "1",
              title: "Resolving tickets",
              content:
                "<p>As we have not heard back from you in over a week, we have gone ahead and resolved your ticket.</p>",
            },
            {
              id: "2",
              title: "Quick replies",
              items: [
                {
                  id: "3",
                  title: "Message received",
                  content:
                    "<p>Just a quick note to say we have received your message, and will get back to you within 48 hours.</p>",
                },
                {
                  id: "4",
                  title: "Progress update",
                  content:
                    "</p>Just a quick note to let you know we are still working on your case</p>",
                },
              ],
            },
          ]);
        },
        link_list: [
          { title: "My page 1", value: "https://www.tiny.cloud" },
          { title: "My page 2", value: "http://www.moxiecode.com" },
        ],
        image_list: [
          { title: "My page 1", value: "https://www.tiny.cloud" },
          { title: "My page 2", value: "http://www.moxiecode.com" },
        ],
        image_class_list: [
          { title: "None", value: "" },
          { title: "Some class", value: "class-name" },
        ],
        importcss_append: true,
        height: 600,
        image_caption: true,
        quickbars_selection_toolbar:
          "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
        noneditable_class: "mceNonEditable",
        toolbar_mode: "sliding",
        spellchecker_ignore_list: ["Ephox", "Moxiecode", "tinymce", "TinyMCE"],
        tinycomments_mode: "embedded",
        content_style: ".mymention{ color: gray; }",
        contextmenu: "link image editimage table configurepermanentpen",
        a11y_advanced_options: true,
        // TODO: 나중에 테마 수정할 수 있도록?
        // skin: useDarkMode ? 'oxide-dark' : 'oxide',
        // content_css: useDarkMode ? 'dark' : 'default',
        mentions_selector: ".mymention",
        mentions_item_type: "profile",
        autocorrect_capitalize: true,
        mergetags_list: [
          {
            title: "Client",
            menu: [
              {
                value: "Client.LastCallDate",
                title: "Call date",
              },
              {
                value: "Client.Name",
                title: "Client name",
              },
            ],
          },
          {
            title: "Proposal",
            menu: [
              {
                value: "Proposal.SubmissionDate",
                title: "Submission date",
              },
            ],
          },
          {
            value: "Consultant",
            title: "Consultant",
          },
          {
            value: "Salutation",
            title: "Salutation",
          },
        ],
        revisionhistory_fetch: () => {
          return Promise.resolve([
            {
              revisionId: "1",
              createdAt: "2023-11-24T22:26:21.578Z",
              content: "<p>Initial content</p>",
            },
          ]);
        },
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default EnhancedTinyMCEExample;
