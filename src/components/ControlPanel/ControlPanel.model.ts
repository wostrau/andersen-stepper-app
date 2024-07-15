export type fourSchedules = 'year' | 'month' | 'week' | 'day';

export interface ControlPanelProps {
  yearView: boolean;
  monthView: boolean;
  weekView: boolean;
  dayView: boolean;
  showYearView: () => void;
  showMonthView: () => void;
  showWeekView: () => void;
  showDayView: () => void;
  goNext: (value: fourSchedules) => void;
  goPrev: (value: fourSchedules) => void;
}
