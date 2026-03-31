/** Vertical timeline connecting MilestoneCards with a colored connector line */

import MilestoneCard from './MilestoneCard';
import type { OnboardingMilestone } from '../types';

interface MilestoneTimelineProps {
  milestones: OnboardingMilestone[];
  isClaiming: boolean;
  onClaim: (questId: string) => void;
}

const CONNECTOR_COLOR: Record<OnboardingMilestone['status'], string> = {
  done:   'bg_accent_primary',
  active: 'bg_primary',
  locked: 'bg_canvas_tertiary',
};

export default function MilestoneTimeline({ milestones, isClaiming, onClaim }: MilestoneTimelineProps) {
  return (
    <div className="flex flex-col gap-0">
      {milestones.map((milestone, index) => (
        <div key={milestone.id} className="flex gap-3">
          {/* Left: connector track */}
          <div className="flex flex-col items-center w-4 shrink-0">
            {/* Top segment — connects FROM previous card */}
            <div
              className={`w-0.5 flex-1 min-h-4 ${
                index === 0 ? 'opacity-0' : CONNECTOR_COLOR[milestones[index - 1].status]
              }`}
            />
            {/* Bottom segment — connects TO next card */}
            <div
              className={`w-0.5 flex-1 min-h-4 ${
                index === milestones.length - 1 ? 'opacity-0' : CONNECTOR_COLOR[milestone.status]
              }`}
            />
          </div>

          {/* Right: card */}
          <div className="flex-1 pb-4">
            <MilestoneCard
              milestone={milestone}
              index={index}
              isClaiming={isClaiming}
              onClaim={onClaim}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
