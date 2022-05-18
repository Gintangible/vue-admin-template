import config from '@/config';

class Page {
  constructor() {
    this.total_count = 0;
    this.page_index = 1;
    this.page_size = config.data_page_size;
  }

  clear() {
    return this.assign(new Page());
  }

  assign(obj) {
    if (!obj) {
      return this.assign(new Page());
    } else {
      this.total_count = obj.total_count || 0;
      this.page_index = obj.page_index || 1;
      this.page_size = obj.page_size || config.data_page_size;
      return this;
    }
  }

  clone() {
    return new Page().assign(this);
  }

  static create(obj) {
    return !obj ? null : new Page().assign(obj);
  }

  static createArray(array) {
    return Array.isArray(array) ? array.map((e) => Page.create(e)) : null;
  }
}

export default Page;
