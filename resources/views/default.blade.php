<!doctype html>
<html ng-app="smartsys">
<head>
    @include('includes.head')
</head>
<body class="hold-transition sidebar-mini skin-blue-light">
<base href="/">

<div class="preload">
    <div ui-view></div>
</div>


<!--[if lte IE 9]>
<script src="//cdnjs.cloudflare.com/ajax/libs/Base64/0.3.0/base64.min.js"></script>
<![endif]-->

<script src="assets/js/scripts.js"></script>
<script src="assets/js/app.js"></script>
<script src="assets/js/controllers.js"></script>
<script src="assets/js/directives.js"></script>
<script src="assets/js/services.js"></script>
<script src="assets/js/libs.js"></script>

<script type="text/javascript">
    var _config = {
        activeTheme: '{{$theme}}'
    };
</script>

</body>
</html>