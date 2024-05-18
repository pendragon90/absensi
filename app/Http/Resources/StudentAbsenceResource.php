<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentAbsenceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $formattedDate = null;

        if ($this->created_at) {
            try {
                $carbonDate = Carbon::createFromFormat('Y-m-d H:i:s', $this->created_at);
                $formattedDate = $carbonDate->format('d F Y, H:i');
            } catch (\Exception $e) {
                // Handle exception if date format is incorrect
                $formattedDate = 'Invalid date format';
            }
        }

        return [
           'date' =>  $formattedDate,
           'student' => $this->student->name,
           'teacher' => $this->teacher->name,
           'classroom' => $this->classroom->name,
           'lesson' => $this->lesson->name,
           'absence_status' => $this->absenceStatus->name,
        ];
    }
}
