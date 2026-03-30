import { Link } from 'react-router-dom';
import { Card, CardContent } from '@frontend-team/ui-kit';
import { ROUTES } from '@/constants';
import AnimatedQuestCard from './AnimatedQuestCard';
import type { AnimatedQuest } from '../types';

interface QuestListProps {
  quests: AnimatedQuest[];
  progress: string;
  title: string;
  onExitComplete: (questId: string) => void;
  onEnterComplete: () => void;
  onCompleteQuest: (action: string) => Promise<void>;
}

export default function QuestList({
  quests,
  progress,
  title,
  onExitComplete,
  onEnterComplete,
  onCompleteQuest,
}: QuestListProps) {
  return (
    <Card shadow="none" className="border-0 bg_canvas_primary">
      <CardContent className="p-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text_primary font-semibold">
            {title}{' '}
            <span className="text_secondary font-normal">({progress})</span>
          </h3>
          <Link
            to={ROUTES.IQUEST}
            className="text-sm fg_info font-medium hover:underline"
          >
            Xem tất cả
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {quests.map((quest) => (
            <AnimatedQuestCard
              key={quest.id}
              quest={quest}
              onExitComplete={onExitComplete}
              onEnterComplete={onEnterComplete}
              onCompleteQuest={onCompleteQuest}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
