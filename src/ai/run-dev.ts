import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env file from the project root
config({ path: resolve(process.cwd(), '.env') });

// Now that env variables are loaded, import the main dev file
import('./dev');
