<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BannedWords;
use Symfony\Component\HttpFoundation\Response;

class bannedwordsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bannedwords = BannedWords::paginate(20);
        return response($bannedwords, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $word = BannedWords::create(['word'=>$request->input('word')]);
        return response($word, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $word = BannedWords::find($id);
        if($word){
            $word->delete();
            return response(["message"=>'word was deleted'], 200);
        }
        else return response(["message"=>'word not found'], 404);
    }
}
