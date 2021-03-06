import { Injectable } from "@nestjs/common";
import { InjectPinoLogger } from "nestjs-pino";
import * as admin from "firebase-admin";
import * as path from "path";
import * as fs from "fs";
import * as config from '../../config';

import { PushTopic } from "./push.constants";

let firebase;
let isFirebaseDefault = false;
try {
  const { FIREBASE_SERVICE_ACCOUNT_KEY } = config;
  const serviceAccountPath = path.resolve(FIREBASE_SERVICE_ACCOUNT_KEY);

  fs.accessSync(serviceAccountPath, fs.constants.R_OK);

  const credential = FIREBASE_SERVICE_ACCOUNT_KEY
      ? admin.credential.cert(serviceAccountPath)
      : admin.credential.applicationDefault();

  firebase = admin.initializeApp({ credential });
} catch (e) {
  isFirebaseDefault = true;
  firebase = admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

@Injectable()
export class PushService {
  private messaging = null;

  constructor(
    @InjectPinoLogger(PushService.name)
    private readonly logger
  ) {
    if (isFirebaseDefault) {
      logger.error("Firebase default credential is used!");
    }

    if (firebase) {
      this.messaging = firebase.messaging();
    } else {
      logger.error("Firebase is not initialized");
    }
  }

  public async subscribe(token: string) {
    return this.subscribeToTopic(token, PushTopic.news);
  }

  public async unsubscribe(token: string) {
    return this.unsubscribeFromTopic(token, PushTopic.news);
  }

  private async subscribeToTopic(token: string, topic: PushTopic) {
    this.logger.info({ token: String(token) }, "Subscribe");
    try {
      const result = await this.messaging.subscribeToTopic(token, topic);

      this.logger.debug({ result, token, topic }, "subscribe to topic");

      return result;
    } catch (error) {
      this.logger.error({ error, token, topic }, "Failed subscribe to topic");

      return false;
    }
  }

  private async unsubscribeFromTopic(token: string, topic: PushTopic) {
    try {
      const result = await this.messaging.unsubscribeFromTopic(token, topic);

      this.logger.debug({ result, token, topic }, "unsubscribe from topic");

      return result;
    } catch (error) {
      this.logger.error(
        { error, token, topic },
        "Failed unsubscribe from topic"
      );

      return false;
    }
  }

  public async sendNotificationToTopic(topic: PushTopic, data) {
    const message = {
      topic,
      ...data,
    };

    this.logger.debug("FCM message send");

    try {
      const result = await this.messaging.send(message);

      this.logger.debug({ result, message }, "FCM message sended");

      return true;
    } catch (error) {
      this.logger.error({ error, message }, "Failed send FCM message");

      return false;
    }
  }
}
