import { redirect } from "next/navigation";

export default function ListStudioRedirect() {
  redirect("/dashboard/add-studio");
}