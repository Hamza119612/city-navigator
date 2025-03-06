import { Logger as NestLogger } from '@nestjs/common';

export class Logger {
  private static logger = new NestLogger('App');

  static log(message: string) {
    this.logger.log(message);
  }

  static warn(message: string) {
    this.logger.warn(message);
  }

  static error(message: string, trace?: string) {
    this.logger.error(message, trace);
  }
}
