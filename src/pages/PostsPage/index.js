import React, { useEffect } from 'react';
import Footer from 'layouts/Footer/index';
import HeaderClient from 'layouts/Header/HeaderClient';
import ItemPost from './ItemPost';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostAction } from 'store/actions/post';
import ItemPostLoading from './ItemPostLoading';
import { nanoid } from 'nanoid';
import './style.css';

function PostsPage() {
  const dispatch = useDispatch();
  const listPost = useSelector(state => state.postSlice.listPost);

  useEffect(() => {
    dispatch(
      getAllPostAction({
        pageIndex: 1,
        pageSize: 999,
        userId: null,
        blogTitle: ''
      })
    );
  }, [dispatch]);

  return (
    <>
      <HeaderClient />
      <div className="wrapper-post">
        <div className="container">
          <div className="wrapper-list-post">
            {listPost.load && (
              <>
                <ItemPostLoading />
                <ItemPostLoading />
                <ItemPostLoading />
              </>
            )}
            {listPost.data?.data?.data?.map(item => (
              <ItemPost
                key={nanoid()}
                idPost={item.blog_id}
                namePost={item.blog_title}
                subTitle={item.blog_sub_title}
                bannerImg={item.blog_thumbnail}
                timePost={item.created_at}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PostsPage;
