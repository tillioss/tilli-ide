import React from 'react';
import Select from 'react-select';


const DropDown = (props) => {
  return (
    <Select
      value={props.selectedOption}
      onChange={props.onChange}
      options={props.options}
      isDisabled={props.isDisabled ? true : false}
      isMulti={props.isMulti ? props.isMulti : false}
    />
  )

}
export default DropDown

