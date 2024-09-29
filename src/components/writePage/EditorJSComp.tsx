// @ts-nocheck
// INFO: 현재 yarn에는 몇몇 패키지가 없어 수정할 수 없는 타입 오류발생, 임의로 무시함

import EditorJS, { OutputData } from "@editorjs/editorjs";
import React, { useEffect, useRef } from "react";

// Import all required tools
import AttachesTool from "@editorjs/attaches";
import CheckList from "@editorjs/checklist";
import Code from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import Image from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
import LinkTool from "@editorjs/link";
import Marker from "@editorjs/marker";
import NestedList from "@editorjs/nested-list";
import Paragraph from "@editorjs/paragraph";
import Quote from "@editorjs/quote";
import RawTool from "@editorjs/raw";
import SimpleImage from "@editorjs/simple-image";
import Table from "@editorjs/table";
import Warning from "@editorjs/warning";
import styled from "styled-components";

interface EditorProps {
  initialData?: OutputData;
  onChange?(data: OutputData): void;
}

const EDITOR_JS_TOOLS = {
  header: Header,
  list: {
    class: NestedList,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered",
    },
  },
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  table: {
    class: Table,
    inlineToolbar: true,
  },
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  image: {
    class: Image,
  },
  raw: RawTool,
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
  embed: Embed,
  attaches: AttachesTool,
};

const EditorJSComp: React.FC<EditorProps> = ({ initialData, onChange }) => {
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        tools: EDITOR_JS_TOOLS,
        data: initialData || {},
        onReady: () => {
          editor.on("applyInlineStyle", ({ style, selection }) => {
            const range = selection.getRangeAt(0);
            const selectedText = range.toString();
            let styledText = "";

            switch (style) {
              case "bold":
                styledText = `<b>${selectedText}</b>`;
                break;
              case "italic":
                styledText = `<i>${selectedText}</i>`;
                break;
              case "link":
                const url = prompt("Enter URL:", "http://");
                if (url) {
                  styledText = `<a href="${url}">${selectedText}</a>`;
                }
                break;
              case "code":
                styledText = `<code>${selectedText}</code>`;
                break;
            }

            if (styledText) {
              range.deleteContents();
              const fragment = range.createContextualFragment(styledText);
              range.insertNode(fragment);
            }
          });

          editor.on("insertBlock", ({ type, selection }) => {
            const range = selection.getRangeAt(0);
            const selectedText = range.toString();

            let content = "";
            switch (type) {
              case "header":
                content = `<h2>${selectedText}</h2>`;
                break;
              case "list":
                content = `<ul><li>${selectedText}</li></ul>`;
                break;
              case "numberedList":
                content = `<ol><li>${selectedText}</li></ol>`;
                break;
              case "checkbox":
                content = `<div class="checklist"><label><input type="checkbox">${selectedText}</label></div>`;
                break;
            }

            if (content) {
              const selection = window.getSelection();
              if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                range.deleteContents();
                const fragment = range.createContextualFragment(content);
                range.insertNode(fragment);
              }
            }
          });
        },
        onChange: async () => {
          const content = (await editorRef.current?.save()) as any;
          onChange && onChange(content);
        },
        autofocus: true,
        placeholder: "Let`s write an awesome story!",
      } as any);

      editorRef.current = editor;
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <h1>EditorJS</h1>
      <EditorWrapper>
        <EditorDiv id="editorjs" />
      </EditorWrapper>
    </>
  );
};

export default EditorJSComp;

const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid var(--color-wb-300, #bfb7c1);
`;

const EditorDiv = styled.div`
  width: 100%;
  height: calc(100vh - 540px);
  padding: 8px;
`;
