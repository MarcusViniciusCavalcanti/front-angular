import {Component, OnInit} from '@angular/core';
import {NavItemsService} from '../../_nav';
import {UserService} from '../../core/service/user/user.service';
import {User} from '../../core/data/user';
import {AvatarService} from '../../core/service/avatar/avatar.service';
import {TopicConfiguration} from "../../core/service/configuration/topic-configuration";
import {AuthService} from "../../core/service/auth/auth.service";
import {ModeSystem} from "../../core/data/mode-system.enum";
import {ConfigurationService} from "../../core/service/configuration/configuration.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems;
  public modeSystem: string;
  ModeSystem = ModeSystem;

  modeConfigurationSystem: FormGroup;

  user: User;
  avatarUser;

  constructor(private userService: UserService,
              private avatarService: AvatarService,
              private authService: AuthService,
              private configurationService: ConfigurationService,
              private formBuilder: FormBuilder) {
    const navItemsService = new NavItemsService();
    const topicConfiguration = new TopicConfiguration(authService, configurationService);

    this.user = userService.currentUserValue;
    this.navItems = navItemsService.getItems(this.user.roles);

    topicConfiguration.connect();
    topicConfiguration.message.asObservable().subscribe(message => this.modeSystem = message);
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  ngOnInit(): void {
    this.avatarService.getAvatar(this.user).subscribe(image => this.createImageFromBlob(image));

    this.modeConfigurationSystem = this.formBuilder.group({
      mode: new FormControl(this.ModeSystem)
    });

    this.modeConfigurationSystem.get('mode').valueChanges.subscribe(value => this.submitChange(value));
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => this.avatarUser = reader.result, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  mode(mode: ModeSystem) {
    return this.modeSystem === mode;
  }

  private submitChange(value) {
    if (value === ModeSystem.AUTOMATIC) {
      this.configurationService.updateModeSystem('AUTOMATIC').subscribe(config => {
        console.log(config)
      })
    }

    if (value === ModeSystem.MANUAL) {
      this.configurationService.updateModeSystem('MANUAL').subscribe(config => {
        console.log(config)
      })
    }

    if (value === ModeSystem.NONE) {
      this.configurationService.updateModeSystem('NONE').subscribe(config => {
        console.log(config)
      })
    }
  }
}
