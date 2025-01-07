import { Request, Response, NextFunction } from 'express';
import fs from 'fs';

type LogType = 'completo' | 'simples';

function logger(path: string, type: LogType) {
if (type === 'simples') {
return (req: Request, res: Response, next: NextFunction) => {
fs.appendFile(
path + 'log.txt',
`${new Date().toISOString()}, ${req.url}, ${req.method}\n`,
(err) => {
if (err) throw err;
},
);
next();
};
} else if (type === 'completo') {
return (req: Request, res: Response, next: NextFunction) => {
fs.appendFile(
path + 'log.txt',
`${new Date().toISOString()}, ${req.url}, ${req.method}, ${req.httpVersion}, ${req.get('User-Agent')}\n`,
(err) => {
if (err) throw err;
},
);
next();
};
} else {
return (req: Request, res: Response, next: NextFunction) => {
next();
};
}
}

export default logger;
export { LogType };
