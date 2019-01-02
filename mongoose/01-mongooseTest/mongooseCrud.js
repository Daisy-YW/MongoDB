//引入mongoose模块
const mongoose = require('mongoose');

//使用mongoose模块链接数据库
mongoose.connect('mongodb://127.0.0.1/web',(err)=>{
    //如果有错
    if(err){
        //抛出错误
        throw err;
    //否则
    }else{
        //打印数据连接成功
        console.log("数据库连接成功...")
    }
})

//创建数据库骨架
const userSchema = new mongoose.Schema({
    name: String,
    age: Number
})

/* 发布模型 */
const userModel = mongoose.model('user',userSchema,'user');

/* ------------------------------新增数据---------------------------- */

/* 创建实体 */
//什么时候使用 , 什么时候准备
/* let instance = new userModel();

//把新增的数据挂载到实体上
instance.name = "吕布";
instance.age = 32;

//执行数据保存操作(save())
instance.save((err)=>{
    if(err){
        throw err;
    }else{
        console.log('新增数据储存成功...')
    }
}) */



/* ------------------------------删除数据---------------------------- */
/* 
    删除数据步骤:
        1) 删除数据必须通过ID删除(ID是唯一的)
        2) 先准备一个ID
        3) 根据ID把这一条数据查询出来    findById(id)
        4)执行删除操作      remove()方法
            判断 如果有错就抛出错误, 否则打印删除成功
*/
//准备一个需要删除的数据ID---小李飞刀
/*     const id = '5bc2f1287fd4bb0844e55c17';
//根据Id查询数据
    //模型可以用来查询数据
    userModel.findById(id,(err,data)=>{
        //这个错误是查询的错误
        if(err){
            throw err;
        }else{
            console.log('已查询的数据:',data);
            // 执行删除操作
            data.remove((err)=>{
                //这个错误是删除的错误
                if(err){
                    throw err;
                }else{
                    console.log('删除数据成功');
                }
            })
        }
    }) */


/* ------------------------------查询数据---------------------------- */
/* 
    find({})    //可以查询所有数据     注意***: 查询结果是一个数组
    find({key:value})    //按条件查询      注意***: 查询结果是一个数组
    findById(id)        //按ID查询      注意***: 查询结果是一个对象
*/
//数据不足,新增一个数据
   /*  let instance = new userModel();
    instance.name = "周瑜";
    instance.age = 30;
    // 执行保存
    instance.save((err,data)=>{
        if(err){
            throw err;
        }else{
            console.log('添加数据成功'+data);
        }
    }) */
//查询所有数据
    /* userModel.find({},(err,data)=>{
        if(err){
            throw err;
        }else{
            console.log('查询所有数据结果',data);
            // data.remove()
        }
    }) */

//按条件查询
    /* userModel.find({"age":18},(err,data)=>{
        if(err){
            throw err;
        }else{
            console.log("按条件查询的数据:",data);
        }
    }) */

//根据ID查询
    /* let id = '5bc2ff5e08eaaf3b4cfaa253';
    userModel.findById(id,(err,data)=>{
        if(err){
            throw err;
        }else{
            console.log('根据id查询出来的结果:',data);
        }
    }) */


//查询数据如何链式操作/
/*     userModel.find({},(err,data)=>{
        if(err){
            throw err;
        }else{
            console.log(data);
        }
    }); */

//链式操作写法(推荐写法*****************************************)
    // userModel.find({}).exec((err,data)=>{
    //     if(err){
    //         throw err;
    //     }else{
    //         console.log(data);
    //         console.log('----------------------------');
    //     }
    // })
    // /*---------------------------*/
    // /* 进行排序 */
    // userModel.find({}).sort({'age':1}).exec((err,data)=>{
    //     if(err){
    //         throw err;
    //     }else{
    //         console.log("排序后的数据:",data);
    //         console.log('----------------------------');
    //     }
    // });
    // /* 获取排序后的第二条和第三条数据 */
    // userModel.find({}).sort({'age':1}).skip(1).limit(2).exec((err,data)=>{
    //     if(err){
    //         throw err;
    //     }else{
    //         console.log("截取第二第三条数据:",data);
    //         console.log('----------------------------');
    //     }
    // })




/* ------------------------------修改数据---------------------------- */
/* 
    修改数据步骤:
        1) 根据ID把要修改的数据查询出来    userModel.findById()
        2) 查出数据重新操作
        3) 复制以后，执行保存
            判断: 如果有错,抛出错误,没有错误,打印执行成功
*/
//修改小乔为大乔
const id = "5bc2ff9f428ac808442d085f";
userModel.findById(id).exec((err,data)=>{
    if(err){
        throw err;
    }else{
        console.log('查询出来的数据:',data);
        //给找出来的数据重新赋值
        data.name = '大乔';
        data.age = 23;
        // console.log('修改后的数据是: '+data);
        //执行保存
        data.save((err,data)=>{      //这里无法使用exec()
            if(err){
                throw err;
            }else{
                console.log('已成功修改数据:',data)
            }
        })
    }
})

//补充: 如何删除所有数据-------------------------
/* 
    1) 查询出所有数据 , 结果是数组
    2) 遍历删除
*/
userModel.find({}).exec((err,data)=>{
    if(err){
        throw err;
    }else{
        //遍历删除数据
        for(let i = 0 ;i<data.length;i++){
            console.log(data[i]);
            data[i].remove();
        }
        console.log('删除所有数据成功!');
    }
})











