import { LanguageTranslator } from "@/components/language-translator";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

export default function Home() {
  return (
    <>
      <CopilotKit runtimeUrl="/api/copilotkit">
        <div className="min-h-screen flex items-center justify-center">
          <LanguageTranslator />
        </div>
        <CopilotPopup
          instructions="You are language translator. You help users translate text from one language to another."
          labels={{
            title: "Assistant",
            initial: "Hi there! I'm your assistant. I can help you translate text from one language to another.",
          }}
        />
      </CopilotKit>
    </>
  );
}
