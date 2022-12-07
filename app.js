//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const blogPostList = [];

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin-thisal:Ch%40nG31T@cluster0.rtoqjvk.mongodb.net/blogPostDB', {useNewUrlParser:true});

const {
  Schema
} = mongoose;

const blogPostSchema = new Schema({
  blogPostTitle: {
    type: String,
    required: [true, "Blog Post Title Empty !"] //validation
  },
  blogPostDescription: {
    type: String,
    required: [true, "Blog Post Description is Empty !"] //validation
  }
});

const blogPost = mongoose.model('blogPost', blogPostSchema);

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//Home Page
app.get("/", function(req, res) {

    blogPost.find({}, function(err, blogPosts) {
  if (err) {
    console.log(err);
  } else {
    res.render("home", {
      blogPostList: blogPosts
    });
  }
});

});

//Contact Page
app.get("/contact", function(req, res) {

  res.render("contact", {
    contactContent: contactContent
  });

});

//About Page
app.get("/about", function(req, res) {

  res.render("about", {
    aboutContent: aboutContent
  });

});

//Compose Page
app.get("/compose", function(req, res) {

  res.render("compose");

});

app.post("/compose", function(req, res) {

  let blogPostTitle = req.body.blogPostTitle;
  let blogPostText = req.body.blogPostText;

const newBlogPost = new blogPost({
  blogPostTitle: blogPostTitle,
  blogPostDescription: blogPostText
});
newBlogPost.save();


  res.redirect("/");
});

//Params

app.get('/posts/:blogPost_id', function(req, res) {
  //  res.send(req.params)
  //console.log(req.params);

///////////////////////////////////////////
blogPost.findOne({_id:req.params.blogPost_id}, function(err, selectedBlogPost) {
  if (err) {
    console.log(err);
  } else {
      if(!selectedBlogPost){
        //create a new list
        console.log("Blog post does not exists");
        res.redirect("/");
      }
      else{
        res.render("post", {
          blogPost: selectedBlogPost
        });
      }

  }
});
///////////////////////////////////////////
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
