export const get404 = (req: any, res: any, next: any) => {
    // res.json({
    //     res: "not found",
    // });
    res.status(404).render("notFound", {
        pageTitle: "Page Not Found",
        path: "/404",
    });
};
