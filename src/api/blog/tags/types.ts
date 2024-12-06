export interface TagsVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 标签名称
   */
  name: string;

  /**
   * 标签类型
   */
  type: string;

  /**
   * 使用次数
   */
  count: number;

  /**
   * 状态
   */
  status: string;

  /**
   * 创建时间
   */
  createdAt: string;

  /**
   * 更新时间
   */
  updatedAt: string;

}

export interface TagsForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 标签名称
   */
  name?: string;

  /**
   * 标签类型
   */
  type?: string;

  /**
   * 状态
   */
  status?: string;

}

export interface TagsQuery extends PageQuery {

  /**
   * 标签名称
   */
  name?: string;

  /**
   * 状态
   */
  status?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



