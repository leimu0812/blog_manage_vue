import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { SiteStatsVO, SiteStatsForm, SiteStatsQuery } from '@/api/blog/siteStats/types';

/**
 * 查询网站统计列表
 * @param query
 * @returns {*}
 */

export const listSiteStats = (query?: SiteStatsQuery): AxiosPromise<SiteStatsVO[]> => {
  return request({
    url: '/blog/siteStats/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询网站统计详细
 * @param id
 */
export const getSiteStats = (id: string | number): AxiosPromise<SiteStatsVO> => {
  return request({
    url: '/blog/siteStats/' + id,
    method: 'get'
  });
};

/**
 * 新增网站统计
 * @param data
 */
export const addSiteStats = (data: SiteStatsForm) => {
  return request({
    url: '/blog/siteStats',
    method: 'post',
    data: data
  });
};

/**
 * 修改网站统计
 * @param data
 */
export const updateSiteStats = (data: SiteStatsForm) => {
  return request({
    url: '/blog/siteStats',
    method: 'put',
    data: data
  });
};

/**
 * 删除网站统计
 * @param id
 */
export const delSiteStats = (id: string | number | Array<string | number>) => {
  return request({
    url: '/blog/siteStats/' + id,
    method: 'delete'
  });
};
