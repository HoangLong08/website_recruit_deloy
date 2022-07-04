import { createAsyncThunk } from '@reduxjs/toolkit';
import post from 'store/api/post';

const getAllPostAction = createAsyncThunk('post/getAllPostAction', async (params, thunkAPI) => {
  try {
    const { pageIndex, pageSize, userId, blogTitle } = params;
    const res = await post.getAllPostApi(pageIndex, pageSize, userId, blogTitle).then(response => {
      if (response) {
        return response;
      }
      return {};
    });
    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: 'get error' });
  }
});

const getDetailPostAction = createAsyncThunk('post/getDetailPostAction', async (params, thunkAPI) => {
  try {
    const { idPost } = params;
    const res = await post.getDetailPostApi(idPost).then(response => {
      if (response) {
        return response;
      }
      return {};
    });
    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: 'get error' });
  }
});

const createPostAction = createAsyncThunk('post/createPostAction', async (params, thunkAPI) => {
  try {
    const { title, subTitle, bannerImage, des, userId } = params;
    const res = await post.createPostApi(title, subTitle, bannerImage, des, userId).then(response => {
      if (response) {
        return response;
      }
      return {};
    });
    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: 'get error' });
  }
});

const editPostAction = createAsyncThunk('post/editPostAction', async (params, thunkAPI) => {
  try {
    const { title, subTitle, bannerImage, des, userId, idPost } = params;
    const res = await post.editPostApi(title, subTitle, bannerImage, des, userId, idPost).then(response => {
      if (response) {
        return response;
      }
      return {};
    });
    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: 'get error' });
  }
});

const deletePostAction = createAsyncThunk('post/deletePostAction', async (params, thunkAPI) => {
  try {
    const { idPost, userId } = params;
    const res = await post.deletePostApi(idPost).then(response => {
      if (response) {
        thunkAPI.dispatch(
          getAllPostAction({
            pageIndex: 1,
            pageSize: 999,
            userId: userId,
            blogTitle: ''
          })
        );
        return response;
      }
      return {};
    });
    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: 'get error' });
  }
});

export { getAllPostAction, getDetailPostAction, createPostAction, editPostAction, deletePostAction };
