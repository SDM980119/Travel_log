import { useEffect, useRef, useState } from "react";

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", text: "안녕하세요! 무엇을 도와드릴까요?" },
  ]);

  const panelRef = useRef(null);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  // 열릴 때 포커스
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  // 스크롤 하단 고정
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  // ESC / 외부 클릭 닫기
  useEffect(() => {
    const onKeyDown = (e) => e.key === "Escape" && setOpen(false);
    const onClickOutside = (e) => {
      if (open && panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onClickOutside);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onClickOutside);
    };
  }, [open]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages((p) => [...p, { role: "user", text: input }]);
    setInput("");

    // TODO: 실제 챗봇 API 연동
    await new Promise((r) => setTimeout(r, 300));
    setMessages((p) => [...p, { role: "bot", text: "답변을 준비 중입니다." }]);
  };

  return (
    <>
      {/* Floating Button */}
      <button className="chatbot-fab" onClick={() => setOpen(!open)}>
        {open ? "×" : "💬"}
      </button>

      {/* Chat Panel */}
      <div className={`chatbot-panel ${open ? "open" : ""}`} ref={panelRef}>
        <div className="chatbot-header">
          <div>
            <strong>TRAVELLOG 챗봇</strong>
            <p>여행 추천을 도와드려요</p>
          </div>
          <button onClick={() => setOpen(false)}>×</button>
        </div>

        <div className="chatbot-body" ref={scrollRef}>
          {messages.map((m, i) => (
            <div
              key={i}
              className={`chatbot-bubble ${m.role === "user" ? "user" : "bot"}`}
            >
              {m.text}
            </div>
          ))}
        </div>

        <div className="chatbot-footer">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메시지를 입력하세요"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>전송</button>
        </div>
      </div>
    </>
  );
}
