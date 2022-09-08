export class AppError extends Error {
    statusCode: Number;
    status: any;
    errors: any = null;
    isOperationalError: boolean;
    constructor(message: string, statusCode: Number, errors: any = null) {
        super(message);
        this.statusCode = statusCode;
        this.status = false;
        this.errors = errors;
        this.isOperationalError = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
