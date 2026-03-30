import { Card, CardContent } from '@frontend-team/ui-kit';
import birthdayImg from '@/assets/birthday.svg';

export default function WelcomeCard({ userName }: { userName: string }) {
  return (
    <Card shadow="none" className="overflow-hidden bg_violet_medium">
      <CardContent className="flex items-center justify-between p-6">
        <div className="flex flex-col gap-2">
          <h2 className="body_xl font_semibold fg_on_accent">
            👋 Chào mừng {userName} tới iKame
          </h2>
          <p className="body_s tracking-[0.14px] fg_on_accent">
            Hãy hoàn thành các nhiệm vụ để nhận thưởng nhé.
          </p>
        </div>
        <img
          src={birthdayImg}
          alt="birthday"
          className="h-24 w-auto object-contain"
        />
      </CardContent>
    </Card>
  );
}
