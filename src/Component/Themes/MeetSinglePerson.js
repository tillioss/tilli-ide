import React from 'react';
import DropDown from "../DropDown";

import CloseImage from "../../../src/images/close.png";



class MeetSinglePerson extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }

    render() {

        const { LevelStage, found_index,index_1,Contentdata,optionSelect,option,editable } = this.props

        let arrayvalue = []

          if(LevelStage[found_index].theme =="StoryCard")
          {

            //console.log('StoryCard section',Contentdata[index_1].content[0])
           // console.log('optionSelect section',optionSelect)
            


    arrayvalue.push(
      <React.Fragment>
      <div className="row item form-group" style={{width:"100%"}}>
        <div className="col-sm-2 text-ali-left"> Title </div>
        <div className="col-sm-6"> 
        <input type={'text'}  className={'form-control'} value={Contentdata[index_1].content[0].title}  placeholder={'Enter Title'} style={{ width: '100%' }} 
          onChange={(e) => {  
            Contentdata[index_1].content[0].title=e.target.value;
            this.setState({Contentdata})
          }} />
            <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content[0].title_error}</span>
          </div>
          <div className="col-sm-4"> </div>
    
      </div>
      </React.Fragment>
    )


            
            arrayvalue.push(
              <React.Fragment>
                <div className="col-sm-2 text-ali-left" style={{ marginTop: 20, marginBottom: 20 }}>Image </div>
                <div className="col-sm-5" style={{ marginTop: 20, marginBottom: 20 }}>
                  <DropDown
                    selectedOption={optionSelect[index_1] ? optionSelect[index_1] : { label: 'Select', value: 'Select' }}
                    onChange={(e) => {
                      if(editable!="false")
                      {
                        optionSelect[index_1] = e
                        Contentdata[index_1].content[0].content.image = e.json;
                        this.setState({ optionSelect,Contentdata })
                      }
                    }}
                    options={option}
                    isDisabled ={editable =="false" ? true : false }
                  />
      <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content[0].content.image_error}</span>
                </div>
                <div className="col-sm-2" style={{ marginTop: 20, marginBottom: 20, top: -30 }}>
      
                  {optionSelect[index_1] ?
      
                    <img style={{ width: '100%', height: 100 }} src={optionSelect[index_1].value} alt={'No Image'} class="img-responsive" />
      
                    : null}
                </div>
                <div className="col-sm-3"> </div>
              </React.Fragment>
            )



            arrayvalue.push( <React.Fragment>
  
              <div className="col-sm-1">Bg color1 </div>
              <div className="col-sm-3">
              <input type={'text'}  disabled={editable =="false" ? true : false }  className={'form-control'}  placeholder={'Bgcolor1'} style={{ width: '100%' }} 
              value={Contentdata[index_1].content[0].content.color_1}
                            onChange={(e) => {
                              if(editable !="false")
                              {
                              Contentdata[index_1].content[0].content.color_1 = e.target.value
                              this.setState({ Contentdata })
                              }
                            }} />
        <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content[0].content.color_1_error}</span>
                </div>
              
              <div className="col-sm-1">Bg color2 </div>
              <div className="col-sm-3">
              <input type={'text'}   disabled={editable =="false" ? true : false } className={'form-control'}  placeholder={'Bgcolor2'} style={{ width: '100%' }} 
              value={Contentdata[index_1].content[0].content.color_2 }
                            onChange={(e) => {
                              if(editable !="false")
                              {
                              Contentdata[index_1].content[0].content.color_2 = e.target.value
                              this.setState({ Contentdata })
                              }
                            }} />
        <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content[0].content.color_2_error}</span>
                </div>
              
                <div className="col-sm-1">bottomText </div>
                <div className="col-sm-3">
              <input type={'text'}  className={'form-control'}  placeholder={'bottomText'} style={{ width: '100%' }} 
              value={Contentdata[index_1].content[0].content.bottomText}
                            onChange={(e) => {
                              Contentdata[index_1].content[0].content.bottomText = e.target.value
                              this.setState({ Contentdata })
                            }} />
      <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content[0].content.bottomText_error}</span>
                </div>
              
                <div className="col-sm-1 marginspace">Person Name</div>
              
              <div className="col-sm-3 marginspace">
              <input type={'text'}  className={'form-control'}  placeholder={'Person Name'} style={{ width: '100%' }}
               value={Contentdata[index_1].content[0].content.personName}
                          onChange={(e) => {
                            Contentdata[index_1].content[0].content.personName = e.target.value
                              this.setState({ Contentdata })
                          }} />
                          <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content[0].content.personName_error}</span>
              </div>
              
              
                 <div className="col-sm-1 marginspace">Content Body </div>
              
                <div className="col-sm-3 marginspace">
              <input type={'text'}  className={'form-control'}  placeholder={'Body'} style={{ width: '100%' }}
               value={Contentdata[index_1].content[0].content.body}
                            onChange={(e) => {
                              Contentdata[index_1].content[0].content.body = e.target.value
                              this.setState({ Contentdata })
                            }} />
        <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content[0].content.body_error}</span>
                </div>
              
                <div className="col-sm-1 marginspace">Content question</div>
              
              <div className="col-sm-3 marginspace">
              <input type={'text'}  className={'form-control'}  placeholder={'question'} style={{ width: '100%' }} 
              value={Contentdata[index_1].content[0].content.question}
                          onChange={(e) => {
                            Contentdata[index_1].content[0].content.question = e.target.value
                              this.setState({ Contentdata })
                          }} />
 <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content[0].content.question_error}</span>
              </div>
              
              
                            
                        </React.Fragment>)
               


            
          }
          else
          {
            arrayvalue.push(
              <React.Fragment>
                <div className="col-sm-2 text-ali-left" style={{ marginTop: 20, marginBottom: 20 }}>Image </div>
                <div className="col-sm-5" style={{ marginTop: 20, marginBottom: 20 }}>
                  <DropDown
                    selectedOption={optionSelect[index_1] ? optionSelect[index_1] : { label: 'Select', value: 'Select' }}
                    onChange={(e) => {
                      if(editable !="false")
                      {
                        optionSelect[index_1] = e
                         Contentdata[index_1].content.image = e.json;
                        this.setState({ optionSelect,Contentdata })
                      }
                    }}
                    options={option}
                    isDisabled ={editable =="false" ? true : false }
                  />
       <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content.image_error}</span>
                </div>
                <div className="col-sm-2" style={{ marginTop: 20, marginBottom: 20, top: -30 }}>
      
                  {optionSelect[index_1] ?
      
                    <img style={{ width: '100%', height: 100 }} src={optionSelect[index_1].value} alt={'No Image'} class="img-responsive" />
      
                    : null}
                </div>
                <div className="col-sm-3"> </div>
              </React.Fragment>
            )
            
  
            arrayvalue.push( <React.Fragment>
  
  <div className="col-sm-1">Bg color1 </div>
  <div className="col-sm-3">
  <input type={'text'}  disabled={editable =="false" ? true : false } className={'form-control'}  placeholder={'Bgcolor1'} style={{ width: '100%' }} 
  value={Contentdata[index_1].content.color_1}
                onChange={(e) => {
                  if(editable !="false")
                  {
                  Contentdata[index_1].content.color_1 = e.target.value
                  this.setState({ Contentdata })
                  }
                }} />
 <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content.color_1_error}</span>
    </div>
  
  <div className="col-sm-1">Bg color2 </div>
  <div className="col-sm-3">
  <input type={'text'}  disabled={editable =="false" ? true : false }  className={'form-control'}  placeholder={'Bgcolor2'} style={{ width: '100%' }} 
  value={Contentdata[index_1].content.color_2 }
                onChange={(e) => {
                  if(editable !="false")
                  {
                  Contentdata[index_1].content.color_2 = e.target.value
                  this.setState({ Contentdata })
                  }
                }} />
  <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content.color_2_error}</span>
    </div>
  
    <div className="col-sm-1">bottomText </div>
    <div className="col-sm-3">
  <input type={'text'}  className={'form-control'}  placeholder={'Bgcolor2'} style={{ width: '100%' }} value={Contentdata[index_1].content.bottomText}
                onChange={(e) => {
                  Contentdata[index_1].content.bottomText = e.target.value
                  this.setState({ Contentdata })
                }} />
 <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content.bottomText_error}</span>
    </div>
  
    <div className="col-sm-1 marginspace">Person Name</div>
  
  <div className="col-sm-3 marginspace">
  <input type={'text'}  className={'form-control'}  placeholder={'Person Name'} style={{ width: '100%' }} value={Contentdata[index_1].content.personName}
              onChange={(e) => {
                  Contentdata[index_1].content.personName = e.target.value
                  this.setState({ Contentdata })
              }} />
              <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content.personName_error}</span>
  </div>
  
  
     <div className="col-sm-1 marginspace">Content Body </div>
  
    <div className="col-sm-3 marginspace">
  <input type={'text'}  className={'form-control'}  placeholder={'Body'} style={{ width: '100%' }} value={Contentdata[index_1].content.body}
                onChange={(e) => {
                  Contentdata[index_1].content.body = e.target.value
                  this.setState({ Contentdata })
                }} />
                <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content.body_error}</span>
    </div>
  
    <div className="col-sm-1 marginspace">Content question</div>
  
  <div className="col-sm-3 marginspace">
  <input type={'text'}  className={'form-control'}  placeholder={'question'} style={{ width: '100%' }} value={Contentdata[index_1].content.question}
              onChange={(e) => {
                  Contentdata[index_1].content.question = e.target.value
                  this.setState({ Contentdata })
              }} />
            <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content.question_error}</span>
  </div>
  
  
                
            </React.Fragment>)
       
            
          }
          
     


        return (<React.Fragment>{arrayvalue}</React.Fragment>)
    }

}


export default MeetSinglePerson