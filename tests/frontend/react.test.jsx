import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../../client/src/components/App';
import Calendar from '../../client/src/components/Calendar';
import CalendarDates from '../../client/src/components/CalendarDates';
import DateSelection from '../../client/src/components/DateSelection';
import CheckingDropDown from '../../client/src/components/CheckingDropDown';
import GuestsDropDown from '../../client/src/components/GuestsDropDown';
import Fees from '../../client/src/components/Fees';
import { guestDropdown } from '../../client/src/components/Fees.css';

configure({ adapter: new Adapter() });
xdescribe('<App />', () => {
  it('Renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(DateSelection)).toHaveLength(1);
  });
});
xdescribe('<Calendar />', () => {
  it('Renders without crashing', () => {
    const wrapper = shallow(<Calendar />);
    expect(wrapper.find(CalendarDates)).toHaveLength(2);
  });
});
xdescribe('<CalendarDates />', () => {
  it('Renders without crashing', () => {
    const wrapper = shallow(<CalendarDates />);
    expect(wrapper.contains(<span />)).toBe(true);
  });
});
xdescribe('<CheckingDropDown />', () => {
  it('Renders without crashing', () => {
    const wrapper = shallow(<CheckingDropDown />);
    expect(wrapper.find(Calendar)).toHaveLength(1);
  });
});
xdescribe('<DateSelection />', () => {
  it('Renders without crashing', () => {
    const wrapper = render(<DateSelection />);
    expect(wrapper.find(<div />)).toHaveLength(6);
  });
});
xdescribe('<Fees />', () => {
  it('Renders without crashing', () => {
    const wrapper = render(<Fees />);
    expect(wrapper.find(<div />)).toHaveLength(1);
  });
});
xdescribe('<GuestsDropDown />', () => {
  it('Renders without crashing', () => {
    const wrapper = shallow(<GuestsDropDown />);
    expect(wrapper.find(guestDropdown)).toHaveLength(3);
  });
});
