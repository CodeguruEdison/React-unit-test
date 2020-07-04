import React, { FC } from 'react'

export interface IRadioButtonIfAvailable {
    availableTimeSlots?:any[],
    date:any,
    timeSlot:any
    checkedTimeSlot?:any
    //startsAt?:any

}

const RadioButtonIfAvailable:FC<IRadioButtonIfAvailable> = (props) => {
    const {
        availableTimeSlots,
        date,
        timeSlot,
        checkedTimeSlot
       // startsAt
      } = props;

     
    const mergeDateAndTime = (date:Date,timeSlot:any) => {
        const time = new Date(timeSlot);
        return new Date(date).setHours(time.getHours(),time.getMinutes(),time.getSeconds(),time.getMilliseconds());

     };
    const startsAt = mergeDateAndTime(date, timeSlot);
    const isChecked = startsAt === checkedTimeSlot;
    //const isChecked = startsAt === checkedTimeSlot;
    if (
        availableTimeSlots && availableTimeSlots.some((availableTimeSlot:any) =>
        availableTimeSlot.startsAt === startsAt
      )
    ) {
      return (
        <input
          name="startsAt"
          type="radio"
          value={startsAt}
          checked={isChecked}
          readOnly
        />);
    }
    return null;
};

export default RadioButtonIfAvailable
