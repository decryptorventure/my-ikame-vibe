import { Card, CardContent, Skeleton } from '@frontend-team/ui-kit';

export function EventFilterSkeleton() {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4].map((item) => (
        <Skeleton key={item} className="h-8 w-24 rounded-full" />
      ))}
    </div>
  );
}

export function EventListSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {[1, 2, 3, 4].map((item) => (
        <Card key={item} shadow="none">
          <div className="flex gap-4 p-4">
            <Skeleton className="size-20 shrink-0 rounded-lg" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export function EventSidebarSkeleton() {
  return (
    <>
      <div className="flex flex-col gap-4 rounded-2xl px-4 py-6">
        <Skeleton className="h-5 w-28" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-3 w-full rounded-full" />
        </div>
      </div>

      <Card shadow="none" className="bg_canvas_primary">
        <CardContent className="p-6">
          <Skeleton className="mb-4 h-5 w-36" />
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <Skeleton className="size-5 rounded-full" />
                <Skeleton className="size-8 rounded-full" />
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-12" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
