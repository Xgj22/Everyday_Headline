// postcss.config.js
module.exports = {
    // 把 px 转化成 rem
    // 无法转换内联样式
    plugins: {
      'postcss-pxtorem': {
        // rootValue: 37.5,
        rootValue({ file }) {
            return file.indexOf('vant') !== -1 ? 37.5 : 75;
        },
        propList: ['*'],
      },
    },
};