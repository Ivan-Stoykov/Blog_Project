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
        $bannedwords = BannedWords::get();
        return response($bannedwords, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        BannedWords::create(['word'=>$request->input('word')]);
        return response(["message"=>"inserted banned word"]);
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
        //
    }
}
