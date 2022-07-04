import React, { useEffect } from 'react';
import { debounce } from 'lodash';
import SearchInput from './SearchInput';
import TableComponent from 'components/TableComponent/index';
import { useDispatch, useSelector } from 'react-redux';
import { getListJobLoveByIdUserAction, postLoveJobByIdAction } from 'store/actions/job';
import { nanoid } from 'nanoid';
import { Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { setListJobLove } from 'store/reducers/jobSlice';

const columns = [
  {
    title: 'Tên công ty',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Địa điểm',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    width: 150
  }
];

function LoveJobs() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const jobSlice = useSelector(state => state.jobSlice.loveJobs);

  useEffect(() => {
    dispatch(
      getListJobLoveByIdUserAction({
        companyId: null,
        jdTitle: '',
        jdDes: '',
        jdUpdated: null,
        statusJd_id: 0,
        cityJd: 0,
        jdSalaryFrom: 0,
        jdSalaryTo: 0,
        companyName: ''
      })
    );
  }, [dispatch]);

  const redirectPage = _id => () => {
    return navigator('/viec-lam/' + _id);
  };

  const debounceText = debounce(value => {
    dispatch(
      getListJobLoveByIdUserAction({
        companyId: null,
        jdTitle: value,
        jdDes: '',
        jdUpdated: null,
        statusJd_id: 0,
        cityJd: 0,
        jdSalaryFrom: 0,
        jdSalaryTo: 0,
        companyName: ''
      })
    );
  }, 500);

  const handleRemoveLove = (_idJob, _isFavorites) => () => {
    dispatch(
      postLoveJobByIdAction({
        idJob: _idJob,
        isFavorites: _isFavorites
      })
    );
    dispatch(
      setListJobLove({
        idJob: _idJob
      })
    );
  };

  const handleChangeSearch = e => {
    debounceText(e.target.value.trim());
  };

  const renderDataSource = () => {
    return jobSlice?.data?.map(item => {
      console.log("item: ", item)
      return {
        key: nanoid(),
        name: item.jd_title,
        address: item.jd_address,
        status: (
          <Space size="small">
            <Button type="primary" onClick={redirectPage(item.jd_id)} disabled={item.isSubmitted}>
              {item.isSubmitted ? "Đã ứng tuyển" : "Ứng tuyển"}
            </Button>
            <Button danger onClick={handleRemoveLove(item.jd_id, item.isFavorites)}>
              Bỏ thích
            </Button>
          </Space>
        )
      };
    });
  };

  return (
    <div className="wrapper-content-inner-client customize-scroll">
      <div className="content-inner-client-head">
        <p className="content-inner-client-head-title">Việc làm yêu thích</p>
        <div>
          <SearchInput onChange={handleChangeSearch} />
        </div>
      </div>
      <div className="content-inner-client-bottom">
        <TableComponent data={renderDataSource()} tableHead={columns} loading={jobSlice.load} />
      </div>
    </div>
  );
}

export default LoveJobs;
