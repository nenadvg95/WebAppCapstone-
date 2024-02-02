import express from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";


const app = express();
const port = 3000;

app.set("view engine","ejs")

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

let posts = [];
app.get("/",(req,res)=>{

    res.render("index.ejs",{posts})
})


app.get("/newPost",(req,res)=>{
    res.render("partials/articleForm.ejs")
})

app.post("/newPost/submit",(req,res)=>{
    let newArticle = {
        id: uuidv4(),
        title: req.body.title,
        createdAt: new Date().toLocaleDateString(),
        text: req.body.text
    }
    posts.push(newArticle);
    res.redirect("/")
})

app.get("/edit-post/:id",(req,res)=>{
    const postId = req.params.id
    const postToEdit = posts.find(post => post.id === postId);
    res.render("editPostForm.ejs",{postToEdit})
})

app.post('/update-post/:id', (req, res) => {
    const postId = req.params.id
    console.log(postId)
    const updatedTitle = req.body.title;
    const updatedContent = req.body.text;
    const postToUpdate = posts.find(post=>post.id === postId);
    console.log(postToUpdate);
    if(postToUpdate){
        postToUpdate.title = updatedTitle;
        postToUpdate.text = updatedContent;
       
    }else{
        console.log("Post does not exist");
    }
    res.redirect('/');
  });


app.post("/delete-post/:id",(req,res)=>{
    function removeById(arr,id){
        return arr.filter(obj => obj.id !== id)
    }

    const postId = req.params.id
    const postToDelete = posts.find(post=> post.id === postId);
    posts = removeById(posts,postId);

    res.redirect("/")

})







app.listen(port,()=>{
    console.log(`App listening on the port ${port}`);
})