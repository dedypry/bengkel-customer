import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Avatar,
  Textarea,
  ModalFooter,
  Button,
} from "@heroui/react";
import { Bot, Send, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { setChat } from "@/stores/features/ai/ai-slice";
import { postQuestion } from "@/stores/features/ai/ai-action";

interface Props {
  isOpen: boolean;
  setOpen: (val: boolean) => void;
}
export default function QuestionAI({ isOpen, setOpen }: Props) {
  const { chats, chatLoading } = useAppSelector((state) => state.ai);
  const [msg, setMsg] = useState("");

  const dispatch = useAppDispatch();
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      // Berikan sedikit delay agar render selesai baru scroll
      const timeout = setTimeout(scrollToBottom, 100);

      return () => clearTimeout(timeout);
    }
  }, [chats, chatLoading, isOpen]);

  function sendMsg() {
    dispatch(postQuestion(msg));
    dispatch(setChat(msg));
    setMsg("");
  }

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      scrollBehavior="inside"
      size="lg"
      onOpenChange={setOpen}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex gap-2 items-center border-b">
              <div className="p-2 bg-cyan-600 rounded-lg text-white">
                <Bot size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-md">AI Konsultasi Otomotif</span>
                <span className="text-tiny text-gray-400 font-normal">
                  Tanyakan keluhan kendaraan Anda
                </span>
              </div>
            </ModalHeader>

            <ModalBody className="py-6">
              {/* Welcome Message dari AI */}
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
              <div ref={bottomRef} className="h-1" />
            </ModalBody>

            <ModalFooter>
              <div className="flex flex-col w-full gap-8">
                <Textarea
                  disableAutosize
                  classNames={{
                    input: "resize-y min-h-[100px]",
                  }}
                  placeholder="Ketik keluhan atau pertanyaan Anda di sini..."
                  value={msg}
                  variant="bordered"
                  onValueChange={setMsg}
                />
                <div className="flex gap-2 justify-end">
                  <Button color="danger" variant="light" onPress={onClose}>
                    Tutup
                  </Button>
                  <Button
                    className="bg-cyan-600 text-white font-bold"
                    endContent={<Send size={16} />}
                    isLoading={chatLoading}
                    onPress={sendMsg}
                  >
                    Tanya AI
                  </Button>
                </div>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
