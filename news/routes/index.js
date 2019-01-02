var express = require('express');
var router = express.Router();
//引入mongoose
const mongoose = require('mongoose')

//连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/news',(err)=>{
  if(err){
    throw err;
  }else{
    console.log('数据库连接成功...')
  }
})

//定义骨架
  const articleSchema = new mongoose.Schema({
    title: String ,
    author:String ,
    source:String,
    content:String,
    ctime:String
  })

//发布模型
  const articleModel = mongoose.model('article',articleSchema,'article')


//接收根目录路由,返回一个新闻表表单
router.get('/',(req,res)=>{
  //响应一个新增表单给浏览器
  res.render('newsadd.ejs',{})
})


/* --------------------------增加数据---------------------------- */
//接收新增新闻的请求
//这里的地址是form表单的action地址
router.post('/newsadd',(req,res)=>{
  //接收前端发送过来的数据
  //这里的单词是form表单里面的input name属性
  let {title,author,source,content} = req.body;    
  console.log("接收到的数据是",title,author,source,content);

  //把数据存入数据库(需要连接数据库 定义骨架 发布模型)

  //此时已经获取到了表单传过来的数据,准备创建实体,保存至数据库
  let instance = new articleModel();
  //把新增数据挂载到实体上
  instance.title = title;
  instance.author = author;
  instance.source = source;
  instance.content = content;
  instance.ctime = new Date().toLocaleString();
  instance.save((err,data)=>{
    if(err){
      throw err;
    }else{
      console.log('新增新闻内容:',data);
      //返回给前端一个弹出, 弹出新增成功,切跳转到新闻列表页面
      res.send("<script>alert('新增新闻成功!');location.href='./newslist'</script>");
    }
  })

})

/* -------------------------显示数据---------------------------- */
//接收显示新闻列表的请求
router.get('/newslist',(req,res)=>{
  //把新闻列表返回给前端(需要数据和模板合并渲染,生成html页面,然后重新返回给前端)
  //查询数据库的所有数据

  articleModel.find({}).exec((err,data)=>{
    if(err){
      throw err;
    }else{
      // console.log('所有新闻数据',data);
      //将获取的数据返回给列表页面
      res.render('newslist.ejs',{'newsData':data});
    }
  })  
  //将最新数据添加到第一行,实现一个倒序的效果
  //此处有一点小问题, 时间为字符串,并不是按照时间大小来排序的
  /* articleModel.find({}).sort({'ctime':-1}).exec((err,data)=>{
    if(err){
      throw err;
    }else{
      console.log('所有新闻数据',data);
      //将获取的数据返回给列表页面
      res.render('newslist.ejs',{'newsData':data});
    }
  }) */  
})


/* --------------------------删除数据---------------------------- */
//接收删除的请求
router.get('/delNews',(req,res)=>{
  //接收请求 接收id
  let id = req.query.id;
  //根据id 查询出这一条数据 再执行删除
  articleModel.findById(id).exec((err,data)=>{
    if(err){
      throw err;
    }else{
      // console.log(data);
      //删除到最后会报错, 解决方法----使用if判断,当data有数据时进行删除,否则...
      //执行删除
      if(data){
        data.remove((err,data)=>{
          if(err){
            throw err;
          }else{
            //返回给前端删除成功的弹出,刷一下页面
            res.send("<script>alert('删除成功!');location.href= '/newslist'</script>");
          }
        })
      } 
    }
  })
})


//练习: 添加全部删除按钮
router.get('/delAll',(req,res)=>{
  articleModel.find({}).exec((err,data)=>{
    if(err){
      throw err;
    }else{
      console.log(data);
      for(var i = 0;i<data.length;i++){
        data[i].remove();
      }
      res.send('<script>location.href="/newslist"</script>');
    }
  })
})

/* --------------------------修改数据---------------------------- */
//接收修改数据请求,把原来的数据显示出来
router.get('/editNews',(req,res)=>{
  //接收id
  let {id} = req.query;
  //查询数据
  articleModel.findById(id).exec((err,data)=>{
    if(err){
      throw err;
    }else{
      //数据和模板合并渲染 生成html,返回给前端
      res.render('newsedit.ejs',{'editData':data});
    }
  })

})

//接收修改后的新数据 执行修改
router.post('/saveEdit',(req,res)=>{
  //接收新数据 和原来的id
  let {title,author,source,content,id} = req.body;
  //根据id查询出原来的数据
  articleModel.findById(id).exec((err,data)=>{
    if(err){
      throw err;
    }else{
      console.log(data);
      //将新数据一一对应覆盖原有数据
      data.title = title;
      data.author = author;
      data.source = source;
      data.content = content;
      //没有修改时间
      data.ctime = new Date().toLocaleString();

      //执行保存修改的操作
      data.save((err)=>{
        if(err){
          throw err;
        }else{
          //返回给前端一个修改成功的弹窗,并且跳转到新闻列表页面
          res.send("<script>alert('数据修改成功');location.href='./newslist'</script>")
        }
      })
    }
  })
})

/* --------------------------展示新闻详情------------------------- */
//这里不用写模板名称,后面数据调用成功后使用res.render读取ejs模板
 router.get("/viewNews",(req,res)=>{
   //获取id
   var id = req.query.id;
   //查询id详情内容
   articleModel.findById(id).exec((err,data)=>{
     if(err){
       throw err;
     }else{
      //将模板与数据合并,渲染返回前端
       res.render('newsview.ejs',{'newsData':data});
     }
   })
 })

module.exports = router;
