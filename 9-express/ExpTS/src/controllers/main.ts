import { Request, Response, NextFunction } from 'express';
import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 15,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});
lorem.format = 'html';

const hello = (req: Request, res: Response) => {
  res.send('Hello World!');
};

const about = (req: Request, res: Response) => {
  const msg = 'Mensagem sobre a página';
  res.render('main/about', {
    layout: 'main',
    msg,
  });
};

const loremParam = (req: Request, res: Response, next: NextFunction) => {
  const { num } = req.params;
  const paragraphs = lorem.generateParagraphs(Number(num));
  res.render('main/lorem', {
    paragraphs,
    layout: 'lorem',
  });
};

const hb1 = (req: Request, res: Response) => {
  res.render('main/hb1', {
    mensagem: 'Olá, você está aprendendo Express + HBS!',
    layout: 'main',
  });
};

const hb2 = (req: Request, res: Response) => {
  res.render('main/hb2', {
    poweredbyNodejs: true,
    name: 'Express',
    type: 'Framework',
    layout: 'main',
  });
};

const hb3 = (req: Request, res: Response) => {
  const profs = [
    { nome: 'David Fernandes', sala: 1234 },
    { nome: 'Horácio Fernandes', sala: 1235 },
    { nome: 'Edleno Moura', sala: 1236 },
    { nome: 'Elaine harada', sala: 1237 },
  ];
  res.render('main/hb3', {
    profs,
    layout: 'main',
  });
};

const hb4 = (req: Request, res: Response) => {
  const techs = [
    { name: 'Express', type: 'Framework', poweredByNodejs: true },
    { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
    { name: 'React', type: 'Library', poweredByNodejs: true },
    { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
    { name: 'Django', type: 'Framework', poweredByNodejs: false },
    { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
    { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
  ];
  res.render('main/hb4', {
    techs,
    layout: 'main',
  });
};

const profs = (req: Request, res: Response) => {
  const profs = [
    { nome: 'David Fernandes', sala: 1234 },
    { nome: 'Horácio Fernandes', sala: 1235 },
    { nome: 'Edleno Moura', sala: 1236 },
    { nome: 'Elaine harada', sala: 1237 },
  ];
  res.render('main/profs', {
    profs,
    layout: 'main',
  });
};

const loremQuery = (req: Request, res: Response) => {
  const { num } = req.query;
  let paragraphs = '';
  if (num) paragraphs = lorem.generateParagraphs(Number(num));
  res.render('main/lorem', {
    paragraphs,
    layout: 'lorem',
  });
};

export default {
  hello,
  about,
  loremParam,
  loremQuery,
  hb1,
  hb2,
  hb3,
  hb4,
  profs,
};
