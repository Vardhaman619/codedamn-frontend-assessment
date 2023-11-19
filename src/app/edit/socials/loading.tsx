import { Skeleton } from "~/components/ui/skeleton";

export default function SocialsEditPageLoading() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div className="space-y-2" key={index}>
          <Skeleton className="h-6 w-1/5" />
          <Skeleton className="h-12 w-full" />
        </div>
      ))}
      <div className="flex justify-end gap-3">
        <Skeleton className="h-12 w-1/5" />
        <Skeleton className="h-12 w-1/5" />
      </div>
    </div>
  );
}
