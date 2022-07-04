import { createAsyncThunk } from '@reduxjs/toolkit';
import job from 'store/api/job';
import { createAlert } from 'store/reducers/notificationSlice';

const getJobAction = createAsyncThunk('job/getJobAction', async (params, thunkAPI) => {
  try {
    console.log('params get job: ', params);
    const { searchKey, pageIndex, pageSize, salaryTo, salaryFrom, userId, idCity, specializes } = params;
    const dataJobs = await job
      .search(searchKey, pageIndex, pageSize, salaryTo, salaryFrom, userId, idCity, specializes)
      .then(response => {
        if (response) {
          return response;
        }
        return {};
      });
    return dataJobs;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: 'get error' });
  }
});

const getDetailJobByIdAction = createAsyncThunk('job/getDetailJobByIdAction', async (params, thunkAPI) => {
  try {
    const { idJob, idUser } = params;
    const dataJobs = await job.detail(idJob, idUser).then(response => {
      if (response) {
        return response;
      }
      return {};
    });
    return dataJobs;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: 'get error' });
  }
});

const postLoveJobByIdAction = createAsyncThunk('job/postLoveJobByIdAction', async (params, thunkAPI) => {
  try {
    const { idJob, isFavorites } = params;
    const dataJobs = await job.loveJob(idJob).then(response => {
      if (response) {
        thunkAPI.dispatch(
          createAlert({
            message: `${isFavorites ? 'Đã xóa khỏi' : 'Đã thêm vào'} danh sách yêu thích`,
            type: 'success'
          })
        );
        return response;
      }
      return {};
    });
    return dataJobs;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: 'get error' });
  }
});

const getListJobLoveByIdUserAction = createAsyncThunk('job/getListJobLoveByIdUserAction', async (params, thunkAPI) => {
  try {
    const { companyId, jdTitle, jdDes, jdUpdated, statusJd_id, cityJd, jdSalaryFrom, jdSalaryTo, companyName } = params;
    const res = await job.getListJobLoveByIdUserApi(
      companyId,
      jdTitle,
      jdDes,
      jdUpdated,
      statusJd_id,
      cityJd,
      jdSalaryFrom,
      jdSalaryTo,
      companyName
    );
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: 'get error' });
  }
});

const getListJobApplyByIdUserAction = createAsyncThunk(
  'job/getListJobApplyByIdUserAction',
  async (params, thunkAPI) => {
    try {
      const { pageIndex, pageSize, statusTransactionId, companyName } = params;
      const res = await job.getListJobApplyByIdUserApi(pageIndex, pageSize, statusTransactionId, companyName);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: 'get error' });
    }
  }
);

const getListJobByIdCompanyAction = createAsyncThunk('job/getListJobByIdCompanyAction', async (params, thunkAPI) => {
  try {
    const { idCompany } = params;
    const res = await job.getListJobByIdCompanyApi(idCompany);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: 'get error' });
  }
});

const getListJobByRecruiterAction = createAsyncThunk('job/getListJobByRecruiterAction', async (params, thunkAPI) => {
  try {
    const { jdTitle, statusJdId, typeId, companyName } = params;
    const res = await job.getListJobByRecruiterApi(jdTitle, statusJdId, typeId, companyName);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: 'get error' });
  }
});

const createJobAction = createAsyncThunk('job/createJobAction', async (params, thunkAPI) => {
  try {
    const { companyId, userId, title, specializedId, des, city, district, address, salaryFrom, salaryTo, dateExpire } =
      params;
    const res = await job.createJobApi(
      companyId,
      userId,
      title,
      specializedId,
      des,
      '',
      '',
      1,
      city,
      district,
      2347,
      address,
      salaryFrom,
      salaryTo,
      dateExpire
    );
    thunkAPI.dispatch(
      createAlert({
        message: 'Tạo tin tuyển dụng thành công',
        type: 'success'
      })
    );
    return res.data;
  } catch (error) {
    thunkAPI.dispatch(
      createAlert({
        message: 'Tạo tin tuyển dụng thất bại',
        type: 'error'
      })
    );
    return thunkAPI.rejectWithValue({ error: 'add new job error' });
  }
});

const updateJobByIdJdAction = createAsyncThunk('job/updateJobByIdJdAction', async (params, thunkAPI) => {
  try {
    const { idJob, companyId, title, specializedId, des, city, district, address, salaryFrom, salaryTo, dateExpire } =
      params;
    const res = await job.updateJobByIdJdApi(
      idJob,
      companyId,
      title,
      specializedId,
      des,
      city,
      district,
      address,
      salaryFrom,
      salaryTo,
      dateExpire
    );
    thunkAPI.dispatch(
      createAlert({
        message: 'Cập nhật tin tuyển dụng thành công',
        type: 'success'
      })
    );
    return res.data;
  } catch (error) {
    thunkAPI.dispatch(
      createAlert({
        message: 'Cập nhật tin tuyển dụng thất bại',
        type: 'error'
      })
    );
    return thunkAPI.rejectWithValue({ error: 'update job error' });
  }
});

const deleteJobByIdAction = createAsyncThunk('job/deleteJobByIdAction', async (params, thunkAPI) => {
  try {
    const { idJob } = params;
    const res = await job.deleteJobByIdApi(idJob);
    thunkAPI.dispatch(
      createAlert({
        message: 'Xóa tin tuyển dụng thành công',
        type: 'success'
      })
    );
    thunkAPI.dispatch(
      getListJobByRecruiterAction({
        jdTitle: '',
        statusJdId: '',
        typeId: '',
        companyName: ''
      })
    );
    return res.data;
  } catch (error) {
    thunkAPI.dispatch(
      createAlert({
        message: 'Xóa tin tuyển dụng thất bại',
        type: 'success'
      })
    );
    return thunkAPI.rejectWithValue({ error: 'delete error' });
  }
});

const getListCvByIdJobAction = createAsyncThunk('job/getListCvByIdJobAction', async (params, thunkAPI) => {
  try {
    const { idJob } = params;
    const res = await job.getListCvByIdJobApi(idJob);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: 'get job error' });
  }
});

const confirmAcceptOrRejectCvAction = createAsyncThunk(
  'job/confirmAcceptOrRejectCvAction',
  async (params, thunkAPI) => {
    try {
      const { statusTransactionId, transactionId, idPost, userId, recruitmentId } = params;
      const res = await job.confirmAcceptOrRejectCv(statusTransactionId, transactionId, userId, recruitmentId);
      if (statusTransactionId === 3) {
        thunkAPI.dispatch(
          createAlert({
            message: 'Đã từ chối ứng viên này',
            type: 'success'
          })
        );
      } else {
        thunkAPI.dispatch(
          createAlert({
            message: 'Đã đồng ý ứng viên này',
            type: 'success'
          })
        );
      }
      thunkAPI.dispatch(
        getListCvByIdJobAction({
          idJob: parseInt(idPost)
        })
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: 'get job error' });
    }
  }
);

export {
  getJobAction,
  getDetailJobByIdAction,
  postLoveJobByIdAction,
  getListJobLoveByIdUserAction,
  getListJobApplyByIdUserAction,
  getListJobByIdCompanyAction,
  getListJobByRecruiterAction,
  createJobAction,
  updateJobByIdJdAction,
  deleteJobByIdAction,
  getListCvByIdJobAction,
  confirmAcceptOrRejectCvAction
};
