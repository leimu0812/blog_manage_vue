import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { UserInfoVO, UserInfoForm, UserInfoQuery } from '@/api/blog/userInfo/types';

/**
 * 查询信息管理列表
 * @param query
 * @returns {*}
 */

export const listUserInfo = (query?: UserInfoQuery): AxiosPromise<UserInfoVO[]> => {
  return request({
    url: '/blog/userInfo/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询信息管理详细
 * @param id
 */
export const getUserInfo = (id: string | number): AxiosPromise<UserInfoVO> => {
  return request({
    url: '/blog/userInfo/' + id,
    method: 'get'
  });
};

/**
 * 新增信息管理
 * @param data
 */
export const addUserInfo = (data: UserInfoForm) => {
  return request({
    url: '/blog/userInfo',
    method: 'post',
    data: data
  });
};

/**
 * 修改信息管理
 * @param data
 */
export const updateUserInfo = (data: UserInfoForm) => {
  return request({
    url: '/blog/userInfo',
    method: 'put',
    data: data
  });
};

/**
 * 删除信息管理
 * @param id
 */
export const delUserInfo = (id: string | number | Array<string | number>) => {
  return request({
    url: '/blog/userInfo/' + id,
    method: 'delete'
  });
};
