import instance from 'config/axiosClient';
import authHeader from 'services/authHeader';

const company = {
  search(pageSize, pageIndex, companyCode, companyName, companyAddress, companyService) {
    const url = '/api/company/search';
    return instance.post(url, {
      page_size: pageSize,
      page_index: pageIndex,
      company_code: companyCode,
      company_name: companyName,
      company_address: companyAddress,
      company_service: companyService
    });
  },

  detail(idCompany) {
    const url = '/api/company/' + idCompany;
    return instance.get(url);
  },

  getCompanyByIdUserApi(idUser) {
    const url = '/api/company/admin/' + idUser;
    return instance.get(url, { headers: authHeader() });
  },

  createCompanyApi(
    logoCompany,
    nameCompany,
    websiteCompany,
    addressCompany,
    totalEmployee,
    serviceCompany,
    estCompany,
    introCompany
  ) {
    const url = '/api/company/create';

    // estCompany: 2022-07-21
    const dateStr = estCompany;
    const date = new Date(dateStr);
    const iso = date.toISOString();
    return instance.post(
      url,
      {
        company_code: '',
        company_logo: logoCompany,
        company_name: nameCompany,
        company_website: websiteCompany,
        company_address: addressCompany,
        company_member: totalEmployee,
        company_service: serviceCompany,
        company_des: introCompany,
        company_establish: iso
      },
      { headers: authHeader() }
    );
  },

  editCompanyApi(
    idCompany,
    logoCompany,
    nameCompany,
    websiteCompany,
    addressCompany,
    totalEmployee,
    serviceCompany,
    estCompany,
    introCompany
  ) {
    const url = '/api/company/update';

    // estCompany: 2022-07-21
    const dateStr = estCompany;
    const date = new Date(dateStr);
    const iso = date.toISOString();
    return instance.put(
      url,
      {
        company_id: idCompany,
        company_code: '',
        company_logo: logoCompany,
        company_name: nameCompany,
        company_website: websiteCompany,
        company_address: addressCompany,
        company_member: totalEmployee,
        company_service: serviceCompany,
        company_des: introCompany,
        company_establish: iso
      },
      { headers: authHeader() }
    );
  },

  deleteCompanyApi(idCompany) {
    const url = '/api/company/' + idCompany;
    return instance.delete(url, { headers: authHeader() });
  }
};

export default company;
