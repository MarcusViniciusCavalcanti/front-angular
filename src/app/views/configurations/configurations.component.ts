import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfigurationService} from "../../core/service/configuration/configuration.service";
import {ActivatedRoute, Router} from "@angular/router";
import { ModeSystem } from '../../core/data/mode-system.enum';
import {Configuration} from "../../core/data/configuration";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.css']
})
export class ConfigurationsComponent implements OnInit {
  title: string = 'Configurações';
  formConfiguration: FormGroup;
  submitted = false;
  ModeSystem = ModeSystem;
  modeSystem: string;
  configuration: Configuration = new Configuration();

  returnUrl: string;
  error: string;

  constructor(private configurationService: ConfigurationService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.configurationService.getConfiguration()
      .subscribe(data => this.configuration = data, error => this.onError(error))

    this.formConfiguration = this.formBuilder.group({
      ip: [this.configuration.ip, [Validators.required, Validators.pattern('((^\\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\\s*$)|(^\\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:)))(%.+)?\\s*$))')]],
      mode: new FormControl(this.ModeSystem).setValue(this.configuration.modeSystem)
    })

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  get formControl() {
    return this.formConfiguration.controls;
  }

  mode(mode: ModeSystem) {
    return this.modeSystem === mode;
  }

  submit(event) {
    this.submitted = true;
    event.stopPropagation();
    event.preventDefault();

    if (this.formConfiguration.invalid) {
      console.log('invalid')
      return;
    }

    const configuration = new Configuration();
    configuration.modeSystem = this.formConfiguration.controls.mode.value;
    configuration.ip = this.formConfiguration.controls.ip.value;

    this.configurationService.saveNewConfiguration(configuration)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data)
          this.submitted = false;
        }),
        error => this.onError(error)

    this.submitted = false;
  }

  private onError(error) {
    this.error = error;
    console.error(error);
  }
}
