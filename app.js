const express =require('express');
const app= express();
require("dotenv").config();
app.use(express.static('public'))
const cls_route =require('./routes/cls');
const user_route = require('./routes/user');
const team_route = require('./routes/team');
const feature_route = require("./routes/featured");
const testimonial_route = require("./routes/testimonial");
const org_route = require("./routes/org");
const workshop_route = require("./routes/workshop");
const download_route = require("./routes/download.js");
const faq_route = require("./routes/faq.js");
const event_route = require("./routes/event.js");
const googleForm_route = require("./routes/googleForm.js");
console.log("r",process.env.RECRUIT);
const recruit_bool_route = require("./routes/recruit.js")(process.env.RECRUIT);
const deadline_recruit_route = require("./routes/deadlineRecruitment.js");
const Dean_Chaiperson_route = require("./routes/Dean_Chairperson.js");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost/data_CIG");
var cors = require("cors");
var URL = process.env.FRONTEND_URL;
app.use(
  cors({
    origin: URL,
    credentials: true,
  })
);
app.use('/cls',cls_route);
app.use('/user',user_route);
app.use('/team',team_route);
app.use("/featured",feature_route);
app.use("/testimonial",testimonial_route);
app.use("/org",org_route);
app.use("/workshop",workshop_route);
app.use("/download",download_route);
app.use("/faq",faq_route);
app.use("/events",event_route);
app.use("/googleForm",googleForm_route);
app.use("/recruit",recruit_bool_route);
app.use("/deadline",deadline_recruit_route);
app.use("/dean_chaiperson",Dean_Chaiperson_route);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});





module.exports = app;