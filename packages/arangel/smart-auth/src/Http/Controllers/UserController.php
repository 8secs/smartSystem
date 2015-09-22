<?php
/**
 * Created by PhpStorm.
 * User: andres
 * Date: 5/09/15
 * Time: 19:31
 */

namespace Arangel\SmartAuth\Http\Controllers;

use Illuminate\Http\Request;

use Intervention\Image\Facades\Image;
use Cmgmyr\Messenger\Models\Thread;
use Arangel\SmartAuth\Http\Models\Role;
use Arangel\SmartAdmin\Http\Models\User;
use App\Http\Controllers\Controller;
use Config;
use JWT;
use Input;
use Response;
use Activity;
use Spatie\Activitylog\Models\Activity as ActivityModel;

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
        $user->profile = $user->profile;
        $user->locations = $user->locations;
        $user->notifications = $user->getNotifications();
        $user->notificationsNotRead = $user->countNotificationsNotRead();
        $threads = Thread::forUser($user->id)->latest('updated_at')->get();
        $user->threads = $threads;

        $roles = Role::all(['id', 'display_name']);

        $activities = ActivityModel::where('user_id', $user->id)->get();

        return Response::json(['user' => $user, 'roles' => $roles, 'activities' => $activities]);
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
        Activity::log("You have updated your basic user information", $user->id);
        return response()->json(['token' => $token]);
    }

}