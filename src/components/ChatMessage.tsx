import { formatDistanceToNow } from "date-fns";

interface ChatMessageProps {
  message: string;
  sender: "user" | "bot" | "system";
  timestamp: Date;
  language?: string;
}

export const ChatMessage = ({ message, sender, timestamp, language }: ChatMessageProps) => {
  const getSenderStyle = () => {
    switch (sender) {
      case "user":
        return "bg-chat-user text-chat-user-foreground ml-auto";
      case "bot":
        return "bg-chat-bot text-chat-bot-foreground mr-auto";
      case "system":
        return "bg-chat-system text-chat-system-foreground mx-auto";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getAlignment = () => {
    switch (sender) {
      case "user":
        return "flex-row-reverse";
      case "bot":
        return "flex-row";
      case "system":
        return "flex-row justify-center";
      default:
        return "flex-row";
    }
  };

  return (
    <div className={`flex ${getAlignment()} mb-4 animate-slide-up`}>
      <div className="flex flex-col max-w-xs lg:max-w-md">
        <div
          className={`rounded-2xl px-4 py-2 shadow-sm ${getSenderStyle()}`}
        >
          <p className="text-sm">{message}</p>
          {language && sender === "bot" && (
            <span className="text-xs opacity-75 mt-1 block">
              {language === "tamil" ? "தமிழ்" : "English"}
            </span>
          )}
        </div>
        <span className="text-xs text-muted-foreground mt-1 px-2">
          {formatDistanceToNow(timestamp, { addSuffix: true })}
        </span>
      </div>
    </div>
  );
};