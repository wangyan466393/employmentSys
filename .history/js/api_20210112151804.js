const request = axios.create({
    baseURL: "http://47.95.13.193:80/Job-1.0-SNAPSHOT",
  });
  
  // post表单请求
  const requestPost = (url, data) => {
    const params = JSON.stringify(data);
    const requestConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      };
    return request.post(url, params,requestConfig);
  };

  // 登录的API
const loginApi = async (userAccount,userPassword) => {
    const { data } = await requestPost("/user/login", {
        "account":userAccount,
        "password":userPassword
    });
    return data;
  };


  // 分组查看学生列表，单击某个学校查看对应的学生数据
  const studentListDataApi = async () => {
    const { data } = await requestPost("/student/selectStuByCollegeId", {
        "account":userAccount,
        "password":userPassword
    });
    return data;
  };