import { Skeleton } from "~/components/ui/skeleton";

export default function PortfolioPageLoading() {
  return (
    <div className="space-y-10">
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <Skeleton className="h-10 w-1/3"></Skeleton>
          <Skeleton className="h-8 w-16"></Skeleton>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {Array.from({ length: 4 }).map((_, i) => {
            return <Skeleton className="h-32 w-full" key={i} />;
          })}
        </div>
      </section>
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <Skeleton className="h-10 w-1/3"></Skeleton>
          <Skeleton className="h-8 w-16"></Skeleton>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {Array.from({ length: 4 }).map((_, i) => {
            return <Skeleton className="h-32 w-full" key={i} />;
          })}
        </div>
      </section>
      <section className="flex justify-end gap-3">
        <Skeleton className="h-12 w-1/5" />
        <Skeleton className="h-12 w-1/5" />
      </section>
    </div>
  );
}
