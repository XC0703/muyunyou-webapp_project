<a name="mAfxM"></a>
### 1. 项目开发前言
<a name="Xz7A0"></a>
#### 1.1 三大目标

- 移动端屏幕适配
- 模块化和组件化
- 在项目中使用Ajax获取服务器端数据
<a name="Fdm1n"></a>
#### 1.2 技术选型

- 开发语言：ES6
- 获取数据：Ajax
- 打包工具：Webpack
- 模板引擎：art-template
- 触摸滑动库：Swiper

---

<a name="p2H2f"></a>
### 2.项目目录结构
src：源码目录<br />api：存放Ajax相关的目录<br />assets：存放资源相关的目录<br />fonts：字体目录<br />icons：字体图标目录<br />styles：样式资源目录<br />components：公共组件目录<br />header：头部组件（每张页面的头部只是样式与功能公用，但结构不<br />同，即此处存放相关的js与css，art文件存放在各自的header组件文件夹<br />里。同时，这里面也要有一个index.js文件，方便调用。）<br />searchbox：搜索框组件<br />tabbar：底部标签栏组件<br />backtop：返回底部按钮组件（每张页面的此按钮具体有所差别，因此<br />这里是实现一个类而不去实例化）<br />loading：加载组件<br />pages：存放页面目录<br />index：首页<br />components：首页页面级组件目录<br />header：首页头部<br />nav：首页导航栏<br />product：商品折扣目录<br />slider：幻灯片组件<br />backtop：首页返回顶部按钮实例<br />index.art：首页模板文件<br />index.css：首页样式文件<br />index.js：首页js文件<br />destination：目的地页<br />components：目的地页页面级组件目录<br />header：目的地页头部<br />tab：左边标签组件<br />content：右边内容组件<br />main：主体部分组件<br />backtop：目的地页返回顶部按钮实例<br />destination.art：目的地页模板文件<br />idestination.css：目的地页页样式文件<br />index.js：目的地页js文件（不用idestination.js命名是因为js文件<br />是配置Webpack时会使用到，这样方便调用）<br />personal：个人中心页<br />details：详情页<br />utils：存放一些公共功能（如首页header组件与与backtop组件类似，可以抽离出来。本地存储等）

---

<a name="fAKn6"></a>
### 3. 搭建开发环境

1. 项目初始化，创建package.json文件，一路回车
```javascript
npm init
```

2. 安装所需要的包
```javascript
//开发依赖
npm install --save-dev css-loader@4.2.1 style-loader@1.2.1 file-loader@6.0.0 url-loader@4.1.0 art-template-loader@1.4.3 html-webpack-plugin@4.3.0 webpack@4.44.1 @webpack-cli@3.3.12 webpack-dev-server@3.11.0
//生产依赖
npm install art-template@4.13.2 swiper@6.1.1
```

3. 配置package.json
```javascript
{
  "name": "muyunyou-webapp_project",
  "version": "1.0.0",
  "description": "慕云游商城移动端",
  "main": "index.js",
  "scripts": {
    "start": "webpack-dev-server--open chrome"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "art-template-loader": "^1.4.3",
    "css-loader": "^4.2.1",
    "file-loader": "^6.0.0",
    "html-webpack-plugin": "^4.3.0",
    "style-loader": "^1.2.1",
    "url-loader": "^4.1.0",
    "webpack": "^4.44.1",
    "webpack-cli": "^3.3.12",
    "webpack-dev-server": "^3.11.0"
  },
  "dependencies": {
    "art-template": "^4.13.2",
    "swiper": "^6.1.1"
  }
}

```

4. 配置webpack

webpack.config.js：（增加页面时，要配置好响应的入口文件entry以及plugins）
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 获取绝对路径
const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
  mode: 'development',
  // Webpack 入口文件
  entry: {
    index: './src/pages/index',
    destination: './src/pages/destination',
    details: './src/pages/details',
    personal: './src/pages/personal'
  },
  // Webpack 输出路径
  output: {
    // 输出的目录
    path: resolve('dist'),
    // 输出的文件名
    filename: 'js/[name].js'
  },
  // source-map，调试用的，出错的时候，将直接定位到原始代码，而不是转换后的代码
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    // 自动补全（可以省略）的扩展名
    extensions: ['.js'],
    // 路径别名
    alias: {
      api: resolve('src/api'),
      icons: resolve('src/assets/icons'),
      styles: resolve('src/assets/styles'),
      components: resolve('src/components'),
      pages: resolve('src/pages'),
      utils: resolve('src/utils')
    }
  },
  // 不同类型模块的处理规则
  module: {
    rules: [
      // css
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // 模板文件
      {
        test: /\.art$/,
        loader: 'art-template-loader'
      },
      // 图片
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        options: {
          // 小于 10K 的图片转成 base64 编码的 dataURL 字符串写到代码中
          limit: 10000,
          // 其他的图片转移到
          name: 'images/[name].[ext]',
          esModule: false
        }
      },
      // 字体文件
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    // 自动将依赖注入 html 模板，并输出最终的 html 文件到目标文件夹
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/pages/index/index.art',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: 'destination.html',
      template: './src/pages/destination/destination.art',
      chunks: ['destination']
    }),
    new HtmlWebpackPlugin({
      filename: 'details.html',
      template: './src/pages/details/details.art',
      chunks: ['details']
    }),
    new HtmlWebpackPlugin({
      filename: 'personal.html',
      template: './src/pages/personal/personal.art',
      chunks: ['personal']
    })
  ]
};
```

---

<a name="G4c9t"></a>
### 4. 开发中的注意事项
<a name="yQwih"></a>
#### 4.1 页面的样式设置问题
页面的样式写好后，必须在index.js中引入才会起作用
```javascript
//样式
import 'styles/reset.css';//（基本所有网站都通用的样式）
import 'styles/base.css';//（针对此项目的样式）
import 'styles/layout.css';
import 'index.css';
```

---

<a name="i7g5t"></a>
#### 4.2 组件的设计及引入步骤
下面以首页的header为例：<br />1、首页的header的结构在index里面的components里面的header组件文件夹里面的header.art里定义。<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/27865087/1656902346474-7c8e5746-a9ba-4b33-9e7b-c3051ff92dc7.png#clientId=u17fe65b4-5f3a-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=371&id=u3c3dfa9c&margin=%5Bobject%20Object%5D&name=image.png&originHeight=790&originWidth=258&originalType=binary&ratio=1&rotation=0&showTitle=false&size=41558&status=done&style=none&taskId=u58eab215-681e-48d2-ba30-4e3f169e53b&title=&width=121)<br />2、首页的header的样式在公共组件components里面的header组件文件夹里面的header.css里面设置。然后通过并列的index.js文件进行初步引入（index.js里面设置响应功能动画，记得包装成类，方便复用）。<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/27865087/1656902310354-f3661be5-3790-430c-8b68-13cabbc6bd4f.png#clientId=u17fe65b4-5f3a-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=363&id=udddd866f&margin=%5Bobject%20Object%5D&name=image.png&originHeight=790&originWidth=256&originalType=binary&ratio=1&rotation=0&showTitle=false&size=41792&status=done&style=none&taskId=udee98e5c-7c4f-4def-b228-912c1672376&title=&width=117.66667175292969)![image.png](https://cdn.nlark.com/yuque/0/2022/png/27865087/1656902483216-c681dd54-a194-421f-8ad1-bf4a0b2cd824.png#clientId=u17fe65b4-5f3a-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=364&id=u8b5859de&margin=%5Bobject%20Object%5D&name=image.png&originHeight=789&originWidth=258&originalType=binary&ratio=1&rotation=0&showTitle=false&size=41618&status=done&style=none&taskId=u3c3dd4d2-0142-451a-b074-388fb215b75&title=&width=119)
```javascript
import './header.css'
```
3、然后在index里面的components里面的header组件文件夹里面的index.js把公共组件中设置的样式或功能引入所需位置，完整一个组件的设计。<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/27865087/1656902587389-710b0555-1c30-4b65-ae65-fe1ad8bc152e.png#clientId=u17fe65b4-5f3a-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=360&id=u5297b5b3&margin=%5Bobject%20Object%5D&name=image.png&originHeight=792&originWidth=255&originalType=binary&ratio=1&rotation=0&showTitle=false&size=41457&status=done&style=none&taskId=u92e42a71-8e3a-45fa-a0e8-bc2c4d480b4&title=&width=116)
```javascript
import 'components/header'
```
4、然后把组件引入所需页面，首先通过所需页面的index.js引入组件。<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/27865087/1656902822995-7ba128c8-9cf6-4062-8b31-7b08d6c328ac.png#clientId=u17fe65b4-5f3a-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=391&id=u0a3fcbc0&margin=%5Bobject%20Object%5D&name=image.png&originHeight=772&originWidth=256&originalType=binary&ratio=1&rotation=0&showTitle=false&size=41507&status=done&style=none&taskId=u99852842-bd73-4d89-a2dc-379f4b273f9&title=&width=129.6666717529297)
```javascript
// 组件
import './components/header'
```
5、然后在所需页面的index.art中将组件嵌入页面中，完成所有步骤。<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/27865087/1656902926125-1b5bab6c-979a-43f9-90e3-e104fa72483d.png#clientId=u17fe65b4-5f3a-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=346&id=u27a74b71&margin=%5Bobject%20Object%5D&name=image.png&originHeight=736&originWidth=259&originalType=binary&ratio=1&rotation=0&showTitle=false&size=38816&status=done&style=none&taskId=ud61230fd-0394-4c7a-a32e-18317ca1d70&title=&width=121.66667175292969)
```javascript
<!-- 头部 -->
<header class="header-layout">
  {{include './components/header/header.art'}}
</header>
```

---

<a name="tSNzm"></a>
#### 4.2 使用Ajax获取幻灯片组件的数据的步骤
1、幻灯片的位置默认是加载组件
```javascript
<!-- 幻灯片 -->
<div id="index-slider" class="slider-layout">
  {{include '../../components/loading/loading.art'}}
</div>
```
2、将提前准备好的幻灯片模板与API接口函数传入slider组件中的index.js
```javascript
// 传入幻灯片模板
import render from './slider.art'

// 传入API接口函数
import{getData,getDelayedData} from 'api/getData';
```
3、通过getData向URL发送请求，得到数据后与模板进行结合，起到替换原本加载中样式的作用
```javascript
// 通过getData向URL发送请求，得到数据后与模板进行结合，起到替换原本加载中样式的作用
getData(URL).then(
  data=>{
    document.getElementById(LAYOUT_ID).innerHTML = render({
      // 通过对象展开，将原本swiper的配置与imgs合并为一个对象，方便一并传入使用,在控制功能的同时还控制了结构
      ...config,
      ...{
        imgs:data   //将render作为一个对象，该对象加上imgs属性，存放获取到的图片数据
      }  
    });
    // https://www.swiper.com.cn/api/index.html
    new Swiper(SWIPER_CONTAINER_CLASS, config);
  }
)
```
4、幻灯片模板slider.art中，将第三步合并得到的对象嵌入到模板中，控制功能的同时控制结构
```javascript
<div class="swiper-container">
    <div class="swiper-wrapper">
      <!-- 控制功能 -->
      <!-- 遍历swiper-slide,图片替换为链接 -->
      {{each imgs}}
      <div class="swiper-slide">
        <a href="javascript:;">
          <img src="{{$value.url}}" alt="" class="swiper-img" />
        </a>
      </div>
      {{/each}}
    </div>
    <!-- 控制结构，在幻灯片的配置中可以来配置，此处起到判断是否配置的作用 -->
    <!-- 如果需要分页器 -->
    {{if pagination && pagination.el}}
    <div class="swiper-pagination"></div>
    {{/if}}
  
    <!-- 如果需要导航按钮 -->
    {{if navigation && navigation.prevEl}}
    <div class="swiper-button-prev"></div>
    {{/if}}
    {{if navigation && navigation.nextEl}}
    <div class="swiper-button-next"></div>
    {{/if}}
  
    <!-- 如果需要滚动条 -->
    {{if scrollbar && scrollbar.el}}
    <div class="swiper-scrollbar"></div>
    {{/if}}
</div>
```
5、幻灯片的配置config.js中，可以进行相关配置，也可以将需要的东西在这里包装成一个常量传出去
```javascript
// Swiper 配置
export default {
    // 循环模式选项
    loop: true,
    // 是否需要分页器
    pagination: {
        el: '.swiper-pagination'
    },
    // 是否需要前进后退按钮
    //   navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev'
    //   },
    // 是否需要滚动条
    //   scrollbar: {
    //     el: '.swiper-scrollbar'
    //   }
};

// 包装成常量
export const SWIPER_CONTAINER_CLASS = '.swiper-container';
export const URL = 'https://www.imooc.com/api/mall-wepApp/index/slider';
export const LAYOUT_ID = 'index-slider';
```

---

<a name="M6zET"></a>
#### 4.3 Ajax请求中断问题
1、在目的地页开发中，我们通过选择选项卡来发送响应的请求，如果我们频繁切换选项，则当前请求<br />时，上一次请求可能还在继续进行，容易造成资源浪费以及bug，因此要及时中断上一次请求。<br />2、通过xhr属性的abort方法来完成中断请求操作，首先要更改Ajax中所封装的getData方法，防止所<br />返回的promise对象的xhr属性的丢失。<br />getData.js：
```javascript
// // 获取数据--改之前
// const getData = (url, options) => {
//   // 在ajax中封装的getJSON方法返回的是一个promise对象，里面含有xhr属性，而xhr属性含有一个abort方法，可以用于终止请求
//   //此处返回的是调用getJSON方法得到的promise对象1调用then方法得到的promise对象2，xhr属性丢失，因此要改代码来实现终止请求
//   return getJSON(url, { timeoutTime: TIMEOUT, ...options })
//     .then(response => {
//       if (response.code !== SUCC_CODE) throw new Error('出错了');

//       return response.data;
//     })
//     .catch(err => console.log(err));
// };
// 获取数据--改之后
const getData = (url, options) => {
  // 将两次得到的promise对象分别保存下来
  const ajaxPromise = getJSON(url, { timeoutTime: TIMEOUT, ...options });
  const resultPromise = ajaxPromise
    .then(response => {
      if (response.code !== SUCC_CODE) throw new Error('出错了');

      return response.data;
    })
    .catch(err => console.log(err));
  
  // 将promise对象1的xhr属性传递给promise对象2来返回
  resultPromise.xhr = ajaxPromise.xhr;

  return resultPromise;
};
```
首页的index.js：
```javascript
// // 通过传入的索引发送请求--改之前
//   to(index) {
//     this.setActiveItem(index);

//     return getData(`${URL}/${this.itemEls[index].dataset.id}`);
//   }
// }

// 通过传入的索引发送请求--改之后
to(index) {
  // 通过调用xhr属性的abort方法来取消上一次的请求
  if (this.dataPromise && this.dataPromise.xhr) {
    this.dataPromise.xhr.abort();
  }
  this.setActiveItem(index);
  this.dataPromise = getData(`${URL}/${this.itemEls[index].dataset.id}`);
  return this.dataPromise;
}
}
```

---

<a name="rVuHM"></a>
#### 4.4 本地存储问题
1、没有必要每次点击都像服务端发送一个新的请求，一个好的解决办法便是使用本地缓存。<br />2、使用sessionStorage。
