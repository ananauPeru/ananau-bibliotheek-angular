import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DomainUtil {
  /**
   * Returns the subdomain of the current page you are visiting.
   * @returns the subdomain of the current page you are visiting.
   */
  public static getSubdomain(): Subdomain {
    switch (this.getSubdomainByHostname(window.location.hostname)) {
      case "team":
        return Subdomain.Team;
      case "learning":
        return Subdomain.Learning;
      default:
        return Subdomain.Invalid;
    }
  }

  private static getSubdomainByHostname(hostname: string): string {
    const parts = hostname.split(".");
    if (parts.length >= 2) {
      return parts[0];
    }
    return "";
  }
}

export enum Subdomain {
  Team = "team",
  Learning = "learning",
  Invalid = "invalid",
}
