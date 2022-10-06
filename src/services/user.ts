import { baseAxios } from '@/utils';

// 获取用户信息；
export const fetchAuthInfo = () => baseAxios.get(`/auth/current`, { baseURL: '' });
