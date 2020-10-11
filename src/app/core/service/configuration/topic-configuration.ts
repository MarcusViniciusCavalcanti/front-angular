import { environment } from "../../../../environments/environment";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "../auth/auth.service";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { ModeSystem } from "../../data/mode-system.enum";
import { ConfigurationService } from "./configuration.service";

export class TopicConfiguration {
  endPoint: string = environment.serverUrl('/ws')
  topic: string = '/topic/change-config';
  stompClient: any;
  message: BehaviorSubject<any>

  constructor(private authService: AuthService, private configurationService: ConfigurationService) {
    this.message = new BehaviorSubject<ModeSystem>(ModeSystem.UNDEFINED);
    configurationService.getConfiguration().subscribe(configuration => {
      this.message.next(ModeSystem[configuration.modeSystem])
    })
  }

  connect() {
    let ws = new SockJS(this.endPoint);
    this.stompClient = Stomp.over(ws);

    const _this = this;
    const headerName = 'Authorization';
    const token = this.authService.currentTokenValue.value;
    const header = {};

    header[headerName] = token;

    _this.stompClient.connect(header, () => {
      _this.stompClient.subscribe(_this.topic, (sdkEvent) => {
        _this.message.next(ModeSystem[JSON.parse(sdkEvent.body)]);
      })
    })
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
  }
}
