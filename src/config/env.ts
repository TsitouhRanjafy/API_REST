import dotenv from 'dotenv'

dotenv.config()

const REQUIRED_ENV_VARS = ["MYSQL_DATABASE","MYSQL_USER","MYSQL_HOST","MYSQL_PASSWORD","PORT","DOMAIN_ORIGIN","JWT_KEY","MONGODB_URL"]

for (const key of REQUIRED_ENV_VARS) {
    if (!process.env[key]) {
        throw new Error(`❌ The environnement variable ${key} is empty. Verify the file .env`);
    }
}

export const config = {
    MYSQL_DATABASE: process.env.MYSQL_DATABASE || 'bibliotheque',
    MYSQL_USER: process.env.MYSQL_USER || 'root',
    MYSQL_HOST: process.env.MYSQL_HOST!,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD!,
    PORT: process.env.PORT || 3000,
    DOMAIN_ORIGIN: process.env.DOMAIN_ORIGIN!,
    JWT_KEY: process.env.JWT_KEY!,
    MONGODB_URL: process.env.MONGODB_URL!,
}