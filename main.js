
function growgrass() {
    //赋值获取表单内容
    //var intxtdata = document.getElementById("intxt").value;
    //alert(intxtdata);
    //layer.msg("intxtdata");
    getgrass();
}

function getgrass() {
    if (document.body.clientHeight > 600) {
        document.getElementById("intxt").focus();
      }
    if (document.getElementById("intxt").value == "") {
        document.getElementById("totxt").value = "";
        return;
      }
      if (
        /[\S\s]*r[\S\s]*a[\S\s]*y[\S\s]*/i.test(
          document.getElementById("intxt").value
        )
      ) {
        document.getElementById("totxt").value = "发生未知错误，请检查输入内容。";
        layer.msg('发生未知错误，请检查输入内容。');
        return;
      }
      document.getElementById("eback").hidden = false;
      document.getElementById("ebar").hidden = false;
      fetch(
        /*
        "grass.php?lang=zh&force=8&text=" +
          encodeURI(document.getElementById("intxt").value),
        { method: "GET" }
        */
        "grass.php?lang=" + document.getElementById("lang").value + "&force=" + document.getElementById("force").value + "&text=" +
        encodeURI(document.getElementById("intxt").value),
        { method: "GET" }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data["isOk"] == "ok") {
            document.getElementById("totxt").value = unescape(data["text"]);
          } else {
            document.getElementById("totxt").value =
              "生草过程中遇到错误！\n\n可能的原因：\n谷歌翻译的服务器抽风，请稍后再试。";
              layer.msg('获取数据失败，请稍后再试。');
          }
          document.getElementById("eback").hidden = true;
          document.getElementById("ebar").hidden = true;
        })
        .catch((error) => {
          document.getElementById("totxt").value =
            "生草过程中遇到错误！\n\n请尝试以下办法解决：\n1、检查是否有特殊字符，尽量不要包含除了文字和必要标点以外的字符。\n2、如果文段较长，可尝试分开多段生草。\n3、如果包含换行，可尝试把换行替换成逗号再试。\n4、也有可能是谷歌翻译的服务器抽风，请稍后再试。\n5、我们的后端服务器可能炸了，请稍后再试。";
          layer.msg('发生错误，请查看输出信息。');
          document.getElementById("eback").hidden = true;
          document.getElementById("ebar").hidden = true;
        });
}