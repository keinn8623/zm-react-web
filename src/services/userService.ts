import api from './api';

interface User {
  id: number;
  name: string;
  email: string;
}

export const userService = {
  // 获取用户列表
  getUsers: async (): Promise<User[]> => {
    return api.get('/users');
  },

  // 获取单个用户
  getUser: async (id: number): Promise<User> => {
    return api.get(`/users/${id}`);
  },

  // 创建用户
  createUser: async (user: Omit<User, 'id'>): Promise<User> => {
    return api.post('/users', user);
  },

  // 更新用户
  updateUser: async (id: number, user: Partial<User>): Promise<User> => {
    return api.put(`/users/${id}`, user);
  },

  // 删除用户
  deleteUser: async (id: number): Promise<void> => {
    return api.delete(`/users/${id}`);
  },
};