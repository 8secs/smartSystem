<?php
/**
 * Created by PhpStorm.
 * User: andres
 * Date: 5/09/15
 * Time: 19:31
 */

namespace Arangel\SmartAuth\Http\Controllers;

use Illuminate\Http\Request;
use Config;
use JWT;
use App\User;
use Intervention\Image\Facades\Image;
use Input;
use Response;
use Arangel\SmartAuth\Http\Models\Role;
use App\Http\Controllers\Controller;

class UserController extends Controller {

    /**
     * Generate JSON Web Token.
     */
    protected function createToken($user)
    {
        $payload = [
            'sub' => $user->id,
            'iat' => time(),
            'exp' => time() + (2 * 7 * 24 * 60 * 60)
        ];
        return JWT::encode($payload, Config::get('app.token_secret'));
    }
    /**
     * Get signed in user's profile.
     */
    public function getUser(Request $request)
    {
        $user = User::find($request['user']['sub']);
        $user->roles = $user->roles()->get();
        $user->isAdmin = $user->hasRole('admin');
        //$user->profile = $user->profile;
        //$user->locations = $user->locations;
        $roles = Role::all(['id', 'display_name']);
        return Response::json(['user' => $user, 'roles' => $roles]);
    }
    /**
     * Update signed in user's profile.
     */
    public function updateUser(Request $request)
    {
        /**
         * Get Image base64, decode it and save it.
         */
        $input = Input::all();
        //return $input;
        $file = $input['file'];

        $search_str = ['data:image/png;base64,', 'data:image/jpeg;base64,'];
        $uploadImage = false;

        $uploadFile = strpos($file, "data:");

        /**
         * If the string file contains data save image
         */
        if($uploadFile !== false){
            $img = str_replace($search_str, '', $file);
            $img = str_replace(' ', '+', $img);
            $data = base64_decode($img);
            $imageName = uniqid();
            $imgFile = public_path('uploads') . "/" . $imageName . '.png';
            $image = Image::make($data);
            $image->save($imgFile, 100);
            $uploadImage = true;
        }

        /**
         * Update user
         */

        $user = User::find($request['user']['sub']);
        $user->displayName = $request->input('displayName');
        $user->email = $request->input('email');
        if($uploadImage) $user->image = $imageName . '.png';

        $user->save();
        $token = $this->createToken($user);
        return response()->json(['token' => $token]);
    }

}