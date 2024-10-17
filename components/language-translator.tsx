"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "ot", name: "Other" },
];

export function LanguageTranslator() {
  const [inputLang, setInputLang] = useState("en");
  const [outputLang, setOutputLang] = useState("es");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  useCopilotReadable({
    description: "Available languages",
    value: JSON.stringify(languages),
  });

  useCopilotReadable({
    description: "Input language",
    value: inputLang,
  });

  useCopilotReadable({
    description: "Output language",
    value: outputLang,
  });

  useCopilotReadable({
    description: "Input text",
    value: inputText,
  });

  useCopilotAction({
    name: "Translate",
    description: "Translate input text",
    parameters: [
      {
        name: "inputLang",
        description: "Input language code",
        type: "string",
      },
      {
        name: "outputLang",
        description: "Output language code",
        type: "string",
      },
      {
        name: "inputText",
        description: "Text to translate",
        type: "string",
      },
    ],
    handler: async ({ inputLang, outputLang, inputText }) => {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputLang,
          outputLang,
          inputText,
        }),
      });

      const data = await response.json();
      setOutputText(data.outputText);
    }
  })

  useCopilotAction({
    name: "Fill input text",
    description: "Fill input text with a value",
    parameters: [
      {
        name: "text",
        description: "Text to fill",
        type: "string",
      }
    ],
    handler: (args) => {
      setInputText(args.text);
    }
  })

  useCopilotAction({
    name: "clear-input",
    description: "Clear input text",
    handler: () => {
      setInputText("");
    }
  })

  useCopilotAction({
    name: "clear-output",
    description: "Clear output text",
    handler: () => {
      setOutputText("");
    }
  })

  const handleTranslate = async () => {
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputLang,
        outputLang,
        inputText,
      }),
    });

    const data = await response.json();
    setOutputText(data.outputText);
  };

  useCopilotAction({
    name: "translate",
    description: "Translate existing input text",
    handler: handleTranslate
  })

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Language Translator</h1>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Select value={inputLang} onValueChange={setInputLang}>
          <SelectTrigger>
            <SelectValue placeholder="Select input language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={outputLang} onValueChange={setOutputLang}>
          <SelectTrigger>
            <SelectValue placeholder="Select output language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Textarea
          placeholder="Enter text to translate"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="h-40"
        />
        <div
          className="border rounded-md p-2 h-40 overflow-auto"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => setOutputText(e.currentTarget.textContent || "")}
        >
          {outputText}
        </div>
      </div>
      <Button onClick={handleTranslate} className="w-full">
        Translate
      </Button>
    </div>
  );
}
