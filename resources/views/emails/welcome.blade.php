<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
</head>
<body>
<h2>Verify Your Email Address</h2>

<div>
    {{$displayName}}, thanks for creating an account in our website.
    Please follow the link below to verify your email address
    <a href="{{ url('auth/verify/'.$activation_code) }}"> Here</a>.<br/>

</div>

</body>
</html>