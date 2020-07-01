import React,{useState} from "react";
import Appointment from "./Appointment";

export const AppointmentsDayView = (props: any) => {
  const { appointments } = props;
  const appointmentTimeOfDay = (startsAt: any) => {
     // console.log(startsAt);
    const [h, m] = new Date(startsAt).toTimeString().split(":");
    return `${h}:${m}`;
  };
  const [selectedAppointment,setselectedAppointment] = useState(0);


  return (
    <div id="appointmentsDayView">
      <ol>
        {appointments.map((appointment: any, idx: number) => (
          <li key={idx}>
            <button type="button" onClick={()=>setselectedAppointment(idx)}>
                {appointmentTimeOfDay(appointment.startsAt)}
            </button>
          </li>
        ))}
      </ol>
      {appointments && appointments.length === 0 ?
         (<p>There are no appointments scheduled for today</p>) : 
         (<Appointment  {...appointments[selectedAppointment]}></Appointment>)}
    </div>
  );
};
export default AppointmentsDayView;
