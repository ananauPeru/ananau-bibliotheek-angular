import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DomainUtil {


  public Subdomain = Subdomain;


  /**
   * Returns the domain url with the given subdomain.
   * @param subdomain The optional subdomain you want to redirect to.
   * @returns a string of the domain url.
   */
  getDomainUrl(subdomain?: Subdomain): string {
    let subdomainString = "";

    // If the subdomain is not null, undefined, or invalid, then add the subdomain to the url.
    if(subdomain !== null && subdomain !== undefined && subdomain !== Subdomain.Invalid) {
      subdomainString = `${subdomain}.`;
    }

    if(window.location.hostname.includes("localhost")) {
      return `http://${subdomainString}localhost:4200`;
    } else {
      return `https://${subdomainString}ananau.org`;
    }
  }


  /**
   * Returns the subdomain of the current page you are visiting.
   * @returns the subdomain of the current page you are visiting.
   */
  getSubdomain(): Subdomain {
    switch (this.getSubdomainByHostname(window.location.hostname)) {
      case "team":
        return Subdomain.Team;
      case "learning":
        return Subdomain.Learning;
      default:
        return Subdomain.Invalid;
    }
  }

  /**
   * Returns true if the current subdomain is the same as the subdomain passed in, false otherwise.
   * @param subdomain The subdomain to check against.
   * @returns true if the current subdomain is the same as the subdomain passed in, false otherwise.
   */
  isSubdomain(subdomain: Subdomain): boolean {
    return this.getSubdomain() === subdomain;
  }

  private getSubdomainByHostname(hostname: string): string {
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
