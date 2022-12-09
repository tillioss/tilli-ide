import React from 'react';
import CloseImage from "../../../src/images/close.png";
import DropDown from "../../Component/DropDown";



class IntroducePersons extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}

  }
  render() {

    const { LevelStage, OptionSelect, Contentdata, index_1, option, editable } = this.props;


    let arrayvalue = []

    Contentdata[index_1].content.persons.map((ival, index) => {

      arrayvalue.push(
        <React.Fragment>


          <div className="col-sm-2 marginspace">
            <input type={'text'} className={'form-control'} placeholder={'Person name'} style={{ width: '100%' }} value={ival.name}
              onChange={(e) => {
                Contentdata[index_1].content.persons[index].name = e.target.value;
                this.setState({ LevelStage, Contentdata })
              }} />
            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{ival.error_name}</span>
          </div>


          <div className="col-sm-2 marginspace">
            <input type={'text'} disabled={editable === "false" ? true : false} className={'form-control'} placeholder={'image Bg'} style={{ width: '100%' }} value={ival.imageBg}
              onChange={(e) => {
                if (editable !== "false") {
                  Contentdata[index_1].content.persons[index].imageBg = e.target.value;
                  this.setState({ LevelStage, Contentdata })
                }
              }} />
            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{ival.error_imageBg}</span>

          </div>

          <div className="col-sm-2 marginspace">
            <input type={'text'} disabled={editable === "false" ? true : false} className={'form-control'} placeholder={'Background color'} style={{ width: '100%' }} value={ival.bg}
              onChange={(e) => {
                if (editable !== "false") {
                  Contentdata[index_1].content.persons[index].bg = e.target.value;
                  this.setState({ LevelStage, Contentdata })
                }
              }} />
            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{ival.error_bg}</span>
          </div>

          <div className="col-sm-2 marginspace">
            <input type={'text'} className={'form-control'} placeholder={'says'} style={{ width: '100%' }} value={ival.says}
              onChange={(e) => {
                Contentdata[index_1].content.persons[index].says = e.target.value;
                this.setState({ LevelStage, Contentdata })
              }} />
            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{ival.error_says}</span>
          </div>

          <div className="col-sm-2 marginspace">
            <DropDown
              selectedOption={Contentdata[index_1].content.persons[index].image ?
                { label: Contentdata[index_1].content.persons[index].image.title, value: Contentdata[index_1].content.persons[index].image.title }
                : { label: 'Select', value: 'Select' }}
              onChange={(e) => {
                if (editable !== "false") {

                  OptionSelect[index_1] = e
                  Contentdata[index_1].content.persons[index].image = e.json;

                  this.setState({ Contentdata, OptionSelect })

                }

              }}
              options={option}
              isDisabled={editable === "false" ? true : false}
            />
            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{ival.error_image}</span>

          </div>

          <div className="col-sm-2 marginspace" onClick={() => {
            if (editable !== "false") {

              delete Contentdata[index_1].content.persons[index]
              this.setState({ LevelStage, Contentdata })

            }

          }}>
            {editable !== "false" ? <img src={CloseImage} style={{ width: 30, height: 30 }} alt="loading" /> : null}

          </div>

        </React.Fragment>)

      return true
    })

    return (<div className="row">{arrayvalue}</div>)
  }


}


export default IntroducePersons