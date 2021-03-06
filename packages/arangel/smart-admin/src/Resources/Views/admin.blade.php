<!doctype html>
<html ng-app="Admin">
<head>
    @include('includes.head')
</head>
<body class="hold-transition sidebar-mini skin-blue-light">
<base href="/">

<p>admin</p>
<div class="preload">
    <div ui-view></div>
</div>


<!--[if lte IE 9]>
<script src="//cdnjs.cloudflare.com/ajax/libs/Base64/0.3.0/base64.min.js"></script>
<![endif]-->

<script type="text/javascript">
    var _config = {
        activeTheme: '{{$theme}}'
    };
</script>

<script src="{{ Theme::asset('bootstrap::js/scripts.js') }}"></script>
<script src="{{ Theme::asset('bootstrap::js/admin-scripts.js') }}"></script>
<script src="{{ Theme::asset('bootstrap::js/auth-scripts.js') }}"></script>

<script src="{{ Theme::asset('bootstrap::js/app.js') }}"></script>
<script src="{{ Theme::asset('bootstrap::js/controllers.js') }}"></script>
<script src="{{ Theme::asset('bootstrap::js/directives.js') }}"></script>
<script src="{{ Theme::asset('bootstrap::js/services.js') }}"></script>
<script src="{{ Theme::asset('bootstrap::js/libs.js') }}"></script>


</body>
</html>