
import React from 'react';
import ReactDOM from 'react-dom'

import AppointmentsDayView from '../AppointmentsDayView';
import { exception } from 'console';
import ReactTestUtils from 'react-dom/test-utils'; 

let container:HTMLDivElement;

beforeEach(()=>{
     container = document.createElement('div');
})
const render = (component:any) => ReactDOM.render(component, container);
const today = new Date();
const appointments = [
    {
        startsAt:today.setHours(12,0),
        customer:{firstName:'Ashley'}
    },
    {
        startsAt:today.setHours(13,0),
        customer:{firstName:'Jordan'}
    }
];
describe("AppointmentsDayView",()=>{
    // const today = new Date();
    // const appointments = [
    //   { startsAt: today.setHours(12, 0) },
    //   { startsAt: today.setHours(13, 0) }
    // ];
    it('renders a div with right id',()=>{
        render(<AppointmentsDayView appointments={appointments} />);
        expect(container.querySelector('div#appointmentsDayView')).not.toBeNull();
        expect(container.querySelector('ol')).not.toBeNull();
        expect(container.querySelector('ol')?.children).toHaveLength(2);
    })
   
})
describe('AppointmentsDayView Render',()=>{
   
    it('renders each appointment in li',() => {
        
        render(<AppointmentsDayView appointments={appointments} />);
        expect(container.querySelectorAll('li')).toHaveLength(2);
        expect(container.querySelectorAll('li')[0].textContent).toEqual('12:00');
        expect(container.querySelectorAll('li')[1].textContent).toEqual('13:00');
    })
    it('it initially  shows a message  saying there are no appointments today',()=>{
        render(<AppointmentsDayView appointments={[]}/>);
        expect(container.textContent).toMatch('There are no appointments scheduled for today')
    })
    it('select  the first appointment by default',()=>{
        render(<AppointmentsDayView appointments={appointments}/>);
        expect(container.textContent).toMatch('Ashley')
    })
    it('has a button element in each li',()=>{
        render(<AppointmentsDayView appointments={appointments}/>);
        expect(container.querySelectorAll('li > button')).toHaveLength(2);
        //console.log(container.querySelectorAll('li > button')[0].nodeType);
        expect(container.querySelectorAll('li > button')[0].tagName).toEqual('BUTTON');
    })
    it('renders  another component when selected',()=>{
        render(<AppointmentsDayView appointments={appointments}/>);
        const button = container.querySelectorAll('button')[1];
        ReactTestUtils.Simulate.click(button);
        expect(container.textContent).toMatch('Jordan');
    })
})