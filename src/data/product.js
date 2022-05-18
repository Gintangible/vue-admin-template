// 产品编码
const PRODUCTS = {
  'ninghuibao-2021-picc-standard': {
    // el-select 默认值不能是数组
    key: 'ninghuibao-2021-picc-standard',
    label: '宁惠保一期',
    name: '宁惠保一期',
    value: ['ninghuibao-2021-picc-standard', 'ninghuibao-2021-picc-upgrade'],
  },
  'ninghuibao-2022-picc-standard': {
    key: 'ninghuibao-2022-picc-standard',
    label: '宁惠保二期',
    name: '宁惠保二期',
    value: ['ninghuibao-2022-picc-standard'],
  },
};

const productOptions = Object.values(PRODUCTS);
const firstProduct = PRODUCTS['ninghuibao-2021-picc-standard'];
const secondProduct = PRODUCTS['ninghuibao-2022-picc-standard'];
const defaultProduct = secondProduct;

export {
  firstProduct,
  secondProduct,
  defaultProduct,
  PRODUCTS,
  productOptions,
};
