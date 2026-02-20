import { useState, useRef } from "react";
import { ScrollShadow, Avatar, Input, Button } from "@heroui/react";
import { Bot, User, SendHorizonal } from "lucide-react";
import ReactMarkdown from "react-markdown";

import { postQuestion } from "@/stores/features/ai/ai-action";
import { setChat } from "@/stores/features/ai/ai-slice";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";

export default function ChatBoot() {
  const { chats, chatLoading } = useAppSelector((state) => state.ai);
  const [msg, setMsg] = useState("");

  const dispatch = useAppDispatch();
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  function sendMsg() {
    dispatch(postQuestion(msg));
    dispatch(setChat(msg));
    setMsg("");
    const timeout = setTimeout(scrollToBottom, 100);

    return () => clearTimeout(timeout);
  }

  return (
    <>
      <ScrollShadow className="flex-1 overflow-y-auto h-[500px] pb-10">
        {chats.map((item, i) => {
          if (!item.isMe) {
            return (
              <div key={i} className="flex justify-start gap-3 mb-4">
                <Avatar
                  className="bg-cyan-100 text-cyan-600 shrink-0"
                  icon={<Bot size={20} />}
                />
                <div className="bg-default-100 p-3 rounded-2xl rounded-tl-none text-sm max-w-[80%]">
                  <ReactMarkdown>{item.msg}</ReactMarkdown>
                </div>
              </div>
            );
          } else {
            return (
              <div key={i} className="flex justify-end gap-3 mb-4">
                <div className="bg-default-100 p-3 rounded-2xl rounded-tr-none text-sm max-w-[80%]">
                  {item.msg}
                </div>
                <Avatar
                  className="bg-cyan-100 text-cyan-600 shrink-0"
                  icon={<User size={20} />}
                />
              </div>
            );
          }
        })}

        {chatLoading && (
          <div className="flex justify-start gap-3 mb-4 animate-in fade-in slide-in-from-left-2 duration-300">
            <Avatar
              className="bg-cyan-100 text-cyan-600 shrink-0"
              icon={<Bot size={20} />}
            />
            <div className="bg-default-100 p-4 rounded-2xl rounded-tl-none flex gap-1 items-center">
              <span className="w-1.5 h-1.5 bg-cyan-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 bg-cyan-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 bg-cyan-600 rounded-full animate-bounce" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </ScrollShadow>
      <div className="absolute bottom-1 right-2 left-2">
        <Input
          classNames={{
            input: "resize-y min-h-[100px]",
          }}
          endContent={
            <Button isIconOnly variant="light" onPress={sendMsg}>
              <SendHorizonal />
            </Button>
          }
          placeholder="Ketik keluhan atau pertanyaan Anda di sini..."
          value={msg}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // Cegah baris baru
              sendMsg();
            }
          }}
          onValueChange={setMsg}
        />
      </div>
    </>
  );
}
