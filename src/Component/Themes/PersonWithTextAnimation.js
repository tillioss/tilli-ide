import React from 'react';
import DropDown from '../DropDown'
import MyConstant from "../../config/MyConstant";

class PersonWithTextAnimation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}

  }
  render() {

    const { LevelStage, dummyOptionSelect, index_1, option, Contentdata } = this.props;

    let arrayvalue = []


    arrayvalue.push(
      <React.Fragment>
        <div className="col-sm-1 text-ali-left" style={{ marginTop: 20, marginBottom: 20 }}>Image </div>
        <div className="col-sm-5" style={{ marginTop: 20, marginBottom: 20 }}>
          <DropDown
            selectedOption={Contentdata[index_1].content.image ?
              { label: Contentdata[index_1].content.image.title, value: Contentdata[index_1].content.image.title }
              : { label: 'Select', value: 'Select' }}
            onChange={(e) => {

              Contentdata[index_1].content.image = e.json;
              console.log(Contentdata[index_1].content.image)

              this.setState({ dummyOptionSelect, Contentdata })
            }}
            options={option}
          />

        </div>
        <div className="col-sm-2" style={{ marginTop: 20, marginBottom: 20, top: -30 }}>

          {Contentdata[index_1].content.image.fileName ?

            <img style={{ width: '100%', height: 100 }}
              src={MyConstant.keyList.apiURL + "vp?action=module&key=" + Contentdata[index_1].content.image.fileName + "&id=" +
                Contentdata[index_1].content.image.fileType}
              alt={'loading'} class="img-responsive" />

            : null}
        </div>

        <div className="col-sm-4"> </div>

      </React.Fragment>
    )



    Contentdata[index_1].content.text.map(((ival, index) => {

      arrayvalue.push(<React.Fragment>
        <div className="col-sm-6 marginspace">
          <input type={'text'} className={'form-control'} placeholder={'Value'} style={{ width: '100%' }} value={ival.value}
            onChange={(e) => {
              Contentdata[index_1].content.text[index].value = e.target.value
              this.setState({ LevelStage, Contentdata })
            }} />
        </div>

        <div className="col-sm-6 marginspace">
          <input type={'text'} className={'form-control'} placeholder={'Color'} style={{ width: '100%' }} value={ival.style.color}
            onChange={(e) => {
              Contentdata[index_1].content.text[index].style.color = e.target.value
              this.setState({ LevelStage, index_1 })
            }} />
        </div>

      </React.Fragment>)
      return true
    }))

    return (<React.Fragment>
      {arrayvalue}
    </React.Fragment>)
  }


}


export default PersonWithTextAnimation