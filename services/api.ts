import axios, { AxiosResponse } from 'axios';

import { AuthResponse, LoginPayload, Post, PostPayload } from '../types';

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

export const login = (payload: LoginPayload) =>
  guestAPI.post<LoginPayload, AxiosResponse<AuthResponse>>(
    '/auth/login',
    payload
  );

export const register = (payload: LoginPayload) =>
  guestAPI.post<LoginPayload, AxiosResponse<AuthResponse>>(
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
