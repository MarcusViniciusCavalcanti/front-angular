import { ModeSystem } from "./mode-system.enum";

export class Configuration {
  modeSystem: ModeSystem;
  ip: string;
  _links: Links
}

export class Links {
  load: Href;
  save: Href;
  updateModeSystem: Href;
}

export class Href {
  href: string;
}
