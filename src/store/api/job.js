import instance from 'config/axiosClient';
import authHeader from 'services/authHeader';
import { zonedTimeToUtc } from 'date-fns-tz';

const job = {
  search(searchKey, pageIndex, pageSize, salaryTo, salaryFrom, userId, idCity, specializes) {
    const data = {
      user_id: userId || null,
      company_id: null,
      jd_title: searchKey.replace('+', ' '),
      specialized_id: parseInt(specializes) || null,
      jd_updated: null,
      status_jd_id: null,
      city_id: parseInt(idCity) || null,
      jd_salary_from: parseInt(salaryFrom) || null,
      jd_salary_to: parseInt(salaryTo),
      page_size: parseInt(pageSize),
      page_index: parseInt(pageIndex)
    };
    const url = '/api/jd/search';
    return instance.post(url, data);
  },

  detail(idJob, idUser) {
    const url = '/api/jd/' + idJob + '/' + idUser || 0;
    return instance.get(url);
  },

  loveJob(idJob) {
    const url = '/api/user/favorites/' + idJob;
    return instance.get(url, { headers: authHeader() });
  },

  getListJobLoveByIdUserApi(
    _companyId,
    _jdTitle,
    _jdDes,
    _jdUpdated,
    _statusJd_id,
    _cityJd,
    _jdSalaryFrom,
    _jdSalaryTo,
    _companyName
  ) {
    const url = '/api/jd/search/favorites';
    return instance.get(
      url,
      // {
      //   company_id: _companyId,
      //   jd_title: _jdTitle,
      //   jd_des: _jdDes,
      //   jd_updated: _jdUpdated,
      //   status_jd_id: _statusJd_id,
      //   city_id: _cityJd,
      //   jd_salary_from: _jdSalaryFrom,
      //   jd_salary_to: _jdSalaryTo,
      //   company_name: _companyName
      // },
      { headers: authHeader() }
    );
  },

  getListJobApplyByIdUserApi(_pageIndex, _pageSize, _statusTransactionId, _companyName) {
    const url = '/api/transaction/user-search';
    return instance.post(
      url,
      {
        page_index: _pageIndex,
        page_size: _pageSize,
        status_transaction_id: _statusTransactionId,
        company_name: _companyName
      },
      { headers: authHeader() }
    );
  },

  getListJobByIdCompanyApi(_idCompany) {
    const url = '/api/jd/by-company-id/' + _idCompany;
    return instance.get(url, { headers: authHeader() });
  },

  getListJobByRecruiterApi(jdTitle, statusJdId, typeId, companyName) {
    const url = '/api/jd/recruiter/search';
    return instance.post(
      url,
      {
        jd_title: jdTitle,
        status_jd_id: statusJdId,
        type_id: typeId,
        company_name: companyName
      },
      { headers: authHeader() }
    );
  },

  createJobApi(
    companyId,
    userId,
    jdTitle,
    specializedId,
    jdDes,
    jdSlug,
    jdLink,
    statusJdId,
    cityId,
    districtId,
    streetId,
    jdAddress,
    jdSalaryFrom,
    jdSalaryTo,
    dateExpire
  ) {
    const url = '/api/jd/create';
    return instance.post(
      url,
      {
        // company_id: parseInt(companyId),
        user_id: parseInt(userId),
        type_id: 6,
        specialized_id: specializedId,
        jd_title: jdTitle,
        jd_des: jdDes,
        jd_slug: jdSlug,
        jd_link: jdLink,
        status_jd_id: statusJdId,
        city_id: parseInt(cityId),
        district_id: parseInt(districtId),
        street_id: streetId,
        jd_address: jdAddress,
        jd_salary_from: parseInt(jdSalaryFrom),
        jd_salary_to: parseInt(jdSalaryTo),
        date_expire: dateExpire
      },
      { headers: authHeader() }
    );
  },

  updateJobByIdJdApi(
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
  ) {
    const url = '/api/jd/update';
    return instance.put(
      url,
      {
        jd_id: idJob,
        company_id: companyId,
        type_id: 6,
        specialized_id: specializedId,
        jd_title: title,
        jd_des: des,
        jd_slug: '',
        jd_link: '',
        status_jd_id: 1,
        city_id: city,
        district_id: district,
        street_id: 1276,
        jd_address: address,
        jd_salary_from: salaryFrom,
        jd_salary_to: salaryTo,
        date_expire: zonedTimeToUtc(dateExpire, 'UTC').toISOString()
      },
      { headers: authHeader() }
    );
  },

  deleteJobByIdApi(idJob) {
    const url = '/api/jd/' + idJob;
    return instance.delete(url, {
      headers: authHeader()
    });
  },

  getListCvByIdJobApi(idJob) {
    const url = '/api/transaction/jd/' + idJob;
    return instance.get(url, {
      headers: authHeader()
    });
  },

  confirmAcceptOrRejectCv(statusTransactionId, transactionId, userId, recruitmentId) {
    const url = '/api/transaction/status-update';
    return instance.put(
      url,
      {
        status_transaction_id: statusTransactionId,
        transaction_id: transactionId,
        user_id: userId,
        recruitment_id: recruitmentId
      },
      {
        headers: authHeader()
      }
    );
  }
};

export default job;
