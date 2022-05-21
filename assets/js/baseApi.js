$.ajaxPrefilter((options) => {
  options.url = `http://www.liulongbin.top:3007` + options.url;
  // 在请求之前给有权限的借口注入token
  if (options.url.includes("/my/")) {
    options.headers = {
      Authorization: localStorage.getItem("token"),
    };
  }

  // 统一处理权限问题
  options.complete = (res) => {
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === "身份认证失败！"
    ) {
      localStorage.removeItem("token");
      location.href = "/login.html";
    }
  };
});
