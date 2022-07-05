import 'swiper/swiper-bundle.min.css';
import './slider.css';
import Swiper from 'swiper/swiper-bundle.min';

import config, { SWIPER_CONTAINER_CLASS, URL, LAYOUT_ID} from './config';

// 传入幻灯片模板
import render from './slider.art'

// 传入API接口函数
import{getData,getDelayedData} from 'api/getData';

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

