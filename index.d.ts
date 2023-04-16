declare module "akf-system" {
    interface SystemInformation {
        Username: string;
        Host: string;
        OS: string;
        Build: string;
        Uptime: string;
        CPU: string;
        RAM: string;
        GPUS: string[];
        Motherboard?: string;
        Resolution?: string;
    }
    
    export default function (): SystemInformation;
}