require('dotenv').config();

const express=require("express");
const expressLayouts=require("express-ejs-layouts");
const connectDB=require("./server/config/db");
const session=require("express-session");
const methodOverride=require("method-override");
const passport=require("passport");
const MongoStore=require("connect-mongo");

const app=express();
const port=3000|| process.env.PORT;
app.use(session({
    secret:"keyboard cat",
    resave:false,
    saveUninitialized:true,
    store:MongoStore.create({
    mongoUrl:process.env.MONGODB_URI
    }),
    cookie: { maxAge: 180 * 60 * 1000 }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({
    extended:true
}))
app.use(express.json());
app.use(methodOverride("_method"));
//connect to database
connectDB();

//static files
app.use(express.static("public"));
//template engines
app.use(expressLayouts);
app.set("layout","./layouts/main");
app.set("view engine","ejs");

//Routes
app.use("/",require('./server/routes/auth'));
app.use("/",require('./server/routes/index'));
app.use("/",require('./server/routes/dashboard'));

//handle 404
app.get("*",function(req,res){
    res.status(404).render("404");
})

app.listen(port,()=>{
    // console.log(`app listening at ${port}`);
})