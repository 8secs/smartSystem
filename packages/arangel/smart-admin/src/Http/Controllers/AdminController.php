<?php
/**
 * Created by PhpStorm.
 * User: andres
 * Date: 8/09/15
 * Time: 13:48
 */

namespace Arangel\SmartAdmin\Http\Controllers;


use App\Http\Controllers\Controller;
use App\Http\Requests\Request;
use Arangel\SmartAuth\Http\Models\Permission;
use Arangel\SmartAuth\Http\Models\Role;
use Arangel\SmartAdmin\Http\Models\User;
use Response;

class AdminController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function roles()
    {
        $roles = Role::all();
        $permissions = Permission::all();

        return Response::json(['roles' => $roles, 'permissions' => $permissions]);
    }

    /**
     * @return mixed
     */
    public function users(){
        if($users = User::all()){
            return Response::json(['users' => $users]);
        }else{
            return Response::json(['error' => 'Something wrong getting query results'], 400);
        }

    }

    /**
     * @param $id
     * @return mixed
     */
    public function getUser($id){
        $user = User::find($id);
        $user->roles = $user->roles;
        $roles = Role::all(['id', 'display_name']);

        return Response::json(['user' => $user, 'roles' => $roles]);
    }

    /**
     * Update user.
     *
     * @param  Request  $request
     * @return Response
     */
    public function updateUser(Request $request)
    {
        $roles = $request->input('roles');
        $selectedRoles = array();
        foreach($roles as $r){
            array_push($selectedRoles, $r['id']);
        }
        $user = User::find($request->input('id'));
        $user->roles()->sync($selectedRoles);

        return Response::json(['user' =>$user]);
    }

    /**
     * @param Request $request
     */
    public function destroyUser(Request $request){
        $user = User::find($request->input('id'));
        $user->delete();
        return Response::json(['success', true]);
    }

    /**
     * @param $id
     * @return mixed
     */
    public function getRole($id){
        $role = Role::find($id);
        $role->permissions = $role->permissions;
        $permissions = Permission::all(['id', 'display_name']);
        return Response::json(['role' => $role, 'permissions' => $permissions]);
    }

    /**
     * Store a newly created role in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function storeRole(Request $request)
    {
        $role = new Role($request->all());
        $role->save();

        return response()->json($role);
    }

    /**
     * Update an existing Role
     * @param Request $request
     * @return mixed
     */
    public function updateRole(Request $request)
    {
        $permissions = $request->input('permissions');
        $selectedPermissions = array();
        foreach($permissions as $r){
            array_push($selectedPermissions, $r['id']);
        }
        $role = Role::find($request->input('id'));
        $role->name = $request->input('name');
        $role->display_name = $request->input('display_name');
        $role->description = $request->input('description');
        $role->update();
        $role->permissions()->sync($selectedPermissions);


        return Response::json(['role' =>$role]);
    }

    /**
     *
     * @param Request $request
     */
    public function destroyRole(Request $request){
        $role = Role::findOrFail($request->input('id'));
        $role->delete();
        return Response::json(['success', true]);
    }

    /**
     * @param $id
     * @return mixed
     */
    public function getPermission($id){
        $per = Permission::find($id);
        return Response::json(['permission' => $per]);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storePermission(Request $request){
        $permission = new Permission($request->all());
        $permission->save();
        return response()->json($permission);
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function updatePermission(Request $request)
    {
        $permission = Permission::find($request->input('id'));
        $permission->name = $request->input('name');
        $permission->display_name = $request->input('display_name');
        $permission->description = $request->input('description');
        $permission->update();

        return Response::json(['permission' =>$permission]);
    }

    /**
     * @param Request $request
     */
    public function destroyPermission(Request $request){
        $permission = Permission::find($request->input('id'));
        $permission->delete();
        return Response::json(['success', true]);
    }

} 