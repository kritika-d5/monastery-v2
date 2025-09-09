import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, Bot, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

// WARNING: Hardcoding API keys is highly insecure and not recommended for production.
const GROQ_API_KEY = "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";

const TravelCompanion = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I am your AI travel companion for Sikkim. How can I help you plan your spiritual journey?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState("");

  // Fetches the content of the local text file to use as a knowledge base.
  useEffect(() => {
    fetch('/src/data/sikkim-info.txt')
      .then(response => response.text())
      .then(text => {
        setKnowledgeBase(text);
      })
      .catch(error => {
        console.error("Failed to load knowledge base:", error);
      });
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    setLoading(true);
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      // Correctly format messages for the Groq API.
      // The first message is the system prompt.
      // The rest of the messages should be the chat history, excluding the initial welcome message.
      const apiMessages = [
        {
          role: "system",
          content: `You are an AI travel companion for the MonasteryExplorer website. Your purpose is to provide helpful and accurate information about Sikkim, its monasteries, and travel tips based on the following knowledge base. Do not use any external knowledge. If the user asks a question that is not in the provided text, respond by stating that you cannot find the information.
          
          Knowledge Base:
          ${knowledgeBase}
          `,
        },
        ...messages.slice(1), // Exclude the initial assistant welcome message
        userMessage, // Add the new user message
      ];
      
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Updated to the requested model.
          model: "meta-llama/llama-4-maverick-17b-128e-instruct", 
          messages: apiMessages,
        }),
      });
      
      // Check for bad response status
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(`API returned status ${response.status}: ${errorData.error.message || response.statusText}`);
      }

      const data = await response.json();

      // Fix the TypeError by checking if choices array exists
      if (data.choices && data.choices[0]) {
        const assistantMessage = data.choices[0].message;
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: assistantMessage.content },
        ]);
      } else {
        throw new Error("No response from AI.");
      }

    } catch (error) {
      console.error("Error communicating with AI:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I am currently unable to process your request. Please check the console for errors or try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold font-playfair bg-gradient-monastery bg-clip-text text-transparent">
          Your Travel Companion
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Ask me anything about Sikkim's monasteries, culture, and travel tips.
        </p>
      </div>

      <Card className="w-full max-w-3xl mx-auto h-[600px] flex flex-col">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-monastery-gold" />
            AI Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-6 overflow-hidden flex flex-col">
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg max-w-xs ${
                      msg.role === "user"
                        ? "bg-monastery-gold text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="mt-6 flex gap-2 items-center">
            <Textarea
              className="flex-1 resize-none"
              placeholder="Type your question here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <Button size="icon" onClick={handleSendMessage} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TravelCompanion;