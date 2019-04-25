const isDev = window.location.port.indexOf('8080') > -1;

export const ENV = {
    BACKEND_URL: isDev ? 'http://localhost:3000' : ''
}