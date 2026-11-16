import { redirect } from "next/navigation";

// The home lives at /es. The root forwards there.
export default function Home() {
  redirect("/es");
}
