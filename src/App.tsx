import './App.css';
import { DateCalendarMonth } from './components/CalendarMaterial/DateCalendarMonth';
// import FullYearCalendar from './components/Calendar/FullYearCalendar';
// import FullYearCalendarMaterial from './components/CalendarMaterial/FullYearCalendarMaterial';
// import { StepperPage } from './pages/StepperPage';

function App() {
  return (
    <div className='App'>
      {/* <StepperPage /> */}
      {/* <FullYearCalendar /> */}
      {/* <FullYearCalendarMaterial /> */}
      <DateCalendarMonth />
    </div>
  );
}

export default App;
