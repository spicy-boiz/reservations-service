import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DateSelection from '../../client/src/components/DateSelection';
import styles from '../../client/src/components/DateSelection.css';

configure({ adapter: new Adapter() });

describe('<DateSelection />', () => {
  const mockToggle = jest.fn();
  const dateSelectionProps = {
    checkingDates: [undefined, undefined],
    dropDownCheckingToggle: mockToggle,
  };
  const wrapper = shallow(<DateSelection
    onDropdown={false}
    dateSelectionProps={dateSelectionProps}
  />);
  it('Renders without crashing', () => {
    expect(wrapper.find(`.${styles.checkingContainer}`)).toHaveLength(1);
  });
  it('Toggles the dropdown menu on click', () => {
    wrapper.find(`.${styles.checkingContainer}`).simulate('click');
    expect(mockToggle).toHaveBeenCalled();
  });
});
