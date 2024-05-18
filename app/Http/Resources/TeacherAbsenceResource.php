<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Yaza\LaravelGoogleDriveStorage\Gdrive;

class TeacherAbsenceResource extends JsonResource
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
            'date' => $formattedDate,
            'name' => $this->user->name,
            'classroom' => $this->classroom->name,
            'lesson' => $this->lesson->name,
            'absence_status' => $this->absenceStatus->name,
            'status_activity_learning' => $this->learningActivityStatus->name,
            'photo_start' => $this->getPhotoUrl($this->photo_start),
            'photo_end' => $this->getPhotoUrl($this->photo_end),
            'photo_assignment' => $this->getPhotoUrl($this->photo_assignment),
        ];
    }

    /**
     * Get the URL of the photo from Google Drive.
     *
     * @param string|null $path
     * @return string|null
     */
    private function getPhotoUrl(?string $path): ?string
    {
        if ($path) {
            try {
                $data = Gdrive::get($path);
                return response($data->file, 200)
                    ->header('Content-Type', $data->ext);
            } catch (\Exception $e) {
                // Handle exception if file is not found
                return null;
            }
        }
        return null;
    }
}
