import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';
import { Db } from 'mongodb';

@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[],
    @Inject('MONGO') private database: Db,

    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  getHello(): string {
    const name = this.configService.database.name;
    return `Hello World! ${name}`;
  }

  getTasks() {
    const tasksCollection = this.database.collection('task');
    return tasksCollection.find().toArray();
  }
}
