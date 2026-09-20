import { createFileRoute } from "@tanstack/react-router";
import { SwayApp } from "@/components/app";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <SwayApp />;
}
