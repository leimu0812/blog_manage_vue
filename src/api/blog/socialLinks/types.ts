export interface SocialLinksVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 图标
   */
  icon: string;

  /**
   * 标题
   */
  title: string;

  /**
   * 链接地址
   */
  url: string;

  /**
   * 排序顺序
   */
  sortOrder: number;

  /**
   * 状态：0-禁用 1-启用
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

export interface SocialLinksForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 图标
   */
  icon?: string;

  /**
   * 标题
   */
  title?: string;

  /**
   * 链接地址
   */
  url?: string;

  /**
   * 排序顺序
   */
  sortOrder?: number;

  /**
   * 状态：0-禁用 1-启用
   */
  status?: string;

}

export interface SocialLinksQuery extends PageQuery {

  /**
   * 标题
   */
  title?: string;

  /**
   * 链接地址
   */
  url?: string;

  /**
   * 状态：0-禁用 1-启用
   */
  status?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



