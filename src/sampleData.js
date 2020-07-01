const today = new Date();

const at = hours => today.setHours(hours, 0);

export const sampleAppointments = [
  { startsAt: at(9,0), customer: { firstName: 'Charlie',lastName: 'Charlie1'} },
  { startsAt: at(10,0), customer: { firstName: 'Frankie' ,lastName: 'Charlie1'} },
  { startsAt: at(11,0), customer: { firstName: 'Casey' ,lastName: 'Charlie1'} },
  { startsAt: at(12,0), customer: { firstName: 'Ashley',lastName: 'Charlie1' } },
  { startsAt: at(13,0), customer: { firstName: 'Jordan',lastName: 'Charlie1' } },
  { startsAt: at(14,0), customer: { firstName: 'Jay',lastName: 'Charlie1' } },
  { startsAt: at(15,0), customer: { firstName: 'Alex',lastName: 'Charlie1' } },
  { startsAt: at(16,0), customer: { firstName: 'Jules',lastName: 'Charlie1' } },
  { startsAt: at(17,0), customer: { firstName: 'Stevie',lastName: 'Charlie1' } }
];