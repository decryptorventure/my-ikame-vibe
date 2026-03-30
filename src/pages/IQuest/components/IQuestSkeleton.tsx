import { Card, CardContent, Skeleton } from '@frontend-team/ui-kit';

export function QuestBannerSkeleton() {
  return (
    <Card shadow="none" className="overflow-hidden bg_violet_medium">
      <CardContent className="p-6">
        <Skeleton className="h-6 w-64 bg-white/20" />
        <Skeleton className="mt-2 h-4 w-16 bg-white/20" />
      </CardContent>
    </Card>
  );
}

export function QuestFilterSkeleton() {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <Skeleton key={i} className="h-8 w-20 rounded-full" />
      ))}
    </div>
  );
}

export function QuestSectionsSkeleton() {
  return (
    <Card shadow="none" className="bg_canvas_primary">
      <CardContent className="p-8">
        <Skeleton className="h-5 w-40 mb-4" />
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="shadow-none">
              <div className="flex items-center gap-6 p-4">
                <div className="flex flex-col gap-2 shrink-0 px-4 py-2">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-36" />
                </div>
                <Skeleton className="size-5 rounded-full" />
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function IQuestSidebarSkeleton() {
  return (
    <>
      <div className="px-4 py-6 rounded-2xl flex flex-col gap-4">
        <Skeleton className="h-5 w-28" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-3 w-full rounded-full" />
        </div>
      </div>

      <Card shadow="none" className="bg_canvas_primary">
        <CardContent className="p-6">
          <Skeleton className="h-5 w-36 mb-4" />
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3">
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
