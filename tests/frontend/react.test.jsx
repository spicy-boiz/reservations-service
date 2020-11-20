import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../../client/src/components/App.jsx';
import Calendar from '../../client/src/components/Calendar.jsx';
import CalendarDates from '../../client/src/components/CalendarDates.jsx';
import DateSelection from '../../client/src/components/DateSelection.jsx';
import CheckingDropDown from '../../client/src/components/CheckingDropDown.jsx';
import GuestsDropDown from '../../client/src/components/GuestsDropDown.jsx';
import Fees from '../../client/src/components/Fees.jsx';
import { guestDropdown } from '../../client/src/components/Fees.css'

configure({adapter: new Adapter()});
describe('<App />', () => {
  it('Renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(DateSelection)).toHaveLength(1);
  });
});
describe('<Calendar />', () => {
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
describe('<CheckingDropDown />', () => {
  it('Renders without crashing', () => {
    const wrapper = shallow(<CheckingDropDown />);
    expect(wrapper.find(Calendar)).toHaveLength(1);
  });
});
xdescribe('<DateSelection />', () => {
  it('Renders without crashing', () => {
    const wrapper = render(<DateSelection />);
    expect(wrapper.find(<div/>)).toHaveLength(6);
  });
});
xdescribe('<Fees />', () => {
  it('Renders without crashing', () => {
    const wrapper = render(<Fees />);
    expect(wrapper.find(<div/>)).toHaveLength(1);
  });
});
xdescribe('<GuestsDropDown />', () => {
  it('Renders without crashing', () => {
    const wrapper = shallow(<GuestsDropDown />);
    expect(wrapper.find(guestDropdown)).toHaveLength(3);
  });
});
