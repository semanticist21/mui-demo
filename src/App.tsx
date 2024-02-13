import { useState } from "react";
import "./App.css";
import MDEditor from "@uiw/react-md-editor";

function App() {
  const [value, setValue] = useState<string | undefined>("**Hello world!!!**");

  return (
    <div>
      <div>
        <MDEditor
          height={"30rem"}
          value={value}
          onChange={(value?: string) => setValue(value)}
        />
        {/* <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} /> */}
      </div>
    </div>
  );
}

export default App;
