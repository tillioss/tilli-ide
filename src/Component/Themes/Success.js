import React from 'react';

class Success extends React.Component
{

constructor(props)
{
    super(props);
    this.state={}

}
render(){

    const { LevelStage,found_index,Contentdata,index_1 } = this.props;

    let arrayvalue = [];

    arrayvalue.push(
      <React.Fragment>
        <div className="col-sm-4 marginspace"  >
          <input type={'text'}  className={'form-control'}  placeholder={'bColor'} style={{ width: '100%' }} value={LevelStage[found_index].content.title.bColor}
            onChange={(e) => {

              Contentdata[index_1].content.title.bColor = e.target.value
              this.setState({ LevelStage,Contentdata })
            }} />
        </div>
        <div className="col-sm-4 marginspace">
          <input type={'text'}  className={'form-control'}  placeholder={'Color'} style={{ width: '100%' }} value={LevelStage[found_index].content.title.style[0].color}
            onChange={(e) => {
              Contentdata[index_1].content.title.style[0].color = e.target.value
              this.setState({ LevelStage,Contentdata })
            }} />
        </div>

        <div className="col-sm-4 marginspace">
          <input type={'text'}  className={'form-control'}  placeholder={'Value'} style={{ width: '100%' }} value={LevelStage[found_index].content.title.value}
            onChange={(e) => {
              Contentdata[index_1].content.title.value = e.target.value
              this.setState({ LevelStage,Contentdata })
            }} />

        </div>

        <div className="col-sm-4 marginspace">
          <input type={'text'}  className={'form-control'}  placeholder={'bColor'} style={{ width: '100%' }} value={LevelStage[found_index].content.message.bColor}
            onChange={(e) => {
              Contentdata[index_1].content.message.bColor = e.target.value
              this.setState({ LevelStage,Contentdata })

            }} />
        </div>
        <div className="col-sm-4 marginspace">
          <input type={'text'}  className={'form-control'}  placeholder={'Color'} style={{ width: '100%' }} value={LevelStage[found_index].content.message.style[0].color}
            onChange={(e) => {
              Contentdata[index_1].content.message.style[0].color = e.target.value
              this.setState({ LevelStage,Contentdata })
            }} />
        </div>

        <div className="col-sm-4 marginspace">
          <input type={'text'}  className={'form-control'}  placeholder={'Value'} style={{ width: '100%' }} value={LevelStage[found_index].content.message.value}
            onChange={(e) => {
              Contentdata[index_1].content.message.value = e.target.value
              this.setState({ LevelStage,Contentdata })
            }} />

        </div>

      </React.Fragment>
    )


    return(<div>{arrayvalue}</div>) 
}


}


export default Success