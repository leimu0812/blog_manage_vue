export interface UserInfoVO {
  /**
   * ID
   */
  id: string | number;

  /**
   * 用户名
   */
  username: string;

  /**
   * 昵称
   */
  nickname: string;

  /**
   * 头像
   */
  avatar: string;

  /**
   * 头像Url
   */
  avatarUrl: string;
  /**
   * 座右铭
   */
  motto: string;

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

export interface UserInfoForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number;

  /**
   * 用户名
   */
  username?: string;

  /**
   * 昵称
   */
  nickname?: string;

  /**
   * 头像
   */
  avatar?: string;

  /**
   * 座右铭
   */
  motto?: string;

  /**
   * 状态
   */
  status?: string;

}

export interface UserInfoQuery extends PageQuery {

  /**
   * 用户名
   */
  username?: string;

  /**
   * 昵称
   */
  nickname?: string;

  /**
   * 状态
   */
  status?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



