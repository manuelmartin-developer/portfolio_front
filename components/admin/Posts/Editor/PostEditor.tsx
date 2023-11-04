import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

const PostEditor: React.FC<{
  content: string | undefined;
  setContent: React.Dispatch<React.SetStateAction<string | undefined>>;
}> = ({ content, setContent }) => {
  return (
    <MDEditor highlightEnable={true} value={content} onChange={setContent} />
  );
};

export default PostEditor;
