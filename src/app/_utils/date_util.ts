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
  utcToPeruvianDate(utcDate: Date): Date {
    const peruOffset = 5 * 60; // Peru is 5 hours behind UTC (in minutes)
    const peruTime = utcDate.getTime() - peruOffset * 60 * 1000;
    return new Date(peruTime);
  }

  /**
   * Converts a Peruvian date to UTC date
   * @param peruDate The Peruvian date to convert
   * @returns The UTC date
   */
  peruvianDateToUtc(peruDate: Date): Date {
    const peruOffset = 5 * 60; // Peru is 5 hours behind UTC (in minutes)
    const utcTime = peruDate.getTime() + peruOffset * 60 * 1000;
    return new Date(utcTime);
  }
}