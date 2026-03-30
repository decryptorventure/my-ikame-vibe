import { Card, CardContent, Skeleton } from '@frontend-team/ui-kit';

export function ProfileHeaderSkeleton() {
  return (
    <Card shadow="none" className="bg_canvas_primary">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <Skeleton className="size-16 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function ProfileStatsSkeleton() {
  return (
    <div>
      <Skeleton className="h-5 w-20 mb-3" />
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} shadow="none" className="bg_canvas_primary">
            <CardContent className="p-4 flex flex-col gap-2">
              <Skeleton className="size-8" />
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-3 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function AchievementListSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {[1, 2, 3].map((i) => (
        <Card key={i} shadow="none" className="bg_canvas_primary">
          <CardContent className="p-4 flex items-center gap-4">
            <Skeleton className="size-10 rounded-lg" />
            <div className="flex-1 flex flex-col gap-1.5">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-48" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function OngoingQuestListSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {[1, 2, 3].map((i) => (
        <Card key={i} shadow="none" className="bg_canvas_primary">
          <CardContent className="p-4 flex flex-col gap-2">
            <Skeleton className="size-10 rounded-lg" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-40" />
            <Skeleton className="h-2 w-full rounded-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
