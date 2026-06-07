import { useState, useRef, useEffect } from "react";
import { ScrollShadow, Avatar, Input, Button } from "@heroui/react";
import { Bot, User, SendHorizonal, PhoneCall } from "lucide-react";
import ReactMarkdown from "react-markdown";

import { profile } from "@/configs/profile";
import { postQuestion } from "@/stores/features/ai/ai-action";
import { setChat } from "@/stores/features/ai/ai-slice";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";

export default function ChatBoot() {
  const { chats, chatLoading } = useAppSelector((state) => state.ai);
  const [msg, setMsg] = useState("");

  const dispatch = useAppDispatch();
  const scrollRef = useRef<HTMLDivElement>(null);
  const waLink = `https://wa.me/${profile.phone}?text=${encodeURIComponent(
    "Halo Admin, saya ingin bertanya tentang layanan dan estimasi harga bengkel.",
  )}`;

  const scrollToBottom = () => {
    const el = scrollRef.current;

    if (!el) return;

    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats, chatLoading]);

  function sendMsg(message = msg) {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || chatLoading) return;

    dispatch(postQuestion(trimmedMessage));
    dispatch(setChat(trimmedMessage));
    setMsg("");
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-start justify-between gap-3 shrink-0">
        <div>
          <p className="font-bold text-base">Chatbot Bengkel</p>
          <p className="text-xs text-default-500">
            Tanya profil bengkel, layanan, produk, harga, dan estimasi.
          </p>
        </div>
        <a
          className="inline-flex items-center gap-1 rounded-full bg-success px-3 py-2 text-xs font-semibold text-white"
          href={waLink}
          rel="noopener noreferrer"
          target="_blank"
        >
          <PhoneCall size={14} />
          WhatsApp
        </a>
      </div>

      <div className="mb-3 flex flex-wrap gap-2 shrink-0">
        {[
          "Berapa harga ganti oli?",
          "Apa saja layanan yang tersedia?",
          "Estimasi servis kaki-kaki berapa?",
        ].map((question) => (
          <Button
            key={question}
            className="text-xs"
            size="sm"
            variant="flat"
            onPress={() => sendMsg(question)}
          >
            {question}
          </Button>
        ))}
      </div>

      <ScrollShadow
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto pr-1"
      >
        {chats.map((item, i) => {
          if (!item.isMe) {
            return (
              <div key={i} className="flex justify-start gap-3 mb-4">
                <Avatar
                  className="bg-cyan-100 text-cyan-600 shrink-0"
                  icon={<Bot size={20} />}
                />
                <div className="flex flex-col items-start gap-2 max-w-[80%]">
                  <div className="bg-default-100 p-3 rounded-2xl rounded-tl-none text-sm">
                    <ReactMarkdown>{item.msg}</ReactMarkdown>
                  </div>
                  <a
                    className="inline-flex items-center gap-1 rounded-full bg-success px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90"
                    href={waLink}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <PhoneCall size={14} />
                    Hubungi Admin
                  </a>
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
      </ScrollShadow>
      <div className="shrink-0 pt-2">
        <Input
          endContent={
            <Button
              isIconOnly
              isDisabled={!msg.trim() || chatLoading}
              variant="light"
              onPress={() => sendMsg()}
            >
              <SendHorizonal />
            </Button>
          }
          placeholder="Tanya layanan, harga, produk, atau profil bengkel..."
          value={msg}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // Cegah baris baru
              e.stopPropagation(); // Cegah Popover ikut menutup
              sendMsg();
            }
          }}
          onValueChange={setMsg}
        />
      </div>
    </div>
  );
}
