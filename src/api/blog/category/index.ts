import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { CategoryVO, CategoryForm, CategoryQuery } from '@/api/blog/category/types';

/**
 * 查询文章分类列表
 * @param query
 * @returns {*}
 */

export const listCategory = (query?: CategoryQuery): AxiosPromise<CategoryVO[]> => {
  return request({
    url: '/blog/category/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询文章分类详细
 * @param categoryId
 */
export const getCategory = (categoryId: string | number): AxiosPromise<CategoryVO> => {
  return request({
    url: '/blog/category/' + categoryId,
    method: 'get'
  });
};

/**
 * 新增文章分类
 * @param data
 */
export const addCategory = (data: CategoryForm) => {
  return request({
    url: '/blog/category',
    method: 'post',
    data: data
  });
};

/**
 * 修改文章分类
 * @param data
 */
export const updateCategory = (data: CategoryForm) => {
  return request({
    url: '/blog/category',
    method: 'put',
    data: data
  });
};

/**
 * 删除文章分类
 * @param categoryId
 */
export const delCategory = (categoryId: string | number | Array<string | number>) => {
  return request({
    url: '/blog/category/' + categoryId,
    method: 'delete'
  });
};
