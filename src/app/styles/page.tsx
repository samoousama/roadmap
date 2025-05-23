import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import Button from "@mui/material/Button";

export const metadata: Metadata = {
  title: "Styles (Dev)",
};
export default async function MyStyles() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <div className=" relative min-h-screen bg-gray-50">
      <AppHeader pathname="/my-jobs" />
      <div className="my-container mx-auto px-4 py-6">
        <div className="flex flex-col gap-2">
          <Button>Mui Button</Button>
          <button className="my-btn">Btn primary</button>
          <button className="my-btn danger">Btn primary danger</button>
          <button className="my-btn-text">Btn text</button>
          <button className="my-btn-text danger">Btn text danger</button>
          <button className="my-btn-secondary">Btn secondary</button>
          <button className="my-btn-secondary danger">
            Btn secondary danger 
          </button>
          <button className="my-btn-outline">Btn outline</button>
          <button className="my-btn-outline danger">Btn outline dnager</button>
          <button className="my-btn-menu">Btn menu</button>
          <button className="my-btn-menu danger">Btn menu danger</button>
          <button className="my-btn-link">Btn link</button>
          <button className="my-btn-link danger">Btn link danger</button>
        </div>
      </div>
    </div>
  );
}
