import chalk from "chalk";
// const importFresh = async (modulePath: any) =>
//     import(`${modulePath}?x=${new Date()}`);
// const chalk = (await importFresh("chalk")).default;

export default class Logging {
    // public static log = (args:any)=> this.info(args);
    public static log = (args: any) => this.info(args);
    public static success = (args: any) =>
        console.log(
            chalk.green(`[${new Date().toLocaleString()}][✔]`),
            typeof args === "string" ? chalk.greenBright(args) : args
        );

    public static info = (args: any) =>
        console.log(
            chalk.blue(`[${new Date().toLocaleString()}][ℹ]`),
            typeof args === "string" ? chalk.blueBright(args) : args
        );

    public static warn = (args: any) =>
        console.log(
            chalk.yellow(`[${new Date().toLocaleString()}][⚠]`),
            typeof args === "string" ? chalk.yellowBright(args) : args
        );

    public static error = (args: any) =>
        console.log(
            chalk.red(`[${new Date().toLocaleString()}][⚠]`),
            typeof args === "string" ? chalk.redBright(args) : args
        );
}
