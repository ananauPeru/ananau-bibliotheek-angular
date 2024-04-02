interface CheckInHistory {
    id: number;
    userId: number;
    checkInTime: string;
    checkOutTime: string | null;
  }