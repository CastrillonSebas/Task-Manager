import { Module } from '@nestjs/common';

import { TasksRepository } from './repositories/tasks.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService, TasksRepository],
})
export class TasksModule {}