<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tags = Tag::Paginate(20);
        return response($tags, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $tag = Tag::where('id', $id)->first();

        return response( $tag, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $tag = Tag::find($id);
        if($tag){
        $tag->name = $request->input('name');
        $tag->slug = $request->input('slug');
        $tag->save();
        return response(["message"=>"Tag edited"]);
        // if($this->authorize('update', $user)) 
        //     {
        //         $user->save();
        //         return response(["message"=>'User was updated'], 201);
        //     }
        // else return response(['message'=>'Unautharized'], 401);
         }
        else return response(["message"=>'Tag not found'], 404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tag = Tag::find($id);
        if($tag){
            //if($this->authorize('delete', $user))
            $tag->delete();
            return response(["message"=>'Tag was deleted'], 200);
        }
        else return response(["message"=>'Tag not found'], 404);
    }
}
