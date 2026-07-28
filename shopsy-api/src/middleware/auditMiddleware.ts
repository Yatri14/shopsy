import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const logDir = path.resolve(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

export const auditLogger = (req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  const entry = `${timestamp} ${req.method} ${req.originalUrl} ${req.ip}\n`;
  fs.appendFileSync(path.join(logDir, 'audit.log'), entry);
  res.on('finish', () => {
    const status = res.statusCode;
    fs.appendFileSync(path.join(logDir, 'audit.log'), `${timestamp} -> ${status}\n`);
  });
  next();
};
