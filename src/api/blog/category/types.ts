export interface CategoryVO {
  /**
   * 分类ID
   */
  categoryId: string | number;

  /**
   * 分类名称
   */
  categoryName: string;

  /**
   * 分类描述
   */
  description: string;

  /**
   * 图标
   */
  icon: string;

  /**
   * 文章数量
   */
  articleCount: number;

  /**
   * 显示顺序
   */
  sortOrder: number;

  /**
   * 状态
   */
  status: string;

}

export interface CategoryForm extends BaseEntity {
  /**
   * 分类ID
   */
  categoryId?: string | number;

  /**
   * 分类名称
   */
  categoryName?: string;

  /**
   * 分类描述
   */
  description?: string;

  /**
   * 图标
   */
  icon?: string;

  /**
   * 显示顺序
   */
  sortOrder?: number;

  /**
   * 状态
   */
  status?: string;

}

export interface CategoryQuery extends PageQuery {

  /**
   * 分类名称
   */
  categoryName?: string;

  /**
   * 显示顺序
   */
  sortOrder?: number;

  /**
   * 状态
   */
  status?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



