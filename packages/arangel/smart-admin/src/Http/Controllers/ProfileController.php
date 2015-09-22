<?php
/**
 * Created by PhpStorm.
 * User: andres
 * Date: 8/09/15
 * Time: 14:54
 */

namespace Arangel\SmartAdmin\Http\Controllers;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Arangel\SmartAdmin\Http\Models\Location;
use Arangel\SmartAdmin\Http\Models\User;
use Arangel\SmartAdmin\Http\Models\Profile;

use Notifynder;
use Response;

class ProfileController extends Controller{

    public function storeProfile(Request $request){
        $input = $request->all();

        $user = User::find($request['user']['sub']);
        $p = new Profile();
        $p->position = $input['position'];
        $p->education = $input['education'];
        $p->about_me = $input['about_me'];
        $user->profile()->save($p);

        return response()->json(['success', $user]);
    }

    public function updateProfile(Request $request){
        $input = $request->all();
        $user = User::find($request['user']['sub']);
        $profile = Profile::find($input['id']);
        $profile->position = $input['position'];
        $profile->education = $input['education'];
        $profile->about_me = $input['about_me'];
        $user->profile()->save($profile);

        return response()->json(['success', $user]);
    }

    public function getFriends(Request $request){
        $user = User::find($request['user']['sub']);
        $not_friends = User::where('id', '!=', $user->id);
        if($user->friends->count() > 0){
            $not_friends->whereNotIn('id', $user->friends->modelKeys());
        }
        $not_friends = $not_friends->get();

        return response()->json(['not_friends' => $not_friends, 'friends' => $user->friends]);
    }

    public function getFollowers(Request $request){
        $user = User::find($request['user']['sub']);
        return response()->json(['followers' => $user->followers]);
    }

    public function getFollowees(Request $request){
        $user = User::find($request['user']['sub']);
        $users = User::where('id', '!=', $user->id)->get();

        return response()->json(['followees' => $user->following, "users" => $users]);
    }

    public function addFriend(Request $request){
        $friend = User::find($request->input("id"));
        $user = User::find($request['user']['sub']);

        if($user->addFriend($friend)) {
            return response()->json(["error" => "Cannot add Friend to list"]);
        }
        else {
            $friendName = $user->displayName;
            Notifynder::category('user.add_friend')
                ->from($user->id)
                ->to($friend->id)
                ->extra(compact('friendName'))
                ->url('http://localhost:8000')
                ->send();
            return response()->json(["success" => 'Add user to friend list']);
        }
    }

    public function removeFriend(Request $request){
        $friend = User::find($request->input("id"));
        $user = User::find($request['user']['sub']);
        if($user->removeFriend($friend)) {
            return response()->json(["error" => "Cannot remove Friend from list"]);
        }
        else {
            $friendName = $user->displayName;
            Notifynder::category('user.remove_friend')
                ->from($user->id)
                ->to($friend->id)
                ->extra(compact('friendName'))
                ->url('http://localhost:8000')
                ->send();
            return response()->json(["success" => 'Remove user from friends list']);
        }
    }

    public function addFollower(Request $request){
        $friend = User::find($request->input("id"));
        $user = User::find($request['user']['sub']);
        if($user->addFollower($friend)) {
            return response()->json(["error" => "Cannot add Follower to list"]);
        }
        else {
            return reponse()->json(["success" => 'Add user to Follower list']);
        }
    }

    public function removeFollower(Request $request){
        $friend = User::find($request->input("id"));
        $user = User::find($request['user']['sub']);
        if($user->removeFollower($friend)) return reponse()->json(["success" => 'Remove user from follower list']);
        else return response()->json(["error" => "Cannot remove follower from list"]);
    }

    public function addFollowee(Request $request){
        $followee = User::find($request->input('id'));
        $user = User::find($request['user']['sub']);
        if($user->addFollowee($followee)) {
            return response()->json(['error' => "Cannot add you to the user's followers"]);
        }
        else {
            $friendName = $user->displayName;
            Notifynder::category('user.add_follower')
                ->from($user->id)
                ->to($followee->id)
                ->extra(compact('friendName'))
                ->url('http://localhost:8000')
                ->send();
            return response()->json(['success' => 'You are following this user']);
        }
    }

    public function removeFollowee(Request $request){
        $followee = User::find($request->input('id'));
        $user = User::find($request['user']['sub']);
        if($user->removeFollowee($followee)) {
            return response()->json(['error' => "Connot remove from user's followers"]);
        }
        else {
            $friendName = $user->displayName;
            Notifynder::category('user.remove_follower')
                ->from($user->id)
                ->to($followee->id)
                ->extra(compact('friendName'))
                ->url('http://localhost:8000')
                ->send();
            return response()->json(['success' => "Remove from the user`s followers"]);
        }
    }

    public function storeLocation(Request $request){
        $input = $request->all();
        $user = User::find($request['user']['sub']);
        $location = new Location();
        $location->address = $input['Street'];
        $location->city = $input['City'];
        $location->country = $input['Country'];
        $location->formattedAddress = $input['FormattedAddress'];
        $location->postCode = $input['PostCode'];
        $location->latitude = $input['Latitude'];
        $location->longitude = $input['Longitude'];

        $user->locations()->save($location);

        return response()->json(['sucess' => "Your locations has been stored."]);
    }

    public function updateLocation(Request $request){
        $user = User::find($request['user']['sub']);
        $location = $user->locations()->find($request->input('Id'));
        $location->address = $request->input('Street');
        $location->city = $request->input('City');
        $location->country = $request->input('Country');
        $location->formattedAddress = $request->input('FormattedAddress');
        $location->postCode = $request->input('PostCode');
        $location->latitude = $request->input('Latitude');
        $location->longitude = $request->input('Longitude');
        $location->save();
        return response()->json(['Success', "Your location has been updated."]);
    }

    public function deleteLocation(Request $request){
        $user = User::find($request['user']['sub']);
        $location = $user->locations()->find($request->input('Id'))->delete();
        return response()->json('Success', "Your location has been delete.");
    }

} 