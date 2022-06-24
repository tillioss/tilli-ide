import React from 'react';
import Select from 'react-select';


export default (props) => {
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