export const EnvConfiguration = () => ({
    environment: process.env.NODE_ENV || 'dev', // Si no esta configurada, la ponemos en desarrollo
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 3001 
})