<!DOCTYPE html>
<html lang="zh_CN">

<head>
  <title>@yield('title')</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
  <link rel="shortcut icon" href="images/favicon.png" />
  <link href="bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet">
  <link href="bower_components/animate.css/animate.css" rel="stylesheet">
  <link href="bower_components/weui/dist/style/weui.min.css" rel="stylesheet">
  <link href="dist/style.map.css" rel="stylesheet">
</head>
<style>
  body {
    background: #ebebeb;
  }
</style>

<body>
  @if (session('msg'))
  <div class="weui_dialog_alert" style="display: block;">
    <div class="weui_mask"></div>
    <div class="weui_dialog">
      <div class="weui_dialog_hd"><strong class="weui_dialog_title">出错了！</strong></div>
      <div class="weui_dialog_bd">{{ session('msg') }}</div>
      <div class="weui_dialog_ft"><a class="weui_btn_dialog primary">确定</a></div>
    </div>
  </div>
  @endif @yield('content')
</body>

</html>