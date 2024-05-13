import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DateUtil {
  /**
   * Converts a UTC date to Peruvian date
   * @param utcDate The UTC date to convert
   * @returns The Peruvian date
   */
  utcToPeruvianDate(utcDate?: Date): Date {
    if (!utcDate) return;
    const date = new Date(utcDate);
    // Check if the date is valid
    if (isNaN(date.getTime())) return;


    const peruOffset = 5 * 60; // Peru is 5 hours behind UTC (in minutes)
    const peruTime = date.getTime() - peruOffset * 60 * 1000;
    return new Date(peruTime);
  }

  /**
   * Converts a Peruvian date to UTC date
   * @param peruDate The Peruvian date to convert
   * @returns The UTC date
   */
  peruvianDateToUtc(peruDate?: Date): Date {
    if (!peruDate) return;;
    const date = new Date(peruDate);
    // Check if the date is valid
    if (isNaN(date.getTime())) return;


    const peruOffset = 5 * 60; // Peru is 5 hours behind UTC (in minutes)
    const utcTime = date.getTime() + peruOffset * 60 * 1000;
    return new Date(utcTime);
  }
}
