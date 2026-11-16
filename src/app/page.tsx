import { redirect } from "next/navigation";

// The cloned page lives at its source path (/es). The root forwards there.
export default function Home() {
  redirect("/es");
}
