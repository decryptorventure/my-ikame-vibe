import { SegmentedControl } from '@frontend-team/ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { setPersona, resetDemo, DemoPersona } from '@/state/slices/demoSlice';

export default function DemoPersonaCard() {
  const dispatch = useDispatch();
  const currentPersona = useSelector((state: RootState) => state.demo.persona);

  const options = [
    { value: 'newcomer', label: 'Newcomer' },
    { value: 'member', label: 'Member' },
    { value: 'manager', label: 'Manager' },
    { value: 'admin', label: 'Admin' },
  ];

  return (
    <div className="flex flex-col gap-2 p-2 min-w-0 overflow-hidden group-hover:block transition-all duration-300">
      <SegmentedControl
        options={options}
        value={currentPersona}
        onValueChange={(val) => dispatch(setPersona(val as DemoPersona))}
        size="s"
      />

      <button 
        type="button"
        className="text-[10px] font-bold text_brand_primary uppercase tracking-wider opacity-60 hover:opacity-100 cursor-pointer text-center py-1"
        onClick={() => dispatch(resetDemo())}
      >
        Reset dữ liệu demo
      </button>
    </div>
  );
}
