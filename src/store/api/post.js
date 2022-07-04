import instance from 'config/axiosClient';
import authHeader from 'services/authHeader';

const post = {
  getAllPostApi(pageIndex, pageSize, userId, blogTitle) {
    const url = '/api/blog/search';
    return instance.post(url, {
      page_index: pageIndex,
      page_size: pageSize,
      user_id: userId,
      blog_title: blogTitle
    });
  },

  getDetailPostApi(idPost) {
    const url = '/api/blog/' + idPost;
    return instance.get(url);
  },

  createPostApi(title, subTitle, bannerImage, des, userId) {
    const url = '/api/blog/create';
    return instance.post(
      url,
      {
        blog_title: title,
        blog_thumbnail: bannerImage,
        blog_des: des,
        blog_sub_title: subTitle,
        user_id: userId
      },
      { headers: authHeader() }
    );
  },

  editPostApi(title, subTitle, bannerImage, des, userId, idPost) {
    const url = '/api/blog/update';
    return instance.put(
      url,
      {
        blog_title: title,
        blog_thumbnail: bannerImage,
        blog_des: des,
        blog_sub_title: subTitle,
        blog_id: idPost
      },
      { headers: authHeader() }
    );
  },

  deletePostApi(idPost) {
    const url = '/api/blog/' + idPost;
    return instance.delete(url, { headers: authHeader() });
  }
};

export default post;
