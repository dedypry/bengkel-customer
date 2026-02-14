/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/iframe-has-title */
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Bot,
  User,
  SendHorizonal,
} from "lucide-react";
import { useState, useRef } from "react";
import { Avatar, Button, Input, ScrollShadow } from "@heroui/react";
import ReactMarkdown from "react-markdown";

import { profile } from "@/configs/profile";
import { postQuestion } from "@/stores/features/ai/ai-action";
import { setChat } from "@/stores/features/ai/ai-slice";
import { useAppSelector, useAppDispatch } from "@/stores/hooks";

export default function ContactSection() {
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

  const contactInfo = [
    {
      icon: <MapPin className="text-danger" size={24} />,
      title: "Lokasi Bengkel",
      detail: profile.address,
    },
    {
      icon: <Phone className="text-danger" size={24} />,
      title: "Hubungi Kami",
      detail: profile.phone,
    },
    {
      icon: <Mail className="text-danger" size={24} />,
      title: "Email Support",
      detail: profile.email,
    },
    {
      icon: <Clock className="text-danger" size={24} />,
      title: "Jam Operasional",
      detail: "Senin - minggu: 08.30 - 17.00",
    },
  ];

  return (
    <section className="py-24 bg-white" id="contact">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-danger font-bold tracking-[0.2em] uppercase mb-2">
            // HUBUNGI KAMI //
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[#0B1C39]">
            Ada Pertanyaan? Hubungi Kami Sekarang
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Kolom Kiri: Info & Map */}
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-[#F2F2F2] p-6 flex flex-col gap-3 group hover:bg-[#0B1C39] transition-all duration-300"
                >
                  <div className="bg-white w-12 h-12 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    {info.icon}
                  </div>
                  <h4 className="font-bold text-[#0B1C39] text-xl group-hover:text-white transition-colors">
                    {info.title}
                  </h4>
                  <p className="text-gray-600 group-hover:text-gray-300 transition-colors">
                    {info.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Google Maps Placeholder */}
            <div className="w-full h-[300px] bg-gray-200 transition-all duration-500 overflow-hidden shadow-inner">
              <iframe
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                // Pastikan menggunakan HTTPS dan parameter output=embed
                src="https://maps.google.com/maps?q=-6.4076505,106.751639&output=embed"
              />
            </div>
          </div>

          {/* Kolom Kanan: Form Kontak */}
          <div className="bg-[#0B1C39] p-8 md:p-12 shadow-2xl relative">
            <h3 className="text-3xl font-bold text-white mb-6">Kirim Pesan</h3>

            <ScrollShadow className="flex-1 overflow-y-auto h-[600px]">
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
          </div>
        </div>
      </div>
    </section>
  );
}
