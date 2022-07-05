import { SUCC_CODE, TIMEOUT } from 'api/config';
import { getJSON } from './ajax';

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

// 延时
const delay = ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

// 获取延迟的数据
const getDelayedData = (url, options) => {
  return delay(1000).then(() => {
    return getData(url, options);
  });
};

export { getData, getDelayedData };
