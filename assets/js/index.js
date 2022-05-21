$(function () {
  getUserInfo();
});

const layer = layui.layer;
// 获取用户信息
function getUserInfo() {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    headers: {
      // fuck!!!一个字母大小写导致bug
      Authorization: localStorage.getItem("token"),
    },
    success: (res) => {
      console.log(res);
      if (res.status !== 0) return layer.msg("用户信息获取失败！");
      layer.msg("获取成功！");
      renderAvatar(res.data);
    },
  });
}

// 渲染头像
const renderAvatar = (user) => {
  const name = user.nickname || user.username;
  $("#welcome").html(`欢迎 ${name}`);
  if (user.user_pic !== null) {
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    $(".layui-nav-img").hide();
    const fitstName = name[0].toupperCase();
    $(".text-avatar").html(fitstName).show();
  }
};
