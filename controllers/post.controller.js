const Post = require("../models/post.model");
const User = require("../models/user.model");
const { v4: uuidv4 } = require('uuid');

exports.posts_get = function (req, res) {
  Post.find({}, (err, docs) => {
    res.send(docs);
  });
};
exports.post_create = function (req, res) {
  console.log(req.body);
  // res.send("meow");
  // let filedata = req.file;
  // console.log(filedata);
  // User.findOneAndUpdate(
  //   { login: req.body.author },
  //   { $push: { posts: req.body.id } },
  //   (err, data) => {
  //     console.log(err);
  //   }
  // );
  let post = req.body;
  post.time = Date.now();
  post.img = "asdadasdasd";
  post.id = uuidv4();
  Post.create(post, function (err, doc) {
    if (err) return console.log(err);
    console.log("Сохранен объект user", doc);
    // res.send('complete')
  });
}
exports.post_update = function (req, res) {
  console.log(req.body);

  Post.updateOne({ id: req.body.id }, req.body, (err, data) => {
    if (err) console.log(err);
  });
};
exports.post_delete = function (req, res) {
  console.log(req.params.id);
  Post.deleteOne({ id: req.params.id }, (err) => err);
};


exports.post_authors = function (req, res) {
  User.aggregate([{
    $lookup: {
            from: "posts",
            localField: "login",
            foreignField: "author",
            as: "posts"
        }
}], (err, data) => {
  let authors = []
  for(let i = 0; i < data.length; i++){
    
    if ( data[i].posts.length >= 1 ){
        authors.push(data[i])
    }

  }
  res.send(authors)
})
};