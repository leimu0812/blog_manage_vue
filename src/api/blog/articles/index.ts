import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { ArticlesVO, ArticlesForm, ArticlesQuery } from '@/api/blog/articles/types';

/**
 * 查询文章管理列表
 * @param query
 * @returns {*}
 */

export const listArticles = (query?: ArticlesQuery): AxiosPromise<ArticlesVO[]> => {
  return request({
    url: '/blog/articles/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询文章管理详细
 * @param id
 */
export const getArticles = (id: string | number): AxiosPromise<ArticlesVO> => {
  return request({
    url: '/blog/articles/' + id,
    method: 'get'
  });
};

/**
 * 新增文章管理
 * @param data
 */
export const addArticles = (data: ArticlesForm) => {
  return request({
    url: '/blog/articles',
    method: 'post',
    data: data
  });
};

/**
 * 修改文章管理
 * @param data
 */
export const updateArticles = (data: ArticlesForm) => {
  return request({
    url: '/blog/articles',
    method: 'put',
    data: data
  });
};

/**
 * 删除文章管理
 * @param id
 */
export const delArticles = (id: string | number | Array<string | number>) => {
  return request({
    url: '/blog/articles/' + id,
    method: 'delete'
  });
};
