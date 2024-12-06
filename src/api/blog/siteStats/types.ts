export interface SiteStatsVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 统计项名称
   */
  name: string;

  /**
   * 统计值
   */
  value: number;

  /**
   * 创建时间
   */
  createdAt: string;

  /**
   * 更新时间
   */
  updatedAt: string;

}

export interface SiteStatsForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 统计项名称
   */
  name?: string;

  /**
   * 统计值
   */
  value?: number;

  /**
   * 创建时间
   */
  createdAt?: string;

  /**
   * 更新时间
   */
  updatedAt?: string;

}

export interface SiteStatsQuery extends PageQuery {

  /**
   * 统计项名称
   */
  name?: string;

  /**
   * 统计值
   */
  value?: number;

  /**
   * 创建时间
   */
  createdAt?: string;

  /**
   * 更新时间
   */
  updatedAt?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



