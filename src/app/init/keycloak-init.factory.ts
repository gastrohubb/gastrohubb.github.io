import { KeycloakService } from "keycloak-angular";

export function initializeKeycloak(
    keycloak: KeycloakService
) {
    return () =>
        keycloak.init({
            config: {
                url: 'https://18.133.48.89:8443' + '/auth',
                realm: 'usterkafix',
                clientId: 'gastrohubb.github.io'
            },
            initOptions: {
                // pkceMethod: 'S256',
                // must match to the configured value in keycloak
                redirectUri: 'https://gastrohubb.github.io/*',
                // this will solved the error
                checkLoginIframe: false
            }
        });
}
