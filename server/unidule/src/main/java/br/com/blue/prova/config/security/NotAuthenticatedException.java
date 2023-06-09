package br.com.blue.prova.config.security;

/**
 * Exceção a ser lançada quando o usuário não estiver autenticado e tentar obter um recurso que exige autenticação.
 */
public class NotAuthenticatedException extends RuntimeException {

    private static final long serialVersionUID = 772416103641245277L;

    public NotAuthenticatedException() {
        super();
    }

    public NotAuthenticatedException(String message, Exception cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

    public NotAuthenticatedException(String message, Exception cause) {
        super(message, cause);
    }

    public NotAuthenticatedException(String message) {
        super(message);
    }

    public NotAuthenticatedException(Exception cause) {
        super(cause);
    }

}
