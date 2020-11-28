import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../../client/src/components/App';
import DateSelection from '../../client/src/components/DateSelection';
import CheckingDropDown from '../../client/src/components/CheckingDropDown';
import styles from '../../client/src/components/App.css';

configure({ adapter: new Adapter() });

describe('<App />', () => {
  it('Renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(DateSelection)).toHaveLength(1);
    expect(wrapper.find(`.${styles.mainContainer}`)).toHaveLength(1);
  });
  it('Successfully accessed the API', () => {
    const wrapper = mount(<App />);
    wrapper.find(DateSelection).simulate('click');
    expect(wrapper.find(CheckingDropDown)).toHaveLength(1);
  });
});
