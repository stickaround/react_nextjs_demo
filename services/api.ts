import axios, { AxiosResponse } from 'axios';

import { AuthResponse, UserPayload, Post, PostPayload, User } from '../types';

const guestAPI = axios.create({
  baseURL: process.env.API_URL ?? 'http://localhost:3000',
});

export const authenticatedAPI = axios.create({
  baseURL: process.env.API_URL ?? 'http://localhost:3000',
});

export const setBearerHeader = (window: Window) => {
  authenticatedAPI.defaults.headers.common['Authorization'] = `Bearer ${
    window ? window.localStorage.getItem('token') : ''
  }`;
};

export const login = (payload: UserPayload) =>
  guestAPI.post<UserPayload, AxiosResponse<AuthResponse>>(
    '/auth/login',
    payload
  );

export const register = (payload: UserPayload) =>
  guestAPI.post<UserPayload, AxiosResponse<AuthResponse>>(
    '/auth/register',
    payload
  );

export const getPosts = () => authenticatedAPI.get<Post[]>('/post');

export const getPost = (id: string) => authenticatedAPI.get<Post>(`post/${id}`);

export const createPost = (payload: PostPayload) =>
  authenticatedAPI.post<PostPayload, AxiosResponse<Post>>('post', payload);

export const updatePost = (id: string, payload: PostPayload) =>
  authenticatedAPI.patch<PostPayload, AxiosResponse<Post>>(
    `/post/${id}`,
    payload
  );

export const deletePost = (id: string) =>
  authenticatedAPI.delete<AxiosResponse<Post>>(`/post/${id}`);

export const getUsers = () => authenticatedAPI.get<User[]>('/admin/users');

export const getUser = (id: string) =>
  authenticatedAPI.get<User>(`/admin/users/${id}`);

export const createUser = (payload: UserPayload) =>
  authenticatedAPI.post<PostPayload, AxiosResponse<User>>(
    '/admin/users',
    payload
  );

export const updateUser = (id: string, payload: UserPayload) =>
  authenticatedAPI.patch<UserPayload, AxiosResponse<User>>(
    `/admin/users/${id}`,
    payload
  );

export const deleteUser = (id: string) =>
  authenticatedAPI.delete<AxiosResponse<User>>(`/admin/users/${id}`);
