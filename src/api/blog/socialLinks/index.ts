import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { SocialLinksVO, SocialLinksForm, SocialLinksQuery } from '@/api/blog/socialLinks/types';

/**
 * 查询社交链接管理列表
 * @param query
 * @returns {*}
 */

export const listSocialLinks = (query?: SocialLinksQuery): AxiosPromise<SocialLinksVO[]> => {
  return request({
    url: '/blog/socialLinks/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询社交链接管理详细
 * @param id
 */
export const getSocialLinks = (id: string | number): AxiosPromise<SocialLinksVO> => {
  return request({
    url: '/blog/socialLinks/' + id,
    method: 'get'
  });
};

/**
 * 新增社交链接管理
 * @param data
 */
export const addSocialLinks = (data: SocialLinksForm) => {
  return request({
    url: '/blog/socialLinks',
    method: 'post',
    data: data
  });
};

/**
 * 修改社交链接管理
 * @param data
 */
export const updateSocialLinks = (data: SocialLinksForm) => {
  return request({
    url: '/blog/socialLinks',
    method: 'put',
    data: data
  });
};

/**
 * 删除社交链接管理
 * @param id
 */
export const delSocialLinks = (id: string | number | Array<string | number>) => {
  return request({
    url: '/blog/socialLinks/' + id,
    method: 'delete'
  });
};
