export class ModeratorModel {
  user: string;
  theme: string;
  message: string;
  current: string;
  constructor(name: string) {
    this.user = name;
    this.theme = "";
    this.message = "";
    this.current = "Назначен";
  }
}
