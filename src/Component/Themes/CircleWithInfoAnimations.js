import React from 'react';
import DropDown from "../DropDown";
import CloseImage from "../../../src/images/close.png";


class CircleWithInfoAnimations extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}

  }
  render() {

    const { LevelStage, found_index, optionSelect, option, index_1, Contentdata, type,editable } = this.props;
    let arrayvalue = []


    if(LevelStage[found_index].theme =="StoryCard")
    {

 
      arrayvalue.push(
        <React.Fragment>
        <div className="row item form-group" style={{width:"100%"}}>
          <div className="col-sm-2 text-ali-left"> Title </div>
          <div className="col-sm-6"> 
          <input type={'text'}  className={'form-control'} value={Contentdata[index_1].content[2].title}  placeholder={'Enter Title'} style={{ width: '100%' }} 
            onChange={(e) => {  
              Contentdata[index_1].content[2].title=e.target.value;
              this.setState({Contentdata})
            }} />
            <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content[2].title_error}</span>
            </div>
            <div className="col-sm-4"> </div>
      
        </div>
        </React.Fragment>
      )

      arrayvalue.push(
        <React.Fragment>
          <div className="col-sm-1 text-ali-left" style={{ marginTop: 20, marginBottom: 20 }}>Image </div>
          <div className="col-sm-6" style={{ marginTop: 20, marginBottom: 20 }}>
            <DropDown
              selectedOption={optionSelect[index_1] ? optionSelect[index_1] : { label: 'Select', value: 'Select' }}
              onChange={(e) => {
                if(editable !="false")
                {
                  optionSelect[index_1] = e
                  Contentdata[index_1].content[2].content.image = e.json;
    
                  this.setState({ optionSelect, Contentdata })
                }
               
              }}
              options={option}
              isDisabled={editable =="false" ? true : false }
            />
  <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content[2].content.image_error}</span>
          </div>
          <div className="col-sm-2" style={{ marginTop: 20, marginBottom: 20, top: -30 }}>
  
            {optionSelect[index_1] ?
  
              <img style={{ width: '100%', height: 100 }} src={optionSelect[index_1].value} alt={'No Image'} class="img-responsive" />
  
              : null}
          </div>
          <div className="col-sm-3"> </div>
        </React.Fragment>
      )




    arrayvalue.push(
      <React.Fragment>
        <div className="col-sm-2 text-ali-left"><h4>Circles</h4> </div>
        <div className="col-sm-10"> </div>
      </React.Fragment>
    )

    Contentdata[index_1].content[2].content.circles.map(((ival, index) => {



      arrayvalue.push(<React.Fragment>
        <div className="col-sm-5 marginspace">
          <input type={'text'} className={'form-control'} placeholder={'Name'} style={{ width: '100%' }} value={ival.name}
            onChange={(e) => {
              Contentdata[index_1].content[2].content.circles[index].name = e.target.value
              this.setState({ LevelStage, Contentdata })
            }} />
             <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{ival.name_error}</span>
        </div>

        <div className="col-sm-5 marginspace">
          <input type={'text'} disabled={editable =="false" ? true : false } className={'form-control'} placeholder={'Color'} style={{ width: '100%' }} value={ival.color}
            onChange={(e) => {
              if(editable !="false")
              {
              Contentdata[index_1].content[2].content.circles[index].color = e.target.value
              this.setState({ LevelStage, Contentdata })
              }
            }} />
              <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{ival.color_error}</span>
        </div>
        {type ?

          <div className="col-sm-2 marginspace">
            <label>Correct answer</label>
            <input style={{ marginLeft: 10 }} disabled={editable =="false" ? true : false }  type="checkbox" id="" name="" value="" checked={
              Contentdata[index_1].content[2].content.circles[index].isCorrectanswer}
              onChange={(e) => {

                if(editable !="false")
                {

                if (Contentdata[index_1].content[2].content.circles[index].isCorrectanswer == false) {
                  Contentdata[index_1].content[2].content.circles[index].isCorrectanswer = true
                }
                else {
                  Contentdata[index_1].content[2].content.circles[index].isCorrectanswer = false
                }
                this.setState({ Contentdata })
              }

              }} />
          </div>

          : null}



      </React.Fragment>)
    }))


    arrayvalue.push(
      <React.Fragment>
        <div className="col-sm-4 text-ali-left" style={{ marginTop: 15 }}><h4>Text</h4> </div>
        <div className="col-sm-4"> </div>
       
        <div className="col-sm-1"> </div>

      </React.Fragment>
    )
        arrayvalue.push(<React.Fragment>
            <div className="row form-group" style={{ width: '100%' }}>
                <div className="col-sm-5 marginspace">
                    <input type={'text'} className={'form-control'} placeholder={'text 1'} style={{ width: '100%' }} value={Contentdata[index_1].content[2].content.text1}
                           onChange={(e) => {
                               Contentdata[index_1].content[2].content.text1 = e.target.value
                               this.setState({  Contentdata })
                           }} />
                </div>

            </div>
            <div className="row form-group" style={{ width: '100%' }}>
                <div className="col-sm-5 marginspace">
                    <input type={'text'} className={'form-control'} placeholder={'text 2'} style={{ width: '100%' }} value={Contentdata[index_1].content[2].content.text2}
                           onChange={(e) => {
                               Contentdata[index_1].content[2].content.text2 = e.target.value
                               this.setState({  Contentdata })
                           }} />
                </div>

            </div>

        </React.Fragment>)

        arrayvalue.push(
            <React.Fragment>
                <div className="col-sm-4 text-ali-left" style={{ marginTop: 15 }}><h4>Message</h4> </div>
                <div className="col-sm-4"> </div>

                <div className="col-sm-1"> </div>

                <div className="row form-group" style={{ width: '100%' }}>
                    <div className="col-sm-4 marginspace">
                        <input type={'text'} className={'form-control'} placeholder={'failure_header_1'} style={{ width: '100%' }} value={Contentdata[index_1].content[2].content.message.failure_header_1}
                               onChange={(e) => {
                                   Contentdata[index_1].content[2].content.message.failure_header_1 = e.target.value
                                   this.setState({  Contentdata })
                               }} />
                  <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content[2].content.message.failure_header_1_error}</span> 
                    </div>

                    <div className="col-sm-4 marginspace">
                        <input type={'text'} className={'form-control'} placeholder={'failure_body_1'} style={{ width: '100%' }} value={Contentdata[index_1].content[2].content.message.failure_body_1}
                               onChange={(e) => {
                                   Contentdata[index_1].content[2].content.message.failure_body_1 = e.target.value
                                   this.setState({  Contentdata })
                               }} />
                               <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content[2].content.message.failure_body_1_error}</span> 
                    </div>

                    <div className="col-sm-4 marginspace">
                        <input type={'text'} className={'form-control'} placeholder={'failure_button_1'} style={{ width: '100%' }} value={Contentdata[index_1].content[2].content.message.failure_button_1}
                               onChange={(e) => {
                                   Contentdata[index_1].content[2].content.message.failure_button_1 = e.target.value
                                   this.setState({  Contentdata })
                               }} />
                  <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content[2].content.message.failure_button_1_error}</span> 
                    </div>

                </div>



                <div className="row form-group" style={{ width: '100%' }}>
                    <div className="col-sm-4 marginspace">
                        <input type={'text'} className={'form-control'} placeholder={'failure_header_2'} style={{ width: '100%' }} value={Contentdata[index_1].content[2].content.message.failure_header_2}
                               onChange={(e) => {
                                   Contentdata[index_1].content[2].content.message.failure_header_2 = e.target.value
                                   this.setState({  Contentdata })
                               }} />
                               <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content[2].content.message.failure_header_2_error}</span> 
                    </div>

                    <div className="col-sm-4 marginspace">
                        <input type={'text'} className={'form-control'} placeholder={'failure_body_2'} style={{ width: '100%' }} value={Contentdata[index_1].content[2].content.message.failure_body_2}
                               onChange={(e) => {
                                   Contentdata[index_1].content[2].content.message.failure_body_2 = e.target.value
                                   this.setState({  Contentdata })
                               }} />
                               <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content[2].content.message.failure_body_2_error}</span> 
                    </div>

                    <div className="col-sm-4 marginspace">
                        <input type={'text'} className={'form-control'} placeholder={'failure_button_2'} style={{ width: '100%' }} value={Contentdata[index_1].content[2].content.message.failure_button_2}
                               onChange={(e) => {
                                   Contentdata[index_1].content[2].content.message.failure_button_2 = e.target.value
                                   this.setState({  Contentdata })
                               }} />
                               <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content[2].content.message.failure_button_2_error}</span> 
                    </div>

                </div>



                <div className="row form-group" style={{ width: '100%' }}>
                    <div className="col-sm-4 marginspace">
                        <input type={'text'} className={'form-control'} placeholder={'success_header_1'} style={{ width: '100%' }} value={Contentdata[index_1].content[2].content.message.success_header_1}
                               onChange={(e) => {
                                   Contentdata[index_1].content[2].content.message.success_header_1 = e.target.value
                                   this.setState({  Contentdata })
                               }} />
                               <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content[2].content.message.success_header_1_error}</span> 
                    </div>

                    <div className="col-sm-4 marginspace">
                        <input type={'text'} className={'form-control'} placeholder={'success_body_1'} style={{ width: '100%' }} value={Contentdata[index_1].content[2].content.message.success_body_1}
                               onChange={(e) => {
                                   Contentdata[index_1].content[2].content.message.success_body_1 = e.target.value
                                   this.setState({  Contentdata })
                               }} />
                               <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content[2].content.message.success_body_1_error}</span> 
                    </div>

                    <div className="col-sm-4 marginspace">
                        <input type={'text'} className={'form-control'} placeholder={'success_button_1'} style={{ width: '100%' }} value={Contentdata[index_1].content[2].content.message.success_button_1}
                               onChange={(e) => {
                                   Contentdata[index_1].content[2].content.message.success_button_1 = e.target.value
                                   this.setState({  Contentdata })
                               }} />
                               <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content[2].content.message.success_button_1_error}</span> 
                    </div>

                </div>

                <div className="row form-group" style={{ width: '100%' }}>
                    <div className="col-sm-4 marginspace">
                        <input type={'text'} className={'form-control'} placeholder={'Learning Point header'} style={{ width: '100%' }} value={Contentdata[index_1].content[2].content.message.success_header_2}
                               onChange={(e) => {
                                   Contentdata[index_1].content[2].content.message.success_header_2 = e.target.value
                                   this.setState({  Contentdata })
                               }} />
                               <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content[2].content.message.success_header_2_error}</span> 
                    </div>

                    <div className="col-sm-4 marginspace">
                        <input type={'text'} className={'form-control'} placeholder={'Learning Point body'} style={{ width: '100%' }} value={Contentdata[index_1].content[2].content.message.success_body_2}
                               onChange={(e) => {
                                   Contentdata[index_1].content[2].content.message.success_body_2 = e.target.value
                                   this.setState({  Contentdata })
                               }} />
                               <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content[2].content.message.success_body_2_error}</span> 
                    </div>

                    <div className="col-sm-4 marginspace">
                        <input type={'text'} className={'form-control'} placeholder={'Learning Point button'} style={{ width: '100%' }} value={Contentdata[index_1].content[2].content.message.success_button_2}
                               onChange={(e) => {
                                   Contentdata[index_1].content[2].content.message.success_button_2 = e.target.value
                                   this.setState({  Contentdata })
                               }} />
                               <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content[2].content.message.success_button_2_error}</span> 
                    </div>

                </div>



            </React.Fragment>
        )


    

    }
    

    else

    {


     


       
    arrayvalue.push(
      <React.Fragment>
        <div className="col-sm-1 text-ali-left" style={{ marginTop: 20, marginBottom: 20 }}>Image </div>
        <div className="col-sm-5" style={{ marginTop: 20, marginBottom: 20 }}>
          <DropDown
            selectedOption={optionSelect[index_1] ? optionSelect[index_1] : { label: 'Select', value: 'Select' }}
            onChange={(e) => {
              if(editable !="false")
                {
              optionSelect[index_1] = e
              Contentdata[index_1].content.image = e.json;

              this.setState({ optionSelect, Contentdata })
                }
            }}
            options={option}
            isDisabled={editable =="false" ? true : false }
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


    arrayvalue.push(
      <React.Fragment>
        <div className="col-sm-2 text-ali-left"><h4>Circles</h4> </div>
        <div className="col-sm-10"> </div>
      </React.Fragment>
    )

    Contentdata[index_1].content.circles.map(((ival, index) => {



      arrayvalue.push(<React.Fragment>
        <div className="col-sm-5 marginspace">
          <input type={'text'} className={'form-control'} placeholder={'Name'} style={{ width: '100%' }} value={ival.name}
            onChange={(e) => {
              
              Contentdata[index_1].content.circles[index].name = e.target.value
              this.setState({ LevelStage, Contentdata })
            }} />
            <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{ival.name_error}</span>
        </div>

        <div className="col-sm-5 marginspace">
          <input type={'text'} disabled={editable =="false" ? true : false } className={'form-control'} placeholder={'Color'} style={{ width: '100%' }} value={ival.color}
            onChange={(e) => {
              if(editable !="false")
              {
              Contentdata[index_1].content.circles[index].color = e.target.value
              this.setState({ LevelStage, Contentdata })
              }
            }} />
              <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{ival.color_error}</span>
        </div>
        {type ?

          <div className="col-sm-2 marginspace">
            <label>Correct answer</label>
            <input style={{ marginLeft: 10 }}  disabled={editable =="false" ? true : false } type="checkbox" id="" name="" value="" checked={Contentdata[index_1].content.circles[index].isCorrectanswer}
              onChange={(e) => {

                if(editable !="false")
                {
                if (Contentdata[index_1].content.circles[index].isCorrectanswer == false) {
                  Contentdata[index_1].content.circles[index].isCorrectanswer = true
                }
                else {
                  Contentdata[index_1].content.circles[index].isCorrectanswer = false
                }
                this.setState({ Contentdata })
              }

              }} />
          </div>

          : null}



      </React.Fragment>)
    }))
    


    if(type)
    {
      arrayvalue.push(
        <React.Fragment>
          <div className="col-sm-4 text-ali-left" style={{ marginTop: 15 }}><h4>Text</h4> </div>
          <div className="col-sm-4"> </div>
          <div className="col-sm-3" style={{ marginTop: 10, marginBottom: 10 }}>         
          </div>
          <div className="col-sm-1"> </div>
  
        </React.Fragment>
      )

      arrayvalue.push(<React.Fragment>
        <div className="row form-group" style={{ width: '100%' }}>
            <div className="col-sm-5 marginspace">
                <input type={'text'} className={'form-control'} placeholder={'text 1'} style={{ width: '100%' }} value={Contentdata[index_1].content.text1}
                       onChange={(e) => {
                           Contentdata[index_1].content.text1 = e.target.value
                           this.setState({  Contentdata })
                       }} />
                        <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{ Contentdata[index_1].content.text1_error}</span>
                       
            </div>
    
        </div>
        <div className="row form-group" style={{ width: '100%' }}>
            <div className="col-sm-5 marginspace">
                <input type={'text'} className={'form-control'} placeholder={'text 2'} style={{ width: '100%' }} value={Contentdata[index_1].content.text2}
                       onChange={(e) => {
                           Contentdata[index_1].content.text2 = e.target.value
                           this.setState({  Contentdata })
                       }} />
                       <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{ Contentdata[index_1].content.text2_error}</span>
            </div>
    
        </div>
    
    </React.Fragment>)

    }



    
    if(!type)
    {
     
      Object.keys(Contentdata[index_1].content.text).map(((index) => {

        arrayvalue.push(<React.Fragment>
          <div className="row form-group" style={{ width: '100%' }}>
            <div className="col-sm-5 marginspace">
              <input type={'text'} className={'form-control'} placeholder={'Value'} style={{ width: '100%' }} 
              value={Contentdata[index_1].content.text[index].value}
                onChange={(e) => {
                  Contentdata[index_1].content.text[index].value = e.target.value
                  this.setState({ LevelStage, Contentdata })
                }} />
                  <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content.text[index].value_error}</span>
            </div>
  
            <div className="col-sm-5 marginspace">
              <input type={'text'} disabled={editable =="false" ? true : false } className={'form-control'} placeholder={'Color'} style={{ width: '100%' }}
               value={ Contentdata[index_1].content.text[index].style.color}
                onChange={(e) => {
                  if(editable !="false")
                  {
                  Contentdata[index_1].content.text[index].style.color = e.target.value
                  this.setState({ LevelStage, Contentdata })
                  }
                }} />
                <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content.text[index].style.color_error}</span>
            </div>
  
            <div className="col-sm-2 marginspace" onClick={() => {
              if(editable !="false")
              {
              delete Contentdata[index_1].content.text[index]
              
        Contentdata[index_1].content.text.filter(function( element ) {
          return element !== null;
        })

              this.setState({ LevelStage, Contentdata })
              }
            }} >
              {editable !="false" ?<img src={CloseImage} style={{ width: 30, height: 30 }} /> :null }
            </div>
  
          </div>
  
        </React.Fragment>)
  
      }))
  

      
    }  

    

 if(Contentdata[index_1].content.message)
 {
  

arrayvalue.push(
    <React.Fragment>
        <div className="col-sm-4 text-ali-left" style={{ marginTop: 15 }}><h4>Message</h4> </div>
        <div className="col-sm-4"> </div>

        <div className="col-sm-1"> </div>

        <div className="row form-group" style={{ width: '100%' }}>
            <div className="col-sm-4 marginspace">
                <input type={'text'} className={'form-control'} placeholder={'failure_header_1'} style={{ width: '100%' }} value={Contentdata[index_1].content.message.failure_header_1}
                       onChange={(e) => {
                           Contentdata[index_1].content.message.failure_header_1 = e.target.value
                           this.setState({  Contentdata })
                       }} />
  <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content.message.failure_header_1_error}</span>        
            </div>

            <div className="col-sm-4 marginspace">
                <input type={'text'} className={'form-control'} placeholder={'failure_body_1'} style={{ width: '100%' }} value={Contentdata[index_1].content.message.failure_body_1}
                       onChange={(e) => {
                           Contentdata[index_1].content.message.failure_body_1 = e.target.value
                           this.setState({  Contentdata })
                       }} />
                       <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content.message.failure_body_1_error}</span>        
            </div>

            <div className="col-sm-4 marginspace">
                <input type={'text'} className={'form-control'} placeholder={'failure_button_1'} style={{ width: '100%' }} value={Contentdata[index_1].content.message.failure_button_1}
                       onChange={(e) => {
                           Contentdata[index_1].content.message.failure_button_1 = e.target.value
                           this.setState({  Contentdata })
                       }} />
                       <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content.message.failure_button_1_error}</span>        
            </div>

        </div>



        <div className="row form-group" style={{ width: '100%' }}>
            <div className="col-sm-4 marginspace">
                <input type={'text'} className={'form-control'} placeholder={'failure_header_2'} style={{ width: '100%' }} value={Contentdata[index_1].content.message.failure_header_2}
                       onChange={(e) => {
                           Contentdata[index_1].content.message.failure_header_2 = e.target.value
                           this.setState({  Contentdata })
                       }} />
                       <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content.message.failure_header_2_error}</span>        
            </div>

            <div className="col-sm-4 marginspace">
                <input type={'text'} className={'form-control'} placeholder={'failure_body_2'} style={{ width: '100%' }} value={Contentdata[index_1].content.message.failure_body_2}
                       onChange={(e) => {
                           Contentdata[index_1].content.message.failure_body_2 = e.target.value
                           this.setState({  Contentdata })
                       }} />
                       <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content.message.failure_body_2_error}</span>        
            </div>

            <div className="col-sm-4 marginspace">
                <input type={'text'} className={'form-control'} placeholder={'failure_button_2'} style={{ width: '100%' }} value={Contentdata[index_1].content.message.failure_button_2}
                       onChange={(e) => {
                           Contentdata[index_1].content.message.failure_button_2 = e.target.value
                           this.setState({  Contentdata })
                       }} />
                       <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content.message.failure_button_2_error}</span>
            </div>

        </div>



        <div className="row form-group" style={{ width: '100%' }}>
            <div className="col-sm-4 marginspace">
                <input type={'text'} className={'form-control'} placeholder={'success_header_1'} style={{ width: '100%' }} value={Contentdata[index_1].content.message.success_header_1}
                       onChange={(e) => {
                           Contentdata[index_1].content.message.success_header_1 = e.target.value
                           this.setState({  Contentdata })
                       }} />
                       <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content.message.success_header_1_error}</span>
            </div>

            <div className="col-sm-4 marginspace">
                <input type={'text'} className={'form-control'} placeholder={'success_body_1'} style={{ width: '100%' }} value={Contentdata[index_1].content.message.success_body_1}
                       onChange={(e) => {
                           Contentdata[index_1].content.message.success_body_1 = e.target.value
                           this.setState({  Contentdata })
                       }} />
                       <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content.message.success_body_1_error}</span>
            </div>

            <div className="col-sm-4 marginspace">
                <input type={'text'} className={'form-control'} placeholder={'success_button_1'} style={{ width: '100%' }} value={Contentdata[index_1].content.message.success_button_1}
                       onChange={(e) => {
                           Contentdata[index_1].content.message.success_button_1 = e.target.value
                           this.setState({  Contentdata })
                       }} />
                       <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content.message.success_button_1_error}</span>
            </div>

        </div>

        <div className="row form-group" style={{ width: '100%' }}>
            <div className="col-sm-4 marginspace">
                <input type={'text'} className={'form-control'} placeholder={'Learning Point header'} style={{ width: '100%' }} value={Contentdata[index_1].content.message.success_header_2}
                       onChange={(e) => {
                           Contentdata[index_1].content.message.success_header_2 = e.target.value
                           this.setState({  Contentdata })
                       }} />
                       <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content.message.success_header_2_error}</span>
            </div>

            <div className="col-sm-4 marginspace">
                <input type={'text'} className={'form-control'} placeholder={'Learning Point body'} style={{ width: '100%' }} value={Contentdata[index_1].content.message.success_body_2}
                       onChange={(e) => {
                           Contentdata[index_1].content.message.success_body_2 = e.target.value
                           this.setState({  Contentdata })
                       }} />
                       <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content.message.success_body_2_error}</span>
            </div>

            <div className="col-sm-4 marginspace">
                <input type={'text'} className={'form-control'} placeholder={'Learning Point button'} style={{ width: '100%' }} value={Contentdata[index_1].content.message.success_button_2}
                       onChange={(e) => {
                           Contentdata[index_1].content.message.success_button_2 = e.target.value
                           this.setState({  Contentdata })
                       }} />
                       <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{Contentdata[index_1].content.message.success_button_2_error}</span>
            </div>

        </div>



    </React.Fragment>
)

 }

    }
   

    if(LevelStage[found_index].theme =="StoryCard")
    {
      return (<div style={{width:'100%'}}>{arrayvalue}</div>)
    }
    else
    {
      return (<div>{arrayvalue}</div>)
    }

    
  }


}


export default CircleWithInfoAnimations
