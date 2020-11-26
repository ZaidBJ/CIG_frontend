import React, { Component } from 'react';
import logo from './logo.svg';
import './cls.css'
import './testinomial.css'
import {Switch,Route,Redirect} from 'react-router-dom';
import Mask from './images/mask.png';
import Comma from './images/comma.svg';
import Line from './images/line.svg';
import axios from "axios";


class Testinomials extends Component {
constructor(props)
{ 
  
  super(props);
  this.state={
    testimonialArr : []
  }
}
componentDidMount(){  
  console.log("req to backend to fetch testimonial");
  axios({
    method : "GET",
    withCredentials : true,
    url : "http://localhost:3001/testimonial"
  }).then((d)=>{
    console.log("data");
    this.setState({testimonialArr : d.data});
    console.log(d);
  })
}
render(){


return(

  <div id="t_bg">
{this.state.testimonialArr.length!=0 && this.state.testimonialArr.map((elem)=>(
  <div>
  <div id="t_head">{elem.heading}</div>
  <div id="t_content">{elem.content}</div>
  <img src={"http://localhost:3001" + elem.image} id="t_img"/>
  <img src={Comma} id="t_comma"/>
  <img src={Line} id="t_line"/>
  <div id="t_name"> {elem.name}</div>
  <div id="t_des">{elem.designation}</div>
  </div>
))}
</div>



)


}}


export default Testinomials;
