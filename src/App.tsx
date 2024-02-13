import { useMemo, useState } from "react";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "./App.css";
import ReactQuill from "react-quill";
// import "highlight.js/styles/github.css";
import "highlight.js/styles/github-dark.css";
import hljs from "highlight.js";

// https://www.libhunt.com/l/typescript/topic/wysiwyg
// https://www.reddit.com/r/laravel/comments/105s2dl/wysiwyg_markdown_editor/

import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

function App() {
  const [activeQuill, setActiveQuill] = useState<number>(0);

  // tiptap
  const editor = useEditor({
    extensions: [StarterKit],
    content: `
      <p>
        Hey, try to select some text here. There will popup a menu for selecting some inline styles. Remember: you have full control about content and styling of this menu.
      </p>
    `,
  });

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
          {editor && (
            <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive("bold") ? "is-active" : ""}
              >
                bold
              </button>
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive("italic") ? "is-active" : ""}
              >
                italic
              </button>
              <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={editor.isActive("strike") ? "is-active" : ""}
              >
                strike
              </button>
            </BubbleMenu>
          )}
          <EditorContent editor={editor}/>
        </>
      )}
    </div>
  );
}

export default App;
