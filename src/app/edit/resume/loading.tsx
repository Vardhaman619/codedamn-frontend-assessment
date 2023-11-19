import { Skeleton } from "~/components/ui/skeleton";

export default function EditResumeLoading() {
  return (
    <div className="space-y-10">
      <section className="space-y-6">
        <Skeleton className="h-8 w-1/3" />
        <div className="space-y-5">
          {Array.from({ length: 2 }).map((_, i) => {
            return <Skeleton key={i} className="h-60 w-full" />;
          })}
        </div>
      </section>
      <section className="space-y-6">
        <Skeleton className="h-8 w-1/3" />
        <div>
          {Array.from({ length: 2 }).map((_, i) => {
            return <Skeleton key={i} className="h-40 w-full" />;
          })}
        </div>
      </section>
      <section className="flex justify-end gap-3">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </section>
    </div>
  );
}
