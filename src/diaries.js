import React, { Component } from 'react';
import './diaries.css';
import ar from './images/ar.svg';
import circle from './images/circle.svg';
import axios from 'axios';


class Diaries extends Component {
constructor(props)
{
  super(props);
  this.state={diaries:[],active:false}
  
}

handleOpen=()=>{
    this.setState({active:true})
}

componentDidMount(){
    try {
        const mediumRssFeed = "https://medium.com/feed/@rsharankumar";
        const rssToJsonApi = "https://api.rss2json.com/v1/api.json";
        const data = { params: { rss_url: mediumRssFeed } };
        console.log("medium");
        axios.get(rssToJsonApi, data).then((response) => {
            var category=[];
            console.log(response.data.items);
            for(var i=0;i<response.data.items.length;i++){
                if(response.data.items[i].categories.length!=0){
                    category.push(response.data.items[i]);
                }
            }
            this.setState({diaries:category});
    });
} catch (error) {
    console.error(error);
}
}


render(){


return(
    <div id="ptani">
        <div id="interview">Interview Diaries</div>
        <div id="icards">
        {this.state.diaries.map((diary,index)=>{
            if(index==0){
            return (
                
                <div id="icard">
                    <img id ="dimage" src={diary.thumbnail}/>
                    <div id="itext">{diary.title} </div>
                    <div id="idate">{diary.pubDate.split(" ")[0]}</div>
                    <a id="iread" href={diary.guid}>
                        <div>Read More!</div>
                        <img src={ar}/>
                    </a>
                </div>
            )
            }
            else if(index<5){
                return(
                    <div id="icard2">
                        <img id ="dimage2" src={diary.thumbnail}/>
                        <div id="itext2">{diary.title} </div>
                        <div id="idate2">{diary.pubDate.split(" ")[0]}</div>
                        <a id="iread2" href={diary.guid}>
                            <div>Read More!</div>
                            <img src={ar}/>
                        </a>
                    </div>
                )
            }
            else{
                return(
                    <div className={`icard3 ${!this.state.active? "unvisible": "visible"}`}>
                        <img id ="dimage2" src={diary.thumbnail}/>
                        <div id="itext2">{diary.title} </div>
                        <div id="idate2">{diary.pubDate.split(" ")[0]}</div>
                        <a id="iread2" href={diary.guid}>
                            <div>Read More!</div>
                            <img src={ar}/>
                        </a>
                    </div>
                )
            }
        })}
        </div>
        <div className={`iblog ${!this.state.active? "visible": "unvisible"}`}>
            <div>View More Blogs</div>
            <div id="bimg" onClick={this.handleOpen}>
                <img src={circle} />
                <div id="do">^</div>
            </div>
        </div>
    </div>



)}}

export default Diaries;