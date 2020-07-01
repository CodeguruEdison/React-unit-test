import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Appointment from "./Appointment";
import AppointmentsDayView from "./AppointmentsDayView";
import { sampleAppointments } from './sampleData';
function App() {
  const customer: any = { firstName: "Jordan" };
  const today = new Date();
  const appointments = [
    {
        startAt:today.setHours(12,0),
        customer:{firstName:'Ashley'}
    },
    {
        startAt:today.setHours(13,0),
        customer:{firstName:'Jordan'}
    }
];
  return (
    <div className="App">
      <header className="App-header">
        <AppointmentsDayView appointments={sampleAppointments} />
      </header>
    </div>
  );
}

export default App;
