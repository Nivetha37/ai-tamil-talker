import { ChatInterface } from "@/components/ChatInterface";

const Index = () => {
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-background">
      <div className="flex-1 max-w-4xl mx-auto w-full border-x border-border">
        <ChatInterface />
      </div>
    </div>
  );
};

export default Index;
