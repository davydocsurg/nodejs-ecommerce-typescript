export const get404 = (req: any, res: any, next: any) => {
    res.sendStatus(404).render("404", { pageTitle: "Page Not Found" });
};
