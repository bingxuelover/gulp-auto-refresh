# 简介

- 前端开发的脚手架，启动服务后，修改文件后自动重载。
- 使用gulp相关的技术。

# 使用

## 初始化安装依赖文件

npm install

## 启动动态监控服务

gulp serve

- public文件夹里的scss和js文件修改后，会自动编译到dist文件夹里，包括压缩前和压缩后两份文件。
- dist中文件的修改，都会触发自动重载页面。

## 一次性执行

gulp default

## 实时监控变化

gulp watch

## npm start启动服务

- 页面中使用了ajax的load等功能在gulp serve启动的服务中，不能正常运行；
- 这时就需要用node启动服务来运行，然后启动gulp watch进行监控。

操作方法：

- npm start 启动<http://localhost:9000/index.html>服务

- gulp watch 监控文件变化，自动压缩修改的文件，但是页面不会刷新，需要手动刷新

# 技术点

## gulp

- gulp-rename 重命名
- gulp-sass 解析css文件
- gulp-uglif 压缩js文件
- gulp-watch 非必需，在不使用下面的watch功能的时候，直接使用watch监听文件修改；
- gulp-concat 合并多个文件为一个文件
- gulp-clean-css 压缩css文件
- express 启动node服务器

## 启动自动重载服务

browser-sync 自带watch功能
