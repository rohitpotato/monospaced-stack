import path from 'path';
import dotenv from 'dotenv';
import schema from './env';



export default function loadConfig(): void {
    if (process.env.NODE_ENV === 'development') {
        const envPath = path.join(__dirname, '..', '..', '.env');

        const result = dotenv.config({ path: envPath });

        if (result.error) {
            throw new Error(
                `Failed to load .env file from path ${envPath}: ${result.error.message}`,
            );
        }
        const validation = schema.safeParse(process.env);

        if (validation.error) {
            console.log(validation.error);
            throw new Error(`Config validation error: ${result.error}`);
        }
    }
}
