import { Card, CardContent, Skeleton } from '@frontend-team/ui-kit';

export function WelcomeCardSkeleton() {
  return (
    <Card shadow="none" className="overflow-hidden bg_violet_medium">
      <CardContent className="flex items-center justify-between p-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-52 opacity-20" />
          <Skeleton className="h-4 w-72 opacity-20" />
        </div>
        <Skeleton className="h-24 w-24 radius_round opacity-20" />
      </CardContent>
    </Card>
  );
}

export function QuestListSkeleton() {
  return (
    <Card shadow="none" className="bg_canvas_primary">
      <CardContent className="p-8">
        <div className="mb-4 flex items-center justify-between">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} shadow="none">
              <div className="flex items-center gap-6 p-4">
                <div className="flex flex-col gap-2 shrink-0 px-4 py-2">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-36" />
                </div>
                <Skeleton className="size-5 radius_round" />
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function PostFeedSkeleton() {
  return (
    <Card shadow="none" className="overflow-hidden bg_canvas_primary">
      <CardContent className="px-6 pt-6 pb-2">
        <Skeleton className="h-5 w-44" />
      </CardContent>
      <div className="flex flex-col">
        {[1, 2].map((i) => (
          <div key={i} className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Skeleton className="size-8 radius_round" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    </Card>
  );
}

export function SidebarSkeleton() {
  return (
    <>
      <div className="px-4 py-6 radius_16 flex flex-col gap-4">
        <Skeleton className="h-5 w-28" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-3 w-full radius_round" />
        </div>
      </div>

      <Card shadow="none" className="bg_canvas_primary">
        <CardContent className="p-6">
          <Skeleton className="h-5 w-36 mb-4" />
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="size-5 radius_round" />
                <Skeleton className="size-8 radius_round" />
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-12" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card shadow="none" className="bg_canvas_primary">
        <CardContent className="p-6">
          <Skeleton className="h-5 w-28 mb-4" />
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 w-full radius_8" />
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

