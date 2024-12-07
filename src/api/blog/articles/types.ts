export interface ArticlesVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 文章标题
   */
  title: string;

  /**
   * 文章摘要
   */
  summary: string;

  /**
   * 文章内容
   */
  content: string;

  /**
   * 封面图片
   */
  coverImg: string;

  /**
   * 封面图片Url
   */
  coverImgUrl: string;
  /**
   * 分类
   */
  category: string;

  /**
   * 浏览量
   */
  views: number;

  /**
   * 是否置顶
   */
  isTop: number;

  /**
   * 状态
   */
  status: string;

  /**
   * 发布时间
   */
  publishTime: string;

  /**
   * 创建时间
   */
  createdAt: string;

  /**
   * 更新时间
   */
  updatedAt: string;
}

export interface ArticlesForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 文章标题
   */
  title?: string;

  /**
   * 文章摘要
   */
  summary?: string;

  /**
   * 文章内容
   */
  content?: string;

  /**
   * 封面图片
   */
  coverImg?: string;

  /**
   * 分类
   */
  category?: string;

  /**
   * 是否置顶
   */
  isTop?: number;

  /**
   * 状态
   */
  status?: string;

  /**
   * 发布时间
   */
  publishTime?: string;

  tags?: string[];
}

export interface ArticlesQuery extends PageQuery {
  /**
   * 文章标题
   */
  title?: string;

  /**
   * 文章摘要
   */
  summary?: string;

  /**
   * 分类
   */
  category?: string;

  /**
   * 是否置顶
   */
  isTop?: number;

  /**
   * 状态
   */
  status?: string;

  /**
   * 发布时间
   */
  publishTime?: string;

  /**
   * 创建时间
   */
  createdAt?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
