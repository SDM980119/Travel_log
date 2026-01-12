import { useEffect, useRef, useState } from "react";

const ChatFabButton = () => {
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
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  // ESC 닫기
  useEffect(() => {
    const onKeyDown = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // 패널 바깥 클릭 닫기 (fab 버튼 클릭은 예외 처리)
  useEffect(() => {
    const onMouseDown = (e) => {
      if (!open) return;
      const panel = panelRef.current;
      if (!panel) return;

      // 패널 내부 클릭이면 유지
      if (panel.contains(e.target)) return;

      // fab 버튼(고양이) 클릭이면 여기서 닫지 않음 (토글 핸들러가 처리)
      const fab = document.getElementById("chat-fab");
      if (fab && fab.contains(e.target)) return;

      setOpen(false);
    };

    window.addEventListener("mousedown", onMouseDown);
    return () => window.removeEventListener("mousedown", onMouseDown);
  }, [open]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;
    setMessages((p) => [...p, { role: "user", text: userText }]);
    setInput("");

    // TODO: 실제 챗봇 API 연동 위치
    await new Promise((r) => setTimeout(r, 300));
    setMessages((p) => [...p, { role: "bot", text: "답변을 준비 중입니다." }]);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        id="chat-fab"
        className="chat-fab"
        aria-label="help"
        type="button"
        onClick={() => setOpen((v) => !v)}
      >
        <img src="/images/고양.png" alt="" />
      </button>

      {/* Backdrop (선택) */}
      <div
        className={`chat-backdrop ${open ? "open" : ""}`}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      />

      {/* Chat Panel */}
      <div
        className={`chatbot-panel ${open ? "open" : ""}`}
        ref={panelRef}
        aria-hidden={!open}
      >
        <div className="chatbot-header">
          <div>
            <strong>TRAVELLOG 챗봇</strong>
            <p>여행 추천을 도와드려요</p>
          </div>
          <button type="button" onClick={() => setOpen(false)} aria-label="닫기">
            ×
          </button>
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
          <button type="button" onClick={sendMessage}>
            전송
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatFabButton;
