var express = require('express');
var router = express.Router();
var Bible = require('../models/Book');

/* GET home page. */
router.get('/', function(req, res, next)
{
  Bible.find({}, function(err,data){
      if(err)
      {
        throw err;
      }

        var obj = JSON.stringify({data}, null, 2);
        var obj2 = JSON.parse(obj);
        var chapters =[];
        for(var i =0 ;i<obj2.data.length; i++)
        {
          chapters.push(obj2.data[i].book_name);
        }
        //console.log(chapters);
       res.render('book.ejs', { title: 'Search',chapters : chapters});
  });

});
router.get('/books',function(req, res)
{
  var searchBook = req.query.book_name;
  var chapters = req.query.chapters;
  console.log(searchBook);
  console.log(chapters);
  Bible.find({book_name : searchBook} , function(err, data)
  {
       if(err)
       {
         console.log('throw', err);
       }
       if(data.length!==0)
       {
         var obj = JSON.stringify({data}, null, 3);
         var obj2 = JSON.parse(obj);
         var data = Object.keys(obj2.data['0'].chapters[chapters]);
         var data2 = Object.values(obj2.data['0'].chapters[chapters]);
        // console.log(data);
         var val =[];
         for(var i =0; i<data.length;i++)
           {
             val.push(Object.values(data2[i]));
           }
          // console.log(val);
        res.render('showbook.ejs', { title : 'to Chapters '+ chapters, values : val});
       }
       else {
         {
           res.send('Chapter  not found');
         }
       }
   });
});

router.get('/list', function(req, res) {
  var searchBook_name = req.query.book_name;
  //console.log(searchBook_name);
  Bible.find({book_name : searchBook_name}, function(err, data) {
    if(err)
    {
      throw err;
    }
    if(data.length!=0)
    {
      var obj = JSON.stringify({data}, null, 3);
      var obj2 = JSON.parse(obj);
      var all_chapters = Object.keys(obj2.data[0].chapters);
      res.send(all_chapters);
    }
    else
    {
      res.send('book not found');
    }
  });
});

router.get('/getverse', function(req, res) {
  var searchBook_name = req.query.book_name.trim();
  var chapter = req.query.chapter;
  console.log("book_name:", searchBook_name);
  console.log('chapter:',chapter); 
  Bible.findOne({book_name : searchBook_name}, function(err, data) {
    if(err)
    {
      throw err;
    }
    if(data.length!=0)
    {
      res.send(data);
      // var obj = JSON.stringify({data}, null, 3);
      // var obj2 = JSON.parse(obj);
      // var data = Object.keys(obj2.data['0'].chapters[chapter]);
      // var data2 = Object.values(obj2.data['0'].chapters[chapter]);
      //   // console.log(data);
      // var val =[];
      // for(var i =0; i<data.length;i++)
      //   {
      //     val.push(Object.values(data2[i]));
      //   }
      // console.log(val.length);
      // res.send(val.length);
    }
    else
    {
      res.send('verse not found');
    }
  });
});

module.exports = router;
