import { Link } from 'react-router-dom';
import { Card, Progress } from '@frontend-team/ui-kit';
import { ROUTES } from '@/constants';
import frameImg from '@/assets/frame.png';
import type { OngoingQuest } from '../types';

interface OngoingQuestListProps {
  quests: OngoingQuest[];
}

export default function OngoingQuestList({ quests }: OngoingQuestListProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-semibold text_primary">Đang thực hiện</h3>

      <div className="flex flex-col gap-3">
        {quests.map((quest) => (
          <Card key={quest.id} shadow="none" className="border_primary">
            <div className="flex items-center gap-4 p-4">
              <img
                src={quest.badgeUrl ?? frameImg}
                alt=""
                className="size-14 shrink-0 rounded-lg object-cover"
              />

              <div className="flex flex-1 flex-col gap-1.5">
                <span className="text-sm font-semibold text_primary">{quest.title}</span>
                <div className="w-40">
                  <Progress
                    value={quest.current}
                    max={quest.total}
                    size="lg"
                    showLabel
                    label={`${quest.current}/${quest.total}`}
                    variant="success"
                  />
                </div>
                <p className="text-xs text_secondary">{quest.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Link to={ROUTES.IQUEST} className="text-sm fg_info font-medium hover:underline">
          Xem tất cả
        </Link>
      </div>
    </div>
  );
}
