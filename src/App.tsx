import { useEffect, useMemo, useState } from "react";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "./App.css";
import ReactQuill from "react-quill";
// import "highlight.js/styles/github.css";
import "highlight.js/styles/github-dark.css";
import hljs from "highlight.js";

// https://www.libhunt.com/l/typescript/topic/wysiwyg
// https://www.reddit.com/r/laravel/comments/105s2dl/wysiwyg_markdown_editor/

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { ReactNodeViewRenderer } from "@tiptap/react";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";

import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { createLowlight } from "lowlight";
import CodeBlockComponent from "./CodeBlockComponent";

import "./styles.scss";

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <button
      onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      className={editor.isActive("codeBlock") ? "is-active" : ""}
    >
      code block
    </button>
  );
};

const lowlight = createLowlight({});
lowlight.register({ html, css, js, ts });

function App() {
  const [activeQuill, setActiveQuill] = useState<number>(0);

  // tiptap
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockComponent);
        },
      }).configure({ lowlight }),
    ],
    content: `
        <p>
          That’s a boring paragraph followed by a fenced code block:
        </p>
        <pre><code class="language-javascript">for (var i=1; i <= 20; i++)
{
  if (i % 15 == 0)
    console.log("FizzBuzz");
  else if (i % 3 == 0)
    console.log("Fizz");
  else if (i % 5 == 0)
    console.log("Buzz");
  else
    console.log(i);
}</code></pre>
        <p>
          Press Command/Ctrl + Enter to leave the fenced code block and continue typing in boring paragraphs.
        </p>
      `,
  })

  // quill
  const [data, setData] = useState<string>("");

  hljs.configure({
    languages: [
      "ruby",
      "python",
      "java",
      "cpp",
      "kotlin",
      "sql",
      "html",
      "typescript",
    ],
  });

  const modules = useMemo(() => {
    return {
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
        ["clean"],
        ["code-block"],
      ],
      syntax: {
        highlight: (text: any) => hljs.highlightAuto(text).value,
      },
    };
  }, []);

  return (
    <div className="tw-bg-white tw-w-[50rem] tw-h-[60rem] tw-relative">
      <button
        className="tw-absolute tw-w-40 tw-flex tw-items-center tw-justify-center tw-h-8 tw-black tw-z-10 -tw-left-[20rem] tw-bg-red-500 tw-rounded-lg"
        onClick={() => setActiveQuill(activeQuill !== 1 ? activeQuill + 1 : 0)}
      >
        바꿔바꿔
      </button>
      {activeQuill === 0 && (
        <ReactQuill
          className="tw-h-[calc(100%-40px)] tw-pb-0 tw-text-black"
          theme="snow"
          modules={modules}
          value={data}
          onChange={(input, delta, source, editor) => {
            console.log(input);
            setData(input);
          }}
        />
      )}

      {activeQuill === 1 && (
        <>
          <div className="tw-w-[36rem]">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
