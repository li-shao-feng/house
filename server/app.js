// 加载express框架
const express=require('express');
//加载Multer中间件(路由中间件)//创建Multer对象实例
const multer = require('multer');
const formidable=require("formidable");
const fs=require('fs');
const { throws } = require('assert');
// 加载UUID模块
const uuid = require('uuid');
let a;
// 指定自定义存储规则
let storageeee = multer.diskStorage({
  // req参数代表当前的HTTP请求对象
  // file参数代表当前上传的文件对象
  // cb参数代表回调函数（callback），让Multer按指定的规则来完成任务
  //  设置上传目录的规则
   destination:function(req,file,cb){
       cb(null,"../house/src/assets");//代表文件上传到哪个文件夹下
   },
  //  设置上传文件名称的规则
   filename:function(req,file,cb){
    //  console.log(file);
  // 获取上传文件的原始名称（带有扩展名）
  let filename = file.originalname;
  // 获取上传文件的扩展名
  let extension = filename.substr(filename.lastIndexOf('.')+1).toLowerCase();
  // 生成一个随机的文件名前缀 --产生一个随机数
  //  let mainname = Math.ceil(Math.random() * 10000);
  let mainname = uuid.v1();//或者v4();
  // 生成完整的上传文件名称
  filename = mainname + "." + extension;
  a=filename;
  // 让Multer按程序规定的文件名称实现上传业务
  cb(null,filename);
  },
});
// 指定上传的目标位置
// const upload = multer({ dest: 'upload'});
const assets = multer({ storage: storageeee});
// 加载CORS模块
const cors=require('cors');
// 加载body-parser模块
const bodyParser=require('body-parser');
// 加载mysql模块
const mysql=require('mysql');
// 创建连接池
const pool=mysql.createPool({
  host:'127.0.0.1',
  port:3306,
  user:'root',
  password:'',
  database:'house',
  charset:'utf8',
  connectionLimit:20
});
// 创建Express对象
const server=express();
// 指定监听端口号（此端口号必须与main.js里axios的端口号一致）
server.use(cors({
  origin:['http://127.0.0.1:8080','http://localhost:8080']
}));
// 应用body-parser中间件
server.use(bodyParser.urlencoded({
  extended:false
}));

server.get('/newhouse',(req,res)=>{
  console.log(req.query);
  let house_type=req.query.house_type;
  let sql='select iid,application,iname,price,unit_type,age,acreage,pic from house_info where house_type=?';
  pool.query(sql,[house_type],(err,results)=>{
    if(err)throw err;
    res.send({message:'请求成功',results:results})
  });
});

// 请求房子详情路由
server.get('/houseDetails',(req,res)=>{
  console.log(req.query);
  let iid=req.query.iid;
  let sql='select iid,area,community,Decoration_type,application,iname,price,unit_type,age,acreage,floor_number,phone,description,pic,house_type,agent,aid,aname,img,aphone,fanwei from house_info INNER JOIN house_agent ON aid=agent where iid=?';
  pool.query(sql,[iid],(err,results)=>{
    if(err)throw err;
    console.log(results)
    res.send({message:'请求成功',results:results})
  });
});
let b;
// 房子数据插入路由
server.post('/house_insert',(req,res)=>{
  let obj = req.body;
  // console.log(obj);
  let sql = 'insert into house_info set ?';
  pool.query(sql,[obj],(err,result)=>{
    if(result.affectedRows>0){
      res.send('1');
    }
    // console.log(result);
  });
});

// 房子数据图片插入路由
server.post('/house_pic',assets.single('upload'),(req,res)=>{
  let sql = "select iid from house_info order by iid desc limit 1";
  pool.query(sql,(err,result)=>{
    if(err)throw err;
  sql = "update house_info set pic=? where iid=?";
  pool.query(sql,[a,result[0].iid],(err,result)=>{
    if(err)throw err;
    console.log(result);
    if(result.affectedRows>0){
      res.send('1');
    }
  });
  });
});

// 头像数据图片插入路由
server.post('/touxiang_pic',assets.single('touxiang'),(req,res)=>{
  let sql = "select uid from user_house order by uid desc limit 1";
  pool.query(sql,(err,result)=>{
    if(err)throw err;
    if(a==undefined){
      a='avatar.png'
      console.log(`我是改后的a${a}`)
    }
    console.log(`我是没改的a${a}`,typeof a)
  sql = "update user_house set avatar=? where uid=?";
  pool.query(sql,[a,result[0].uid],(err,result)=>{
    if(err)throw err;
    console.log(result);
    if(result.affectedRows>0){
      res.send('1');
    }
  });
  });
});

// server.get('/fatie',(req,res)=>{
//   var y_id=req.query.yid;
//   var sql='select p_title,p_text,p_picture,p_time,forward_number,browse_number from post where yid=?';
//   pool.query(sql,[y_id],(err,result)=>{
//       if(err) throw err;
//       res.send(result);
//   });
// });

//用户注册路由
server.post('/reg',(req,res)=>{
  //页面获取的用户名
      let uname=req.body.uname;
      // console.log(uname);
  //页面获取的密码   
      let upwd=req.body.upwd;
      // console.log(upwd);
      // console.log(req.body);
  //页面获取的手机号码
      let uphone=req.body.uphone;
      let sex=req.body.sex;
  //根据页面的用户名进行查询,需要保证用户名唯一
      let sql="select uname from user_house where uname=?";
      pool.query(sql,[uname],(err,results)=>{
          if(err) throw err;
  //根据返回的长度进行判断,没有则返回值的长度为0
          if(results.length==0){
  //根据返回的结果,没有返回值则注册
              sql='insert into user_house set uname=?,upwd=MD5(?),uphone=?,sex=?';
              pool.query(sql,[uname,upwd,uphone,sex],(err,results)=>{
                  if(err) throw err;
              res.send({message:'注册成功',code:1})
          })
      }else{
              res.send({message:'用户名已存在',code:0})
          }
      });
  });

//用户登录路由
server.post('/login',(req,res)=>{
  //页面获取的用户名
  let uname=req.body.username
  //页面获取的密码
  let upwd=req.body.userpwd
  // console.log(req.body)
  //sql语句 以用户名和密码进行查询
  let sql='select uid,uname,avatar from user_house where uname=? and upwd=MD5(?)';
  pool.query(sql,[uname,upwd],(err,results)=>{
      // console.log(results)
      if(err) throw err;  
      if(results.length==0){    
          res.send({message:'登录失败',code:0})
      }else{
          res.send({message:'登录成功',code:1,results:results})
      }
  });
});

//个人中心页面加载路由
server.get('/personal',(req,res)=>{
  //获取uid
  let uid=req.query.uid;
  // console.log(req);
  //查询
  let sql="select uname,avatar from user_house where uid=?";
  pool.query(sql,[uid],(err,result)=>{
      // console.log(result);
      if(err)throw err;
      res.send(result);
  });
});

// 有料页面加载路由
server.get('/comment',(req,res)=>{
  let sql="select nid,title,pic,times from user_news";
  let sum='';
  pool.query(sql,(err,results)=>{
    if(err)throw err;
    // console.log(results)
    if(results.length>0){
      res.send(results);
    }
  })
})

// 发送评论后有料页面评论数量路由
server.get('/comment_num',(req,res)=>{
  console.log(req.query.new_id);
  let new_id=req.query.new_id;
  let sql="select * from comment1 where new_id=?";
  pool.query(sql,[new_id],(err,results)=>{
    if(err)throw err;
    res.send(results);
  })
})

//有料搜索
server.get('/comment_ss',(req,res)=>{
  sql='select nid,times,title,pic from user_news where title like ?';  
  pool.query(sql,['%'+req.query.title+'%'],(err,results)=>{
      if(err) throw err;
      res.send({message:'查询成功',code:1,results:results});
  } )
})

// 新闻详情页面加载路由以及点赞数的初始化数量
server.get('/content',(req,res)=>{
  // console.log(req.query);
  let $nid=req.query.nid;
  let sql="select nid,title,subhead,times,content,number,listid from user_news where nid = ?";
  pool.query(sql,[$nid],(err,results)=>{
    let $num = results[0].number+1;
    console.log("............",$num)
    sql = 'update user_news set number=? where nid=?';
    pool.query(sql,[$num,$nid],(err,results2)=>{
      if(err)throw err;
      if(results2.affectedRows>0){
        results[0].number=$num
        res.send(results);
      }
    });
  })
})

// 初始化新闻的点赞状态以及点赞数量数量
server.get('/islove',(req,res)=>{
  // console.log(req.query);
  let news_id=req.query.news_id;
  let users_id=req.query.users_id;
  let sql="select islike from news_like where news_id=? and users_id=?";
  pool.query(sql,[news_id,users_id],(err,results)=>{
    if(err)throw err;
    console.log("bbbbb",results);
    if(results.length==0){
      console.log("b1");
     res.send("0");
    }else if(results[0].islike==0){
      console.log("b2");
      res.send("0");
    }else{
      console.log("b3");
      res.send("1");
    }
  })
})

// 新闻点赞
server.get('/love_new',(req,res)=>{
  let users_id = req.query.users_id;
  let news_id = req.query.news_id;
  var sql="select * from news_like where users_id=? and news_id=?"
  pool.query(sql,[users_id,news_id],(err,result1)=>{
      if(err) throw err;
      console.log("1111111",result1);
      // 如果没有查到，从未点过赞，直接插入新数据,并返回1
      if(result1.length==0){
         sql = 'insert into news_like set users_id=?,news_id=?,islike=1'; 
         pool.query(sql,[users_id,news_id],(err,result2)=>{
          if(err) throw err;
          console.log("点赞时插入数据后的返回值",result2)
          res.send("1");
         });
      }else{
      // 如果长度不为零则说明库里面有数据， 进一步判断islike的值是1还是0；
         sql = 'select islike from news_like where users_id=? and news_id=?';
         pool.query(sql,[users_id,news_id],(err,result3)=>{
          if(err) throw err;
          console.log(result3);
          console.log("我是result3");
          // 如果islike的值为1就修改为0，如果为0就修改为1；
           if(result3[0].islike==0){
             sql = 'update news_like set islike=1 where users_id=? and news_id=?';
             pool.query(sql,[users_id,news_id],(err,result4)=>{
              if(err) throw err;
            console.log("2222222",result4);
            if(result4.affectedRows>0)res.send("1")
            });
           }else{
            sql = 'update news_like set islike=0 where users_id=? and news_id=?';
            pool.query(sql,[users_id,news_id],(err,result5)=>{
             if(err) throw err;
           console.log("33333333",result5);
           if(result5.affectedRows>0)res.send("0")
           });
           }
         });
      }
  });
})

// 新闻点赞后点赞数量
server.get('/num_lovenum',(req,res)=>{
  let news_id = req.query.news_id;
  let sql = 'select count(nid) AS count from news_like where news_id=? and islike=1';
  pool.query(sql,[news_id],(err,results)=>{
    if(err)throw err;
     res.send(results);
  })
})

//有料首页加载评论路由，多表查询，评论表和用户表
server.get('/comment222',(req,res)=>{
  let new_id = req.query.new_id;
  let sql = 'select cid,comment_content,comment_time,uname,avatar from comment1 INNER JOIN user_house ON uid=users_id WHERE new_id=?';
  pool.query(sql,[new_id],(err,result)=>{
    if(err)throw err;
    console.log(result);
    res.send(result);
  });
}); 

//有料评论点赞数量以及我是否点赞路由
server.get('/comment_like',(req,res)=>{
  let comment_id = req.query.comment_id;
  let users_id = req.query.users_id;
  console.log(req.query);
  // 先查该条评论的点赞数量
  let sql = 'select count(cid) AS count from comment_like  WHERE comment_id=? and islike=1';
  pool.query(sql,[comment_id],(err,result1)=>{
    console.log(result1);
    if(err)throw err;

    // 再查我是否点赞了
    sql = 'select islike from comment_like where users_id=? and islike=1 and  comment_id=?';
    pool.query(sql,[users_id,comment_id],(err,result2)=>{
      if(err)throw err;
      console.log(result2);
      // console.log(`我是否点赞：${result2}，点赞数量是：${result1}`);
      res.send({num:result1,islike:result2});
    }); 
  });
});

// 有料点赞路由
server.get('/love',(req,res)=>{
  let users_id = req.query.users_id;
  let comment_id = req.query.comment_id;
  var sql="select * from comment_like where users_id=? and comment_id=?"
  pool.query(sql,[users_id,comment_id],(err,result1)=>{
      if(err) throw err;
      console.log("1111111",result1);
      // 如果没有查到，从未点过赞，直接插入新数据,并返回1
      if(result1.length==0){
         sql = 'insert into comment_like set users_id=?,comment_id=?,islike=1'; 
         pool.query(sql,[users_id,comment_id],(err,result2)=>{
          if(err) throw err;
          console.log("点赞时插入数据后的返回值",result2)
          res.send("1");
         });
      }else{
      // 如果长度不为零则说明库里面有数据， 进一步判断islike的值是1还是0；
         sql = 'select islike from comment_like where users_id=? and comment_id=?';
         pool.query(sql,[users_id,comment_id],(err,result3)=>{
          if(err) throw err;
          console.log(result3);
          console.log("我是result3");
          // 如果islike的值为1就修改为0，如果为0就修改为1；
           if(result3[0].islike==0){
             sql = 'update comment_like set islike=1 where users_id=? and comment_id=?';
             pool.query(sql,[users_id,comment_id],(err,result4)=>{
              if(err) throw err;
            console.log("2222222",result4);
            if(result4.affectedRows>0)res.send("1")
            });
           }else{
            sql = 'update comment_like set islike=0 where users_id=? and comment_id=?';
            pool.query(sql,[users_id,comment_id],(err,result5)=>{
             if(err) throw err;
           console.log("33333333",result5);
           if(result5.affectedRows>0)res.send("0")
           });
           }
         });
      }
  });

})

// 查询评论的点赞数量
server.get('/lovenum',(req,res)=>{
  let comment_id = req.query.comment_id;
  console.log(comment_id);
  let sql = 'select count(cid) AS count from comment_like where comment_id=? and islike=1';
  pool.query(sql,[comment_id],(err,result)=>{
    if(err)throw err;
    console.log("这里是评论点赞数量",result)
    res.send(result)
    // if(result.affectedRows>0){
  
    // }
  });
});



// 写新闻评论
server.get('/add_comment',(req,res)=>{
  let obj = req.query;
  console.log(obj)
  let sql = 'insert into comment1 set ?';
  pool.query(sql,[obj],(err,result1)=>{
    if(err)throw err;
    // console.log(result)
    if(result1.affectedRows>0){
      sql = "select * from comment1 order by cid desc limit 1";
      pool.query(sql,[obj],(err,result2)=>{
        console.log("6666666666",result2)
        if(err)throw err;
        //查询用户表
        console.log(obj.users_id)
        sql = "select * from user_house where uid=?";
        pool.query(sql,[obj.users_id],(err,result3)=>{
          if(err)throw err;
          console.log("999999999999",result3)
          res.send({result2:result2,result3:result3});
        });
      
    });
     
    }
  });
});

//帖子类型接口
server.get('/leixin',(req,res)=>{
  var yid=req.query.yid;
  var sql="select * from post_type where yid=?"
  pool.query(sql,[yid],(err,result)=>{
      if(err) throw err;
      res.send(result[0].y_type);
  });
});

//所有同类型帖子总数接口
server.get('/fatiezs',(req,res)=>{
  var yid=req.query.yid;
  var sql="select count(yid)as fatiezs from post where yid=?"
  pool.query(sql,[yid],(err,result)=>{
      if(err) throw err;
      res.send(result[0]);
  });
});

//同类型帖子所有评论总数接口
server.get('/leixinpinglunzs',(req,res)=>{
  var yid=req.query.yid;
  var sql="select count(yid)as leixinpinglunzs from comment where yid=?"
  pool.query(sql,[yid],(err,result)=>{
      if(err) throw err;
      console.log(result[0]);
      res.send(result[0]);
  });
});

//所有同类型帖子页面接口---根据类型id查询
server.get('/fatie',(req,res)=>{
  var yid=req.query.yid;
  var sql='select * from post where yid=?';
  pool.query(sql,[yid],(err,result)=>{
      if(err) throw err;
      res.send(result);
  })
});

//所有帖子接口
server.get('/about',(req,res)=>{
  var sql="select * from post";
  pool.query(sql,(err,result)=>{
      if(err) throw err
      res.send(result)
  });
});

//某一帖子接口---根据帖子id查询
server.get('/about1',(req,res)=>{
  var pid=req.query.pid
  var sql='select * from post where pid=?'
  pool.query(sql,[pid],(err,result)=>{
      if(err) throw err;
      res.send(result);
  });
});

//发帖接口----上传文件用到新技术
server.post('/url',(req,res)=>{
  //调用第三方模块formidable，创建请求解析对象
  var form = new formidable.IncomingForm();
  //设置文件编码---不设置也行，不影响
  form.encoding='utf-8';
  //设置文件上传服务器路径
  console.log(11111);
  form.uploadDir="../house/public/img";
  //设置单文件上传的文件大小
  form.maxFieldsSize = 2 * 1024 * 1024;
  //设置文件是否带扩展名----默认不带
  form.keepExtensions=true
  //调用方法获取请求文件以及数据
  form.parse(req, function(err, fields, files) {//fields--请求的数据，files--请求的文件对象
    console.log(files);
      //获取随机数
      var ran=parseInt(Math.random()*8999+1000);
      //修改文件名带有原扩展名
      var p_picture=ran+files.tupian.name
      //调用第三方模块修改文件上传下载到服务器地址时的文件名字，包括路径
      fs.renameSync(files.tupian.path,form.uploadDir+'/'+p_picture);
      //以下是向数据对象中添加数据
      var p_time=(new Date(files.tupian.lastModifiedDate)).getTime()
      fields.pid=null
      fields.p_time=p_time
      fields.p_picture=p_picture
      fields.forward_number=0
      fields.browse_number=0
      //添加所有数据给服务器
      var sql="INSERT INTO post SET ?"
      pool.query(sql,[fields],(err,result)=>{
          if(err) throw err;
          res.send("1");
      });
});
});

//发表评论接口
server.post('/pinglun',(req,res)=>{
  var form = new formidable.IncomingForm();
  form.parse(req,(err,fields, files)=>{
      fields.cid=null
      var sql="INSERT INTO comment SET ?"
      pool.query(sql,[fields],(err,result)=>{
          if(err) throw err;
          res.send("1");
      });
  });
});

//获取评论接口
server.get('/pinglun1',(req,res)=>{
  var pid=req.query.pid;
  var sql='select * from comment where pid=?'
  pool.query(sql,[pid],(err,result)=>{
          if(err) throw err;
          if(result.length>0){
          res.send(result);
      }else{
          res.send("0");
      }
  });
});

//对应帖子评论总数接口
server.get('/pinglunshu',(req,res)=>{
  var pid=req.query.pid;
  var sql="select count(pid)as plzs from comment where pid=?"
  pool.query(sql,[pid],(err,result)=>{
      if(err) throw err;
      res.send(result);
  });
});


//帖子点赞总数接口---包括对应帖子总点赞数和所有点赞详情
server.get('/dianzan',(req,res)=>{
  var pid=req.query.pid;
  var is_fabulous=1;
  var dzs=0;
  var dz=[];
  var sql='select count(pid)as zs from fabulous where pid=? and is_fabulous=?'
  pool.query(sql,[pid,is_fabulous],(err,result)=>{
      if(err) throw err;
      console.log(result);
      dzs=result
      var sql2='select * from fabulous where pid=? and is_fabulous=?'
      pool.query(sql2,[pid,is_fabulous],(err,result)=>{
        if(err) throw err;
        dz=result;
        res.send({message: "查询成功", code: 1,dz:dz,dzs:dzs})
    });
  });
});

//判断用户是否在当前帖子已点赞接口----没点赞就更改is_fabulous=1
server.get('/dianzan1',(req,res)=>{
  var pid=req.query.pid;
  var uid=req.query.uid;
  var upicture=req.query.upicture;
  var sql="select * from fabulous where pid=? and uid=?"
  pool.query(sql,[pid,uid],(err,result)=>{
      if(err) throw err;
      console.log(result);
      if(result.length==0 || result[0].is_fabulous==0){       
          if(result.length==0){
              var dx={fid:null,uid:uid,pid:pid,is_fabulous:1,upicture:upicture}
              var sql="INSERT INTO fabulous SET ?"
              pool.query(sql,[dx],(err,result)=>{
                  if(err) throw err;
                  if(result.affectedRows>0){
                    res.send({code: 1});
                  } 
              });
          }else{
              var sql2="update fabulous set is_fabulous=1 where pid=? and uid=?"
              pool.query(sql2,[pid,uid],(err,result)=>{
                console.log("11111111111111",result)
                  if(err) throw err;
                  if(result.affectedRows>0){
                    res.send({code: 1});
                  } 
              });
          }
      }else{        
          var sql3="update fabulous set is_fabulous=0 where pid=? and uid=?"
          pool.query(sql3,[pid,uid],(err,result)=>{
              if(err) throw err;
              if(result.affectedRows>0){
                res.send({code: 0});
              } 
          });
      }
  });
});

//查询某一用户在指定帖子中是否已点赞
server.get('/dianzan2',(req,res)=>{
  var pid=req.query.pid;
  var uid=req.query.uid;
  var sql="select * from fabulous where pid=? and uid=? and is_fabulous=1"
  pool.query(sql,[pid,uid],(err,result)=>{
      if(err) throw err;
      if(result.length!=0){
          res.send({code: 1});
      }else{
          res.send({code: 0});
      }
  });
});

//修改对应帖子浏览总数
server.post('/llzs',(req,res)=>{
  var form = new formidable.IncomingForm();
  form.parse(req,(err,fields)=>{
      var pid=fields.pid;
      var number=fields.number+1
      console.log(pid,number)
      var sql="update post set browse_number="+number+" where pid=?";
      pool.query(sql,[pid],(err,result)=>{
          if(err) throw err;
          res.send("1");
      });
  });
});

server.listen(3030,()=>{

  //Ctrl+`打开终端 node app.js启动服务器
  console.log('server is runing...');
});

