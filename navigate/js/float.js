function openFloat() {
  document.getElementById("light").style.display = "block";
}
function closeFloat() {
  document.getElementById("light").style.display = "none";
}
//打开、关闭 添加app窗口
function appAdd() {
  let appUrl = document.getElementById("app-add-url");
  let appName = document.getElementById("app-add-name");
  appUrl.value = "";
  appName.value = "";
  document.body.classList.toggle("active");
  //如果删除按钮开启则关闭
  let del = document.getElementById("body").classList.contains("active-del");
  if (del) {
    document.body.classList.toggle("active-del");
  }
  let appAddInput = document.querySelectorAll(".app-add-input");
  for (let index = 0; index < appAddInput.length; index++) {
    appAddInput[index].onkeydown = function (event) {
      let code = event.keyCode;
      //按回车添加
      if (code == 13) {
        appAdds();
      }
    };
  }
}

//保存数据到浏览器缓存
function save() {
  if (data) {
    window.localStorage.removeItem("user");
  }
  let userLi = document.querySelectorAll(".user");
  let liStr = "";
  for (let index = 0; index < userLi.length; index++) {
    liStr += userLi[index].outerHTML;
  }
  window.localStorage.setItem("user", liStr);
}

//点击确认，加入网址
function appAdds() {
  //抓取 两个input.value
  let appUrl = document.getElementById("app-add-url");
  let appName = document.getElementById("app-add-name");
  //在ul中尾部插入innerHTML
  // 备用获取图标api接口：https://api.qqsuu.cn/api/get?url=
  let ulGird = document.querySelector(".app-gird");
  if (appUrl.value !== "" && appName.value !== "") {
    ulGird.innerHTML =
      `<li class="bookmark">
        <div>
          <a href="${appUrl.value}"
            ><img
              src="https://api.xinac.net/icon/?url=${appUrl.value}"
              alt="${appName.value}"
              class="iconSize"
            />
          </a>
          <div class="app-del" onclick="appDelMine(this)">
            <i
              class="fa fa-close"
              style="font-size: 48px; color: rgba(255, 4, 4, 0.8)"
            ></i>
          </div>
        </div>
        <p>${appName.value}</p>
      </li>` + ulGird.innerHTML;
    appAdd();
    //保存ul信息到浏览器缓存;
    save();
  } else {
    alert("请填写网址或名称！");
  }
}
//打开、关闭 删除app窗口
function appDel() {
  document.body.classList.toggle("active-del");
}
//删除自身
function appDelMine(e) {
  let foo = e.parentNode.parentNode;
  foo.remove();
  //保存ul信息到浏览器缓存
  save();
}
