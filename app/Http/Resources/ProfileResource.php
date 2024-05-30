<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $classroom = $this->classroom;
    
        return [
            'username' => $this->username,
            'name' => $this->name,
            'slug' => $this->slug,
            'classroom' => [
                'slug' => $classroom ? $classroom->slug : null,
                'name' => $classroom ? $classroom->name : null,
            ],
            'role' => $this->role->name,
            'birthdate' => $this->birthdate,
        ];
    }
    
}
