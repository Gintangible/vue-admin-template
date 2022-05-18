/**
 * 表示字典项。
 *
 * @author 胡海星
 */
class DictEntry {
  constructor(code = '', name = '') {
    this.id = '';
    this.code = code;
    this.name = name;
  }

  /**
  * 清空此对象，将其字段设置为默认值。
  *
  * @return {DictEntry}
  *     此对象本身。
  */
  clear() {
    return this.assign(new DictEntry());
  }

  /**
   * 复制一个普通的JSON对象的属性到此{@link DictEntry}对象。
   *
   * @param {Object} obj
   *     普通的JSON对象；如果是undefined或null，则会将此{@link DictEntry}对象所有字段
   *     重置为默认值。
   * @return {DictEntry}
   *     此对象本身。
   */
  assign(obj) {
    if (!obj) {
      return this.assign(new DictEntry());
    } else {
      this.id = obj.id || '';
      this.code = obj.code || '';
      this.name = obj.name || '';
      return this;
    }
  }

  /**
   * 深度克隆此对象。
   *
   * @return {DictEntry}
   *     此对象的深度克隆。
   */
  clone() {
    return new DictEntry().assign(this);
  }

  /**
   * 根据可选字典项列表，补全此字典项的所有属性。
   *
   * @param {Array} entries
   *     所有可选字典项列表。
   * @return {DictEntry}
   *     此对象本身。
   */
  completeFields(entries) {
    for (const e of entries) {
      if (e.id === this.id) {
        return this.assign(e);
      }
    }
    // 注意，必须把这两个for循环分开，应优先匹配ID，然后再匹配code
    for (const e of entries) {
      if (e.code === this.code) {
        return this.assign(e);
      }
    }
    return this;
  }

  /**
   * 从一个普通的JSON对象创建一个{@link DictEntry}对象。
   *
   * @param {Object} obj
   *    普通的JSON对象。
   * @return {DictEntry}
   *    该对象对应的{@link DictEntry}对象。
   */
  static create(obj) {
    return !obj ? null : new DictEntry().assign(obj);
  }

  /**
   * 从一个普通的JSON对象数组创建一个{@link DictEntry}对象数组。
   *
   * @param {Array} array
   *    普通的JSON对象数组。
   * @return {Array}
   *    该对象对应的{@link DictEntry}对象数组。
   */
  static createArray(array) {
    return Array.isArray(array) ? array.map((e) => DictEntry.create(e)) : null;
  }
}

export default DictEntry;
