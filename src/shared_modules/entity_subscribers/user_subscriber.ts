// import {
//   EntitySubscriberInterface,
//   EventSubscriber,
//   InsertEvent,
//   UpdateEvent,
// } from 'typeorm';
// import { UserEntity } from '../../app_modules/user/entities/user.entity';
// import { CommonUtil } from '../../common/utils/common.util';

// @EventSubscriber()
// export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
//   listenTo() {
//     return UserEntity;
//   }

//   beforeInsert(event: InsertEvent<UserEntity>) {
//     if (event.entity.password) {
//       event.entity.password = CommonUtil.generateHash(event.entity.password);
//     }
//   }

//   beforeUpdate(event: UpdateEvent<UserEntity>) {
//     if (
//       event.entity.password &&
//       event.entity.password !== event.databaseEntity.password
//     ) {
//       event.entity.password = CommonUtil.generateHash(event.entity.password);
//     }
//   }
// }
