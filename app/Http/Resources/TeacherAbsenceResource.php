<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class TeacherAbsenceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $formattedDate = $this->formatDate($this->created_at);

        return [
            'date' => $formattedDate,
            'name' => $this->user->name,
            'classroom' => $this->classroom->name,
            'lesson' => $this->lesson->name,
            'absence_status' => $this->absenceStatus->name,
            'status_activity_learning' => $this->learningActivityStatus->name,
            'photo_start' => $this->photo_start ? Storage::url($this->photo_start) : null,
            'photo_end' => $this->photo_end ? Storage::url($this->photo_end) : null,
            'photo_assignment' => $this->photo_assignment ? Storage::url($this->photo_assignment) : null,
        ];
    }

    /**
     * Format the date.
     *
     * @param  string|null  $date
     * @return string|null
     */
    private function formatDate($date)
    {
        if ($date) {
            try {
                $carbonDate = Carbon::createFromFormat('Y-m-d H:i:s', $date);
                return $carbonDate->format('d F Y, H:i');
            } catch (\Exception $e) {
                return 'Invalid date format';
            }
        }

        return null;
    }
}
