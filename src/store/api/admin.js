import instance from 'config/axiosClient';
import authHeader from 'services/authHeader';

const admin = {
  getListCandidateApi() {
    const url = '/api/user/admin/candidate';
    return instance.get(url, {
      headers: authHeader()
    });
  },

  getListRecruitApi() {
    const url = '/api/user/admin/recruiter';
    return instance.get(url, {
      headers: authHeader()
    });
  },

  blockOrUnblockApi(idUser) {
    const url = '/api/user/block-unblock/' + idUser;
    return instance.get(url, {
      headers: authHeader()
    });
  },

  getListApproveApi(orderBy) {
    const url = '/api/jd/admin/search';
    return instance.post(
      url,
      {
        company_id: null,
        jd_title: null,
        jd_updated: null,
        status_jd_id: null,
        city_id: null,
        jd_salary_from: null,
        jd_salary_to: null,
        order_by: orderBy
      },
      {
        headers: authHeader()
      }
    );
  },

  approvePostApi(idPost) {
    const url = '/api/jd/admin/update-accepted/' + parseInt(idPost);
    return instance.get(url, {
      headers: authHeader()
    });
  }
};

export default admin;
