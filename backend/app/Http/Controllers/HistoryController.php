<?php

namespace App\Http\Controllers;

use App\Services\HistoryService;
use Illuminate\Http\Request;

class HistoryController extends Controller
{
    private $historyService;

    public function __construct(HistoryService $historyService)
    {
        $this->historyService = $historyService;
    }

    public function indexUser(Request $request)
    {
        return $this->historyService->upsertHistory($request, 'user');
    }

    public function indexEquipment(Request $request)
    {
        return $this->historyService->upsertHistory($request, 'equipment');
    }
}
