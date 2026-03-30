import { Card, CardContent, Badge, Progress } from '@frontend-team/ui-kit';
import { UsersIcon, ChartBarIcon, WarningIcon } from '@phosphor-icons/react';

export function ManagerInsightView() {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg_canvas_secondary border_primary border rounded-2xl p-6">
        <h3 className="text-lg font-bold text_primary mb-2 flex items-center gap-2">
          <UsersIcon size={24} weight="bold" /> Team Engagement Dashboard
        </h3>
        <p className="text-sm text_secondary">Nắm bắt tình hình gắn kết của team bạn trong tuần này.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card shadow="none" className="border_primary">
          <CardContent className="p-4 flex flex-col gap-3">
            <span className="text-xs font-semibold text_tertiary uppercase tracking-wider">TEAM ENGAGEMENT SCORE</span>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text_primary">8.5/10</span>
              <Badge variant="success">
                +12% vs last week
              </Badge>
            </div>
            <Progress value={85} max={100} size="sm" variant="success" />
          </CardContent>
        </Card>

        <Card shadow="none" className="border_primary">
          <CardContent className="p-4 flex flex-col gap-3">
            <span className="text-xs font-semibold text_tertiary uppercase tracking-wider">DISENGAGEMENT ALERTS</span>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text_error">2 Personnel</span>
              <WarningIcon size={20} className="text_error" weight="fill" />
            </div>
            <p className="text-[10px] text_tertiary">Sụt giảm tương tác {'>'} 30% trong 3 ngày qua</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function AdminAnalyticsView() {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg_canvas_secondary border_primary border rounded-2xl p-6">
        <h3 className="text-lg font-bold text_primary mb-2 flex items-center gap-2">
          <ChartBarIcon size={24} weight="bold" /> P&OD Company Analytics
        </h3>
        <p className="text-sm text_secondary">Dữ liệu phân tích engagement và sentiment toàn hệ thống.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'MAU', value: '94%', change: '+5%' },
          { label: 'AVG KUDOS', value: '12.4', change: '+2.1' },
          { label: 'SENTIMENT', value: 'Positive', change: 'Stable' },
        ].map((stat) => (
          <Card key={stat.label} shadow="none" className="border_primary">
            <CardContent className="p-4 flex flex-col gap-1">
              <span className="text-[10px] font-bold text_tertiary uppercase tracking-tighter">{stat.label}</span>
              <span className="text-xl font-bold text_primary">{stat.value}</span>
              <span className="text-[10px] text_success">{stat.change}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
