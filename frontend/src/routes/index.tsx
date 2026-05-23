import { createFileRoute } from "@tanstack/react-router";
import { ChatApp } from "@/components/ChatApp";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Krishna AI — Wisdom Inspired by the Bhagavad Gita" },
      {
        name: "description",
        content:
          "A calm, contemplative AI companion offering reflections grounded in the timeless verses of the Bhagavad Gita.",
      },
    ],
  }),
});

function Index() {
  return <ChatApp />;
}
