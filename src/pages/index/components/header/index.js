import Header from 'components/header'
import 'components/searchbox';

// 获取首页滚动条
const scrollContainer =document.getElementById('index-page');
const headerEI = scrollContainer.querySelector('.header');

// 实例化Header
new Header(headerEI,0,scrollContainer);