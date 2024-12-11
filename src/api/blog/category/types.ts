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
   * 状态（0停用 1正常）
   */
  status: string;

  /**
   * 创建时间
   */
  createTime: string;

  /**
   * 更新时间
   */
  updateTime: string;

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
   * 状态（0停用 1正常）
   */
  status?: string;

}

export interface CategoryQuery extends PageQuery {

  /**
   * 分类名称
   */
  categoryName?: string;

  /**
   * 分类描述
   */
  description?: string;

  /**
   * 状态（0停用 1正常）
   */
  status?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



