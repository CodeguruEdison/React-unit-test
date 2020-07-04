import React from 'react';
import {createContainer,field,findOptions,labelFor} from './domManipulators';
import AppointmentForm from '../AppointmentForm';
import { start } from 'repl';
describe("AppointmentForm",()=>{
    let render:any, container:HTMLDivElement,form:any

    const timeSlotTable = () => container.querySelector('table#time-slot');
    const startsAtField = (index:number) =>{
        //return container.querySelectorAll(`input[name="startsAt"]`)[index] as HTMLInputElement
        return container.querySelectorAll(`input[name="startsAt"]`)[
            index
          ] as HTMLInputElement;
    }
    const itRendersAsSelectBox =(comp:any,formName:string,elementName:string)=>{
        it('renders as a select box',()=>{
            render(comp);
            const elemnt = field(form(formName),elementName);
            expect(elemnt).not.toBeNull();
            expect((elemnt as HTMLElement).tagName).toEqual('SELECT');
        })
       
    }
    const itRenderAsLabel = ( comp:any,labelCtrlName:string,textContent:string) =>{
        it('render as a label',()=>{
         render(comp);
         expect(labelFor(container,labelCtrlName)).not.toBeNull();
         expect(labelFor(container,labelCtrlName)?.textContent).toEqual(textContent);
        });
     }
     const itAssignsAnIdThatMatchesTheLabelId= (comp:any, id:string) =>{
        it('id matches with label id',()=>{
            render(comp);
            const elem:HTMLInputElement  = (field(form('appointment'),id) as HTMLInputElement);
            expect(elem.id).toEqual(id);
           // expect(firstNameField().id).toEqual('firstName');
        })
    }  
   
    beforeEach(() => {
        ({ render, container } = createContainer());
         form = (id:any) => container.querySelector(`form[id="${id}"]`) as HTMLFormElement;
      });
    

    it('renders a form',()=>{
        render(<AppointmentForm/>)
        const formfound =form('appointment');
       // console.log(formfound);
       // expect(form('appointment')).not.toBeNull();
        expect(form('appointment')).not.toBeNull();
    })
    describe('service field',()=>{
        itRendersAsSelectBox(<AppointmentForm/>,'appointment','service')

        it('initially has a blank value choosen',()=>{
            render(<AppointmentForm/>);
            const selectElemnt = field(form('appointment'),'service') as HTMLSelectElement;
            //console.log(selectElemnt);
            const firstItem = selectElemnt.firstChild as HTMLOptionElement;
            expect(firstItem.value).toEqual('');
        })

        it('list all salon properties',()=>{
            const selectableServices = [
                'Cut',
                'Blow-dry',
                'Cut & color',
                'Beard trim',
                'Cut & beard trim',
                'Extensions' ];

                render(<AppointmentForm selectableServices={selectableServices} />);
                const selectElemnt = field(form('appointment'),'service') as HTMLSelectElement;
                const optionsNodes = Array.from(selectElemnt.childNodes);
                const renderedService =  optionsNodes.map(node=>node.textContent);
                expect(renderedService).toEqual(expect.arrayContaining(selectableServices));
            
        })
        it('pre-select the existing value',()=>{
            const services =['Cut','Blow-dry'];
            render(<AppointmentForm selectableServices={services} service="Blow-dry"></AppointmentForm>);
            const selectElemnt = field(form('appointment'),'service') as HTMLSelectElement;
            const option =findOptions( selectElemnt,'Blow-dry') as HTMLOptionElement;
            expect(option.selected).toBeTruthy();
        })
        
        itRenderAsLabel(<AppointmentForm/>,'service','Service');
        itAssignsAnIdThatMatchesTheLabelId(<AppointmentForm/>,'service');
    })

    describe('time slot table',()=>{
        it('renders a table for time slot',()=>{
            render(<AppointmentForm/>)
            expect(container.querySelector('table#time-slot')).not.toBeNull();
        });
    })

    it('renders a time slot for every half hour between open and close time',()=>{
        render(<AppointmentForm salonOpenAt={9} salonCloseAt={19} />)
        const timesOfDay = timeSlotTable()?.querySelectorAll(
            'tbody >* th'
          );
       // console.log(timesOfDay);
        expect(timesOfDay).toHaveLength(20);
        const arrayList = Array.from(timesOfDay!);
        expect(arrayList[0].textContent).toEqual('09:00');
        expect(arrayList[1].textContent).toEqual('09:30');
        expect(arrayList[3].textContent).toEqual('10:30');

      
    })
    it('renders an empty cell at the start of the header row',()=>{
        render(<AppointmentForm/>)
        const headerRow = timeSlotTable()?.querySelector('thead > tr');
        expect(headerRow?.firstChild?.textContent).toEqual('');
    })
    it('renders a week of available  date',()=>{
        const today = new Date(2018, 11, 1);
        render(<AppointmentForm today = {today} />)
        const dates = timeSlotTable()?.querySelectorAll('thead >* th:not(:first-child)');
         expect(dates).toHaveLength(7);




    })
    it('renders a radio button  for each time slot',()=>{
        const today = new Date();
        const availableTimeSlots =[
            {startsAt:today.setHours(9,0,0,0)},
            {startsAt:today.setHours(9,30,0,0)}
        ];
        render(<AppointmentForm availableTimeSlots={availableTimeSlots} today={today}/>)
        const cells = timeSlotTable()!.querySelectorAll('td');
        const firstCell = cells[0] as HTMLTableDataCellElement;
        expect(firstCell.querySelector('input[type="radio"]')).not.toBeNull();
        expect(cells[7].querySelectorAll('input[type="radio"]')).not.toBeNull();
    })

    it('does not render radio button for unavilable time slots',()=>{
        render(<AppointmentForm availableTimeSlots={[]}/>);
        const timesofDay = timeSlotTable()?.querySelectorAll('input');
        expect(timesofDay).toHaveLength(0);
    })
    it('sets radio button values to the index of the corresponding appointment', () => {
        const today = new Date();
        const availableTimeSlots = [
          { startsAt: today.setHours(9, 0, 0, 0) },
          { startsAt: today.setHours(9, 30, 0, 0) }
        ];
        render(
          <AppointmentForm
            availableTimeSlots={availableTimeSlots}
            today={today}
          />);
        expect(startsAtField(0).value).toEqual(
          availableTimeSlots[0].startsAt.toString()
        );
        expect(startsAtField(1).value).toEqual(
          availableTimeSlots[1].startsAt.toString()
        );
      });

})