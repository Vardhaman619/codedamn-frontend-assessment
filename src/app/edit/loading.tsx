import { Skeleton } from "~/components/ui/skeleton";

export default function EditPageLoading() {
  return (
    <div className="flex max-w-screen-md flex-col gap-6">
      <div className="flex items-center gap-6">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="flex gap-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
      {Array.from({ length: 4 }).map((_, index) => (
        <div className="space-y-2" key={index}>
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-12 w-full" />
        </div>
      ))}
      <Skeleton className="h-48 w-full" />
      <div className="flex justify-end gap-3">
        <Skeleton className="h-12 w-24" />
        <Skeleton className="h-12 w-24" />
      </div>
    </div>
  );
}
