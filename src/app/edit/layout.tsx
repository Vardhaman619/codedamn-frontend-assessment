import type { ReactNode } from "react";
import EditSidebar from "./_components/edit-sidebar";

export default function EditLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mt-16 flex max-w-screen-xl flex-row gap-20 px-10">
      <aside className="w-full" style={{ maxWidth: "264px" }}>
        <EditSidebar />
      </aside>
      <main className="mb-14 w-full">{children}</main>
    </div>
  );
}
