// get homepage
exports.homepage=async(req,res)=>{
    const locals={
        title:"nodejs notes",
        description:"free nodejs notes app"
    };
    res.render("index",{
        locals,
        layout:"../views/layouts/front-page"
    });
}
// get about
exports.about=async(req,res)=>{
    const locals={
        title:" about-nodejs notes",
        description:"free nodejs notes app"
    };
    res.render("about",locals);
}