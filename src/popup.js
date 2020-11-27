import React, { Component } from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import './popup.css';
import axios from "axios";



class Popup extends Component {
constructor(props)
{
  super(props)
  this.state={name:"",corporation:"",mail:"",Phone:"",msg:"",deliver_lec:false,start_proj:false,conduct_workshop:false,others:false,
  	director:"abcdef dvgxhfxh (Ass. Dean)",dire_phone:"7685867979",head:"himanshu pal (chairperson)",head_phone:"76480958",force:false};
  this.handleChange = this.handleChange.bind(this);
  this.handleChange_a = this.handleChange_a.bind(this);
  this.handleChange_b = this.handleChange_b.bind(this);
  this.handleChange_c = this.handleChange_c.bind(this);
  this.handleChange_d = this.handleChange_d.bind(this);
    this.submit = this.submit.bind(this);
  this.toggle= this.toggle.bind(this);
}

handleChange(e)
{
	this.setState({name:e.target.value});
}

handleChange_a(e)
{
	this.setState({corporation:e.target.value});
}

handleChange_b(e)
{
	this.setState({mail:e.target.value});
}

handleChange_c(e)
{
	this.setState({Phone:e.target.value});
}

handleChange_d(e)
{
	this.setState({msg:e.target.value});
}


submit(e){
    e.preventDefault()
  // window.scrollTo(0, 600);
  var my_interest = [];
  var possible_interest = ["deliver_lec","start_proj","conduct_workshop","others"];
  for(var i=0;i<possible_interest.length;i++){
    if(this.state[possible_interest[i]]){
      my_interest.push(possible_interest[i]);
    }
  }
  var stateObj = this.state;
  var dataObj = {
    name : stateObj.name,
    corporation :stateObj.corporation ,
    email : stateObj.mail,
    phone :stateObj.Phone,
    interest :  my_interest,
    message:stateObj.msg
  }
  this.props.visible();
  console.log("sending form data");
  axios({
    method : "POST",
    data : dataObj,
    withCredentials : true,
    url : "http://localhost:3001/org",
  }).then((m)=>{
    console.log(m);
  })
    this.props.hide();
}

toggle(e){
	var obj=e.target.name;
   
	       this.setState((prevState, props) => ({
  [obj]: !prevState[obj]}));
	   
}


render(){
 
return(
       <div  id="form_bg_a" >
       <div id="form_title"> Fill out this form & we will contact you soon.</div>
       <div id="form_sub"  className="asterik">  marked fields are mandatory</div>
        <form onSubmit={this.submit}> 
       <textarea  name="name"  required id="form_name" className="no_outline" placeholder="Enter your full Name" onChange={this.handleChange}></textarea>
       <div id="name_focus"></div>
       <textarea  name="corporation"  required id="form_corp" className="no_outline" placeholder="Enter your corporation name" onChange={this.handleChange_a}></textarea>
       <div id="corp_focus"></div>
       <textarea type="email" name="mail"  required id="form_mail" className="no_outline" placeholder="Enter your e-mail address" onChange={this.handleChange_b}></textarea>
       <div id="mail_focus"></div>
       <textarea  name="Phone" required  id="form_phone" className="no_outline" placeholder="Enter your Phone number" onChange={this.handleChange_c}></textarea>
       <div id="phone_focus"></div>
        <textarea name = "msg" id="form_msg_a" className="no_outline" placeholder="If you want to add a message" onChange={this.handleChange_d}></textarea>
       <div id="msg_focus_a"></div>

       <div id="name_head" className="required">Name </div>
        <div id="Corporation_head" className="required">Corporation </div>
         <div id="mail_head" className="required">E-mail </div>
          <div id="phone_head" className="required">Phone </div>
          <div id="interest">I am interested in</div>





       
<label className="container"  id="box_a">Delivering Lecture
  <input  name="deliver_lec"  onClick={this.toggle}  type="checkbox" c/>
  <span className="checkmark"></span>
</label>

<label className="container"  id="box_b">Starting Projects
  <input name="start_proj"    onClick={this.toggle} type="checkbox"/>
  <span className="checkmark"></span>
</label>

<label className="container"  id="box_c">Conducting Workshops
  <input  name="conduct_workshop"   onClick={this.toggle} type="checkbox"/>
  <span className="checkmark"></span>
</label>


<label className="container" id="rad">Other
 <input  name="others"   onClick={this.toggle} type="checkbox"/>
  <span className="checkmark"></span>
</label>



    <div id="msg_form_a">Message</div>





    <button type="submit" id="btn_form_a" >Send</button>
    </form>
        </div>



)

}
}


export default Popup;
