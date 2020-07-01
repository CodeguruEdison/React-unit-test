import React from 'react';
import ReactDOM from 'react-dom';
import {cleanup} from '@testing-library/react';
import renderer from 'react-test-renderer';
import  Appointment from '../Appointment';
import { exception } from 'console';

let customer:any;
let container:any;

beforeEach(()=>{
     container =  document.createElement('div');
})
const render = (component:any) => ReactDOM.render(component, container);
const appointmentTable = () => {
    return container.querySelectorAll('#appointmentView>table');
};
describe('Appointment',()=>{
    it('renders the customer first name',()=>{
        customer = {firstName:'Jordan'}
       // const component = <Appointment customer={customer} />
       // document.body.appendChild(container);
        render(<Appointment customer={customer} />)
        expect(container.textContent).toMatch('Jordan');
    });
    it('renders a table ',()=>{
        render(<Appointment customer={customer} />)
        expect(appointmentTable()).not.toBeNull();
    })
    it('renders the customer first name', () => {
        customer = { firstName: 'Ashley' };
        render(<Appointment customer={customer} />);
        console.log(appointmentTable());
        expect(container.textContent).toMatch('Ashley');
      });
    it(' renders  the customer lastName',()=>{
        customer = {firstName:'Ashley',lastName:'Jones'}
        render(<Appointment customer={customer} />)
        expect(container.textContent).toMatch('Jones');
    })
    it(' renders  the customer telephone',()=>{
        customer = {firstName:'Ashley',lastName:'Jones',phoneNumber:'7324292042as'}
        render(<Appointment customer={customer} />)
        expect(container.textContent).toMatch('7324292042as');
    })
});