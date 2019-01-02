/* 
1.安装mongoDB软件
    建议完全安装

2.Mongo环境设置:
    将mongo/bin文件夹打开,复制地址,然后在计算机-属性-高级属性设置-环境变量设置--上面的path(不要修改下面的path,下面的path是系统环境)-将地址新增到path中,就可以在任意位置调用mongo命令

3.创建文件夹
    在非系统盘下创建一个文件夹mongoDB, 再创建两个子文件夹,db/log

4.将mongoDB挂载为windows服务
    以管理员的身份运行cmd,并输入...,每次都要执行一次
    所以为了方便大家,建议将MongoDB安装为windows服务(重点中的重点)

    1)使用命令挂载服务
        mongod --dbpath "F:\mongoDB\db" --logpath "F:\mongoDB\log\mongodb.log" --install --serviceName "MongoDB"
        告诉服务器,将所有的数据库放在db文件夹中，将所有的日志放在log文件夹中
    2)服务如何查看
        在计算机上右击 -> 管理 -> 服务和应用程序 -> 服务 -> 在下方有个扩展/标准 -> 标准

    3)补充说明服务命令
        net start mongodb   //开启服务
        net stop mongodb    //关闭服务
        sc delete mongodb   //卸载服务

/////////////////////////////////////////////////////////
最新版mongoDB已经自动安装data与log文件,并且自动运行,我们只需要将mongodb\bin文件路径设置为全局环境变量(path下)即可
      

*/