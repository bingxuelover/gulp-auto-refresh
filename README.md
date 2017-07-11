#简介

前端开发的脚手架，启动服务后，修改文件后自动重载。
使用gulp相关的技术。


#使用

1.初始化安装依赖文件
npm install

2.启动动态监控服务
gulp serve

public文件夹里的scss和js文件修改后，会自动编译到dist文件夹里，包括压缩前和压缩后两份文件。
dist中文件的修改，都会触发自动重载页面。

3.一次性执行
gulp default


#技术点

##gulp
gulp-rename 重命名
gulp-sass 解析css文件
gulp-uglif 压缩js文件
gulp-watch 非必需，在不使用下面的watch功能的时候，直接使用watch监听文件修改；

##启动自动重载服务
browser-sync
自带watch功能
