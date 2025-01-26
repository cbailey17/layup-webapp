import React from "react";
import { cn } from "@/lib/utils";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { useTheme } from "@/components/theme/theme-provider";

export interface CodeBlockProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  language?: string;
  darkMode?: boolean;
}
const CodeBlock = React.forwardRef<HTMLTextAreaElement, CodeBlockProps>(
  ({ className, ...props }, ref) => {
    const { theme } = useTheme();

    return (
      <div
        className={cn(`relative flex min-h-[80px] w-full 
                       rounded border-input px-3 py-2 
                       text-sm`,
          className,
        )}
        style={{
          backgroundColor:
            theme === "dark" ?
              "#333333" :
              "#ffffff"
        }}>
        <CodeEditor
          padding={0}
          data-color-mode={theme === "dark" ? "dark" : "light"}
          style={{
            backgroundColor: theme === "dark" ?
              "#333333" :
              "#ffffff",
            width: "100%",
            fontFamily: "ui-monospace,Menlo,monospace",
          }}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

CodeBlock.displayName = "CodeBlock";

export { CodeBlock };

