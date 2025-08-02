export class EmailResponse {
  message: string;
  success: boolean;
  timestamp: Date;

  constructor(message: string, success: boolean = true) {
    this.message = message;
    this.success = success;
    this.timestamp = new Date();
  }
}
