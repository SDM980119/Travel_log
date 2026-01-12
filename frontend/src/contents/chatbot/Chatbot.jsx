import { useLayoutEffect, useMemo, useRef, useState } from "react";
import "./chatbot.css";
import { sendChatMessage } from "../../API/chatbot";

const makeId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export default function Chatbot() {
  const [messages, setMessages] = useState([]); // [{id, role, content, pending?, error?}]
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    });
  }, [messages, loading]);

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  const append = (msg) => setMessages((prev) => [...prev, msg]);
  const patch = (id, partial) =>
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, ...partial } : m)));

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    // 1) 유저 메시지 즉시 렌더
    append({ id: makeId(), role: "user", content: text });
    setInput("");
    setLoading(true);

    // 2) 어시스턴트 자리(로딩 표시용)
    const assistantId = makeId();
    append({ id: assistantId, role: "assistant", content: "", pending: true });

    try {
      const res = await sendChatMessage(text);

      // 서버 응답 키 방어적으로 처리
      const reply =
        res?.data?.response_message ??
        res?.data?.responseMessage ??
        res?.data?.answer ??
        "응답을 가져오지 못했어.";

      patch(assistantId, { content: reply, pending: false });
    } catch (err) {
      // 에러 내용을 최대한 보여주기(개발/디버깅에 매우 중요)
      const status = err?.response?.status;
      const serverMsg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message;

      console.error("sendChatMessage failed:", status, err?.response?.data || err);

      patch(assistantId, {
        content: status
          ? `요청 실패 (${status})${serverMsg ? `: ${serverMsg}` : ""}`
          : `서버 오류가 발생했어.${serverMsg ? ` (${serverMsg})` : ""}`,
        pending: false,
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    // Enter 전송 / Shift+Enter 줄바꿈
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="container clearfix">
      <div className="chat">
        <div className="chat-header clearfix">
          <img
            src="/static/images/logo.jpg"
            alt="avatar"
            style={{ width: 60, borderRadius: 50, marginLeft: 10 }}
          />
          <div className="chat-about">여행지 추천</div>
        </div>

        <div className="chat-history">
          <ul style={{ listStyle: "none", padding: 0 }}>
            {messages.map((msg) => (
              <li className="clearfix" key={msg.id}>
                <div
                  className={`message ${
                    msg.role === "user"
                      ? "my-message float-right"
                      : "other-message float-left"
                  }`}
                >
                  {msg.pending ? (
                    <div className="loading-dots">
                      <span /><span /><span />
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              </li>
            ))}
            <div ref={chatEndRef} />
          </ul>
        </div>

        <div className="chat-message" style={{ display: "flex", gap: 8 }}>
          <textarea
            placeholder="메시지를 입력하세요."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={loading}
            style={{ flex: 1, resize: "none" }}
          />
          <button type="button" onClick={sendMessage} disabled={!canSend}>
            전송
          </button>
        </div>
      </div>
    </div>
  );
}
