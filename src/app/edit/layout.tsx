import type { ReactNode } from "react";
import EditSidebar from "./_components/edit-sidebar";

export default function EditLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative mt-12 flex max-w-screen-xl flex-col items-start gap-x-20 gap-y-12 md:mt-16 lg:flex-row">
      <aside className="sticky top-6 z-10 w-full lg:max-w-xs">
        <EditSidebar />
      </aside>
      <main className="mb-14 w-full flex-1">{children}</main>
    </div>
  );
}
