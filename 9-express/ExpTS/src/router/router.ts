import { Router, Request, Response } from "express";
import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 15,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});
lorem.format = "html";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

router.get("/about", (req: Request, res: Response) => {
    const msg = "Mensagem sobre a página";
    res.render("about", {
        layout: false,
        msg,
    });
});

router.get("/lorem/:num", (req: Request, res: Response) => {
    const { num } = req.params;
    res.send(lorem.generateParagraphs(Number(num)));
    
});

router.get("/hb1", (req: Request, res: Response) => {
    res.render("hb1", {
        mensagem: "Olá, você está aprendendo Express + HBS!",
        layout: false,
    });
});

router.get("/hb2", (req: Request, res: Response) => {
    res.render("hb2", {
        poweredbyNodejs: true,
        name: "Express",
        type: "Framework",
        layout: false,
    });
});

router.get("/hb3", (req: Request, res: Response) => {
    const profs = [
        { nome: "David Fernandes", sala: 1234 },
        { nome: "Horácio Fernandes", sala: 1235 },
        { nome: "Edleno Moura", sala: 1236 },
        { nome: "Elaine harada", sala: 1237 },
    ]
    res.render("hb3", {
        profs,
        layout: false,
    });
});

router.get("/profs", (req: Request, res: Response) => {
    const profs = [
        { nome: "David Fernandes", sala: 1234 },
        { nome: "Horácio Fernandes", sala: 1235 },
        { nome: "Edleno Moura", sala: 1236 },
        { nome: "Elaine harada", sala: 1237 },
    ]
    res.render("profs", {
        profs,
        layout: false,
    });
});

router.get("/hb4", (req: Request, res: Response) => {
    const techs = [
        { name: 'Express', type: 'Framework', poweredByNodejs: true },
        { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
        { name: 'React', type: 'Library', poweredByNodejs: true },
        { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
        { name: 'Django', type: 'Framework', poweredByNodejs: false },
        { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
        { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
       ];
    res.render("hb4", {
        techs,
        layout: false,
    });
});

export default router;
