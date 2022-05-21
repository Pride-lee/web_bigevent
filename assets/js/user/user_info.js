$(function () {
  const form = layui.form;
  const layer = layui.layer;
  form.verify({
    nickname: (val) => {
      if (val.length > 6) return "昵称长度必须为1-6位";
    },
  });
  const initUserinfo = () => {
    $.ajax({
      type: "get",
      url: "/my/userinfo",
      success: (res) => {
        console.log(res);
        if (res.status !== 0) return layer.msg("获取失败！");
        layer.msg("获取成功！");
        form.val("formUserInfo", res.data);
      },
    });
  };
  initUserinfo();
  // 实现点击重置
  $("#btnReset").click((e) => {
    e.preventDefault();
    initUserinfo();
  });
  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg("更改失败！");
        layer.msg("更改成功！");
        window.parent.getUserInfo();
      },
    });
  });
});
