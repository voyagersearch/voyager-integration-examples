## CHECK PERMISSIONS

Angular $http example for checking privileges (will auto-authenticate if in sso env):

```
var url = 'http://localhost:8888/api/rest/auth/info?check=view&check=process&check=whatevs';
$http.get(url,{withCredentials: true}).then..
```

"withCredentials": https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Requests_with_credentials

If you don't want to auto-authenticate (for example if the user manually logs out)

```
var url = 'http://localhost:8888/api/rest/auth/info?check=view&sso=false';
$http.get(url,{withCredentials: true}).then..
```

## LOGIN

Login $http example.  Done with http POST 

```
var action = 'login';  //just change action to 'logout' for logout.
var config = {'root':'http://localhost:8888/'};
var _PERMISSIONS_LIST = 'check=view&check=somepermission';  //login call will return permissions also

var request = 'user=' + $scope.user + "&pass=" + $scope.pass + "&" + _PERMISSIONS_LIST;
if($scope.rememberMe === true) {
    request += '&rememberMe=true';  //rememberMe flag
}
                
  return $http({
      method: 'POST',
      url: config.root + 'api/rest/auth/' + action + '.json',
      data: request,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }).then(_successHandler, _errorHandler);
```
