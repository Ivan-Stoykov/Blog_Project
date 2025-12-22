<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Validator;
class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tags = Tag::Paginate(10);
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
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:3',
            'slug' => 'required|min:3',
        ]);
        if($validator->fails()){
            return response(["ValidationError"=>$validator->errors()], 400);       
        }
        $tag = Tag::find($id);
        if($tag){
        $tag->name = $request->input('name');
        $tag->slug = $request->input('slug');
        $tag->save();
        return response(["message"=>"Tag edited"]);
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
