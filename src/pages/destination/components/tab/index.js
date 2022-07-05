import './tab.css';

// setActiveItem(2)
// to(1)

// set(data)

import { getData, getDelayedData } from 'api/getData';

// https://www.imooc.com/api/mall-wepApp/destination/content/1

// [{url,text},{}]

import { URL, TAB_ITEM_CLASS, TAB_ACTIVE_ITEM_CLASS_NAME } from './config';

class Tab {
  constructor(el) {
    this.itemEls = el.querySelectorAll(TAB_ITEM_CLASS);
  }

//   通过传入的索引设置选中状态
  setActiveItem(index) {
    for (const itemEl of this.itemEls) {
      itemEl.classList.remove(TAB_ACTIVE_ITEM_CLASS_NAME);
    }

    this.itemEls[index].classList.add(TAB_ACTIVE_ITEM_CLASS_NAME);
  }

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

export default Tab;
