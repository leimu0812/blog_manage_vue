import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { TagsVO, TagsForm, TagsQuery } from '@/api/blog/tags/types';

export const getTagSelect = () => {
  return request({
    url: '/blog/tags/articlesSelect',
    method: 'get'
  });
};

/**
 * 查询文章标签管理列表
 * @param query
 * @returns {*}
 */

export const listTags = (query?: TagsQuery): AxiosPromise<TagsVO[]> => {
  return request({
    url: '/blog/tags/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询文章标签管理详细
 * @param id
 */
export const getTags = (id: string | number): AxiosPromise<TagsVO> => {
  return request({
    url: '/blog/tags/' + id,
    method: 'get'
  });
};

/**
 * 新增文章标签管理
 * @param data
 */
export const addTags = (data: TagsForm) => {
  return request({
    url: '/blog/tags',
    method: 'post',
    data: data
  });
};

/**
 * 修改文章标签管理
 * @param data
 */
export const updateTags = (data: TagsForm) => {
  return request({
    url: '/blog/tags',
    method: 'put',
    data: data
  });
};

/**
 * 删除文章标签管理
 * @param id
 */
export const delTags = (id: string | number | Array<string | number>) => {
  return request({
    url: '/blog/tags/' + id,
    method: 'delete'
  });
};
