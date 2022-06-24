import React from 'react';
import CloseImage from "../../../src/images/close.png";



class ChooseCheckboxQuestions extends React.Component
{
constructor(props)
{
    super(props);
    this.state={}

}

render()
{

    const {LevelStage,found_index,Contentdata,index_1,editable}=this.props

    let arrayvalue = []
    arrayvalue.push(
      <React.Fragment>




        <div className="row">
          <div className="col-sm-3 ">
            <input type={'text'}  disabled={editable =="false" ? true : false } className={'form-control'}  placeholder={'Box'} style={{ width: '100%' }} value={Contentdata[index_1].content.colors.box}
              onChange={(e) => {
                Contentdata[index_1].content.colors.box = e.target.value;
                this.setState({ LevelStage,Contentdata })
              }} />
          </div>

          <div className="col-sm-3 ">
            <input type={'text'}  disabled={editable =="false" ? true : false } className={'form-control'}  placeholder={'Checked'} style={{ width: '100%' }} value={Contentdata[index_1].content.colors.checked}
              onChange={(e) => {
                Contentdata[index_1].content.colors.checked = e.target.value;
                this.setState({ LevelStage,Contentdata })
              }} />
          </div>


          <div className="col-sm-3 ">
            <input type={'text'}  disabled={editable =="false" ? true : false } className={'form-control'}  placeholder={'Text'} style={{ width: '100%' }} value={Contentdata[index_1].content.colors.text}
              onChange={(e) => {
                Contentdata[index_1].content.colors.text = e.target.value;
                this.setState({ LevelStage,Contentdata })
              }} />
          </div>

          <div className="col-sm-3 ">
            <input type={'text'}  disabled={editable =="false" ? true : false } className={'form-control'}  placeholder={'UnChecked'} style={{ width: '100%' }} value={Contentdata[index_1].content.colors.unChecked}
              onChange={(e) => {

                Contentdata[index_1].content.colors.unChecked = e.target.value;
                this.setState({ LevelStage,Contentdata })

              }} />
          </div>


        </div>


      </React.Fragment>
    )

    arrayvalue.push(
        <React.Fragment>




        <div className="row form-group ml-0 mb-3" style={{ marginTop: 25,}}>

            <div className="col-sm-3 ">  questionTitle </div>
            <div className="col-sm-7 ">
                <input type={'text'} className={'form-control'} placeholder={'question'} style={{ width: '100%' }}
                       value={Contentdata[index_1].content.questionTitle}
                       onChange={(e) => {
                           Contentdata[index_1].content.questionTitle = e.target.value;
                           this.setState({ Contentdata })

                       }} />
<span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content.error_questionTitle}</span>

            </div>
            <div className="col-sm-2 "/>
        </div>
        </React.Fragment>
    )

    arrayvalue.push(
      <React.Fragment>
        <div className="col-sm-3" style={{ marginTop: 25,}}><h4>Boxes Option</h4> </div>
        <div className="col-sm-5"> </div>
        <div className="col-sm-3" style={{ marginTop: 20 }}>
          {editable !="false" ?
          
          <button type="button" class="btn btn-success " onClick={() => {
            
            const { LevelStage,Contentdata } = this.props;
            Contentdata[index_1].content.checkBoxesOption.push('')
            this.setState({ LevelStage })
          
        }} >Add Check box</button>
          :null}
          

        </div>
        <div className="col-sm-1"> </div>
      </React.Fragment>
    )

    Contentdata[index_1].content.checkBoxesOption.map((ival, index) => {

      arrayvalue.push(
        <React.Fragment>
          <div className="row form-group" style={{width:'100%'}}> 
            <div className="col-sm-7 marginspace">
              <input type={'text'}  className={'form-control'}  placeholder={'Check Boxes Option'} style={{ width: '100%' }} value={ival.content}
                onChange={(e) => {
                  Contentdata[index_1].content.checkBoxesOption[index].content = e.target.value
                  this.setState({ LevelStage })
                }} />
                <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{ival.error_content}</span>
            </div>

            <div className="col-sm-3 marginspace">
              <input type={'text'} disabled={editable =="false" ? true : false } className={'form-control'}  placeholder={'Bg color'} style={{ width: '100%' }} value={ival.bgcolor}
                onChange={(e) => {
                  if(editable !="false")
                  {
                  Contentdata[index_1].content.checkBoxesOption[index].bgcolor = e.target.value
                  this.setState({ LevelStage })
                  }
                }} />
                <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{ival.error_bgcolor}</span>
            </div>


            <div className="col-sm-2 marginspace" onClick={()=>{
               if(editable !="false")
               {
                delete Contentdata[index_1].content.checkBoxesOption[index]
                this.setState({LevelStage})
               }
           
            }} >
              {editable !="false" ?   <img src={CloseImage} style={{width:30,height:30}} /> :null}
            
               </div>
          </div>
        </React.Fragment>
      )

    })

    


    return( <React.Fragment> {arrayvalue} </React.Fragment> )
}

}


export default ChooseCheckboxQuestions