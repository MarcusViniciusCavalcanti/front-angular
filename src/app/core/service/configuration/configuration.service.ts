import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
import {Configuration} from "../../data/configuration";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(private http: HttpClient) { }

  getConfiguration(): Observable<Configuration> {
    return this.http.get<Configuration>(environment.serverUrl('/configurations'));
  }

  saveNewConfiguration(configuration: Configuration) {
    return this.http.post<Configuration>(configuration._links.save.href, configuration);
  }

  updateModeSystem(mode: string) {
    const body = { modeSystem: mode }
    return this.http.patch<Configuration>(environment.serverUrl('/configurations/mode-system'), body);
  }
}
