/* 
1. 什么是mongoose?
    它是node.js 的第三方模块,主要用来操作MongoDB数据库的

2. mongoose的使用基本步骤(链接数据库的结拜呢步骤)
    
    1) 新建一个文件夹--初始化--生成包描述文件 package.json
    cmd中生成命令 npm init -y

    2) 进入这个文件夹,局部安装(这个文件夹里面安装)
mongoose,并且保存到依赖列表
     cnpm mongoose --save
     
    3) 新建一个js文件,来使用mongoose(文件名: mongooseCrud.js)
        a) 引入mongose模块
            const mongose = require('mongose');
        b) 链接数据库
            //mongodb数据库的默认端口号
            mongose.connect('mongodb://127.0.0.1:20717/数据库的名字',(err)=>{
                if(err){
                    throw err;  //如果报错 ,抛出错误
                }else{
                    console.log('数据库链接成功')     //否则答应数据库链接成功
                }
            })   

            说明:
                connect()   链接数据库的方法
                mongodb://  协议
                127.0.0.1(localhost) 本地服务器(自己的电脑)
                27017        mongodb数据库的默认端口号
                数据库名字: 如果有直接链接,如果没有,自动创建(推荐 创建好后再链接)

3. 操作数据库前,再准备散步
    1)定义骨架(用于定义数据类型)
        const userSchema =  new mongoose.Schema({
            name:String,
            age:Number
        })
        说明: 相当于定义一个数据库的所有数据字段和数据类型
           比如:姓名-字符串类型/年龄-数字类型
           只有骨架定义的字段才能操作,要注意定义字段的数据类型
        注意（***）：骨架只是定义了数据结构和类型，不具备操作数据库的能力

    2) 使用骨架发布模型
        let userModel = mongoose.model('user', userSchema,'user');
        说明:
            model(参数1,参数2,参数3)
                参数1: 模型名,没有什么用   占位
                参数2: 要用来发布这个模型的  骨架名
                参数3: 集合名(数据库里面先写好这个集合名, 如果没有会自动创建--相当于创建一个数据库)
        注意（***）：模型主要用来查询数据

    3) 使用模型创建实体（实体一般什么地方使用，就在什么地方创建）
        let instance = new nserModel();

        注意（***）：实体主要用来新增数据，还有其他操作，配合模型来完成；

     
*/